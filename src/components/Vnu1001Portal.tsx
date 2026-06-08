/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, Award, Clock, ArrowRight, ArrowLeft, Check, X, 
  ChevronLeft, ChevronRight, Star, RefreshCw, Play, Filter, 
  CheckCircle2, Flame, Sparkles, BookMarked, Timer, LogOut, 
  AlertCircle, ShieldAlert, Award as MedalIcon,
  Coffee, Pause, RotateCcw, Volume2,
  Sun, Moon, Trash2, Plus, Download, Upload
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { getFullVNU1001Database as getFullVNU1001Database_IMPORT, VNU_TOPICS as VNU_TOPICS_IMPORT, VNUQuestion } from '../vnu1001_questions';
import { getFullPLDCDatabase, PLDC_TOPICS } from '../pldc_questions';
import DetailedExplanationBox from './DetailedExplanationBox';

interface Vnu1001PortalProps {
  onBackToLauncher: () => void;
}

// Persisted progress datastore keys
const STORAGE_BOOKMARKS_KEY = "vnu1001_bookmarks_v1";
const STORAGE_HISTORY_KEY = "vnu1001_history_v1"; // questions answered correct/incorrect
const STORAGE_STREAK_KEY = "vnu1001_streak_v1";
const STORAGE_MAX_STREAK_KEY = "vnu1001_max_streak_v1";
const STORAGE_COMPLETED_DATES_KEY = "vnu1001_completed_dates_v1";
const STORAGE_STUDY_TIME_KEY = "vnu1001_study_time_v1";
const STORAGE_MOCK_HISTORY_KEY = "vnu1001_mock_history_v1";
const STORAGE_THEME_KEY = "vnu1001_theme_v1";

export default function Vnu1001Portal({ onBackToLauncher }: Vnu1001PortalProps) {
  // --- SUBJECT STATE ---
  const [currentSubject, setCurrentSubject] = useState<'vnu1001' | 'pldc'>(() => {
    try {
      const saved = localStorage.getItem("selected_subject_pldc_v1");
      if (saved === 'pldc' || saved === 'vnu1001') {
        return saved;
      }
    } catch (e) {}
    return 'vnu1001';
  });

  // --- SMART SHADOWS FOR PERFECT COMPATIBILITY ---
  const getFullVNU1001Database = () => {
    return currentSubject === 'vnu1001' ? getFullVNU1001Database_IMPORT() : getFullPLDCDatabase();
  };

  const VNU_TOPICS = currentSubject === 'vnu1001' ? VNU_TOPICS_IMPORT : PLDC_TOPICS;

  // --- DYNAMIC DATABASE STATE ENGINE ---
  const [activeDatabase, setActiveDatabase] = useState<VNUQuestion[]>(() => {
    const savedSubject = (() => {
      try {
        const saved = localStorage.getItem("selected_subject_pldc_v1");
        if (saved === 'pldc' || saved === 'vnu1001') return saved;
      } catch (e) {}
      return 'vnu1001';
    })();

    try {
      const key = savedSubject === 'pldc' ? "pldc_custom_database_v1" : "vnu1001_custom_database_v1";
      const saved = localStorage.getItem(key);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Lỗi tải đề thi tùy chỉnh:", e);
    }
    // Mặc định: Nạp sẵn đề thi tương ứng
    return savedSubject === 'pldc' ? getFullPLDCDatabase() : getFullVNU1001Database_IMPORT();
  });

  const fullDatabase = activeDatabase;

  // Workspace subviews: 'dashboard' | 'practice' | 'mock_exam' | 'bookmarks' | 'exam_result' | 'importer'
  const [activeTab, setActiveTab] = useState<'dashboard' | 'practice' | 'mock_exam' | 'bookmarks' | 'exam_result' | 'importer'>('dashboard');

  // --- LOCAL STATE ENGINE ---
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [answeredHistory, setAnsweredHistory] = useState<{ [qId: string]: { correct: boolean; chosenOption: number } }>({});
  const [streakDays, setStreakDays] = useState<number>(3); // seeded default
  const [maxStreak, setMaxStreak] = useState<number>(3); // seeded max streak default
  const [completedDates, setCompletedDates] = useState<string[]>([]); // array of YYYY-MM-DD
  const [todayPracticedCount, setTodayPracticedCount] = useState<number>(0);
  const [todayMockSubmitted, setTodayMockSubmitted] = useState<boolean>(false);

  // --- CUSTOM DIALOGS FOR SAFE RUNTIME IN IFRAMES ---
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    type: 'alert' | 'confirm';
    title: string;
    message: string;
    onOk?: () => void;
    onCancel?: () => void;
    okText?: string;
    cancelText?: string;
  } | null>(null);

  const customAlert = (message: string, title = "Thông báo") => {
    setModalConfig({
      isOpen: true,
      type: 'alert',
      title,
      message,
      okText: "Đồng ý",
    });
  };

  const customConfirm = (message: string, onConfirm: () => void, title = "Xác nhận") => {
    setModalConfig({
      isOpen: true,
      type: 'confirm',
      title,
      message,
      onOk: onConfirm,
      okText: "Đồng ý",
      cancelText: "Hủy bỏ"
    });
  };

  // --- OFFLINE EXPORT & CERTIFICATE PREVIEW STATE ---
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [certFullName, setCertFullName] = useState<string>("Nguyễn Văn A");

  // --- CUSTOM IMPORTER UTILITIES & TEXT AREAS ---
  const [rawText, setRawText] = useState<string>("");
  const [editingQuestions, setEditingQuestions] = useState<VNUQuestion[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analyzeError, setAnalyzeError] = useState<string | null>(null);

  const handleParseWithAI = async () => {
    if (!rawText.trim()) {
      customAlert("Vui lòng nhập hoặc dán nội dung văn bản đề thi thô!");
      return;
    }
    setIsAnalyzing(true);
    setAnalyzeError(null);

    try {
      const response = await fetch("/api/generate-exam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawText: rawText }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Lỗi xử lý không xác định từ máy chủ.");
      }
      if (Array.isArray(data.questions) && data.questions.length > 0) {
        setEditingQuestions(data.questions);
        customAlert(`AI đã phân tích thành cấu trúc thành công ${data.questions.length} câu hỏi trắc nghiệm! Bạn có thể xem trước, chỉnh sửa hoặc sửa đổi các câu hỏi bên dưới.`);
      } else {
        throw new Error("Không thể tìm thấy hoặc xử lý câu hỏi hợp lệ nào trong văn bản đã dán. Hãy kiểm tra lại cấu trúc văn bản hoặc đáp án.");
      }
    } catch (err: any) {
      console.error(err);
      setAnalyzeError(err.message || "Ứng dụng không thể kết nối hoặc gọi API xử lý.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDeleteEditingQuestion = (index: number) => {
    setEditingQuestions(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpdateEditingQuestion = (index: number, updatedFields: Partial<VNUQuestion>) => {
    setEditingQuestions(prev => prev.map((q, i) => {
      if (i === index) {
        return { ...q, ...updatedFields };
      }
      return q;
    }));
  };

  const handleUpdateEditingOption = (qIndex: number, optIndex: number, newValue: string) => {
    setEditingQuestions(prev => prev.map((q, i) => {
      if (i === qIndex) {
        const newOpts = [...q.options];
        newOpts[optIndex] = newValue;
        return { ...q, options: newOpts };
      }
      return q;
    }));
  };

  const handleAddBlankQuestion = () => {
    const blankQ: VNUQuestion = {
      id: `custom-q-${Date.now()}-${editingQuestions.length}`,
      topicId: 1,
      difficulty: "nhan_biet",
      questionText: "Nhập nội dung câu hỏi mới vào đây...",
      options: ["Lựa chọn A", "Lựa chọn B", "Lựa chọn C", "Lựa chọn D"],
      correctOption: 0,
      explanation: "Nhập giải thích cho đáp án đúng tại đây..."
    };
    setEditingQuestions(prev => [...prev, blankQ]);
  };

  const handleSaveImportedQuestions = (overwrite: boolean) => {
    if (editingQuestions.length === 0) {
      customAlert("Chưa có câu hỏi nào để lưu!");
      return;
    }

    const persistAction = () => {
      let updatedDb: VNUQuestion[] = [];
      if (overwrite) {
        updatedDb = [...editingQuestions];
      } else {
        // Avoid raw initial 600 questions being overwritten if they just appended
        updatedDb = [...fullDatabase, ...editingQuestions];
      }

      // Assign safe unique ids if somehow missing
      updatedDb = updatedDb.map((q, idx) => ({
        ...q,
        id: q.id || `q-custom-${Date.now()}-${idx}`
      }));

      setActiveDatabase(updatedDb);
      try {
        const key = currentSubject === 'pldc' ? "pldc_custom_database_v1" : "vnu1001_custom_database_v1";
        localStorage.setItem(key, JSON.stringify(updatedDb));
      } catch (e) {
        console.error(e);
      }
      setEditingQuestions([]);
      setRawText("");
      customAlert(`Đã lưu thành công ${editingQuestions.length} câu hỏi mới vào hệ thống ôn luyện!`);
      setActiveTab("dashboard");
    };

    if (overwrite) {
      customConfirm(
        "Hành động này sẽ xóa sạch ngân hàng câu hỏi cũ để thay thế bằng danh sách câu hỏi mới. Bạn có chắc chắn muốn ghi đè?",
        persistAction,
        "Xác nhận ghi đè đề"
      );
    } else {
      persistAction();
    }
  };

  const handleResetToDefault = () => {
    const subjectPrefixName = currentSubject === 'vnu1001' ? "600 câu hỏi chuẩn VNU1001" : "câu hỏi Pháp Luật Đại Cương chuẩn";
    const key = currentSubject === 'vnu1001' ? "vnu1001_custom_database_v1" : "pldc_custom_database_v1";
    customConfirm(
      `Bạn có chắc chắn muốn khôi phục lại ngân hàng ${subjectPrefixName}? Toàn bộ các câu hỏi tự tạo hoặc tải lên của bạn sẽ bị xóa khỏi bộ nhớ.`,
      () => {
        const defaultDb = currentSubject === 'vnu1001' ? getFullVNU1001Database_IMPORT() : getFullPLDCDatabase();
        setActiveDatabase(defaultDb);
        localStorage.removeItem(key);
        customAlert(`Đã khôi phục thành công ngân hàng ${subjectPrefixName}!`);
        setActiveTab("dashboard");
      },
      "Khôi phục mặc định"
    );
  };

  const handleExportCurrentDatabase = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(activeDatabase, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `ngan_hang_cau_hoi_export_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleExportCSV = () => {
    try {
      // 1. General stats
      let csv = "BÁO CÁO TIẾN ĐỘ VÀ HIỆU SUẤT HỌC TẬP VNU1001\n";
      csv += `Người ôn luyện,${"atemday997@gmail.com"}\n`;
      csv += `Ngày xuất báo cáo,${new Date().toLocaleString("vi-VN")}\n`;
      csv += `Tổng số câu hỏi trong ngân hàng,${fullDatabase.length}\n`;
      csv += `Số câu đã làm,${stats.totalAnswered}\n`;
      csv += `Tỷ lệ hoàn thành chung,${stats.overallCompletion}%\n`;
      csv += `Tỷ lệ chính xác trung bình,${stats.accuracy}%\n`;
      csv += `Số câu đánh dấu khó,${stats.bookmarkedCount}\n`;
      csv += `Học liên tục (Streak),${streakDays} ngày\n`;
      csv += `Streak kỷ lục,${maxStreak} ngày\n\n`;

      // 2. Breakdown per topic
      csv += "CHỈ SỐ TIẾN TRÌNH THEO CHUYÊN ĐỀ\n";
      csv += "Mã,Tên Chuyên Đề,Thời Gian Học (Giây),Thời Gian Học (Định Dạng),Số Câu Đã Trả Lời,Tỷ Lệ Đúng Chỉ Số Luyện Tập (%)\n";
      topicDetails.forEach(topic => {
        const timeVal = studyTimes[topic.id] || 0;
        const timeStr = formatStudyTime(timeVal);
        const topicQs = fullDatabase.filter(q => q.topicId === topic.id);
        const answeredInTopic = topicQs.filter(q => answeredHistory[q.id] !== undefined).length;
        const correctPractice = topicQs.filter(q => answeredHistory[q.id]?.correct).length;
        const practiceRate = answeredInTopic > 0 ? Math.round((correctPractice / answeredInTopic) * 100) : 0;
        
        const safeName = topic.name.replace(/,/g, " -");
        csv += `${topic.id},"${safeName}",${timeVal},"${timeStr}",${answeredInTopic},${practiceRate}%\n`;
      });
      csv += "\n";

      // 3. Mock exam history
      csv += "LỊCH SỬ THI THỬ MOCK EXAM\n";
      csv += "STT,Mã Bài Thi,Thời Gian Nộp,Điểm Số (đ),Kết Quả,Số Câu Đúng,Số Câu Sai,Tổng Số Câu,Thời Gian Làm Bài\n";
      if (mockHistory.length === 0) {
        csv += "Chưa có lượt thi thử nào được ghi nhận\n";
      } else {
        mockHistory.forEach((item, idx) => {
          csv += `${idx + 1},${item.id},"${item.timestamp}",${item.score.toFixed(1)},${item.passed ? "ĐẠT" : "CHƯA ĐẠT"},${item.correctCount},${item.wrongCount},${item.total},"${item.timeSpent}"\n`;
        });
      }

      const BOM = "\uFEFF";
      const blob = new Blob([BOM + csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", url);
      downloadAnchor.setAttribute("download", `Bao_cao_hoc_tap_VNU1001_${Date.now()}.csv`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (error) {
      console.error(error);
      customAlert("Có lỗi xảy ra khi tạo báo cáo CSV: " + error);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (Array.isArray(parsed)) {
            const isValid = parsed.every(item => 
              typeof item.questionText === 'string' &&
              Array.isArray(item.options) &&
              item.options.length === 4
            );
            
            if (isValid) {
              const cleaned = parsed.map((item, idx) => ({
                id: item.id || `uploaded-q-${Date.now()}-${idx}`,
                topicId: typeof item.topicId === 'number' ? item.topicId : 1,
                difficulty: item.difficulty || 'nhan_biet',
                questionText: item.questionText,
                options: item.options,
                correctOption: typeof item.correctOption === 'number' ? item.correctOption : 0,
                explanation: item.explanation || "Giải thích đề thi tự tạo."
              }));
              
              setEditingQuestions(cleaned);
              customAlert(`Tải file JSON thành công! Đã phát hiện ${cleaned.length} câu hỏi. Hãy xem trước tinh chỉnh bên dưới và bấm Lưu.`);
            } else {
              customAlert("Cấu trúc file JSON không đúng mẫu. Vui lòng đảm bảo tệp chứa mảng các câu hỏi gồm questionText và 4 options.");
            }
          } else {
            customAlert("Định dạng file không hợp lệ, phải là một mảng dữ liệu JSON.");
          }
        } catch (error) {
          customAlert("Lỗi phân tích tệp JSON: " + error);
        }
      };
    }
  };

  // Persistent tracked states
  const [studyTimes, setStudyTimes] = useState<{ [topicId: number]: number }>({
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0
  });
  const [mockHistory, setMockHistory] = useState<any[]>([]);

  // Practice state
  const [selectedTopic, setSelectedTopic] = useState<number>(1); // 1 to 6
  const [practiceIndex, setPracticeIndex] = useState<number>(0);
  const [practiceDifficulty, setPracticeDifficulty] = useState<string>('all'); // 'all' | 'nhan_biet' | 'thong_hieu' | 'van_dung' | 'van_dung_cao'
  const [practiceStatusFilter, setPracticeStatusFilter] = useState<string>('all'); // 'all' | 'wrong' | 'unanswered' | 'correct'
  const [chosenOption, setChosenOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  // Mock Exam state
  const [mockQuestions, setMockQuestions] = useState<VNUQuestion[]>([]);
  const [mockAnswers, setMockAnswers] = useState<{ [qId: string]: number }>({});
  const [examSubmitted, setExamSubmitted] = useState<boolean>(false);
  const [examTimer, setExamTimer] = useState<number>(1800); // 30 minutes in seconds
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [mockScore, setMockScore] = useState<number>(0);
  const [examSavedResult, setExamSavedResult] = useState<{
    score: number;
    passed: boolean;
    correctCount: number;
    wrongCount: number;
    total: number;
    timeSpent: string;
  } | null>(null);
  const [examReviewFilter, setExamReviewFilter] = useState<string>('all'); // 'all' | 'wrong'


  // --- SWITCH SUBJECT UTILITY HANDLER ---
  const handleSwitchSubject = (subject: 'vnu1001' | 'pldc') => {
    try {
      localStorage.setItem("selected_subject_pldc_v1", subject);
    } catch (e) {}

    // Reset view states
    setCurrentSubject(subject);
    setActiveTab('dashboard');
    setSelectedTopic(1);
    setPracticeIndex(0);
    setPracticeDifficulty('all');
    setPracticeStatusFilter('all');
    setChosenOption(null);
    setShowExplanation(false);
    
    // Reset exam states
    setMockQuestions([]);
    setMockAnswers({});
    setExamSubmitted(false);

    // Retrieve respective custom database or fall back to default
    try {
      const key = subject === 'pldc' ? "pldc_custom_database_v1" : "vnu1001_custom_database_v1";
      const saved = localStorage.getItem(key);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setActiveDatabase(parsed);
          return;
        }
      }
    } catch (e) {}

    setActiveDatabase(subject === 'pldc' ? getFullPLDCDatabase() : getFullVNU1001Database_IMPORT());
  };


  // --- POMODORO CLOCK ENGINE ---
  const [pomoMinutes, setPomoMinutes] = useState<number>(25); // configured focus minutes
  const [pomoTimeLeft, setPomoTimeLeft] = useState<number>(1500); // 25 minutes default in seconds
  const [pomoIsActive, setPomoIsActive] = useState<boolean>(false);
  const [pomoMode, setPomoMode] = useState<'focus' | 'break'>('focus');
  const [pomoCompletedSessions, setPomoCompletedSessions] = useState<number>(0);

  // Filter practice questions based on topic, difficulty & status
  const filteredPracticeQuestions = useMemo(() => {
    return fullDatabase.filter(q => {
      if (q.topicId !== selectedTopic) return false;
      if (practiceDifficulty !== 'all' && q.difficulty !== practiceDifficulty) return false;
      
      const historyItem = answeredHistory[q.id];
      if (practiceStatusFilter === 'wrong') {
        if (!historyItem || historyItem.correct) return false;
      } else if (practiceStatusFilter === 'correct') {
        if (!historyItem || !historyItem.correct) return false;
      } else if (practiceStatusFilter === 'unanswered') {
        if (historyItem !== undefined) return false;
      }
      return true;
    });
  }, [fullDatabase, selectedTopic, practiceDifficulty, practiceStatusFilter, answeredHistory]);

  // Filter mock review questions based on user filter (all or incorrect only)
  const filteredReviewQuestions = useMemo(() => {
    const mapped = mockQuestions.map((q, originalIdx) => ({ q, originalIdx }));
    if (examReviewFilter === 'wrong') {
      return mapped.filter(item => {
        const chosen = mockAnswers[item.q.id];
        return chosen !== item.q.correctOption;
      });
    }
    return mapped;
  }, [mockQuestions, mockAnswers, examReviewFilter]);

  const activePracticeQuestion = filteredPracticeQuestions[practiceIndex];

  // Persistent background tracking for study session duration per topic
  useEffect(() => {
    if (activeTab !== 'practice' || !selectedTopic) return;
    
    const interval = setInterval(() => {
      setStudyTimes(prev => {
        const nextTime = (prev[selectedTopic] || 0) + 1;
        const updated = { ...prev, [selectedTopic]: nextTime };
        localStorage.setItem(STORAGE_STUDY_TIME_KEY, JSON.stringify(updated));
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeTab, selectedTopic]);

  // Sync state on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(STORAGE_THEME_KEY);
      if (savedTheme === "dark") {
        setIsDarkMode(true);
      }

      const savedBookmarked = localStorage.getItem(STORAGE_BOOKMARKS_KEY);
      if (savedBookmarked) setBookmarkedIds(JSON.parse(savedBookmarked));

      const savedHistory = localStorage.getItem(STORAGE_HISTORY_KEY);
      if (savedHistory) setAnsweredHistory(JSON.parse(savedHistory));

      const savedStreak = localStorage.getItem(STORAGE_STREAK_KEY);
      if (savedStreak) {
        setStreakDays(parseInt(savedStreak, 10));
      } else {
        localStorage.setItem(STORAGE_STREAK_KEY, "3");
      }

      const savedMaxStreak = localStorage.getItem(STORAGE_MAX_STREAK_KEY);
      if (savedMaxStreak) {
        setMaxStreak(parseInt(savedMaxStreak, 10));
      } else {
        localStorage.setItem(STORAGE_MAX_STREAK_KEY, "3");
      }

      const savedDates = localStorage.getItem(STORAGE_COMPLETED_DATES_KEY);
      if (savedDates) {
        setCompletedDates(JSON.parse(savedDates));
      } else {
        // Initial setup seed: study completed yesterday and the day before to match a 3-day active streak (e.g. today, yesterday and before)
        const d = new Date();
        const datesArray = [];
        for (let i = 0; i < 3; i++) {
          const tempDate = new Date();
          tempDate.setDate(d.getDate() - i);
          const y = tempDate.getFullYear();
          const m = String(tempDate.getMonth() + 1).padStart(2, '0');
          const dateD = String(tempDate.getDate()).padStart(2, '0');
          datesArray.push(`${y}-${m}-${dateD}`);
        }
        setCompletedDates(datesArray);
        localStorage.setItem(STORAGE_COMPLETED_DATES_KEY, JSON.stringify(datesArray));
      }

      const savedStudyTimes = localStorage.getItem(STORAGE_STUDY_TIME_KEY);
      if (savedStudyTimes) setStudyTimes(JSON.parse(savedStudyTimes));

      const savedMockHistory = localStorage.getItem(STORAGE_MOCK_HISTORY_KEY);
      if (savedMockHistory) setMockHistory(JSON.parse(savedMockHistory));
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Pomodoro sound effects tone generator (sine-wave synth)
  const playPomoSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(800, audioCtx.currentTime); 
      gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.15);
      
      setTimeout(() => {
        const osc2 = audioCtx.createOscillator();
        const gain2 = audioCtx.createGain();
        osc2.connect(gain2);
        gain2.connect(audioCtx.destination);
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(1000, audioCtx.currentTime);
        gain2.gain.setValueAtTime(0.2, audioCtx.currentTime);
        osc2.start();
        osc2.stop(audioCtx.currentTime + 0.2);
      }, 200);
    } catch (e) {
      console.warn("AudioContext standard warning or blocked by browser gesture", e);
    }
  };

  // Pomodoro timer ticking logic
  useEffect(() => {
    if (!pomoIsActive) return;
    
    const timer = setInterval(() => {
      setPomoTimeLeft(prev => {
        if (prev <= 1) {
          playPomoSound();
          if (pomoMode === 'focus') {
            setPomoMode('break');
            setPomoCompletedSessions(c => c + 1);
            registerStudyActivity();
            customAlert("⏰ Hết thời gian Tập trung rồi! Tuyệt vời! Bạn có 5 phút nghỉ ngơi thư giãn mắt nào.");
            return 5 * 60; // 5 mins break
          } else {
            setPomoMode('focus');
            customAlert("✏️ Thời gian Nghỉ ngơi đã hết! Bắt đầu phiên làm việc tập trung mới nhé.");
            return pomoMinutes * 60; // Reset to focus
          }
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [pomoIsActive, pomoMode, pomoMinutes]);

  // Sync pomoTimeLeft when user adjusts configuration
  const handlePomoConfigure = (mins: number) => {
    setPomoMinutes(mins);
    setPomoTimeLeft(mins * 60);
    setPomoIsActive(false);
  };

  const getTodayString = () => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const registerStudyActivity = () => {
    const todayStr = getTodayString();
    setCompletedDates(prev => {
      if (prev.includes(todayStr)) return prev;
      const next = [todayStr, ...prev];
      localStorage.setItem(STORAGE_COMPLETED_DATES_KEY, JSON.stringify(next));
      
      setStreakDays(current => {
        const nextStreak = current === 0 ? 1 : current + 1;
        localStorage.setItem(STORAGE_STREAK_KEY, nextStreak.toString());
        
        setMaxStreak(currentMax => {
          if (nextStreak > currentMax) {
            localStorage.setItem(STORAGE_MAX_STREAK_KEY, nextStreak.toString());
            return nextStreak;
          }
          return currentMax;
        });
        return nextStreak;
      });

      return next;
    });
  };

  const getWeekDates = () => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 is Sunday, 1 is Monday ... 6 is Saturday
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
    
    return Array.from({ length: 7 }).map((_, i) => {
      const day = new Date(today);
      day.setDate(today.getDate() + mondayOffset + i);
      const y = day.getFullYear();
      const m = String(day.getMonth() + 1).padStart(2, '0');
      const d = String(day.getDate()).padStart(2, '0');
      const dateStr = `${y}-${m}-${d}`;
      
      const weekdaysVietnamese = ["Hai", "Ba", "Tư", "Năm", "Sáu", "Bảy", "CN"];
      return {
        dateStr,
        label: weekdaysVietnamese[i],
        isCompleted: completedDates.includes(dateStr),
        isToday: dateStr === getTodayString()
      };
    });
  };

  // Save Bookmarks
  const toggleBookmark = (qId: string) => {
    const next = bookmarkedIds.includes(qId) 
      ? bookmarkedIds.filter(id => id !== qId) 
      : [...bookmarkedIds, qId];
    setBookmarkedIds(next);
    localStorage.setItem(STORAGE_BOOKMARKS_KEY, JSON.stringify(next));
  };

    // Record practice answer
  const handleAnswerQuestion = (q: VNUQuestion, optionIndex: number) => {
    if (chosenOption !== null) return; // limit one click
    setChosenOption(optionIndex);
    setShowExplanation(true);

    const isCorrect = optionIndex === q.correctOption;
    const updatedHistory = {
      ...answeredHistory,
      [q.id]: { correct: isCorrect, chosenOption: optionIndex }
    };
    setAnsweredHistory(updatedHistory);
    localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(updatedHistory));

    if (isCorrect) {
      registerStudyActivity();
      setTodayPracticedCount(prev => {
        const next = prev + 1;
        if (next === 3) {
          // Fire premium notice
          customAlert("🎉 Chúc mừng! Bạn đã trả lời đúng 3 câu trắc nghiệm hôm nay và hoàn thành mục tiêu ôn luyện để củng cố Streak!");
        }
        return next;
      });
    }

    // Increase streak dynamically for cool feedback
    if (isCorrect && Object.keys(answeredHistory).length % 5 === 0) {
      const nextStreak = streakDays + 1;
      setStreakDays(nextStreak);
      localStorage.setItem(STORAGE_STREAK_KEY, nextStreak.toString());
      if (nextStreak > maxStreak) {
        setMaxStreak(nextStreak);
        localStorage.setItem(STORAGE_MAX_STREAK_KEY, nextStreak.toString());
      }
    }
  };

  // Reset practice progress for a specific topic (All questions or only Incorrect ones)
  const handleResetTopicPractice = (all: boolean, targetTopicId?: number) => {
    const activeTopicId = targetTopicId || selectedTopic;
    const topicQs = fullDatabase.filter(q => q.topicId === activeTopicId);
    const qIds = topicQs.map(q => q.id);
    
    // Check if there are any answers to reset first
    const hasAnswers = qIds.some(id => answeredHistory[id] !== undefined);
    if (!hasAnswers) {
      customAlert("Bạn chưa làm bài nào trong chuyên đề này!");
      return;
    }
    
    const countWrong = qIds.filter(id => answeredHistory[id] !== undefined && !answeredHistory[id].correct).length;
    if (!all && countWrong === 0) {
      customAlert("Bạn không có câu trả lời sai nào trong chuyên đề này, chúc mừng!");
      return;
    }

    const message = all 
      ? `Bạn có chắc chắn muốn làm lại bài chuyên đề "${VNU_TOPICS[activeTopicId - 1]}"? Toàn bộ kết quả đúng và sai của bài này sẽ bị xóa và đồng hồ đếm giờ học sẽ được đặt lại.`
      : `Bạn có chắc chắn muốn học lại các câu trả lời SAI trong chuyên đề "${VNU_TOPICS[activeTopicId - 1]}"? Các câu đã trả lời ĐÚNG vẫn sẽ được giữ lại.`;

    customConfirm(message, () => {
      setAnsweredHistory(prev => {
        const next = { ...prev };
        qIds.forEach(id => {
          if (next[id] !== undefined) {
            if (all) {
              delete next[id];
            } else {
              if (!next[id].correct) {
                delete next[id];
              }
            }
          }
        });
        localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(next));
        return next;
      });
      
      // Reset the study timer for this topic if resetting all
      if (all) {
        setStudyTimes(prev => {
          const updated = { ...prev, [activeTopicId]: 0 };
          localStorage.setItem(STORAGE_STUDY_TIME_KEY, JSON.stringify(updated));
          return updated;
        });
      }
      
      // Auto transition and fully launch the interactive practice view
      setSelectedTopic(activeTopicId);
      setPracticeIndex(0);
      setChosenOption(null);
      setShowExplanation(false);
      
      // Move to practice tab
      setActiveTab('practice');
      
      // Scroll smoothly to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      customAlert(all ? "Đã đặt lại học phần và đếm thời gian từ đầu. Hãy bắt đầu ôn tập nhé!" : "Đã đặt lại các câu bị sai. Sẵn sàng ôn luyện lại!");
    });
  };

  // Reset a specific single question choice so the candidate can answer it again
  const handleRetryCurrentQuestion = (qId: string) => {
    setAnsweredHistory(prev => {
      const next = { ...prev };
      delete next[qId];
      localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(next));
      return next;
    });
    setChosenOption(null);
    setShowExplanation(false);
  };

  // Launch a new Mock Exam (Up to 40 randomized questions)
  const handleStartMockExam = () => {
    if (fullDatabase.length === 0) {
      customAlert("Hộp câu hỏi đang trống. Hãy nhấn nút [Tải Lên / Gửi Đề] ở góc trên bên phải để nạp đề thi!");
      return;
    }
    const examSize = Math.min(40, fullDatabase.length);
    const shuffled = [...fullDatabase].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, examSize);
    
    setMockQuestions(selected);
    setMockAnswers({});
    setExamSubmitted(false);
    setExamTimer(1800); // 30 minutes
    setIsTimerActive(true);
    setExamSavedResult(null);
    setActiveTab('mock_exam');
  };

  // Mock exam timer countdown
  useEffect(() => {
    let interval: any = null;
    if (isTimerActive && examTimer > 0) {
      interval = setInterval(() => {
        setExamTimer(prev => prev - 1);
      }, 1000);
    } else if (examTimer === 0 && isTimerActive) {
      // Auto submit when time runs out
      triggerSubmitMockExam();
    }
    return () => clearInterval(interval);
  }, [isTimerActive, examTimer]);

  const triggerSubmitMockExam = () => {
    setIsTimerActive(false);
    setExamSubmitted(true);

    // Calculate score
    let correctCount = 0;
    mockQuestions.forEach(q => {
      if (mockAnswers[q.id] === q.correctOption) {
        correctCount++;
      }
    });

    const finalScore = (correctCount / mockQuestions.length) * 10;
    const correctPercent = Math.round((correctCount / mockQuestions.length) * 100);
    const calculatedPassed = finalScore >= 5.0;

    const timeSpentSec = 1800 - examTimer;
    const timeMins = Math.floor(timeSpentSec / 60);
    const timeSecs = timeSpentSec % 60;
    const timeString = `${timeMins} phút ${timeSecs} giây`;

    setMockScore(finalScore);
    const newResult = {
      score: finalScore,
      passed: calculatedPassed,
      correctCount,
      wrongCount: mockQuestions.length - correctCount - (mockQuestions.length - Object.keys(mockAnswers).length),
      total: mockQuestions.length,
      timeSpent: timeString
    };
    setExamSavedResult(newResult);

    // Save mock exam to history list
    const newHistoryItem = {
      id: "mock_exam_" + Date.now(),
      timestamp: new Date().toLocaleString('vi-VN'),
      ...newResult,
      questions: mockQuestions,
      answers: mockAnswers
    };

    registerStudyActivity();
    setTodayMockSubmitted(true);

    setMockHistory(prev => {
      const nextHistory = [newHistoryItem, ...prev].slice(0, 50); // Keep last 50
      localStorage.setItem(STORAGE_MOCK_HISTORY_KEY, JSON.stringify(nextHistory));
      return nextHistory;
    });

    setActiveTab('exam_result');
  };

  // Retake all questions in current exam
  const handleRetakeAll = () => {
    setMockAnswers({});
    setExamSubmitted(false);
    setExamTimer(1800);
    setIsTimerActive(true);
    setExamSavedResult(null);
    setActiveTab('mock_exam');
  };

  // Retake only wrong questions from current exam
  const handleRetakeWrong = () => {
    // Collect questions answered wrong or skipped in mock exam
    const wrongQs = mockQuestions.filter(q => {
      const answer = mockAnswers[q.id];
      return answer === undefined || answer !== q.correctOption;
    });

    if (wrongQs.length === 0) {
      customAlert("Chúc mừng! Bạn đã hoàn thành đúng 100% đề thi! Không cần luyện lại câu sai.");
      return;
    }

    setMockQuestions(wrongQs);
    setMockAnswers({});
    setExamSubmitted(false);
    // 45 seconds per remaining wrong question
    setExamTimer(Math.max(120, wrongQs.length * 45)); 
    setIsTimerActive(true);
    setExamSavedResult(null);
    setActiveTab('mock_exam');
  };

  const formatStudyTime = (totalSeconds: number) => {
    if (!totalSeconds || totalSeconds === 0) return "0 giây";
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    
    let result = '';
    if (hrs > 0) result += `${hrs} giờ `;
    if (mins > 0 || hrs > 0) result += `${mins} phút `;
    if (secs > 0 || result === '') result += `${secs} giây`;
    return result.trim();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Statistics summaries
  const stats = useMemo(() => {
    const totalAnswered = Object.keys(answeredHistory).length;
    const correctCount = Object.values(answeredHistory).filter((item: any) => item.correct).length;
    const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
    const overallCompletion = fullDatabase.length > 0 ? Math.round((totalAnswered / fullDatabase.length) * 100) : 0;

    // Completion rate per topic
    const topicRates = [1, 2, 3, 4, 5, 6].map(tid => {
      const topicQs = fullDatabase.filter(q => q.topicId === tid);
      const topicAnsweredCount = topicQs.filter(q => answeredHistory[q.id] !== undefined).length;
      const pct = topicQs.length > 0 ? Math.round((topicAnsweredCount / topicQs.length) * 100) : 0;
      return { topicId: tid, percentage: pct };
    });

    return {
      totalAnswered,
      accuracy,
      overallCompletion,
      bookmarkedCount: bookmarkedIds.length,
      topicRates
    };
  }, [answeredHistory, bookmarkedIds]);

  // Memoized average score rate and completion stats for the Recharts charts
  const averageScores = useMemo(() => {
    return [1, 2, 3, 4, 5, 6].map(tid => {
      // 1. Practice statistics
      const topicQs = fullDatabase.filter(q => q.topicId === tid);
      const answeredInTopic = topicQs.filter(q => answeredHistory[q.id] !== undefined);
      const correctPractice = answeredInTopic.filter(q => answeredHistory[q.id]?.correct).length;
      const practiceRate = answeredInTopic.length > 0
        ? Math.round((correctPractice / answeredInTopic.length) * 100)
        : 0;

      // 2. Mock exam statistics
      let totalMockQs = 0;
      let correctMockQs = 0;
      mockHistory.forEach((h: any) => {
        if (h.questions && h.answers) {
          h.questions.forEach((q: any) => {
            if (q.topicId === tid) {
              totalMockQs++;
              const userAns = h.answers[q.id];
              if (userAns !== undefined && userAns === q.correctOption) {
                correctMockQs++;
              }
            }
          });
        }
      });
      const mockRate = totalMockQs > 0 ? Math.round((correctMockQs / totalMockQs) * 100) : 0;

      // Combined rate of correct answers: show mockRate if practiced & tested, or fallback cleanly
      const correctRatio = answeredInTopic.length > 0 || totalMockQs > 0
        ? Math.max(practiceRate, mockRate)
        : 0;

      const shortNames = [
        "Thiết bị",
        "Khai thác DL",
        "Tin văn phòng",
        "Mạng & Net",
        "Thuật toán",
        "An toàn số"
      ];

      return {
        id: tid,
        name: shortNames[tid - 1],
        "Luyện tập (%)": practiceRate,
        "Thi thử (%)": mockRate,
        "Đúng chung (%)": correctRatio
      };
    });
  }, [fullDatabase, answeredHistory, mockHistory]);

  const trendData = useMemo(() => {
    if (mockHistory.length === 0) {
      // Return a simulated demo progress path so it looks great even initially
      return [
        { name: "Khởi điểm", "Điểm thi": 4.5, "Điểm đỗ": 5.0 },
        { name: "Mục tiêu", "Điểm thi": 7.5, "Điểm đỗ": 5.0 }
      ];
    }

    // Reverse so chronologically ordered (oldest test to latest test)
    return [...mockHistory].reverse().map((h: any, idx: number) => {
      return {
        name: `Lần ${idx + 1}`,
        date: h.timestamp ? h.timestamp.split(" ")[0] : `Lần ${idx + 1}`,
        "Điểm thi": parseFloat(h.score.toFixed(1)),
        "Điểm đỗ": 5.0
      };
    });
  }, [mockHistory]);

  // Topic object visual definition
  const topicDetails = useMemo(() => {
    if (currentSubject === 'vnu1001') {
      return [
        { id: 1, name: "BÀI 1: Máy tính & Thiết bị ngoại vi", icon: BookOpen, accent: "from-blue-500 to-indigo-600", desc: "Phần cứng thô, RAM, SSD, CPU, NPU, cổng liên kết Thunderbolt và mạng LAN/WAN căn bản thiết bị." },
        { id: 2, name: "BÀI 2: Khai thác dữ liệu & Thông tin", icon: Sparkles, accent: "from-amber-500 to-orange-600", desc: "Mô hình tháp DIKW dữ liệu lớn, Metadata, tệp phi cấu trúc và phương pháp khai phá tri thức tự động." },
        { id: 3, name: "BÀI 3: Công cụ làm việc số văn phòng", icon: CheckCircle2, accent: "from-emerald-500 to-teal-600", desc: "Thành thạo ứng dụng Word, Mail Merge, hàm nâng cao Excel, biểu đồ dữ liệu và Morph PowerPoint." },
        { id: 4, name: "BÀI 4: Mạng máy tính & Internet toàn cầu", icon: Timer, accent: "from-purple-500 to-pink-600", desc: "Địa chỉ IPv4/6, DNS phân giải, Router điều phối gói tin bảo mật HTTPS và mã hóa VPN an toàn." },
        { id: 5, name: "BÀI 5: Thuật toán & Tư duy máy tính", icon: ShieldAlert, accent: "from-rose-500 to-red-600", desc: "Tư duy phân rã, nhận dạng mẫu, thuật toán tìm kiếm nhị phân Binary Search và độ phức tạp O(1)." },
        { id: 6, name: "BÀI 6: An toàn thông tin & Đạo đức số", icon: Flame, accent: "from-cyan-500 to-blue-600", desc: "Phòng vệ tấn công lừa đảo Social Engineering, Ransomware độc hại và quyền tác giả học thuật." }
      ];
    } else {
      return [
        { id: 1, name: "CHƯƠNG 1: Nhà nước pháp quyền XHCN", icon: BookOpen, accent: "from-blue-500 to-indigo-600", desc: "Bản chất giai cấp và xã hội của nhà nước, sự ra đời của nhà nước pháp quyền XHCN Việt Nam, Nghị quyết số 27-NQ/TW." },
        { id: 2, name: "CHƯƠNG 2: Bộ máy, chức năng và hình thức", icon: Sparkles, accent: "from-amber-500 to-orange-600", desc: "Cơ cấu hệ thống chính trị, Quốc hội, Chính phủ, Tòa án, Viện kiểm sát nhân dân, hình thức chính thể và cấu trúc nhà nước đơn nhất." },
        { id: 3, name: "CHƯƠNG 3: Pháp luật, vai trò và chức năng", icon: CheckCircle2, accent: "from-emerald-500 to-teal-600", desc: "Thuộc tính cơ bản, nguồn pháp luật, vai trò điều chỉnh, bảo vệ, giáo dục của pháp luật trong đời sống." },
        { id: 4, name: "CHƯƠNG 4: Quy phạm và quan hệ pháp luật", icon: Timer, accent: "from-purple-500 to-pink-600", desc: "Giả định, quy định, chế tài, năng lực pháp luật và năng lực hành vi dân sự của cá nhân, hình thức thực hiện pháp luật." },
        { id: 5, name: "CHƯƠNG 5: Ý thức, vi phạm và trách nhiệm", icon: ShieldAlert, accent: "from-rose-500 to-red-600", desc: "Mặt khách quan và chủ quan của vi phạm, lỗi cố ý và vô ý, bồi thường thiệt hại dân sự, trách nhiệm hình sự v.v." },
        { id: 6, name: "CHƯƠNG 6: Các ngành luật cơ bản ở Việt Nam", icon: Flame, accent: "from-cyan-500 to-blue-600", desc: "Luật Hiến pháp, Luật Hành chính, Luật Dân sự, Luật Hình sự, Luật Tố tụng, Luật Hôn nhân & Gia đình, Bộ luật Lao động chuẩn chỉnh." }
      ];
    }
  }, [currentSubject]);

  return (
    <div className={`w-full h-full flex flex-col bg-slate-100 text-slate-800 font-sans transition-all duration-300 ${isDarkMode ? 'vnu-dark-theme' : ''}`} id="vnu-portal-root">
      
      {/* HEADER BANNER */}
      <header className="h-16 bg-slate-900 px-4 sm:px-8 flex items-center justify-between shrink-0 text-white shadow-md border-b border-slate-800 z-10 animate-fade-in print:hidden" id="vnu-header">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="p-1 px-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-black text-xs sm:text-sm tracking-tight shadow-md shadow-blue-500/30 shrink-0">
            {currentSubject === 'vnu1001' ? "VNU1001" : "PLDC"}
          </div>
          <div className="truncate hidden md:block">
            <h1 className="text-xs sm:text-sm font-black tracking-wide uppercase text-white leading-none truncate">
              {currentSubject === 'vnu1001' ? "Cổng Ôn Thi Trắc Nghiệm Kỹ Năng Số" : "Cổng Ôn Thi Pháp Luật Đại Cương"}
            </h1>
            <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold truncate mt-1">
              {fullDatabase.length > 200 
                ? `${currentSubject === 'vnu1001' ? "Giáo trình 600 câu chuẩn" : "Giáo trình trắc nghiệm pháp luật tối ưu"}`
                : `Đang ôn luyện đề thi tự nạp của riêng bạn (${fullDatabase.length} câu)`}
            </p>
          </div>

          {/* SUBJECT DROPDOWN SELECTOR */}
          <div className="flex items-center gap-1 bg-slate-800 border border-slate-700 rounded-xl px-1.5 py-0.5 print:hidden">
            <span className="hidden sm:inline pl-1 text-[9px] uppercase font-black tracking-wider text-slate-400">Phần học:</span>
            <select
              value={currentSubject}
              onChange={(e) => handleSwitchSubject(e.target.value as 'vnu1001' | 'pldc')}
              className="bg-transparent text-slate-200 text-xs font-black py-1.5 px-1 outline-none cursor-pointer focus:ring-0 transition"
            >
              <option value="vnu1001" className="bg-slate-900 text-white font-bold">💻 Kỹ Năng Số (VNU1001)</option>
              <option value="pldc" className="bg-slate-900 text-white font-bold">⚖️ Pháp Luật Đại Cương</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* THEME TOGGLE BUTTON */}
          <button
            onClick={() => {
              const nextMode = !isDarkMode;
              setIsDarkMode(nextMode);
              localStorage.setItem(STORAGE_THEME_KEY, nextMode ? "dark" : "light");
            }}
            className="flex items-center justify-center p-2 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 hover:border-slate-600 transition cursor-pointer text-slate-200"
            title={isDarkMode ? "Chuyển sang Chế độ Sáng" : "Chuyển sang Chế độ Tối (Ôn đêm)"}
          >
            {isDarkMode ? (
              <div className="flex items-center gap-1.5 px-0.5">
                <Sun className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="text-[9.5px] font-extrabold uppercase text-amber-400 hidden lg:inline">Chế độ Học Đêm</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-0.5">
                <Moon className="w-3.5 h-3.5 text-slate-300 fill-slate-350" />
                <span className="text-[9.5px] font-extrabold uppercase text-slate-300 hidden lg:inline">Học Đêm (Tối)</span>
              </div>
            )}
          </button>

          <div className="flex items-center gap-1 text-xs bg-slate-800 border border-slate-700 px-2 sm:px-3 py-1.5 rounded-xl select-none" title="Chuỗi ngày học liên tục">
            <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500 fill-orange-500 animate-pulse" />
            <span className="font-bold text-orange-400 text-[11px] sm:text-xs">Streak: {streakDays}d</span>
          </div>

          {activeTab !== 'dashboard' && (
            <button
              onClick={() => {
                if (activeTab === 'mock_exam' && !examSubmitted) {
                  customConfirm(
                    "Bạn có chắc chắn muốn thoát khỏi phòng thi? Kết quả thi thử hiện tại sẽ không được ghi nhận!",
                    () => setActiveTab('dashboard'),
                    "Thoát phòng thi"
                  );
                } else {
                  setActiveTab('dashboard');
                }
              }}
              className="flex items-center gap-1 bg-slate-800 hover:bg-slate-755 text-slate-200 border border-slate-700 text-xs font-bold py-2 px-3 rounded-xl transition cursor-pointer select-none"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Trở Về Bảng Học</span>
            </button>
          )}

          <button
            onClick={() => {
              if (activeTab === 'mock_exam' && !examSubmitted) {
                customConfirm(
                  "Bạn có chắc chắn muốn thoát khỏi phòng thi? Kết quả thi thử hiện tại sẽ không được ghi nhận!",
                  () => setActiveTab(activeTab === 'importer' ? 'dashboard' : 'importer'),
                  "Thoát phòng thi"
                );
              } else {
                setActiveTab(activeTab === 'importer' ? 'dashboard' : 'importer');
              }
            }}
            className={`flex items-center gap-1.5 text-xs font-extrabold py-2 px-3 sm:px-4 rounded-xl transition cursor-pointer select-none shadow-md ${
              activeTab === 'importer'
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/10'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/15'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>{activeTab === 'importer' ? "Xem Bảng Học" : "Tải Lên / Gửi Đề"}</span>
          </button>
        </div>
      </header>

      {/* CORE WORKSPACE */}
      <div className="flex-1 overflow-y-auto p-8 max-w-7xl w-full mx-auto print:hidden">
        
        <AnimatePresence mode="wait">
          
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              {/* STATS BENTO GRID */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-black block">Tiến trình chung</span>
                    <h3 className="text-2xl font-black text-slate-900">{stats.totalAnswered} / {fullDatabase.length} câu</h3>
                    <p className="text-[11px] text-slate-500 font-bold">Hoàn thành {stats.overallCompletion}% ngân hàng</p>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 font-extrabold text-sm border border-blue-100">
                    {stats.overallCompletion}%
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-black block">Tỷ lệ chính xác</span>
                    <h3 className="text-2xl font-black text-emerald-600">{stats.accuracy}%</h3>
                    <p className="text-[11px] text-slate-500 font-bold">Duy trì độ chuẩn xác Đ/S</p>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-black block">Đã ghi nhớ đánh dấu</span>
                    <h3 className="text-2xl font-black text-indigo-650">{stats.bookmarkedCount} câu hỏi</h3>
                    <p className="text-[11px] text-slate-500 font-bold">Xem lại nhanh vùng lý thuyết khó</p>
                  </div>
                  <button 
                    onClick={() => {
                      if (stats.bookmarkedCount > 0) setActiveTab('bookmarks');
                    }}
                    className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 hover:scale-105 active:scale-95 transition cursor-pointer border border-indigo-100"
                  >
                    <BookMarked className="w-7 h-7" />
                  </button>
                </div>

                <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-6 rounded-3xl text-white shadow-xl flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[9px] bg-blue-600 text-white font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider w-fit block mb-1">Thi thử mock</span>
                    <h4 className="text-sm font-extrabold">{fullDatabase === getFullVNU1001Database() ? (currentSubject === 'vnu1001' ? "Đề Chuẩn VNU1001" : "Đề Chuẩn Pháp Luật ĐC") : "Đề Nhập Tự Do"}</h4>
                    <p className="text-[10px] text-slate-400 font-semibold">{Math.min(40, fullDatabase.length)} câu hỏi tích hợp random, 30 phút</p>
                  </div>
                  <button
                    onClick={handleStartMockExam}
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-black py-2.5 rounded-2xl transition duration-150 flex items-center justify-center gap-1.5 shadow-lg shadow-blue-500/20 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" /> BẮT ĐẦU THI THỬ
                  </button>
                </div>
              </div>

              {/* EXPORT AND REPORT CENTER */}
              <div className="bg-gradient-to-r from-blue-700 via-indigo-750 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-center gap-6 border border-indigo-500/20 print:hidden">
                <div className="space-y-2 text-center md:text-left flex-1">
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <span className="text-[9px] bg-indigo-500 text-white font-extrabold px-3 py-1 rounded-md tracking-wider uppercase border border-indigo-400/30">Học bạ điện tử</span>
                    <span className="text-[9px] bg-emerald-600 text-white font-extrabold px-3 py-1 rounded-md tracking-wider uppercase border border-emerald-500/30">CSV + PDF</span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-black text-white m-0">Xuất Học Bạ Số & Chứng Chỉ Luyện Đề</h4>
                  <p className="text-xs text-slate-350 max-w-2xl font-semibold leading-relaxed m-0">
                    Bạn muốn lưu trữ kỷ cương tự học? Hãy tải ngay bảng dữ liệu thống kê trực quan CSV để lưu vào Excel, hoặc bốc trích trực tiếp học bạ điện tử kèm chứng chỉ sư phạm PDF chính chủ hoàn toàn miễn phí.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                  <button
                    onClick={handleExportCSV}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white text-xs font-black py-3.5 px-6 rounded-2xl border border-white/10 select-none cursor-pointer hover:border-slate-400 transition"
                  >
                    <Download className="w-4 h-4 text-emerald-400" /> Tải Báo Cáo CSV (Excel)
                  </button>
                  
                  <button
                    onClick={() => {
                      setIsExportModalOpen(true);
                    }}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-black py-3.5 px-6 rounded-2xl transition shadow-lg shadow-orange-500/20 select-none cursor-pointer"
                  >
                    <Award className="w-4 h-4 text-white" /> In Học Bạ & Chứng Chỉ PDF
                  </button>
                </div>
              </div>

              {/* ADVANCED STATISTICS & HISTORIES */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                      <Award className="w-5 h-5 text-indigo-600" /> Bảng Thống Kê & Lịch Sử Thi VNU1001
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">Theo dõi hiệu suất làm đề thi ngẫu nhiên và thời gian tập trung ôn luyện thực tế</p>
                  </div>
                  
                  {mockHistory.length > 0 && (
                    <button
                      onClick={() => {
                        customConfirm(
                          "Bạn có muốn xóa toàn bộ lịch sử thi thử để đặt lại bảng thống kê?",
                          () => {
                            setMockHistory([]);
                            localStorage.removeItem(STORAGE_MOCK_HISTORY_KEY);
                            customAlert("Đã dọn sạch toàn bộ bộ nhớ lịch sử thi thử!");
                          },
                          "Dọn sạch lịch sử thi"
                        );
                      }}
                      className="text-[10px] uppercase tracking-wider font-extrabold text-red-500 bg-red-50 border border-red-200/50 px-3.5 py-1.5 rounded-xl hover:bg-red-100 transition duration-150 cursor-pointer"
                    >
                      Dọn sạch lịch sử thi
                    </button>
                  )}
                </div>

                {/* ADVANCED RECHARTS VISUAL DASHBOARD */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-50/50 p-5 rounded-3xl border border-slate-100/70">
                  {/* Chart 1: Average correct rates per module bar chart */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-205 shadow-sm space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className="text-[12px] font-black text-slate-800 uppercase tracking-tight">Tỷ Lệ Trả Lời Đúng Theo Chuyên Đề</h4>
                        <p className="text-[10px] text-slate-400 font-bold block mt-0.5">Sự chuẩn xác tổng hợp giữa Luyện tập và Thi thử (%)</p>
                      </div>
                      <span className="text-[9px] uppercase font-black px-2.5 py-1 rounded bg-indigo-50 text-indigo-700 whitespace-nowrap">6 Chuyên đề</span>
                    </div>
                    
                    <div className="h-56 w-full text-[10px] font-semibold select-none">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={averageScores} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#1e293b" : "#f1f5f9"} vertical={false} />
                          <XAxis 
                            dataKey="name" 
                            tick={{ fill: isDarkMode ? "#cbd5e1" : "#475569", fontSize: 8.5, fontWeight: 700 }} 
                            axisLine={false} 
                            tickLine={false} 
                          />
                          <YAxis 
                            domain={[0, 100]} 
                            tick={{ fill: isDarkMode ? "#94a3b8" : "#64748b", fontSize: 8.5 }} 
                            axisLine={false} 
                            tickLine={false} 
                          />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: isDarkMode ? '#1e293b' : '#0f172a', 
                              borderRadius: '12px', 
                              border: isDarkMode ? '1px solid #334155' : 'none', 
                              color: '#fff', 
                              fontSize: '10px',
                              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                            }}
                            itemStyle={{ color: '#fff', padding: '1px 0' }}
                            cursor={{ fill: isDarkMode ? 'rgba(255, 255, 255, 0.02)' : 'rgba(99, 102, 241, 0.04)' }}
                          />
                          <Legend 
                            verticalAlign="top" 
                            height={24} 
                            iconType="circle" 
                            iconSize={6}
                            wrapperStyle={{ fontSize: '9px', fontWeight: 'bold', color: isDarkMode ? '#cbd5e1' : '#64748b', paddingBottom: '10px' }} 
                          />
                          <Bar 
                            dataKey="Luyện tập (%)" 
                            fill="#6366f1" 
                            radius={[4, 4, 0, 0]} 
                            maxBarSize={16} 
                            name="Học luyện tập" 
                          />
                          <Bar 
                            dataKey="Thi thử (%)" 
                            fill="#22c55e" 
                            radius={[4, 4, 0, 0]} 
                            maxBarSize={16} 
                            name="Phần thi thử" 
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Chart 2: Improvement trend over chronological attempts */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-205 shadow-sm space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className="text-[12px] font-black text-slate-800 uppercase tracking-tight">Xu Hướng Cải Thiện Điểm Số</h4>
                        <p className="text-[10px] text-slate-400 font-bold block mt-0.5">
                          {mockHistory.length > 0 
                            ? `Sự tiến bộ phản ánh qua ${mockHistory.length} lần thi gần đây` 
                            : "Lộ trình thi thử mô phỏng (Hãy thi để lưu kết quả thật)"}
                        </p>
                      </div>
                      <span className="text-[9px] uppercase font-black px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 whitespace-nowrap">Chuẩn đạt &ge; 5.0</span>
                    </div>

                    <div className="h-56 w-full text-[10px] font-semibold select-none">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trendData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#1e293b" : "#f1f5f9"} vertical={false} />
                          <XAxis 
                            dataKey="name" 
                            tick={{ fill: isDarkMode ? "#cbd5e1" : "#475569", fontSize: 8.5, fontWeight: 700 }} 
                            axisLine={false} 
                            tickLine={false} 
                          />
                          <YAxis 
                            domain={[0, 10]} 
                            ticks={[0, 2, 4, 5, 6, 8, 10]}
                            tick={{ fill: isDarkMode ? "#94a3b8" : "#64748b", fontSize: 8.5 }} 
                            axisLine={false} 
                            tickLine={false} 
                          />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: isDarkMode ? '#1e293b' : '#0f172a', 
                              borderRadius: '12px', 
                              border: isDarkMode ? '1px solid #334155' : 'none', 
                              color: '#fff', 
                              fontSize: '10px',
                              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                            }}
                            itemStyle={{ color: '#fff', padding: '1px 0' }}
                          />
                          <Legend 
                            verticalAlign="top" 
                            height={24} 
                            iconType="circle" 
                            iconSize={6}
                            wrapperStyle={{ fontSize: '9px', fontWeight: 'bold', color: isDarkMode ? '#cbd5e1' : '#64748b', paddingBottom: '10px' }} 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="Điểm thi" 
                            stroke="#3b82f6" 
                            strokeWidth={3} 
                            dot={{ r: 4.5, fill: '#3b82f6', strokeWidth: 0 }} 
                            activeDot={{ r: 6 }} 
                            name="Điểm đạt được (đ)" 
                          />
                          <Line 
                            type="step" 
                            dataKey="Điểm đỗ" 
                            stroke="#f43f5e" 
                            strokeDasharray="5 5" 
                            strokeWidth={1.5} 
                            dot={false} 
                            name="Ngưỡng đạt (5.0đ)" 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Grid layout for stats analysis + lists */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Column: Stats Cards Summary */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
                      <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block">Thống kê hiệu năng</span>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-xl border border-slate-105 shadow-sm text-center">
                          <span className="text-[9px] text-slate-400 font-black uppercase block">Điểm thi thử TB</span>
                          <span className="text-xl font-extrabold text-indigo-600 block">
                            {mockHistory.length > 0 
                              ? (mockHistory.reduce((sum: number, h: any) => sum + h.score, 0) / mockHistory.length).toFixed(1) + "/10"
                              : "Chưa thi"
                            }
                          </span>
                        </div>
                        
                        <div className="bg-white p-4 rounded-xl border border-slate-105 shadow-sm text-center">
                          <span className="text-[9px] text-slate-400 font-black uppercase block">Tỷ lệ Đỗ Mock</span>
                          <span className="text-xl font-extrabold text-emerald-600 block">
                            {mockHistory.length > 0
                              ? Math.round((mockHistory.filter((h: any) => h.passed).length / mockHistory.length) * 100) + "%"
                              : "0%"
                            }
                          </span>
                        </div>
                      </div>

                      {/* Cumulative Study hours summary */}
                      <div className="bg-white p-4 rounded-xl border border-slate-105 shadow-sm space-y-2">
                        <div className="flex justify-between items-center text-[10px] text-slate-400 font-black uppercase">
                          <span>Tổng thời học thực tế:</span>
                          <span className="text-indigo-600 font-extrabold font-mono text-[11px]">
                            {formatStudyTime((Object.values(studyTimes) as number[]).reduce((sum: number, t: number) => sum + t, 0))}
                          </span>
                        </div>
                        
                        {/* Progress distributions */}
                        <div className="space-y-2 pt-2 border-t border-slate-50">
                          <span className="text-[9.5px] text-slate-400 font-black uppercase tracking-wider block">Thời gian theo chuyên đề:</span>
                          {topicDetails.map(topic => {
                            const timeVal = studyTimes[topic.id] || 0;
                            const totalTime = (Object.values(studyTimes) as number[]).reduce((sum: number, t: number) => sum + t, 0) || 1;
                            const percent = Math.round((timeVal / totalTime) * 100);
                            
                            return (
                              <div key={topic.id} className="space-y-0.5 text-[10px] font-bold text-slate-650">
                                <div className="flex justify-between items-center">
                                  <span>Chuyên đề {topic.id}</span>
                                  <span className="font-mono text-slate-500 font-semibold">{formatStudyTime(timeVal)} ({percent}%)</span>
                                </div>
                                <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-indigo-600 rounded-full" 
                                    style={{ width: `${percent}%` }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: List of mock exam attempts */}
                  <div className="lg:col-span-7 space-y-4">
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block">Lịch sử 5 lần làm đề thi gần nhất</span>
                    
                    {mockHistory.length === 0 ? (
                      <div className="h-48 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center p-6 text-center space-y-2 select-none">
                        <Clock className="w-8 h-8 text-slate-350" />
                        <h5 className="text-[11px] font-extrabold text-slate-500">Chưa có bài thi thử nào được ghi nhận</h5>
                        <p className="text-[10px] text-slate-450 leading-relaxed max-w-xs font-medium">Bấm "BẮT ĐẦU THI THỬ" ở góc trên bên phải để làm đề và lưu thành tích học của bạn.</p>
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-76 overflow-y-auto pr-1">
                        {mockHistory.slice(0, 5).map((historyItem, hiIdx) => (
                          <div 
                            key={historyItem.id || hiIdx} 
                            className="bg-white rounded-xl border border-slate-200 p-3.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 hover:border-indigo-400 transition shadow-sm text-xs"
                          >
                            <div className="space-y-1 text-left">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                                  historyItem.passed ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                                }`}>
                                  {historyItem.passed ? 'ĐẠT' : 'CHƯA ĐẠT'}
                                </span>
                                <span className="text-[11px] font-extrabold text-slate-800">Ngày thi: {historyItem.timestamp}</span>
                              </div>
                              <p className="text-[11px] text-slate-500 font-semibold">
                                Làm đúng <span className="text-slate-800 font-black">{historyItem.correctCount}/{historyItem.total} câu</span> trong <span className="text-slate-800 font-black">{historyItem.timeSpent}</span>
                              </p>
                            </div>

                            <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0 justify-between sm:justify-start">
                              <div className="text-right select-none pr-1">
                                <span className="text-[9px] text-slate-400 block font-bold leading-none">CÁ NHÂN</span>
                                <span className="text-sm font-black text-slate-900">{historyItem.score.toFixed(1)}/10đ</span>
                              </div>
                              
                              <button
                                onClick={() => {
                                  setMockQuestions(historyItem.questions || []);
                                  setMockAnswers(historyItem.answers || {});
                                  setExamSubmitted(true);
                                  setExamSavedResult({
                                    score: historyItem.score,
                                    passed: historyItem.passed,
                                    correctCount: historyItem.correctCount,
                                    wrongCount: historyItem.wrongCount ?? 0,
                                    total: historyItem.total ?? 40,
                                    timeSpent: historyItem.timeSpent ?? "Không rõ"
                                  });
                                  setActiveTab('exam_result');
                                }}
                                className="bg-indigo-55 hover:bg-indigo-100 text-indigo-700 text-[10px] font-extrabold py-1.5 px-3 rounded-lg transition shrink-0 cursor-pointer"
                              >
                                Xem lại bài thi
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* LIST OF LESSONS / TOPICS */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Giáo trình 6 bài ôn tập cơ bản</h3>
                    <p className="text-xs text-slate-500 font-medium">Bấm lựa chọn chuyên đề phù hợp để học sâu chi tiết 100 câu trắc nghiệm chuyên biệt</p>
                  </div>
                  
                  {stats.bookmarkedCount > 0 && (
                    <button 
                      type="button"
                      onClick={() => setActiveTab('bookmarks')}
                      className="text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-200/50 px-4 py-2 rounded-2xl hover:bg-indigo-100 transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <BookMarked className="w-4 h-4" /> Xem lại {stats.bookmarkedCount} câu đã lưu
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {topicDetails.map(topic => {
                    const topicQs = fullDatabase.filter(q => q.topicId === topic.id);
                    const topicAnsweredCount = topicQs.filter(q => answeredHistory[q.id] !== undefined).length;
                    const progressVal = topicQs.length > 0 ? Math.round((topicAnsweredCount / topicQs.length) * 100) : 0;
                    
                    return (
                      <div 
                        key={topic.id}
                        className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-blue-400 transition duration-200 flex flex-col justify-between space-y-5 shadow-[0_2px_12px_rgba(0,0,0,0.005)]"
                      >
                        <div className="flex gap-4 items-start">
                          <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${topic.accent} text-white`}>
                            <topic.icon className="w-6 h-6" />
                          </div>
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block leading-none">Bài ôn luyện {topic.id}</span>
                            <h4 className="text-base font-black text-slate-900 leading-snug">{topic.name}</h4>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed">{topic.desc}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2 pt-3 border-t border-slate-100">
                          <div className="flex justify-between text-xs font-bold">
                            <span className="text-slate-500 font-medium">Tiến độ cọ xát câu hỏi:</span>
                            <span className="text-blue-600">{topicAnsweredCount} / {topicQs.length} câu ({progressVal}%)</span>
                          </div>
                          
                          <div className="relative w-full h-2 bg-slate-150 rounded-full overflow-hidden">
                            <div 
                              className="absolute top-0 left-0 h-full bg-blue-600 rounded-full transition-all duration-300"
                              style={{ width: `${progressVal}%` }}
                            />
                          </div>

                          <div className="flex justify-between items-center pt-2 text-xs font-bold border-t border-slate-50">
                            <span className="text-slate-500 font-medium flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                              Thời gian đã tích lũy:
                            </span>
                            <span className="text-indigo-600 font-mono text-[11px] font-black">{formatStudyTime(studyTimes[topic.id] || 0)}</span>
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100">
                            {topicAnsweredCount > 0 ? (
                              <div className="flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleResetTopicPractice(true, topic.id);
                                  }}
                                  className="p-2.5 bg-slate-50 hover:bg-slate-150 text-slate-700 hover:text-red-600 rounded-xl transition cursor-pointer flex items-center justify-center border border-slate-200/50"
                                  title="Đặt lại/Làm lại từ đầu bài học này"
                                >
                                  <RotateCcw className="w-3.5 h-3.5" />
                                </button>
                                
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleResetTopicPractice(false, topic.id);
                                  }}
                                  className="p-2.5 bg-amber-50 hover:bg-amber-100 text-amber-700 hover:text-amber-800 rounded-xl transition cursor-pointer flex items-center justify-center border border-amber-200/40"
                                  title="Đặt lại câu sai / Học lại câu sai để khắc phục lỗ hổng"
                                >
                                  <AlertCircle className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <div />
                            )}

                            <button
                              onClick={() => {
                                setSelectedTopic(topic.id);
                                setPracticeIndex(0);
                                setChosenOption(null);
                                setShowExplanation(false);
                                setPracticeDifficulty('all');
                                setActiveTab('practice');
                              }}
                              className="bg-slate-900 hover:bg-slate-950 text-white text-xs font-bold px-4 py-2.5 rounded-2xl transition flex items-center gap-1.5 cursor-pointer shadow-md select-none"
                            >
                              Vào học ngay <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: INTERACTIVE PRACTICE COMPONENT */}
          {activeTab === 'practice' && (
            <motion.div
              key="practice"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Left Column: List navigation / filters */}
              <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-6 space-y-6 shadow-sm">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="text-xs font-bold text-slate-500 hover:text-slate-900 transition flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Quay lại bảng tổng quan
                </button>

                <div className="space-y-1.5 pb-4 border-b border-slate-100">
                  <span className="text-[10px] bg-blue-50 text-blue-600 font-extrabold px-2.5 py-1 rounded-md block w-fit uppercase">VỊ TRÍ ÔN TẬP</span>
                  <h3 className="text-sm font-black text-slate-900 leading-snug">{VNU_TOPICS[selectedTopic - 1]}</h3>
                </div>

                {/* PRACTICE RE-LEARN AND RESET CONTROLS */}
                <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-200/60 space-y-2.5">
                  <div className="flex items-center gap-1.5 text-[9px] uppercase font-black tracking-widest text-slate-450 select-none">
                    <RefreshCw className="w-3 h-3 text-indigo-500 animate-spin" style={{ animationDuration: '6s' }} /> Tùy chọn làm lại
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      disabled={!activePracticeQuestion || (answeredHistory[activePracticeQuestion.id] === undefined && chosenOption === null)}
                      onClick={() => {
                        if (activePracticeQuestion) {
                          handleRetryCurrentQuestion(activePracticeQuestion.id);
                        }
                      }}
                      className={`text-[10px] font-black py-2.5 px-1 rounded-xl transition flex items-center justify-center gap-1 cursor-pointer select-none border border-transparent shadow-sm ${
                        activePracticeQuestion && (answeredHistory[activePracticeQuestion.id] !== undefined || chosenOption !== null)
                          ? "bg-indigo-600 hover:bg-indigo-750 text-white cursor-pointer hover:shadow-indigo-600/10"
                          : "bg-slate-200 text-slate-400 cursor-not-allowed opacity-70"
                      }`}
                      title={activePracticeQuestion ? "Đặt lại và chọn lại đáp án cho câu hỏi này" : "Hãy chọn đáp án trước khi làm lại"}
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Làm lại câu này
                    </button>
                    
                    <button
                      onClick={() => handleResetTopicPractice(false)}
                      className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-[10px] font-black py-2.5 px-0.5 rounded-xl transition flex items-center justify-center gap-1 cursor-pointer select-none shadow-sm shadow-orange-550/10"
                      title="Chỉ xóa câu trả lời SAI để làm lại, giữ nguyên câu đúng"
                    >
                      <AlertCircle className="w-3.5 h-3.5 text-white" /> Học lại câu sai
                    </button>
                  </div>

                  {/* Red/Danger link to reset the entire chapter with clear warning */}
                  <div className="pt-2 border-t border-slate-200/50 flex justify-center">
                    <button
                      onClick={() => handleResetTopicPractice(true)}
                      className="text-[9.5px] font-extrabold text-red-600 hover:text-red-700 hover:underline transition cursor-pointer flex items-center gap-1 bg-transparent border-none outline-none"
                      title="Chỉ sử dụng khi bạn thực sự muốn xóa hết tất cả kết quả bài ôn của chuyên đề hiện tại"
                    >
                      <Trash2 className="w-3 h-3" /> Đặt lại cả chương
                    </button>
                  </div>
                </div>

                {/* Question selector sidebar scroll list */}
                <div className="space-y-3">
                  <div className="flex flex-col gap-2 bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
                    <div className="flex items-center justify-between text-[11px] font-black text-slate-500 uppercase tracking-wider">
                      <span>Bộ lọc chuyên đề</span>
                      <Filter className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[9px] text-slate-450 font-extrabold uppercase block select-none">Mức độ</label>
                        <select 
                          value={practiceDifficulty}
                          onChange={(e) => {
                            setPracticeDifficulty(e.target.value);
                            setPracticeIndex(0);
                            setChosenOption(null);
                            setShowExplanation(false);
                          }}
                          className="w-full text-[10px] font-extrabold text-slate-700 bg-white border border-slate-200 rounded-xl py-1 px-1.5 cursor-pointer outline-none focus:border-indigo-500 transition"
                        >
                          <option value="all">Tất cả</option>
                          <option value="nhan_biet">Nhận biết</option>
                          <option value="thong_hieu">Thông hiểu</option>
                          <option value="van_dung">Vận dụng</option>
                          <option value="van_dung_cao">Vận dụng cao</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] text-slate-450 font-extrabold uppercase block select-none">Trạng thái</label>
                        <select 
                          value={practiceStatusFilter}
                          onChange={(e) => {
                            setPracticeStatusFilter(e.target.value);
                            setPracticeIndex(0);
                            setChosenOption(null);
                            setShowExplanation(false);
                          }}
                          className="w-full text-[10px] font-extrabold text-slate-700 bg-white border border-slate-200 rounded-xl py-1 px-1.5 cursor-pointer outline-none focus:border-indigo-500 transition"
                        >
                          <option value="all">Tất cả</option>
                          <option value="wrong">⚠️ Câu làm SAI</option>
                          <option value="correct">✅ Câu làm ĐÚNG</option>
                          <option value="unanswered">📝 Chưa làm</option>
                        </select>
                      </div>
                    </div>

                    <div className="text-[10px] font-black text-slate-500 flex justify-between items-center pt-1 border-t border-slate-200/40">
                      <span>DANH SÁCH:</span>
                      <span className="text-indigo-600 font-mono font-bold bg-indigo-50 px-1.5 py-0.5 rounded-md">{filteredPracticeQuestions.length} CÂU</span>
                    </div>
                  </div>

                  {filteredPracticeQuestions.length === 0 ? (
                    <div className="py-12 text-center text-xs text-slate-400 font-semibold bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                      Chưa tìm thấy câu hỏi thuộc mức độ lọc này!
                    </div>
                  ) : (
                    <div className="grid grid-cols-5 gap-2 max-h-72 overflow-y-auto pr-1">
                      {filteredPracticeQuestions.map((q, idx) => {
                        const historyItem = answeredHistory[q.id];
                        const isCurrent = idx === practiceIndex;
                        let bgStyle = "bg-slate-50 text-slate-550 hover:bg-slate-100";

                        if (isCurrent) {
                          bgStyle = "bg-blue-600 text-white scale-105 border border-blue-500 font-black shadow";
                        } else if (historyItem) {
                          bgStyle = historyItem.correct 
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-150" 
                            : "bg-red-50 text-red-700 border border-red-150";
                        }

                        let difTag = "";
                        if (q.difficulty === 'nhan_biet') difTag = "NB";
                        if (q.difficulty === 'thong_hieu') difTag = "TH";
                        if (q.difficulty === 'van_dung') difTag = "VD";
                        if (q.difficulty === 'van_dung_cao') difTag = "VDC";

                        return (
                          <button
                            key={q.id}
                            onClick={() => {
                              setPracticeIndex(idx);
                              setChosenOption(null);
                              setShowExplanation(false);
                            }}
                            className={`h-11 rounded-xl text-[10px] font-mono font-bold flex flex-col justify-center items-center cursor-pointer transition-all duration-150 ${bgStyle}`}
                            title={`Mức độ: ${difTag}`}
                          >
                            <span>#{idx + 1}</span>
                            <span className="text-[7.5px] scale-90 tracking-tighter opacity-80 font-bold block">{difTag}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* DAILY STUDY STREAK TRACKER */}
                <div className="pt-5 border-t border-slate-100 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] bg-orange-50 text-orange-750 font-black px-2.5 py-1 rounded-md uppercase tracking-wider flex items-center gap-1.5 border border-orange-200/40">
                      <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500 animate-pulse" /> THEO DÕI STREAK HÀNG NGÀY
                    </span>
                    {streakDays >= 7 ? (
                      <span className="text-[9px] bg-yellow-100 text-yellow-800 font-extrabold px-1.5 py-0.5 rounded flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5 animate-spin" /> Kim Cương
                      </span>
                    ) : (
                      <span className="text-[9px] bg-indigo-50 text-indigo-700 font-black px-1.5 py-0.5 rounded uppercase">Mục Tiêu Tuần</span>
                    )}
                  </div>

                  <div className="bg-gradient-to-br from-slate-50 to-orange-50/20 p-4.5 rounded-2xl border border-slate-200/85 relative overflow-hidden group">
                    {/* Visual background flame glow effect */}
                    <div className="absolute right-0 bottom-0 select-none pointer-events-none opacity-[0.03] scale-150 translate-x-14 translate-y-8 text-orange-500">
                      <Flame className="w-28 h-28 fill-orange-500" />
                    </div>

                    <div className="flex items-center justify-between z-10 relative">
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Chuỗi ngày hiện tại</span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-3xl font-black text-slate-900 leading-none font-mono tracking-tight">{streakDays}</span>
                          <span className="text-xs font-bold text-slate-505">ngày</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <span className="text-[8.5px] text-slate-400 font-black uppercase block leading-none">KỶ LỤC CỦA BẠN</span>
                        <span className="text-xs font-black text-indigo-650 font-mono flex items-center justify-end gap-1 mt-1">
                          <MedalIcon className="w-3.5 h-3.5 text-indigo-600" /> {maxStreak} ngày
                        </span>
                      </div>
                    </div>

                    {/* Weekly active calendar bubbles row */}
                    <div className="mt-4 pt-3.5 border-t border-slate-200/50">
                      <span className="text-[9px] text-slate-400 font-black uppercase block tracking-wider mb-2 text-center">
                        Lịch ôn tuần (T2 - CN)
                      </span>
                      <div className="grid grid-cols-7 gap-1">
                        {getWeekDates().map((dayOpt, idx) => (
                          <div key={idx} className="flex flex-col items-center gap-1">
                            <span className={`text-[8.5px] font-black ${dayOpt.isToday ? 'text-indigo-600' : 'text-slate-400'}`}>
                              {dayOpt.label}
                            </span>
                            <div 
                              className={`w-7 h-7 rounded-sm flex items-center justify-center text-xs font-black transition-all ${
                                dayOpt.isCompleted
                                  ? 'bg-gradient-to-br from-orange-400 to-red-500 text-white shadow-sm shadow-orange-500/20'
                                  : dayOpt.isToday
                                    ? 'border-2 border-dashed border-indigo-500 bg-white text-indigo-500 animate-pulse'
                                    : 'bg-slate-100 text-slate-400 border border-slate-200/50'
                              }`}
                              title={dayOpt.isCompleted ? `Đã học hôm ${dayOpt.dateStr}` : `Chưa học hôm ${dayOpt.dateStr}`}
                            >
                              {dayOpt.isCompleted ? (
                                <Flame className="w-3.5 h-3.5 fill-white text-white" />
                              ) : (
                                <span className="text-[9px] font-bold font-mono">
                                  {dayOpt.dateStr.split('-')[2]}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Daily Quest checklist to maintain streak */}
                    <div className="mt-4 pt-3.5 border-t border-slate-200/50 space-y-2">
                      <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider block">
                        Nhiệm vụ hôm nay duy trì:
                      </span>
                      
                      <div className="space-y-1.5 text-[10.5px] font-bold text-slate-600">
                        {/* Goal 1: Log in */}
                        <div className="flex items-center justify-between bg-white px-2.5 py-1.5 rounded-xl border border-slate-100">
                          <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            Đăng nhập cổng VNU1001
                          </span>
                          <span className="text-[9.5px] font-black text-emerald-600 uppercase">Đạt 110%</span>
                        </div>

                        {/* Goal 2: Practice count answers */}
                        <div className="flex items-center justify-between bg-white px-2.5 py-1.5 rounded-xl border border-slate-100">
                          <span className="flex items-center gap-1.5">
                            <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 border ${
                              todayPracticedCount >= 3 ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300'
                            }`}>
                              {todayPracticedCount >= 3 && <Check className="w-2 h-2 text-white" />}
                            </span>
                            Đúng 3 câu ôn luyện ({todayPracticedCount}/3)
                          </span>
                          <span className={`text-[9.5px] font-black ${todayPracticedCount >= 3 ? 'text-emerald-600' : 'text-slate-400'}`}>
                            {todayPracticedCount >= 3 ? "Đạt" : "Chưa đủ"}
                          </span>
                        </div>

                        {/* Goal 3: Complete pomodoro or submit mock exam */}
                        <div className="flex items-center justify-between bg-white px-2.5 py-1.5 rounded-xl border border-slate-100">
                          <span className="flex items-center gap-1.5">
                            {(() => {
                              const satisfied = todayMockSubmitted || pomoCompletedSessions > 0;
                              return (
                                <>
                                  <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 border ${
                                    satisfied ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300'
                                  }`}>
                                    {satisfied && <Check className="w-2 h-2 text-white" />}
                                  </span>
                                  1 Pomodoro hoặc Thi thử
                                </>
                              );
                            })()}
                          </span>
                          <span className={`text-[9.5px] font-black ${
                            (todayMockSubmitted || pomoCompletedSessions > 0) ? 'text-emerald-600' : 'text-slate-400'
                          }`}>
                            {(todayMockSubmitted || pomoCompletedSessions > 0) ? "Đạt" : "0 / 1"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Badges and milestone rewards */}
                    <div className="mt-4 pt-3.5 border-t border-slate-200/50 space-y-2">
                      <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider block">
                        Huy chương tích lũy ({Math.min(4, Math.floor(streakDays / 2) + 1)}/4)
                      </span>
                      <div className="grid grid-cols-4 gap-1">
                        {[
                          { text: "Novice", goal: 1, color: "text-emerald-600 bg-emerald-50 border-emerald-200", icon: Sparkles, name: "Tân Binh Chăm Chỉ" },
                          { text: "Focus", goal: 3, color: "text-blue-600 bg-blue-50 border-blue-200", icon: MedalIcon, name: "Focus Mẫn Cán" },
                          { text: "Master", goal: 5, color: "text-purple-650 bg-purple-50 border-purple-200", icon: Award, name: "Khai Thác Thạc Sĩ" },
                          { text: "Champion", goal: 7, color: "text-amber-600 bg-amber-50 border-amber-200", icon: Star, name: "Đại Sư Đắc Đạo" }
                        ].map((badge, bIdx) => {
                          const unlocked = streakDays >= badge.goal;
                          const IconComp = badge.icon;
                          return (
                            <div 
                              key={bIdx}
                              className={`p-1 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                                unlocked 
                                  ? `${badge.color} scale-103 font-bold`
                                  : 'bg-slate-100/50 border-slate-200/40 text-slate-300 filter grayscale'
                              }`}
                              title={`${badge.name}: Đạt từ ${badge.goal} ngày Streak.`}
                            >
                              <IconComp className={`w-3.5 h-3.5 ${unlocked ? 'animate-bounce' : ''}`} style={{ animationDuration: `${2.5 + bIdx}s` }} />
                              <span className="text-[7px] tracking-tight block font-extrabold uppercase mt-1 select-none leading-none">{badge.text}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Simulation tools for developer dry run */}
                    <div className="mt-3.5 pt-3 border-t border-dashed border-slate-200 w-full">
                      <div className="flex justify-between items-center bg-slate-100 p-2 rounded-xl border border-slate-200/50">
                        <span className="text-[8px] text-slate-400 font-bold uppercase select-none">⚡ Giả lập Streak:</span>
                        <div className="flex gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              const nextStreak = streakDays + 1;
                              setStreakDays(nextStreak);
                              localStorage.setItem(STORAGE_STREAK_KEY, nextStreak.toString());
                              if (nextStreak > maxStreak) {
                                setMaxStreak(nextStreak);
                                localStorage.setItem(STORAGE_MAX_STREAK_KEY, nextStreak.toString());
                              }
                              // Add today study date
                              registerStudyActivity();
                              // Seed yesterday date too so it continues nicely
                              const yes = new Date();
                              yes.setDate(yes.getDate() - 1);
                              const yesStr = `${yes.getFullYear()}-${String(yes.getMonth() + 1).padStart(2, '0')}-${String(yes.getDate()).padStart(2, '0')}`;
                              setCompletedDates(prev => {
                                const next = prev.includes(yesStr) ? prev : [...prev, yesStr];
                                localStorage.setItem(STORAGE_COMPLETED_DATES_KEY, JSON.stringify(next));
                                return next;
                              });
                            }}
                            className="px-1.5 py-0.5 bg-white border border-slate-350 rounded text-[7.5px] font-black hover:bg-slate-100 transition cursor-pointer"
                          >
                            +1 Ngày
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => {
                              setStreakDays(0);
                              localStorage.setItem(STORAGE_STREAK_KEY, "0");
                              setCompletedDates([]);
                              localStorage.setItem(STORAGE_COMPLETED_DATES_KEY, "[]");
                              setTodayPracticedCount(0);
                            }}
                            className="px-1.5 py-0.5 bg-red-50 text-red-600 border border-red-200 rounded text-[7.5px] font-black hover:bg-red-100 transition cursor-pointer"
                          >
                            Reset
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* COMPACT & GORGEOUS POMODORO FOCUS TIMER */}
                <div className="pt-5 border-t border-slate-100 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] bg-red-50 text-red-700 font-black px-2.5 py-1 rounded-md uppercase tracking-wider flex items-center gap-1.5">
                      🍅 PHIÊN POMODORO
                    </span>
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase">
                      Đã xong: <span className="text-slate-800 font-black font-mono">{pomoCompletedSessions}</span> chu kỳ
                    </span>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 flex flex-col items-center shadow-inner relative overflow-hidden group">
                    {/* Background abstract decoration for luxurious look */}
                    <div className="absolute right-0 bottom-0 select-none pointer-events-none opacity-[0.03] scale-150 translate-x-1/4 translate-y-1/4 text-red-500">
                      <Timer className="w-24 h-24" />
                    </div>

                    <div className="text-center space-y-1 z-10">
                      <span className="text-[9px] uppercase tracking-widest font-black text-slate-400 block">
                        {pomoMode === 'focus' ? "⏱️ PHIÊN TẬP TRUNG HỌC" : "☕ PHIÊN NGHỈ THƯ GIÃN"}
                      </span>
                      
                      <div className="text-3xl font-mono font-black text-slate-800 tracking-tight flex items-center justify-center gap-1.5">
                        {pomoMode === 'focus' ? (
                          <Flame className="w-5 h-5 text-red-500 shrink-0 fill-red-500 animate-pulse" />
                        ) : (
                          <Coffee className="w-5 h-5 text-emerald-500 shrink-0 animate-bounce" />
                        )}
                        <span>{formatTime(pomoTimeLeft)}</span>
                      </div>

                      <div className="flex items-center justify-center gap-1 pt-1">
                        <span className={`w-1.5 h-1.5 rounded-full inline-block ${pomoIsActive ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'}`} />
                        <span className="text-[10px] text-slate-500 font-bold">
                          {pomoIsActive ? "Đồng hồ đang chạy" : "Tạm dừng"}
                        </span>
                      </div>
                    </div>

                    {/* Timer setting controls - custom buttons */}
                    <div className="grid grid-cols-4 gap-1.5 w-full mt-4 z-10">
                      {[15, 25, 45, 60].map(mins => (
                        <button
                          key={mins}
                          type="button"
                          onClick={() => handlePomoConfigure(mins)}
                          className={`py-1 rounded-lg text-[9px] font-black transition-all cursor-pointer ${
                            pomoMinutes === mins && pomoMode === 'focus'
                              ? "bg-slate-900 text-white shadow-sm"
                              : "bg-white hover:bg-slate-100 text-slate-600 border border-slate-200"
                          }`}
                        >
                          {mins} Phút
                        </button>
                      ))}
                    </div>

                    {/* Custom minute range selector manual adjuster */}
                    <div className="w-full flex items-center justify-between gap-2 mt-3 pt-3 border-t border-slate-200/50 z-10">
                      <span className="text-[9px] text-slate-500 font-extrabold uppercase">Tùy chỉnh:</span>
                      <div className="flex items-center gap-1">
                        <button 
                          type="button"
                          onClick={() => handlePomoConfigure(Math.max(1, pomoMinutes - 1))}
                          className="w-5 h-5 rounded bg-white hover:bg-slate-100 text-xs font-bold text-slate-600 border border-slate-200 flex items-center justify-center cursor-pointer"
                        >
                          -
                        </button>
                        <span className="text-[10px] font-bold text-slate-700 min-w-[32px] text-center font-mono">
                          {pomoMinutes}m
                        </span>
                        <button 
                          type="button"
                          onClick={() => handlePomoConfigure(Math.min(180, pomoMinutes + 1))}
                          className="w-5 h-5 rounded bg-white hover:bg-slate-100 text-xs font-bold text-slate-600 border border-slate-200 flex items-center justify-center cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Clock controlling action buttons */}
                    <div className="flex items-center gap-2 w-full mt-4 z-10">
                      <button
                        type="button"
                        onClick={() => {
                          setPomoIsActive(!pomoIsActive);
                        }}
                        className={`flex-1 py-1.5 rounded-xl text-[11px] font-black transition-all flex items-center justify-center gap-1 shadow-sm cursor-pointer ${
                          pomoIsActive 
                            ? "bg-amber-500 hover:bg-amber-600 text-white" 
                            : "bg-indigo-600 hover:bg-indigo-700 text-white"
                        }`}
                      >
                        {pomoIsActive ? (
                          <>
                            <Pause className="w-3.5 h-3.5 fill-white" /> Tạm dừng
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 fill-white" /> Khởi chạy
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setPomoIsActive(false);
                          setPomoTimeLeft(pomoMinutes * 60);
                          setPomoMode('focus');
                        }}
                        className="p-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl transition cursor-pointer"
                        title="Đặt lại phiên học"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          playPomoSound();
                        }}
                        className="p-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl transition cursor-pointer"
                        title="Thử âm thanh báo"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Legend badges */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-3 text-[10px] font-bold text-slate-500">
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 bg-emerald-500 border border-emerald-600 rounded-sm inline-block" /> Đã trả lời Đúng
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 bg-red-500 border border-red-650 rounded-sm inline-block" /> Trả lời Sai
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 bg-blue-600 rounded-sm inline-block" /> Đang học
                  </div>
                </div>
              </div>

              {/* Right Column: Question Display Card */}
              <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-md p-8 relative min-h-[500px] flex flex-col justify-between">
                
                {filteredPracticeQuestions.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-4">
                    <AlertCircle className="w-12 h-14 text-slate-400" />
                    <h4 className="text-base font-black text-slate-800">Không có dữ liệu câu hỏi phù hợp!</h4>
                    <p className="text-xs text-slate-400">Hãy tăng khoảng lọc hoặc đổi bài học khác bên ngoài chuyên mục.</p>
                  </div>
                ) : (() => {
                  const currentQ = filteredPracticeQuestions[practiceIndex];
                  const alreadyAnsweredItem = answeredHistory[currentQ.id];
                  const hasResolved = chosenOption !== null || alreadyAnsweredItem !== undefined;
                  const currentCorrectOption = currentQ.correctOption;
                  const activeChosen = chosenOption !== null ? chosenOption : (alreadyAnsweredItem ? alreadyAnsweredItem.chosenOption : null);

                  let diffColor = "bg-teal-50 text-teal-605 border-teal-200/50";
                  let diffLabel = "NHẬN BIẾT";
                  if (currentQ.difficulty === 'thong_hieu') {
                    diffColor = "bg-blue-50 text-blue-705 border-blue-200/50";
                    diffLabel = "THÔNG HIỂU";
                  } else if (currentQ.difficulty === 'van_dung') {
                    diffColor = "bg-amber-50 text-amber-705 border-amber-200/50";
                    diffLabel = "VẬN DỤNG";
                  } else if (currentQ.difficulty === 'van_dung_cao') {
                    diffColor = "bg-purple-100 text-purple-750 border-purple-250/50";
                    diffLabel = "VẬN DỤNG CAO";
                  }

                  const alphabets = ["A", "B", "C", "D"];

                  return (
                    <>
                      {/* Top bar indicators */}
                      <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-400 font-extrabold">CÂU {practiceIndex + 1} / {filteredPracticeQuestions.length}</span>
                          <span className={`text-[9px] font-extrabold px-2.5 py-1 border rounded-lg ${diffColor}`}>
                            {diffLabel}
                          </span>
                        </div>

                        {/* Star bookmark element */}
                        <button
                          onClick={() => toggleBookmark(currentQ.id)}
                          className="flex items-center gap-1.5 text-xs font-bold py-1.5 px-3 rounded-full hover:bg-slate-50 transition border border-slate-150 cursor-pointer"
                        >
                          <Star className={`w-4 h-4 ${bookmarkedIds.includes(currentQ.id) ? 'text-yellow-500 fill-yellow-500' : 'text-slate-400'}`} />
                          <span className="text-slate-550">Lưu câu khó</span>
                        </button>
                      </div>

                      {/* Question Text */}
                      <div className="space-y-6 my-6 flex-1">
                        <h4 className="text-base md:text-lg font-extrabold text-slate-900 leading-snug">
                          {currentQ.questionText}
                        </h4>

                        {/* Options block */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {currentQ.options.map((opt, optIdx) => {
                            const isThisTarget = activeChosen === optIdx;
                            const isCorrectAnswerIdx = currentCorrectOption === optIdx;

                            let optStyle = "border-slate-200 text-slate-700 hover:border-blue-400 hover:bg-slate-50/50";
                            let iconBadge = <span className="text-[11px] font-black">{alphabets[optIdx]}</span>;

                            if (hasResolved) {
                              if (isCorrectAnswerIdx) {
                                optStyle = "border-emerald-500 bg-emerald-50 text-emerald-950 font-extrabold shadow-sm shadow-emerald-500/5";
                                iconBadge = <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3px]" />;
                              } else if (isThisTarget) {
                                optStyle = "border-red-500 bg-red-50 text-red-950 font-extrabold";
                                iconBadge = <X className="w-3.5 h-3.5 text-red-600 stroke-[3px]" />;
                              } else {
                                optStyle = "border-slate-200/50 text-slate-400 bg-slate-50/25 cursor-not-allowed";
                              }
                            }

                            return (
                              <button
                                key={optIdx}
                                type="button"
                                disabled={hasResolved}
                                onClick={() => handleAnswerQuestion(currentQ, optIdx)}
                                className={`p-4.5 rounded-2xl border text-left text-xs font-bold leading-relaxed transition-all duration-150 flex items-center gap-3.5 cursor-pointer ${optStyle}`}
                              >
                                <span className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 ${
                                  hasResolved && isCorrectAnswerIdx ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm shadow-emerald-500/10' :
                                  hasResolved && isThisTarget ? 'bg-red-500 text-white border-red-500 shadow-sm shadow-red-500/10' :
                                  'bg-slate-50 border-slate-300 text-slate-500'
                                }`}>
                                  {iconBadge}
                                </span>
                                <span>{opt}</span>
                              </button>
                            );
                          })}
                        </div>

                        {hasResolved && (
                          <div className="flex justify-end pr-1 pt-1 select-none">
                            <button
                              type="button"
                              onClick={() => handleRetryCurrentQuestion(currentQ.id)}
                              className="flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[11px] font-black py-2 px-4 rounded-xl border border-indigo-200/50 hover:border-indigo-300 transition cursor-pointer shadow-sm"
                            >
                              <RotateCcw className="w-3.5 h-3.5 text-indigo-650" /> Làm lại câu này (Thử chọn lại)
                            </button>
                          </div>
                        )}

                        {/* Explanation block dynamic expansion */}
                        {(showExplanation || alreadyAnsweredItem) && (
                          <DetailedExplanationBox question={currentQ} />
                        )}
                      </div>

                      {/* Bottom navigation control block */}
                      <div className="pt-5 border-t border-slate-100 flex justify-between select-none shrink-0 gap-4">
                        <button
                          disabled={practiceIndex === 0}
                          onClick={() => {
                            setPracticeIndex(prev => prev - 1);
                            setChosenOption(null);
                            setShowExplanation(false);
                          }}
                          className="px-4.5 py-2.5 rounded-2xl border border-slate-250 text-xs font-bold text-slate-600 hover:bg-slate-50 active:scale-95 transition flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" /> Câu trước
                        </button>

                        <button
                          disabled={practiceIndex === filteredPracticeQuestions.length - 1}
                          onClick={() => {
                            setPracticeIndex(prev => prev + 1);
                            setChosenOption(null);
                            setShowExplanation(false);
                          }}
                          className="px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-950 text-white text-xs font-black active:scale-95 transition flex items-center gap-1.5 disabled:opacity-45 disabled:cursor-not-allowed cursor-pointer"
                        >
                          Câu tiếp theo <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </>
                  );
                })()}

              </div>
            </motion.div>
          )}

          {/* TAB 3: MOCK EXAM SIMULATION */}
          {activeTab === 'mock_exam' && (
            <motion.div
              key="mock_exam"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Exam Info Card Header strip with timer */}
              <div className="bg-slate-900 text-white p-6 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-4 shadow-xl border border-slate-800 shrink-0">
                <div className="space-y-1.5 text-center md:text-left">
                  <span className="text-[10px] bg-blue-600 font-extrabold px-3 py-1 rounded-md tracking-wider uppercase">{fullDatabase === getFullVNU1001Database() ? "VNU1001" : "ĐỀ TỰ CHỌN"} Mock Exam</span>
                  <h3 className="font-black text-lg">Đề Khảo Sát Tổng Hợp Toàn Bộ Khối Kiến Thức Số</h3>
                  <p className="text-xs text-slate-300 font-medium">Đề thi gồm {mockQuestions.length} câu hỏi. Đạt từ 50% câu trả lời đúng trở lên để nhận chứng nhận vượt ải.</p>
                </div>

                <div className="flex items-center gap-3 py-2.5 px-5 bg-slate-800 border border-slate-700/50 rounded-2xl shrink-0">
                  <Timer className="w-5 h-5 text-amber-500 animate-pulse" />
                  <div className="text-left font-mono">
                    <span className="text-[8px] text-slate-400 uppercase tracking-widest block font-sans font-bold">Thời gian làm bài</span>
                    <span className="text-xl font-bold text-amber-400 tracking-tight">{formatTime(examTimer)}</span>
                  </div>
                </div>
              </div>

              {/* Main mock grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Questions collection */}
                <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-8 max-h-[700px] overflow-y-auto pr-3">
                  {mockQuestions.map((q, qidx) => (
                    <div key={q.id} className="space-y-4 pb-6 border-b border-slate-100 last:border-b-0 last:pb-0">
                      <h4 className="font-extrabold text-slate-900 text-sm leading-snug">
                        <span className="text-blue-600 mr-2">Câu {qidx + 1}:</span> {q.questionText}
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = mockAnswers[q.id] === optIdx;
                          return (
                            <button
                              key={optIdx}
                              type="button"
                              onClick={() => {
                                setMockAnswers({
                                  ...mockAnswers,
                                  [q.id]: optIdx
                                });
                              }}
                              className={`p-3.5 rounded-2xl border text-left font-bold transition flex items-center gap-2.5 cursor-pointer ${
                                isSelected 
                                  ? 'bg-blue-50 border-blue-500 text-blue-900 shadow-sm' 
                                  : 'border-slate-200 text-slate-650 hover:border-blue-300 hover:bg-slate-50/10'
                              }`}
                            >
                              <span className={`inline-block w-6.5 h-6.5 rounded-full border text-center leading-6 shrink-0 text-xs font-black ${
                                isSelected ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 border-slate-300 text-slate-500'
                              }`}>
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span>{opt}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Question bubble dashboard right sidebar */}
                <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
                  <div>
                    <h4 className="font-black text-slate-900 tracking-tight uppercase text-xs">Phiếu đáp án nhanh</h4>
                    <p className="text-[11px] text-slate-400 font-bold block mt-0.5">Click số để cuộn và điền tích tắc</p>
                  </div>

                  <div className="grid grid-cols-5 gap-2 max-h-60 overflow-y-auto pr-1">
                    {mockQuestions.map((q, idx) => {
                      const answerIndex = mockAnswers[q.id];
                      const filled = answerIndex !== undefined;

                      return (
                        <div
                          key={q.id}
                          className={`h-11 border text-xs font-black rounded-xl flex flex-col justify-center items-center font-mono ${
                            filled ? 'bg-blue-600 border-blue-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-400'
                          }`}
                        >
                          <span className="text-[9px] leading-none text-slate-400 block pb-0.5" style={{ color: filled ? '#93c5fd' : undefined }}>{idx + 1}</span>
                          <span className="text-xs leading-none">
                            {filled ? String.fromCharCode(65 + answerIndex) : '?'}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                    <div className="flex justify-between text-xs font-extrabold text-slate-600">
                      <span>Đã hoàn thành:</span>
                      <span className="text-blue-600">{Object.keys(mockAnswers).length} / {mockQuestions.length} câu</span>
                    </div>

                    <button
                      onClick={triggerSubmitMockExam}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black py-3.5 rounded-2xl transition shadow-lg shadow-emerald-500/15 duration-150 cursor-pointer transform active:scale-98 text-center uppercase tracking-wide"
                    >
                      Nộp bài ngay
                    </button>

                    <button
                      onClick={() => {
                        customConfirm(
                          "Bạn có chắc chắn muốn hủy bài thi thử này?",
                          () => {
                            setIsTimerActive(false);
                            setActiveTab('dashboard');
                          },
                          "Hủy bài thi thử"
                        );
                      }}
                      className="w-full bg-slate-50 hover:bg-slate-155 text-slate-500 text-xs font-bold py-2.5 rounded-2xl transition border border-slate-200/60 cursor-pointer text-center"
                    >
                      Hủy bỏ bài làm
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 4: MOCK EXAM RESULTS */}
          {activeTab === 'exam_result' && examSavedResult && (
            <motion.div
              key="exam_result"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="max-w-3xl mx-auto space-y-8"
            >
              {/* Visual splash score */}
              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl text-center">
                <div className={`p-8 text-white flex flex-col items-center justify-center space-y-3 ${
                  examSavedResult.passed ? 'bg-gradient-to-br from-emerald-500 to-teal-600' : 'bg-gradient-to-br from-red-500 to-rose-600'
                }`}>
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20 shadow-inner">
                    <Award className="w-9 h-9 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black">
                      {examSavedResult.passed ? 'CHÚC MỪNG: BẠN ĐÃ ĐẠT CHỨNG CHỈ!' : 'TIẾC QUÁ: ĐIỂM CHƯA ĐẠT CHUẨN!'}
                    </h3>
                    <p className="text-xs text-white/80 font-bold">Hãy xem kỹ các lỗi sai đỏ và tiếp tục nỗ lực ôn tập chuyên đề nhé</p>
                  </div>

                  <div className="bg-white/10 border border-white/20 p-4.5 rounded-2xl px-8 select-none">
                    <span className="text-[10px] text-white/50 block font-black uppercase tracking-wider">Điểm số thu được</span>
                    <span className="text-4xl font-extrabold">{examSavedResult.score.toFixed(1)} / 10đ</span>
                  </div>
                </div>

                {/* Score details breakdown dashboard */}
                <div className="p-8 grid grid-cols-2 sm:grid-cols-4 gap-6 bg-slate-50 border-b border-slate-105">
                  <div className="text-center space-y-1">
                    <span className="text-[9px] text-slate-400 font-extrabold uppercase block tracking-wider">Số câu Đúng</span>
                    <span className="text-lg font-black text-emerald-600">{examSavedResult.correctCount} câu</span>
                  </div>
                  <div className="text-center space-y-1">
                    <span className="text-[9px] text-slate-400 font-extrabold uppercase block tracking-wider">Số câu Sai</span>
                    <span className="text-lg font-black text-red-500">{examSavedResult.wrongCount} câu</span>
                  </div>
                  <div className="text-center space-y-1">
                    <span className="text-[9px] text-slate-400 font-extrabold uppercase block tracking-wider">Thời gian đi qua</span>
                    <span className="text-xs font-bold font-mono text-slate-800 leading-none h-6 block py-1">{examSavedResult.timeSpent}</span>
                  </div>
                  <div className="text-center space-y-1">
                    <span className="text-[9px] text-slate-400 font-extrabold uppercase block tracking-wider">Chứng nhận</span>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md inline-block ${
                      examSavedResult.passed ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                    }`}>{examSavedResult.passed ? "ĐÃ ĐẠT" : "CHƯA ĐẠT"}</span>
                  </div>
                </div>

                <div className="p-6 bg-white border-t border-slate-100 space-y-4">
                  <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider text-center select-none">
                     Lựa chọn ôn tập & khắc phục lỗ hổng kiến thức
                  </div>
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
                    <button
                      onClick={handleRetakeAll}
                      className="w-full sm:w-auto bg-slate-900 hover:bg-slate-950 text-white text-xs font-black py-3 px-5 rounded-2xl transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Làm lại toàn bộ đề này
                    </button>
                    
                    <button
                      onClick={handleRetakeWrong}
                      className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white text-xs font-black py-3 px-5 rounded-2xl transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <AlertCircle className="w-3.5 h-3.5" /> Chỉ làm lại câu đã SAI
                    </button>

                    <button
                      onClick={handleStartMockExam}
                      className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white text-xs font-black py-3 px-5 rounded-2xl transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" /> Thi đề ngẫu nhiên mới
                    </button>

                    <button
                      onClick={() => setActiveTab('dashboard')}
                      className="w-full sm:w-auto bg-slate-150 hover:bg-slate-200 text-slate-700 text-xs font-extrabold py-3 px-5 rounded-2xl transition cursor-pointer border border-slate-300/30"
                    >
                      Về bảng tổng quan
                    </button>
                  </div>
                </div>
              </div>

              {/* Review exam answers paper with red-pen markers */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0" />
                    Xem lại chi tiết bài làm:
                  </h4>
                  
                  {/* Review view selector */}
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setExamReviewFilter('all')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition select-none cursor-pointer ${
                        examReviewFilter === 'all'
                          ? 'bg-white text-slate-900 shadow-sm font-extrabold'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Tất cả ({mockQuestions.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setExamReviewFilter('wrong')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition select-none cursor-pointer flex items-center gap-1.5 ${
                        examReviewFilter === 'wrong'
                          ? 'bg-red-500 text-white shadow-sm'
                          : 'text-slate-500 hover:text-red-600'
                      }`}
                    >
                      💡 Câu làm sai ({examSavedResult.wrongCount})
                    </button>
                  </div>
                </div>

                {filteredReviewQuestions.length === 0 ? (
                  <div className="py-12 text-center text-xs text-slate-500 bg-white border border-dashed border-slate-200 rounded-3xl font-bold">
                    {examReviewFilter === 'wrong'
                      ? "Tuyệt vời! Bạn không làm sai câu nào trong bài thi này 🎉"
                      : "Không tìm thấy câu hỏi nào."}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredReviewQuestions.map(({ q, originalIdx }) => {
                      const chosen = mockAnswers[q.id];
                      const correctIdx = q.correctOption;
                      const isCorrect = chosen === correctIdx;

                      return (
                        <div key={q.id} className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3 shadow-[0_2px_8px_rgba(0,0,0,0.005)]">
                          <div className="flex justify-between items-start">
                            <h5 className="font-extrabold text-slate-900 text-xs leading-snug">
                              <span className="text-slate-400 mr-1.5">Câu {originalIdx + 1}:</span> {q.questionText}
                            </h5>
                            <span className={`text-[9px] font-black uppercase px-2.5 py-0.5 rounded shrink-0 ${
                              isCorrect ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                            }`}>
                              {isCorrect ? 'ĐÚNG (Đ)' : 'SAI (S)'}
                            </span>
                          </div>

                          {/* Answers breakdown */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            {q.options.map((opt, oindex) => {
                              let itemBorder = "border-slate-100";
                              let iconMark = <span className="text-[10px] pr-1.5 text-slate-400">{String.fromCharCode(65 + oindex)}.</span>;

                              if (oindex === correctIdx) {
                                itemBorder = "border-emerald-250 bg-emerald-50/50 text-emerald-900 font-extrabold";
                                iconMark = <Check className="w-3.5 h-3.5 text-emerald-600 mr-1" />;
                              } else if (oindex === chosen) {
                                itemBorder = "border-red-250 bg-red-50/50 text-red-900 font-extrabold";
                                iconMark = <X className="w-3.5 h-3.5 text-red-650 mr-1" />;
                              }

                              return (
                                <div key={oindex} className={`p-2.5 border rounded-xl flex items-center text-[11px] font-medium leading-normal ${itemBorder}`}>
                                  {iconMark}
                                  <span>{opt}</span>
                                </div>
                              );
                            })}
                          </div>

                          <DetailedExplanationBox question={q} />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 5: BOOKMARKS & WEAK TOPICS */}
          {activeTab === 'bookmarks' && (
            <motion.div
              key="bookmarks"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-wide">Trang lưu trữ sổ tay cá nhân</h3>
                  <p className="text-xs text-slate-500 font-medium">Toàn bộ các câu hỏi khó bạn chọn Đánh dấu để ôn luyện lại nét mực xanh</p>
                </div>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="text-xs font-bold bg-white text-slate-700 border border-slate-200 px-4 py-2 rounded-2xl hover:bg-slate-50/55 transition cursor-pointer"
                >
                  Quay lại tổng quan
                </button>
              </div>

              {bookmarkedIds.length === 0 ? (
                <div className="py-20 text-center text-slate-400 space-y-3.5 border border-dashed border-slate-200 rounded-3xl bg-white max-w-lg mx-auto">
                  <Star className="w-10 h-10 mx-auto text-slate-300 animate-spin" />
                  <h4 className="font-extrabold text-slate-700 text-xs">Sổ tay lưu danh trống trơn!</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">Bấm biểu tượng ngôi sao bên cạnh mỗi chuyên đề câu hỏi khi học để lưu trữ vào tủ sách riêng của bạn.</p>
                </div>
              ) : (
                <div className="space-y-4 max-w-4xl mx-auto">
                  {fullDatabase.filter(q => bookmarkedIds.includes(q.id)).map((q, idx) => {
                    const corrIdx = q.correctOption;
                    return (
                      <div key={q.id} className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-sm relative">
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <span className="text-[9px] bg-slate-900 text-cyan-400 font-extrabold px-2.5 py-0.5 rounded-md uppercase block w-fit mb-2">Bài {q.topicId} • CÂU #{idx + 1}</span>
                            <h4 className="font-extrabold text-slate-900 text-sm leading-snug">{q.questionText}</h4>
                          </div>

                          <button 
                            onClick={() => toggleBookmark(q.id)}
                            className="p-2 border border-slate-200 hover:bg-red-50 text-red-500 rounded-xl transition cursor-pointer"
                            title="Xóa khỏi lưu trữ"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-2">
                          {q.options.map((opt, oindex) => (
                            <div 
                              key={oindex} 
                              className={`p-3.5 border rounded-2xl flex items-center gap-2 font-bold ${
                                oindex === corrIdx ? 'border-emerald-250 bg-emerald-50/30 text-emerald-950' : 'border-slate-100 text-slate-600'
                              }`}
                            >
                              <span className={`w-6 h-6 rounded-full border text-center leading-5 shrink-0 text-xs ${
                                oindex === corrIdx ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-slate-50 border-slate-300 text-slate-500'
                              }`}>
                                {String.fromCharCode(65 + oindex)}
                              </span>
                              <span>{opt}</span>
                            </div>
                          ))}
                        </div>

                        <DetailedExplanationBox question={q} />
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 6: AI EXAM GENERATOR (IMPORTER) */}
          {activeTab === 'importer' && (
            <motion.div
              key="importer"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6 max-w-6xl mx-auto pb-12 px-2"
            >
              {/* TOP HEADER BOX */}
              <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl border border-slate-800">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-emerald-600 text-white font-extrabold px-3 py-1 rounded-md tracking-wider uppercase animate-pulse">AI Exam Engine</span>
                    <span className="text-[10px] bg-slate-800 text-emerald-400 border border-emerald-500/30 font-extrabold px-3 py-1 rounded-md tracking-wider uppercase">Gemini 3.5 Flash</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white m-0">Hệ Thống Tự Soạn & Trích Xuất Đề Thi Trắc Nghiệm Thông Minh</h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-medium leading-relaxed m-0">
                    Dán văn bản thô bất kỳ có chứa câu hỏi & đáp án, hoặc tải lên file JSON có sẵn. Hệ thống ứng dụng trí tuệ nhân tạo Gemini để bốc tách, sắp xếp dữ liệu và xuất trực tiếp thành bài ôn tập & thi thử tương tác đầy đủ trên cổng học.
                  </p>
                </div>
                
                {fullDatabase.length !== getFullVNU1001Database().length && (
                  <button
                    onClick={handleResetToDefault}
                    className="w-full md:w-auto flex items-center justify-center gap-1.5 bg-red-650 hover:bg-red-700 text-white text-xs font-black py-3 px-5 rounded-2xl transition cursor-pointer shrink-0 shadow-lg"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Khôi Phục Đề Chuẩn {currentSubject === 'vnu1001' ? "VNU1001" : "Pháp Luật ĐC"}
                  </button>
                )}
              </div>

              {/* INPUT PANEL BENTO */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Column 1 & 2: Textarea & Conversion */}
                <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-sm flex flex-col">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5 m-0">
                      <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" /> Nhập Văn Bản Đề & Đáp Án Thô
                    </h4>
                    <span className="text-[10px] text-slate-400 font-extrabold font-mono">Dữ liệu thô</span>
                  </div>

                  <p className="text-xs text-slate-500 font-medium leading-relaxed m-0">
                    Hãy dán văn bản bài thi của bạn dưới dạng tự do (có các câu hỏi trắc nghiệm, các lựa chọn A, B, C, D và ghi chú đáp án đúng, có thể ghi kèm giải thích hoặc không). AI sẽ lý giải và sắp xếp tất cả!
                  </p>

                  <textarea
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                    placeholder={`Ví dụ cấu trúc đầu vào của bạn:

Câu 1. RAM của máy tính dùng để làm gì?
A. Lưu trữ hệ cơ sở dữ liệu vĩnh viễn
B. Lưu trữ dữ liệu tạm thời khi máy tính đang chạy
C. Tăng tốc độ đường truyền internet
D. Chứa hệ điều hành Windows khi tắt máy
Đáp án đúng: B
Giải thích: RAM (Random Access Memory) là bộ nhớ dữ liệu tạm để CPU truy cập nhanh...`}
                    className="w-full h-80 p-4 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 font-mono text-xs text-slate-700 outline-none resize-none transition-all duration-200"
                  />

                  {analyzeError && (
                    <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl font-semibold border border-red-150 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                      <span>{analyzeError}</span>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      onClick={handleParseWithAI}
                      disabled={isAnalyzing}
                      className={`flex-1 flex items-center justify-center gap-2 text-xs font-black py-3.5 px-6 rounded-2xl cursor-pointer shadow-md select-none transition ${
                        isAnalyzing
                          ? "bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed"
                          : "bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-700 shadow-emerald-500/10"
                      }`}
                    >
                      {isAnalyzing ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
                          <span>AI Đang Phối Hợp & Định Dạng Đề...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-white" />
                          <span>AI Trích Xuất & Thiết Kế Đề Trắc Nghiệm</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Column 3: Offline utilities & Instructions */}
                <div className="space-y-6">
                  {/* UTILITIES CARD */}
                  <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-sm">
                    <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5 m-0">
                      <BookMarked className="w-4 h-4 text-blue-600" /> Quản Lý Tiện Ích Đề Thi
                    </h4>
                    <p className="text-xs text-slate-500 font-medium m-0">Bên cạnh việc dán đề bốc bằng AI, bạn có thể nhập tệp JSON đã lưu hoặc xuất bộ dữ liệu câu hỏi hiện đang học để gửi cho bạn bè.</p>

                    <div className="space-y-3 pt-2">
                      {/* JSON UPLOAD */}
                      <div className="relative">
                        <input
                          type="file"
                          accept=".json"
                          id="json-file-upload"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <label
                          htmlFor="json-file-upload"
                          className="w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-bold py-3 px-4 rounded-2xl transition cursor-pointer select-none"
                        >
                          <Upload className="w-3.5 h-3.5 text-blue-500" /> Nhập Đề Từ File JSON (.json)
                        </label>
                      </div>

                      {/* EXPORT CURRENT */}
                      <button
                        onClick={handleExportCurrentDatabase}
                        className="w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-bold py-3 px-4 rounded-2xl transition cursor-pointer select-none"
                      >
                        <Download className="w-3.5 h-3.5 text-emerald-500" /> Xuất Đề Hiện Tại Lưu Trữ (.json)
                      </button>

                      {/* QUICK RESET UTILITY */}
                      <button
                        onClick={handleResetToDefault}
                        className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100/70 border border-red-100 hover:border-red-200 text-red-700 text-xs font-bold py-3 px-4 rounded-2xl transition cursor-pointer select-none"
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> Khôi phục 600 câu VNU1001
                      </button>
                    </div>

                    <div className="pt-3 border-t border-slate-100">
                      <div className="p-3 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-2.5">
                        <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <div className="text-[10px] leading-relaxed text-blue-800 font-semibold">
                          <span className="font-extrabold block mb-0.5">Mẹo định dạng file JSON:</span>
                          File nên chứa một mảng JSON gồm các đối tượng có thuộc tính: <code className="bg-blue-100 px-1 py-0.5 rounded text-blue-900 font-bold font-mono">questionText</code>, <code className="bg-blue-100 px-1 py-0.5 rounded text-blue-900 font-bold font-mono">options</code> (4 chuỗi), <code className="bg-blue-100 px-1 py-0.5 rounded text-blue-900 font-bold font-mono">correctOption</code> (0 đến 3), và <code className="bg-blue-100 px-1 py-0.5 rounded text-blue-900 font-bold font-mono">explanation</code>.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* HOW IT HELPS BOX */}
                  <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 space-y-4">
                    <h5 className="text-xs font-extrabold text-slate-700 uppercase tracking-widest m-0">Đặc Quyền Của Cổng Soạn Đề</h5>
                    <ul className="space-y-3.5 text-[11px] leading-relaxed font-semibold text-slate-600 p-0 list-none m-0">
                      <li className="flex gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-extrabold shrink-0 text-[10px]">1</span>
                        <span><strong>Trích xuất đề tự do</strong>: AI tự bóc tách và phân biệt đâu là câu hỏi, đâu là đáp án nhiễu để sinh form làm bài chuẩn xác.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-extrabold shrink-0 text-[10px]">2</span>
                        <span><strong>Phân loại chuyên đề</strong>: Tự động xếp các câu hỏi vào 6 mảng học phần số để người dùng ôn luyện đúng lộ trình hoặc tự lọc chuyên đề ôn tủ cực mạnh.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-extrabold shrink-0 text-[10px]">3</span>
                        <span><strong>Tương thích đa chế độ</strong>: Ngay khi lưu, các câu mới sẽ được áp dụng trực tiếp cho Chế độ thi thử Mock Exam và Chế độ ôn tập từng bài vô hạn lần làm.</span>
                      </li>
                    </ul>
                  </div>
                </div>

              </div>

              {/* EDITOR PREVIEW PANEL (Visible when there are parsed/importing questions) */}
              {editingQuestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-3xl border border-slate-200 p-6 space-y-6 shadow-md"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div>
                      <h4 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2 m-0">
                        <span>Danh Sách Câu Hỏi Đang Đợi Lưu ({editingQuestions.length} câu)</span>
                      </h4>
                      <p className="text-xs text-slate-500 font-medium m-0">Bạn có thể dùng chế độ xem trước này để sửa chữa trực tiếp, thay đổi mảng kiến thức học phần hay thiết lập đáp án đúng trước khi áp dụng.</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={handleAddBlankQuestion}
                        className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-250 text-slate-700 text-xs font-black py-2.5 px-4 rounded-xl cursor-pointer transition select-none"
                      >
                        <Plus className="w-4 h-4" /> Thêm Câu Hỏi Mới
                      </button>

                      <button
                        onClick={() => {
                          customConfirm(
                            "Hủy bỏ bản nháp AI này? Bạn sẽ bị mất các câu hỏi chưa được lưu.",
                            () => {
                              setEditingQuestions([]);
                            },
                            "Hủy bản nháp"
                          );
                        }}
                        className="flex items-center gap-1.5 bg-white hover:bg-red-50 border border-slate-200 hover:border-red-200 text-slate-500 hover:text-red-600 text-xs font-black py-2.5 px-4 rounded-xl cursor-pointer transition select-none"
                      >
                        <X className="w-4 h-4" /> Hủy Nháp
                      </button>
                    </div>
                  </div>

                  {/* ACTIVE QUESTION EDITOR SCROLLING LIST */}
                  <div className="space-y-6 max-h-[700px] overflow-y-auto pr-2">
                    {editingQuestions.map((q, qidx) => (
                      <div key={q.id || qidx} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl relative space-y-4 hover:border-blue-300 transition-all duration-150">
                        
                        {/* Header card action */}
                        <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                          <div className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-extrabold text-xs">{qidx + 1}</span>
                            <span className="text-xs font-black uppercase text-slate-500 tracking-wider">CÂU HỎI TRANG BIÊN TẬP</span>
                          </div>
                          
                          <button
                            onClick={() => handleDeleteEditingQuestion(qidx)}
                            className="p-1.5 text-slate-400 hover:text-red-650 hover:bg-red-50 rounded-lg transition duration-150 cursor-pointer"
                            title="Xóa câu hỏi này"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Fields */}
                        <div className="space-y-3">
                          {/* Question Text */}
                          <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">Nội dung câu hỏi:</label>
                            <textarea
                              value={q.questionText}
                              onChange={(e) => handleUpdateEditingQuestion(qidx, { questionText: e.target.value })}
                              rows={2}
                              className="w-full p-3 border border-slate-200 bg-white rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 text-xs font-bold text-slate-800 outline-none transition"
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Topic ID selection */}
                            <div className="space-y-1">
                              <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">Phân loại học phần sổ tay:</label>
                              <select
                                value={q.topicId}
                                onChange={(e) => handleUpdateEditingQuestion(qidx, { topicId: parseInt(e.target.value) || 1 })}
                                className="w-full p-2.5 border border-slate-200 bg-white text-xs font-bold rounded-xl text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 h-10"
                              >
                                {[1, 2, 3, 4, 5, 6].map(tNum => (
                                  <option key={tNum} value={tNum}>
                                    Chuyên đề {tNum}: {VNU_TOPICS[tNum - 1] || `Chuyên đề ${tNum}`}
                                  </option>
                                ))}
                              </select>
                            </div>

                            {/* Difficulty classification */}
                            <div className="space-y-1">
                              <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">Cấp độ khó thiết lập:</label>
                              <select
                                value={q.difficulty}
                                onChange={(e) => handleUpdateEditingQuestion(qidx, { difficulty: e.target.value as any })}
                                className="w-full p-2.5 border border-slate-200 bg-white text-xs font-bold rounded-xl text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 h-10"
                              >
                                <option value="nhan_biet">Nhận biết (Recall)</option>
                                <option value="thong_hieu">Thông hiểu (Understand)</option>
                                <option value="van_dung">Vận dụng (Apply)</option>
                                <option value="van_dung_cao">Vận dụng cao (Analyze)</option>
                              </select>
                            </div>
                          </div>

                          {/* Options Block with Radios for Correct index */}
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">Thiết lập phương án (Bấm chữ cái đầu để chọn đáp án đúng):</label>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                              {q.options.map((opt, oidx) => (
                                <div 
                                  key={oidx} 
                                  className={`p-2.5 bg-white border rounded-xl flex items-center gap-3 transition ${
                                    q.correctOption === oidx 
                                      ? "border-emerald-300 ring-2 ring-emerald-50" 
                                      : "border-slate-200"
                                  }`}
                                >
                                  {/* Radio selector */}
                                  <button
                                    onClick={() => handleUpdateEditingQuestion(qidx, { correctOption: oidx })}
                                    className={`w-6 h-6 rounded-full font-black text-[11px] shrink-0 border flex items-center justify-center transition cursor-pointer ${
                                      q.correctOption === oidx 
                                        ? "bg-emerald-500 text-white border-emerald-500" 
                                        : "bg-slate-100 border-slate-300 text-slate-600 hover:bg-slate-200"
                                    }`}
                                    title="Đặt làm đáp án đúng"
                                  >
                                    {String.fromCharCode(65 + oidx)}
                                  </button>

                                  {/* Input choice */}
                                  <input
                                    type="text"
                                    value={opt}
                                    onChange={(e) => handleUpdateEditingOption(qidx, oidx, e.target.value)}
                                    className="flex-1 text-slate-750 text-xs font-bold border-none outline-none focus:ring-0 p-0 bg-transparent h-6"
                                    placeholder={`Nội dung lựa chọn ${String.fromCharCode(65 + oidx)}`}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Explanation Box */}
                          <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">Giải thích lý thuyết chi tiết:</label>
                            <input
                              type="text"
                              value={q.explanation || ""}
                              onChange={(e) => handleUpdateEditingQuestion(qidx, { explanation: e.target.value })}
                              className="w-full p-2.5 border border-slate-200 bg-white rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 text-xs font-bold text-slate-700 outline-none transition h-10"
                              placeholder="Giải diễn giải lý thuyết hoặc căn cứ để học sinh ghi nhớ khi làm sai..."
                            />
                          </div>

                        </div>
                      </div>
                    ))}
                  </div>

                  {/* SAVE TRIGGER BUTTONS */}
                  <div className="pt-4 border-t border-slate-150 flex flex-col md:flex-row items-center gap-4 justify-between">
                    <div className="text-xs text-slate-500 font-semibold text-center md:text-left">
                      Hãy bấm Lưu để chính thức sáp nhập chúng. Đề của bạn sẽ tương thích 100% với hệ thống kiểm tra và chấm điểm của cổng.
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
                      <button
                        onClick={() => handleSaveImportedQuestions(false)}
                        className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs py-3 px-6 rounded-2xl transition cursor-pointer select-none shadow-md shadow-blue-500/10"
                      >
                        <Plus className="w-4 h-4 animate-pulse" /> Trộn Cùng Đề Chuẩn {currentSubject === 'vnu1001' ? "VNU1001" : "Pháp Luật ĐC"}
                      </button>

                      <button
                        onClick={() => handleSaveImportedQuestions(true)}
                        className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs py-3 px-6 rounded-2xl transition cursor-pointer select-none shadow-md shadow-indigo-500/10"
                      >
                        <Check className="w-4 h-4 animate-pulse" /> Chỉ Luyện Bộ Đề Tự Nạp Này (Ghi Đè)
                      </button>
                    </div>
                  </div>

                </motion.div>
              )}

            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* --- OFFLINE EXPORT CERTIFICATE & ACADEMIC TRANSCRIPT MODAL (interactive PREVIEW) --- */}
      {isExportModalOpen && (
        <div className="fixed inset-0 bg-slate-905/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 print:hidden overflow-y-auto animate-fade-in" style={{ backgroundColor: "rgba(15, 23, 42, 0.85)" }}>
          <div className="bg-white rounded-3xl max-w-5xl w-full shadow-2xl border border-slate-205 flex flex-col md:flex-row overflow-hidden max-h-[90vh]">
            
            {/* Modal Left panel: Controls and Instructions */}
            <div className="w-full md:w-80 bg-slate-55 p-6 border-b md:border-b-0 md:border-r border-slate-150 flex flex-col justify-between shrink-0">
              <div className="space-y-5">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="text-[9px] bg-indigo-100 text-indigo-850 font-black px-2 py-0.5 rounded uppercase tracking-wider block w-fit">Cá Nhân Hóa</span>
                    <h3 className="text-base font-black text-slate-900 tracking-tight m-0">Thiết Lập Bản In PDF</h3>
                  </div>
                  <button 
                    onClick={() => setIsExportModalOpen(false)}
                    className="p-1 text-slate-450 hover:text-slate-600 hover:bg-slate-200/50 rounded-lg transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Name field edit */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">Nhập Tên Học Viên Trên Chứng Chỉ</label>
                    <input 
                      type="text" 
                      value={certFullName}
                      onChange={(e) => setCertFullName(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-250 hover:border-slate-350 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 rounded-xl text-xs font-bold text-slate-800 outline-none transition"
                      placeholder="VD: Nguyễn Văn A"
                      maxLength={40}
                    />
                    <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                      Sửa tên của bạn vào đây, bản in chứng chỉ bên phải sẽ tự phản ánh tương tác thời gian thực!
                    </p>
                  </div>

                  {/* PDF Printing Hints */}
                  <div className="bg-amber-50 rounded-2xl border border-amber-200/50 p-4 space-y-1.5">
                    <h5 className="text-[10px] font-black text-amber-850 uppercase tracking-wider flex items-center gap-1.5 m-0">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" /> Hướng Dẫn Kính Gửi Bạn
                    </h5>
                    <ul className="list-disc pl-3.5 space-y-1.5 text-[10px] leading-relaxed text-amber-800 font-medium p-0 m-0">
                      <li>Bấm nút <strong>"Tiến Hành In Học Học Bạ & PDF"</strong> ở dưới.</li>
                      <li>Trong hộp thoại in của trình duyệt, chọn <strong>"Lưu dưới dạng PDF" (Save as PDF)</strong> tại mục Máy in.</li>
                      <li>Hãy chọn tùy chọn <strong>"In hình nền" (Background graphics)</strong> để giữ trọn màu sắc và hoa văn sang trọng của chứng chỉ.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Group at bottom */}
              <div className="space-y-2.5 pt-6 border-t border-slate-150 mt-6 md:mt-0">
                <button
                  onClick={() => {
                    setTimeout(() => {
                      window.print();
                    }, 50);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs py-3 px-4 rounded-xl shadow-md cursor-pointer transition select-none"
                >
                  <Award className="w-4 h-4 text-white" /> Tiến Hành In Học Bạ & PDF
                </button>

                <button
                  onClick={() => setIsExportModalOpen(false)}
                  className="w-full flex items-center justify-center bg-white hover:bg-slate-100 border border-slate-200 text-slate-650 font-bold text-xs py-2.5 px-4 rounded-xl cursor-pointer transition select-none"
                >
                  Đóng Hộp Xem Trước
                </button>
              </div>

            </div>

            {/* Modal Right panel: Live Scalable Preview of page 1 and page 2 */}
            <div className="flex-1 bg-slate-100 p-6 sm:p-8 overflow-y-auto space-y-6">
              <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 block text-center">BẢN TRỰC QUAN XEM TRƯỚC (LIVE PREVIEW)</span>
              
              {/* PAGE 1 PREVIEW: THE CERTIFICATE */}
              <div className="w-full bg-amber-50/15 p-6 sm:p-10 border-[10px] border-double border-amber-500 rounded-3xl shadow-md border-box relative min-h-[500px] flex flex-col justify-between space-y-6 bg-amber-50">
                
                {/* corner decorators */}
                <span className="absolute top-2 left-2 text-amber-500 font-serif text-xl">⚜</span>
                <span className="absolute top-2 right-2 text-amber-500 font-serif text-xl">⚜</span>
                <span className="absolute bottom-2 left-2 text-amber-500 font-serif text-xl">⚜</span>
                <span className="absolute bottom-2 right-2 text-amber-500 font-serif text-xl">⚜</span>

                <div className="text-center space-y-1">
                  <h5 className="text-[9px] font-black tracking-widest uppercase text-slate-700 m-0">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h5>
                  <p className="text-[8px] font-bold text-slate-500 m-0">Độc lập - Tự do - Hạnh phúc</p>
                  <div className="w-24 h-[1px] bg-amber-500 mx-auto mt-1"></div>
                </div>

                <div className="text-center space-y-0.5">
                  <span className="text-[8px] text-slate-400 font-black block tracking-widest">HỆ THỐNG VNU1001 PORTAL</span>
                  <h4 className="text-sm font-black text-slate-900 tracking-tight m-0">BẢN CHỨNG NHẬN ĐẠT CHUẨN ÔN TẬP</h4>
                </div>

                <div className="text-center space-y-4 my-2">
                  <div>
                    <h2 className="text-lg font-black tracking-wider text-amber-600 m-0">CHỨNG NHẬN HOÀN THÀNH</h2>
                    <span className="text-[8px] text-slate-400 font-black block tracking-widest uppercase">Certificate of Completion</span>
                  </div>

                  <p className="text-[10px] text-slate-550 italic max-w-sm mx-auto leading-relaxed m-0">
                    Hệ thống ghi nhận thành viên ôn thi quốc gia điện tử công nhận nỗ lực xuất sắc học tập:
                  </p>

                  <div className="py-1">
                    <span className="text-base font-black text-slate-900 border-b border-dashed border-slate-400 pb-0.5 px-4 inline-block">
                      {certFullName || "Học viên VNU1001"}
                    </span>
                  </div>

                  <p className="text-[9px] font-bold text-slate-650 max-w-sm mx-auto leading-normal m-0 animate-pulse">
                    Đã xuất sắc hoàn thành lộ trình trắc nghiệm khảo thí gồm 6 chuyên đề cốt lõi với điểm số vượt bậc.
                  </p>
                </div>

                {/* mini grid stats */}
                <div className="grid grid-cols-3 gap-2 text-center max-w-xs mx-auto">
                  <div className="bg-white/80 p-1.5 border border-slate-202 rounded-xl">
                    <span className="text-[7.5px] text-slate-400 font-bold block uppercase leading-none mb-0.5">Tiến Trình</span>
                    <span className="text-xs font-black text-blue-600">{stats.overallCompletion}%</span>
                  </div>
                  <div className="bg-white/80 p-1.5 border border-slate-202 rounded-xl">
                    <span className="text-[7.5px] text-slate-400 font-bold block uppercase leading-none mb-0.5">Độ Đúng</span>
                    <span className="text-xs font-black text-emerald-600">{stats.accuracy}%</span>
                  </div>
                  <div className="bg-white/80 p-1.5 border border-slate-202 rounded-xl">
                    <span className="text-[7.5px] text-slate-400 font-bold block uppercase leading-none mb-0.5">Câu Đã Làm</span>
                    <span className="text-xs font-black text-indigo-600">{stats.totalAnswered}c</span>
                  </div>
                </div>

                <div className="flex justify-between items-end text-[7.5px] text-slate-400 uppercase font-bold pt-4 font-sans">
                  <div className="text-left leading-relaxed">
                    <span>Mã xác thực: {Date.now().toString(36).toUpperCase()}</span><br/>
                    <span>Ngày: {new Date().toLocaleDateString('vi-VN')}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-700 font-black">PHÊ DUYỆT BỞI HỆ THỐNG VNU1001</span>
                  </div>
                </div>

              </div>

              {/* PAGE 2 PREVIEW: THE TRANSCRIPT */}
              <div className="w-full bg-white p-6 sm:p-8 border border-slate-200 rounded-3xl shadow-md space-y-4 font-sans">
                
                <div className="border-b border-slate-200 pb-2">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight m-0">HỌC BẠ SỐ CHI TIẾT (ACADEMIC RECORD)</h4>
                  <p className="text-[9px] text-slate-400 font-bold m-0">Bảng chi tiết thông số ôn bồi dưỡng năng lực của bạn</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[9.5px] text-slate-600 font-semibold bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <div>Tên Học Viên: <span className="font-extrabold text-slate-800">{certFullName}</span></div>
                  <div>Liên Kết: <span className="font-mono text-slate-700">{"atemday997@gmail.com"}</span></div>
                  <div>Chuỗi Streak: <span className="font-extrabold text-slate-800">{streakDays} ngày (Kỷ lục: {maxStreak} ngày)</span></div>
                  <div>Tổng Thời Gian: <span className="font-extrabold text-slate-800">{(Object.values(studyTimes) as number[]).reduce((sum: number, t: number) => sum + t, 0) > 0 ? formatStudyTime((Object.values(studyTimes) as number[]).reduce((sum: number, t: number) => sum + t, 0)) : "0 giây"}</span></div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[8px] font-black tracking-wider text-slate-450 block uppercase">Tiến Độ Từng Chuyên Đề:</span>
                  <div className="space-y-1">
                    {topicDetails.map(topic => {
                      const topicQs = fullDatabase.filter(q => q.topicId === topic.id);
                      const answeredInTopic = topicQs.filter(q => answeredHistory[q.id] !== undefined).length;
                      const correctPractice = topicQs.filter(q => answeredHistory[q.id]?.correct).length;
                      const practiceRate = answeredInTopic > 0 ? Math.round((correctPractice / answeredInTopic) * 100) : 0;
                      return (
                        <div key={topic.id} className="flex justify-between items-center text-[9px] font-bold text-slate-700 py-1 bg-slate-50/50 px-2 rounded-lg border border-slate-100">
                          <span className="truncate max-w-[200px]">{topic.name}</span>
                          <span className="font-mono font-bold text-slate-500">Đúng {practiceRate}% ({answeredInTopic}/{topicQs.length} câu)</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[8px] font-black tracking-wider text-slate-450 block uppercase">Nộp Thi Thử Mock Gần Nhất:</span>
                  {mockHistory.length === 0 ? (
                    <p className="text-[8.5px] text-slate-450 italic m-0">Chưa ghi nhận bài thi thử nào để xếp lịch học bạ.</p>
                  ) : (
                    <div className="space-y-1 max-h-24 overflow-y-auto">
                      {mockHistory.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-[8.5px] font-semibold text-slate-600 bg-slate-50 px-2 py-1 rounded-md">
                          <span>{item.timestamp}</span>
                          <span className="font-extrabold">Đúng {item.correctCount}/{item.total} câu (Điểm: {item.score.toFixed(1)}đ)</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

      {/* 
        PRINTABLE ACADEMIC RECORD CERTIFICATE (VISIBLE ONLY DURING PRINTING) 
        Uses Tailwind's print: utilities to render a ultra-polished A4 paper layout.
      */}
      <div className="hidden print:block absolute inset-0 w-full h-full bg-white text-slate-900 p-8 font-serif" id="print-academic-record">
        
        {/* CERTIFICATE PAGE (Page 1) */}
        <div className="w-full h-[297mm] max-h-[297mm] p-12 border-[16px] border-double border-amber-500 bg-amber-50/5 flex flex-col justify-between relative box-border" style={{ pageBreakAfter: "always" }}>
          
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-4 left-4 text-amber-500 font-serif text-3xl font-light">⚜</div>
          <div className="absolute top-4 right-4 text-amber-500 font-serif text-3xl font-light">⚜</div>
          <div className="absolute bottom-4 left-4 text-amber-500 font-serif text-3xl font-light">⚜</div>
          <div className="absolute bottom-4 right-4 text-amber-500 font-serif text-3xl font-light">⚜</div>

          {/* Header National & Academic Title */}
          <div className="text-center space-y-1">
            <h4 className="text-xs font-black tracking-widest uppercase text-slate-800 m-0 font-sans">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h4>
            <p className="text-[9px] font-bold tracking-wider text-slate-600 m-0 font-sans">Độc lập - Tự do - Hạnh phúc</p>
            <div className="w-48 h-0.5 bg-amber-500 mx-auto mt-1.5 opacity-60"></div>
          </div>

          <div className="text-center space-y-1 mt-4">
            <h5 className="text-[9px] font-black uppercase tracking-widest text-slate-500 m-0 font-sans">HỆ THỐNG THI THỬ & KHẢO THÍ HỌC THUẬT TIÊU CHUẨN</h5>
            <h2 className="text-xl font-black text-slate-900 tracking-tight m-0 font-sans">{currentSubject === 'vnu1001' ? "CỔNG LUYỆN THI TRẮC NGHIỆM TIÊU CHUẨN VNU1001" : "CỔNG LUYỆN THI PHÁP LUẬT ĐẠI CƯƠNG PRO"}</h2>
          </div>

          {/* Core Certificate Body */}
          <div className="text-center space-y-6 my-auto">
            <div className="mx-auto w-16 h-16 flex items-center justify-center text-amber-500 bg-amber-100/20 border border-amber-300 rounded-full shadow-inner">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl font-black tracking-widest text-amber-600 uppercase m-0 font-sans">CHỨNG NHẬN HOÀN THÀNH</h1>
              <span className="text-[9px] font-semibold text-slate-500 tracking-widest uppercase block">CERTIFICATE OF COMPLETION OF STUDY</span>
            </div>

            <p className="text-[11px] font-medium italic text-slate-600 max-w-lg mx-auto leading-relaxed my-0">
              Ban quản lý chương trình bồi dưỡng và kiểm tra kiến thức {currentSubject === 'vnu1001' ? "Kỹ năng số VNU1001" : "Pháp luật đại cương"} chứng nhận:
            </p>

            <div className="space-y-1 py-1">
              <span className="text-xl font-black text-slate-900 font-sans border-b-2 border-dashed border-slate-400 px-8 pb-1 inline-block">
                {certFullName || `Học viên ${currentSubject === 'vnu1001' ? "VNU1001" : "Pháp Luật"}`}
              </span>
              <span className="text-[9px] text-slate-400 tracking-widest uppercase block mt-1">Họ tên học viên / Candidate Name</span>
            </div>

            <p className="text-[10px] font-semibold text-slate-705 max-w-md mx-auto leading-relaxed font-sans">
              {currentSubject === 'vnu1001' 
                ? "Đã kết thúc lộ trình khảo thí trực tuyến gồm 6 học phần kỹ năng số, thực hành trả lời câu hỏi phân loại ngẫu nhiên bám sát Khung năng lực số chuẩn Đại học Quốc Gia."
                : "Đã hoàn thành xuất sắc hệ thống 6 chuyên đề lý thuyết và giải thích loại trừ trực tiếp, nắm vững kiến thức căn bản về Nhà nước, Hệ thống pháp luật và các ngành luật ở Việt Nam."}
            </p>

            {/* Micro Metrics Badges in certificate */}
            <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto pt-4 font-sans">
              <div className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-center">
                <span className="text-[8px] text-slate-400 uppercase font-black tracking-wider block">Hoàn thành chung</span>
                <span className="text-sm font-extrabold text-blue-600">{stats.overallCompletion}%</span>
              </div>
              <div className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-center">
                <span className="text-[8px] text-slate-400 uppercase font-black tracking-wider block">Tỷ lệ chính xác</span>
                <span className="text-sm font-extrabold text-emerald-600">{stats.accuracy}%</span>
              </div>
              <div className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-center">
                <span className="text-[8px] text-slate-400 uppercase font-black tracking-wider block">Quá trình luyện</span>
                <span className="text-sm font-extrabold text-indigo-600">{stats.totalAnswered}/{fullDatabase.length}c</span>
              </div>
            </div>
          </div>

          {/* Certificate Footer Stamp & Signatures */}
          <div className="flex justify-between items-end pt-8 font-sans">
            <div className="text-left space-y-0.5">
              <span className="text-[9px] text-slate-400 font-bold block">Xác thực hệ thống ôn luyện tự động:</span>
              <span className="text-[10px] font-mono text-slate-600 font-bold block">ID: {Date.now().toString(36).toUpperCase()}</span>
              <span className="text-[9px] text-slate-500 font-bold block">Ngày ký: {new Date().toLocaleDateString("vi-VN")}</span>
            </div>

            <div className="text-center relative pr-4">
              {/* Decorative Stamp Element */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-16 h-16 border-4 border-dashed border-red-500 rounded-full flex items-center justify-center -rotate-12 opacity-50 pointer-events-none select-none">
                <span className="text-[7px] font-black text-red-500 leading-tight text-center uppercase tracking-widest">VNU1001<br/>ONLINE<br/>PORTAL</span>
              </div>
              
              <span className="text-[10px] text-slate-650 font-black block">BAN QUẢN TRỊ CỔNG HỌC SỐ PHÁT TRIỂN NĂNG LỰC</span>
              <span className="text-[8px] italic text-slate-400 block mt-0.5">(Đã ký số phê duyệt / Digitally Signed)</span>
              <span className="text-[11px] font-black font-sans text-indigo-700 tracking-tight block mt-6">HỌC HIỆU SỐ VIỆT NAM</span>
            </div>
          </div>
        </div>

        {/* TRANSCRIPT PAGE (Page 2) */}
        <div className="w-full h-[297mm] max-h-[297mm] p-12 border-[12px] border-slate-200 bg-white flex flex-col justify-between box-border" style={{ pageBreakAfter: "auto" }}>
          <div className="space-y-6">
            
            {/* Transcript Title */}
            <div className="flex justify-between items-center pb-4 border-b-2 border-slate-300">
              <div className="text-left space-y-0.5 font-sans">
                <h3 className="text-sm font-black uppercase text-slate-900 m-0">HỌC BẠ ĐIỆN TỬ - CHI TIẾT TIẾN ĐỘ & HIỆU SUẤT KHẢO THÍ</h3>
                <p className="text-[9px] text-slate-500 font-bold m-0">Detailed Academic Record & Skill Testing Profile - {currentSubject === 'vnu1001' ? 'VNU1001' : 'PLDC'}</p>
              </div>
              <div className="text-right text-[9px] text-slate-400 font-bold font-mono">
                BÁO CÁO CHI TIẾT SỐ LƯU
              </div>
            </div>

            {/* Candidate summary */}
            <div className="grid grid-cols-2 gap-4 text-[11px] font-sans py-2 bg-slate-50 rounded-xl p-4 border border-slate-100">
              <div>
                <span className="text-slate-400 font-bold block uppercase text-[8px] tracking-wide">Học viên ôn học:</span>
                <span className="font-extrabold text-slate-800">{certFullName || `Học viên ${currentSubject === 'vnu1001' ? "VNU1001" : "Pháp Luật"}`}</span>
              </div>
              <div>
                <span className="text-slate-400 font-bold block uppercase text-[8px] tracking-wide">Tài khoản xác thực liên kết:</span>
                <span className="font-mono text-slate-700">{"atemday997@gmail.com"}</span>
              </div>
              <div>
                <span className="text-slate-400 font-bold block uppercase text-[8px] tracking-wide">Chuỗi ngày vàng vàng (Streak):</span>
                <span className="font-extrabold text-slate-800">{streakDays} ngày liên tiếp (Kỷ lục: {maxStreak} ngày)</span>
              </div>
              <div>
                <span className="text-slate-400 font-bold block uppercase text-[8px] tracking-wide">Tổng thời gian ôn luyện tích lũy:</span>
                <span className="font-extrabold text-slate-800">{formatStudyTime((Object.values(studyTimes) as number[]).reduce((sum: number, t: number) => sum + t, 0))}</span>
              </div>
            </div>

            {/* Core Chapters report table */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-800 m-0 font-sans">1. ĐIỂM CHUYÊN ĐỀ PHÂN TÍCH (MODULE-WISE EVALUATION)</h4>
              <table className="w-full text-left text-[10px] font-sans border-collapse border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-black text-[8px] uppercase">
                    <th className="p-2 border border-slate-200">Mã</th>
                    <th className="p-2 border border-slate-200">Tên Chuyên Đề Học Phần</th>
                    <th className="p-2 border border-slate-200 text-center">Đã Trả Lời</th>
                    <th className="p-2 border border-slate-200 text-center">Tỷ Lệ Đúng LT</th>
                    <th className="p-2 border border-slate-200 text-right">Tổng Thời Gian Luyện</th>
                  </tr>
                </thead>
                <tbody>
                  {topicDetails.map(topic => {
                    const timeVal = studyTimes[topic.id] || 0;
                    const topicQs = fullDatabase.filter(q => q.topicId === topic.id);
                    const answeredInTopic = topicQs.filter(q => answeredHistory[q.id] !== undefined).length;
                    const correctPractice = topicQs.filter(q => answeredHistory[q.id]?.correct).length;
                    const practiceRate = answeredInTopic > 0 ? Math.round((correctPractice / answeredInTopic) * 100) : 0;
                    
                    return (
                      <tr key={topic.id} className="hover:bg-slate-50 font-medium text-slate-700 text-[10px]">
                        <td className="p-2 border border-slate-150 font-bold py-2.5">Bài {topic.id}</td>
                        <td className="p-2 border border-slate-150 font-bold text-slate-900">{topic.name}</td>
                        <td className="p-2 border border-slate-150 text-center font-bold text-slate-800">{answeredInTopic} / {topicQs.length}</td>
                        <td className="p-2 border border-slate-150 text-center"><span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold">{practiceRate}%</span></td>
                        <td className="p-2 border border-slate-150 text-right font-mono font-semibold text-slate-500">{formatStudyTime(timeVal)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mock exams record listing */}
            <div className="space-y-2 pt-4">
              <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-800 m-0 font-sans">2. LỊCH SỬ THI THỬ MOCK EXAM CHRONOLOGICAL (CHRONOLOGICAL TRIAL RESULTS)</h4>
              <table className="w-full text-left text-[10px] font-sans border-collapse border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-black text-[8px] uppercase">
                    <th className="p-2 border border-slate-200">STT</th>
                    <th className="p-2 border border-slate-200">Thời Gian Nộp Bài</th>
                    <th className="p-2 border border-slate-200 text-center">Số Câu Đúng</th>
                    <th className="p-2 border border-slate-200 text-center">Thời Gian Làm</th>
                    <th className="p-2 border border-slate-200 text-center">Điểm Mock</th>
                    <th className="p-2 border border-slate-200 text-right">Trạng Thái</th>
                  </tr>
                </thead>
                <tbody>
                  {mockHistory.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-4 border border-slate-150 text-center text-slate-400 italic">Chưa thực hiện lượt thi thử Mock Exam tính điểm nào.</td>
                    </tr>
                  ) : (
                    mockHistory.slice(0, 10).map((historyItem, idx) => (
                      <tr key={historyItem.id || idx} className="hover:bg-slate-50 font-medium text-slate-700">
                        <td className="p-2 border border-slate-150 text-slate-400">{idx + 1}</td>
                        <td className="p-2 border border-slate-150 text-slate-800">{historyItem.timestamp}</td>
                        <td className="p-2 border border-slate-150 text-center">{historyItem.correctCount} / {historyItem.total}</td>
                        <td className="p-2 border border-slate-150 text-center font-mono">{historyItem.timeSpent}</td>
                        <td className="p-2 border border-slate-150 text-center font-bold text-slate-900">{historyItem.score.toFixed(1)} / 10đ</td>
                        <td className="p-2 border border-slate-150 text-right">
                          <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${
                            historyItem.passed ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"
                          }`}>
                            {historyItem.passed ? "ĐẠT" : "CHƯA ĐẠT"}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>

          {/* Transcript Footer */}
          <div className="flex justify-between items-center pt-6 border-t border-slate-300 text-[9px] font-sans font-bold text-slate-400">
            <span>Báo cáo điện tử tự sinh từ ứng dụng VNU1001 Portal</span>
            <span>Bổ sung chứng từ học thuật hợp lệ</span>
          </div>
        </div>

      </div>

      {/* Custom Alert/Confirm Modal for iFrame Environments */}
      <AnimatePresence>
        {modalConfig && modalConfig.isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.15 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 max-w-sm w-full space-y-5"
            >
              <div className="space-y-3">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                  {modalConfig.type === 'confirm' ? (
                    <AlertCircle className="w-5 h-5 text-indigo-500 shrink-0" />
                  ) : (
                    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                  )}
                  {modalConfig.title}
                </h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed whitespace-pre-line">
                  {modalConfig.message}
                </p>
              </div>
              <div className="flex justify-end gap-2.5 pt-1">
                {modalConfig.type === 'confirm' && (
                  <button
                    type="button"
                    onClick={() => {
                      if (modalConfig.onCancel) modalConfig.onCancel();
                      setModalConfig(null);
                    }}
                    className="px-4 py-2 rounded-xl text-[11px] font-black bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer select-none border border-transparent"
                  >
                    {modalConfig.cancelText || "Hủy bỏ"}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    if (modalConfig.onOk) modalConfig.onOk();
                    setModalConfig(null);
                  }}
                  className="px-4.5 py-2 rounded-xl text-[11px] font-black bg-slate-900 hover:bg-slate-950 text-white transition cursor-pointer select-none shadow border border-transparent"
                >
                  {modalConfig.okText || "Đồng ý"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
