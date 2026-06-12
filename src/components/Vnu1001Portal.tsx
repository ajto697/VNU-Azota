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
  Sun, Moon, Trash2, Plus, Download, Upload, Shuffle,
  Trophy, Users, Target, Settings
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
import { getFullMLDGDatabase, MLDG_TOPICS } from '../mldg_questions';
import { getFullTLHGDDatabase, TLHGD_TOPICS } from '../tlhgd_questions';
import { getFullKHQLGDatabase, KHQLGD_TOPICS } from '../khqlgd_questions';
import DetailedExplanationBox from './DetailedExplanationBox';
import { PLDC_EXAMS_PART1, PLDCOfficialExam } from '../pldc_exams_part1';
import { PLDC_EXAMS_PART2 } from '../pldc_exams_part2';
import { PLDC_EXAMS_PART3 } from '../pldc_exams_part3';

const ALL_PLDC_EXAMS: PLDCOfficialExam[] = [
  ...PLDC_EXAMS_PART1,
  ...PLDC_EXAMS_PART2,
  ...PLDC_EXAMS_PART3
];

function synchronizeDatabase(savedList: VNUQuestion[], masterList: VNUQuestion[]): VNUQuestion[] {
  const masterMap = new Map<string, VNUQuestion>(masterList.map(q => [q.id, q]));
  const seenMasterIds = new Set<string>();
  const result: VNUQuestion[] = [];

  for (const q of savedList) {
    if (masterMap.has(q.id)) {
      result.push(masterMap.get(q.id)!);
      seenMasterIds.add(q.id);
    } else {
      result.push(q);
    }
  }

  for (const q of masterList) {
    if (!seenMasterIds.has(q.id)) {
      result.push(q);
    }
  }

  return result;
}

function getShuffledOptions(q: VNUQuestion, enabled: boolean): { options: string[], correctOptionIndex: number, originalToShuffled: number[], shuffledToOriginal: number[] } {
  if (!q || !Array.isArray(q.options) || q.options.length !== 4) {
    return {
      options: q ? q.options || [] : [],
      correctOptionIndex: q ? q.correctOption : 0,
      originalToShuffled: [0, 1, 2, 3],
      shuffledToOriginal: [0, 1, 2, 3]
    };
  }

  if (!enabled) {
    return {
      options: q.options,
      correctOptionIndex: q.correctOption,
      originalToShuffled: [0, 1, 2, 3],
      shuffledToOriginal: [0, 1, 2, 3]
    };
  }

  // Deterministic shuffle using a hash of the question's ID.
  let hash = 0;
  const str = q.id || "";
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const pseudoRandom = () => {
    const x = Math.sin(hash++) * 10000;
    return x - Math.floor(x);
  };

  const pairs = q.options.map((opt, idx) => ({ opt, originalIndex: idx }));
  
  for (let i = pairs.length - 1; i > 0; i--) {
     const j = Math.floor(pseudoRandom() * (i + 1));
     const temp = pairs[i];
     pairs[i] = pairs[j];
     pairs[j] = temp;
  }

  const shuffledOptions = pairs.map(p => p.opt);
  const shuffledToOriginal = pairs.map(p => p.originalIndex);
  const originalToShuffled = new Array(4);
  shuffledToOriginal.forEach((origIdx, shufIdx) => {
    originalToShuffled[origIdx] = shufIdx;
  });

  const correctOptionIndex = originalToShuffled[q.correctOption] ?? q.correctOption;

  return {
    options: shuffledOptions,
    correctOptionIndex,
    originalToShuffled,
    shuffledToOriginal
  };
}

// Generate realistic competitor entries for the mock exam leaderboard
const generateMockCompetitors = (totalQuestions: number, userScore: number, userTimeSpentSec: number) => {
  const baseCompetitors = [
    { name: "Phạm Hoàng Sơn", className: "K68-CNTT VNU", accRate: 0.975 },
    { name: "Lê Nhật Linh", className: "K69-Địa lý học", accRate: 0.95 },
    { name: "Trần Thế Phong", className: "K68-Khoa học Máy tính", accRate: 0.925 },
    { name: "Nguyễn Vũ Minh Anh", className: "K68-Tài chính Doanh nghiệp", accRate: 0.90 },
    { name: "Bùi Thị Phương Thảo", className: "K69-Ngôn ngữ Anh", accRate: 0.875 },
    { name: "Đặng Gia Huy", className: "K67-Xã hội học VNU", accRate: 0.85 },
    { name: "Vũ Quốc Khánh", className: "K68-Luật dân sự", accRate: 0.80 },
    { name: "Phạm Thúy Diễm", className: "K69-Quản trị Khách sạn", accRate: 0.775 },
    { name: "Đỗ Anh Tài", className: "K68-Cơ kỹ thuật", accRate: 0.725 },
    { name: "Nguyễn Ngọc Huy", className: "K69-Kế toán", accRate: 0.675 },
    { name: "Hoàng Minh Trí", className: "K68-Sinh học VNU", accRate: 0.60 },
    { name: "Phùng Mỹ Linh", className: "K67-Sư phạm Hóa", accRate: 0.525 },
    { name: "Đinh Văn Khoa", className: "K69-Vật lý kĩ thuật", accRate: 0.45 },
  ];

  return baseCompetitors.map((bc, idx) => {
    const correctCount = Math.round(totalQuestions * bc.accRate);
    const score = (correctCount / totalQuestions) * 10;
    // Fast or medium completion times, staggered
    const timeSpentSec = Math.round(800 - (bc.accRate * 250) + (idx * 45) + Math.random() * 30);
    const mins = Math.floor(timeSpentSec / 60);
    const secs = timeSpentSec % 60;
    const timeSpentStr = `${mins} phút ${secs} giây`;

    const colors = [
      "bg-emerald-500 text-white", "bg-purple-500 text-white", "bg-amber-500 text-white", 
      "bg-pink-500 text-white", "bg-sky-500 text-white", "bg-orange-500 text-white", 
      "bg-teal-500 text-white", "bg-violet-500 text-white", "bg-rose-500 text-white"
    ];
    const avatarBg = colors[idx % colors.length];

    return {
      name: bc.name,
      className: bc.className,
      correctCount,
      totalCount: totalQuestions,
      score,
      timeSpentSec,
      timeSpentStr,
      avatarBg,
      isVirtual: true,
    };
  });
};

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
  const [currentSubject, setCurrentSubject] = useState<'vnu1001' | 'pldc' | 'mldg' | 'tlhgd' | 'khqlgd'>(() => {
    try {
      const saved = localStorage.getItem("selected_subject_pldc_v1");
      if (saved === 'pldc' || saved === 'vnu1001' || saved === 'mldg' || saved === 'tlhgd' || saved === 'khqlgd') {
        return saved as 'vnu1001' | 'pldc' | 'mldg' | 'tlhgd' | 'khqlgd';
      }
    } catch (e) {}
    return 'vnu1001';
  });

  // --- SMART SHADOWS FOR PERFECT COMPATIBILITY ---
  const getFullVNU1001Database = () => {
    if (currentSubject === 'vnu1001') return getFullVNU1001Database_IMPORT();
    if (currentSubject === 'pldc') return getFullPLDCDatabase();
    if (currentSubject === 'mldg') return getFullMLDGDatabase();
    if (currentSubject === 'tlhgd') return getFullTLHGDDatabase();
    return getFullKHQLGDatabase();
  };

  const VNU_TOPICS = currentSubject === 'vnu1001' 
    ? VNU_TOPICS_IMPORT 
    : currentSubject === 'pldc' 
      ? PLDC_TOPICS 
      : currentSubject === 'mldg'
        ? MLDG_TOPICS
        : currentSubject === 'tlhgd'
          ? TLHGD_TOPICS
          : KHQLGD_TOPICS;

  // --- DYNAMIC DATABASE STATE ENGINE ---
  const [activeDatabase, setActiveDatabase] = useState<VNUQuestion[]>(() => {
    const savedSubject = (() => {
      try {
        const saved = localStorage.getItem("selected_subject_pldc_v1");
        if (saved === 'pldc' || saved === 'vnu1001' || saved === 'mldg' || saved === 'tlhgd' || saved === 'khqlgd') return saved as 'vnu1001' | 'pldc' | 'mldg' | 'tlhgd' | 'khqlgd';
      } catch (e) {}
      return 'vnu1001';
    })();

    const getMasterDbForSubject = (subj: 'vnu1001' | 'pldc' | 'mldg' | 'tlhgd' | 'khqlgd'): VNUQuestion[] => {
      if (subj === 'pldc') return getFullPLDCDatabase();
      if (subj === 'mldg') return getFullMLDGDatabase();
      if (subj === 'tlhgd') return getFullTLHGDDatabase();
      if (subj === 'khqlgd') return getFullKHQLGDatabase();
      return getFullVNU1001Database_IMPORT();
    };

    try {
      const key = savedSubject === 'pldc' 
        ? "pldc_custom_database_v1" 
        : savedSubject === 'mldg'
          ? "mldg_custom_database_v1"
          : savedSubject === 'tlhgd'
            ? "tlhgd_custom_database_v1"
            : savedSubject === 'khqlgd'
              ? "khqlgd_custom_database_v1"
              : "vnu1001_custom_database_v1";
      const saved = localStorage.getItem(key);
      const masterList = getMasterDbForSubject(savedSubject);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const masterIds = new Set(masterList.map(q => q.id));
          const savedIds = new Set(parsed.map(q => q.id));
          let needSync = false;
          for (const mId of masterIds) {
            if (!savedIds.has(mId)) {
              needSync = true;
              break;
            }
          }
          if (needSync) {
            const synched = synchronizeDatabase(parsed, masterList);
            try {
              localStorage.setItem(key, JSON.stringify(synched));
            } catch (err) {}
            return synched;
          }
          return parsed;
        }
      }
    } catch (e) {
      console.error("Lỗi tải đề thi tùy chỉnh:", e);
    }
    // Mặc định: Nạp sẵn đề thi tương ứng
    if (savedSubject === 'pldc') return getFullPLDCDatabase();
    if (savedSubject === 'mldg') return getFullMLDGDatabase();
    if (savedSubject === 'tlhgd') return getFullTLHGDDatabase();
    if (savedSubject === 'khqlgd') return getFullKHQLGDatabase();
    return getFullVNU1001Database_IMPORT();
  });

  const fullDatabase = activeDatabase;

  // Workspace subviews: 'dashboard' | 'practice' | 'mock_exam' | 'bookmarks' | 'exam_result' | 'importer'
  const [activeTab, setActiveTab] = useState<'dashboard' | 'practice' | 'mock_exam' | 'bookmarks' | 'exam_result' | 'importer'>('dashboard');
  
  // Tabbed sidebar focus in practice mode
  const [sidebarActiveTab, setSidebarActiveTab] = useState<'questions' | 'tools' | 'settings'>('questions');

  // --- LOCAL STATE ENGINE ---
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_THEME_KEY);
      return saved !== "light"; // Default to dark mode (true) unless explicitly toggled to light previously
    } catch (e) {
      return true;
    }
  });
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [answeredHistory, setAnsweredHistory] = useState<{ [qId: string]: { correct: boolean; chosenOption: number } }>({});
  const [streakDays, setStreakDays] = useState<number>(3); // seeded default
  const [maxStreak, setMaxStreak] = useState<number>(3); // seeded max streak default
  const [completedDates, setCompletedDates] = useState<string[]>([]); // array of YYYY-MM-DD
  const [todayPracticedCount, setTodayPracticedCount] = useState<number>(0);
  const [todayMockSubmitted, setTodayMockSubmitted] = useState<boolean>(false);
  const [reminderTime, setReminderTime] = useState<string>("20:00");
  const [reminderActive, setReminderActive] = useState<boolean>(true);
  const [streakEnabled, setStreakEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem("vnu1001_streak_enabled_v1");
    return saved !== "false";
  });
  const [streakToasts, setStreakToasts] = useState<{ id: string; message: string; type: 'success' | 'warning' | 'info' }[]>([]);

  const addStreakToast = (message: string, type: 'success' | 'warning' | 'info' = 'success') => {
    if (localStorage.getItem("vnu1001_streak_enabled_v1") === "false") return;
    const id = "toast_" + Date.now() + "_" + Math.random();
    setStreakToasts(prev => [...prev, { id, message, type }]);
    
    // Auto remove toast after 4.5 seconds
    setTimeout(() => {
      setStreakToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

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
        const key = currentSubject === 'pldc' 
          ? "pldc_custom_database_v1" 
          : currentSubject === 'mldg'
            ? "mldg_custom_database_v1"
            : currentSubject === 'tlhgd'
              ? "tlhgd_custom_database_v1"
              : currentSubject === 'khqlgd'
                ? "khqlgd_custom_database_v1"
                : "vnu1001_custom_database_v1";
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
    const subjectPrefixName = currentSubject === 'vnu1001' 
      ? "600 câu hỏi chuẩn VNU1001" 
      : currentSubject === 'pldc'
        ? "câu hỏi Pháp Luật Đại Cương chuẩn"
        : currentSubject === 'mldg'
          ? "câu hỏi Nhập môn đo lường đánh giá chuẩn"
          : currentSubject === 'tlhgd'
            ? "câu hỏi Tâm lý học học đường chuẩn"
            : "câu hỏi Khoa học quản lý trong giáo dục chuẩn";
    const key = currentSubject === 'pldc' 
      ? "pldc_custom_database_v1" 
      : currentSubject === 'mldg'
        ? "mldg_custom_database_v1"
        : currentSubject === 'tlhgd'
          ? "tlhgd_custom_database_v1"
          : currentSubject === 'khqlgd'
            ? "khqlgd_custom_database_v1"
            : "vnu1001_custom_database_v1";
    customConfirm(
      `Bạn có chắc chắn muốn khôi phục lại ngân hàng ${subjectPrefixName}? Toàn bộ các câu hỏi tự tạo hoặc tải lên của bạn sẽ bị xóa khỏi bộ nhớ.`,
      () => {
        const defaultDb = currentSubject === 'vnu1001' 
          ? getFullVNU1001Database_IMPORT() 
          : currentSubject === 'pldc'
            ? getFullPLDCDatabase()
            : currentSubject === 'mldg'
              ? getFullMLDGDatabase()
              : currentSubject === 'tlhgd'
                ? getFullTLHGDDatabase()
                : getFullKHQLGDatabase();
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
  const [showPracticeResult, setShowPracticeResult] = useState<boolean>(false);
  const [practiceExamMode, setPracticeExamMode] = useState<boolean>(false);
  const [practiceTempAnswers, setPracticeTempAnswers] = useState<{ [qId: string]: number }>({});

  const [shuffleOptions, setShuffleOptions] = useState<boolean>(() => {
    const saved = localStorage.getItem("vnu1001_shuffle_options_v1");
    return saved !== null ? saved === "true" : true;
  });

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
  const [currentOfficialExamId, setCurrentOfficialExamId] = useState<string | null>(null);
  const [pldcSearchQuery, setPldcSearchQuery] = useState<string>('');
  const [examLeaderboard, setExamLeaderboard] = useState<any[]>([]);
  const [leaderboardSearchQuery, setLeaderboardSearchQuery] = useState<string>('');

  // Practice competitor list - dynamically synced to user's correct rate in current topic
  const practiceLeaderboard = useMemo(() => {
    const topicQs = fullDatabase.filter(q => q.topicId === selectedTopic);
    const totalCount = topicQs.length;
    if (totalCount === 0) return [];

    const userCorrectCount = topicQs.filter(q => answeredHistory[q.id]?.correct).length;

    const baseCompetitors = [
      { name: "Phạm Minh Đức", className: "K68-CNTT 2", accRate: 0.94 },
      { name: "Trần Thị Mai Anh", className: "K69-Sư phạm Toán", accRate: 0.86 },
      { name: "Lê Gia Bảo", className: "K68-Kinh tế Đối ngoại", accRate: 0.78 },
      { name: "Nguyễn Thảo Vy", className: "K69-Khoa học Máy tính", accRate: 0.70 },
      { name: "Đặng Hoàng Long", className: "K68-Y đa khoa", accRate: 0.62 },
      { name: "Vũ Khánh Linh", className: "K69-Ngôn ngữ Trung", accRate: 0.50 },
      { name: "Bùi Tiến Phát", className: "K67-Kỹ thuật Điện", accRate: 0.40 },
    ];

    const list = baseCompetitors.map((bc, idx) => {
      const correctCount = Math.min(totalCount, Math.round(totalCount * bc.accRate));
      const completionRate = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
      const colors = [
        "bg-teal-500 text-white", "bg-indigo-500 text-white", "bg-purple-500 text-white", "bg-pink-500 text-white", 
        "bg-amber-500 text-white", "bg-rose-500 text-white", "bg-sky-500 text-white"
      ];
      return {
        name: bc.name,
        className: bc.className,
        correctCount,
        completionRate,
        avatarBg: colors[idx % colors.length],
        isVirtual: true
      };
    });

    const userCompletionRate = totalCount > 0 ? Math.round((userCorrectCount / totalCount) * 100) : 0;
    list.push({
      name: "Bạn (Cá nhân)",
      className: "Học viên tự luyện",
      correctCount: userCorrectCount,
      completionRate: userCompletionRate,
      avatarBg: "bg-blue-600 text-white ring-2 ring-blue-300 ring-offset-1 font-bold",
      isVirtual: false
    });

    list.sort((a, b) => b.correctCount - a.correctCount);

    return list.map((item, idx) => ({ ...item, rank: idx + 1 }));
  }, [selectedTopic, answeredHistory, fullDatabase]);

  // --- SWITCH SUBJECT UTILITY HANDLER ---
  const handleSwitchSubject = (subject: 'vnu1001' | 'pldc' | 'mldg' | 'tlhgd' | 'khqlgd') => {
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
      const key = subject === 'pldc' 
        ? "pldc_custom_database_v1" 
        : subject === 'mldg'
          ? "mldg_custom_database_v1"
          : subject === 'tlhgd'
            ? "tlhgd_custom_database_v1"
            : subject === 'khqlgd'
              ? "khqlgd_custom_database_v1"
              : "vnu1001_custom_database_v1";
      const saved = localStorage.getItem(key);
      const masterList = subject === 'pldc'
        ? getFullPLDCDatabase()
        : subject === 'mldg'
          ? getFullMLDGDatabase()
          : subject === 'tlhgd'
            ? getFullTLHGDDatabase()
            : subject === 'khqlgd'
              ? getFullKHQLGDatabase()
              : getFullVNU1001Database_IMPORT();

      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const masterIds = new Set(masterList.map(q => q.id));
          const savedIds = new Set(parsed.map(q => q.id));
          let needSync = false;
          for (const mId of masterIds) {
            if (!savedIds.has(mId)) {
              needSync = true;
              break;
            }
          }
          if (needSync) {
            const synched = synchronizeDatabase(parsed, masterList);
            try {
              localStorage.setItem(key, JSON.stringify(synched));
            } catch (err) {}
            setActiveDatabase(synched);
          } else {
            setActiveDatabase(parsed);
          }
          return;
        }
      }
    } catch (e) {}

    if (subject === 'pldc') {
      setActiveDatabase(getFullPLDCDatabase());
    } else if (subject === 'mldg') {
      setActiveDatabase(getFullMLDGDatabase());
    } else if (subject === 'tlhgd') {
      setActiveDatabase(getFullTLHGDDatabase());
    } else if (subject === 'khqlgd') {
      setActiveDatabase(getFullKHQLGDatabase());
    } else {
      setActiveDatabase(getFullVNU1001Database_IMPORT());
    }
  };


  // --- POMODORO CLOCK ENGINE ---
  const [pomoMinutes, setPomoMinutes] = useState<number>(25); // configured focus minutes
  const [pomoTimeLeft, setPomoTimeLeft] = useState<number>(1500); // 25 minutes default in seconds
  const [pomoIsActive, setPomoIsActive] = useState<boolean>(false);
  const [pomoMode, setPomoMode] = useState<'focus' | 'break'>('focus');
  const [pomoCompletedSessions, setPomoCompletedSessions] = useState<number>(0);

  // Filter official PLDC exams based on search query
  const filteredOfficialExams = useMemo(() => {
    if (!pldcSearchQuery.trim()) return ALL_PLDC_EXAMS;
    const q = pldcSearchQuery.toLowerCase();
    return ALL_PLDC_EXAMS.filter(exam => 
      exam.title.toLowerCase().includes(q) || 
      exam.description.toLowerCase().includes(q)
    );
  }, [pldcSearchQuery]);

  // Aggregate user attempts for official exams
  const getExamStats = (examId: string) => {
    const attempts = mockHistory.filter(h => h.examId === examId);
    if (attempts.length === 0) return { attempts: 0, highScore: null, passed: false };
    const scores = attempts.map(h => h.score);
    const highScore = Math.max(...scores);
    const passed = attempts.some(h => h.passed);
    return { attempts: attempts.length, highScore, passed };
  };

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

  // Self-healing effect for Azota Leaderboard in case page switches without direct submission (or refresh)
  useEffect(() => {
    if (activeTab === 'exam_result' && examSavedResult && examLeaderboard.length === 0) {
      const totalQs = mockQuestions.length > 0 ? mockQuestions.length : examSavedResult.total;
      const finalScore = examSavedResult.score;
      const correctCount = examSavedResult.correctCount;
      const timeSpentStr = examSavedResult.timeSpent || "12 phút 30 giây";
      
      let timeSpentSec = 750;
      try {
        const parts = timeSpentStr.split(" phút ");
        if (parts.length === 2) {
          const mins = parseInt(parts[0], 10);
          const secs = parseInt(parts[1].split(" giây")[0], 10);
          timeSpentSec = mins * 60 + secs;
        }
      } catch (e) {}

      const virtuals = generateMockCompetitors(totalQs, finalScore, timeSpentSec);
      const userCompetitor = {
        name: "Bạn (Cá nhân)",
        className: currentSubject === 'vnu1001' 
          ? "Kỳ thi thử Kỹ năng số" 
          : currentSubject === 'pldc'
            ? "Kỳ thi Pháp luật đại cương"
            : currentSubject === 'mldg'
              ? "Kỳ thi Đo lường đánh giá"
              : "Kỳ thi Tâm lý học",
        correctCount,
        totalCount: totalQs,
        score: finalScore,
        timeSpentSec,
        timeSpentStr,
        avatarBg: "bg-blue-600 text-white ring-2 ring-blue-300 ring-offset-1 font-bold",
        isVirtual: false,
      };

      const combined = [...virtuals, userCompetitor];
      combined.sort((a, b) => {
        if (Math.abs(b.score - a.score) > 0.01) return b.score - a.score;
        return a.timeSpentSec - b.timeSpentSec;
      });

      const ranked = combined.map((item, idx) => ({ ...item, rank: idx + 1 }));
      setExamLeaderboard(ranked);
    }
  }, [activeTab, examSavedResult]);

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

      // --- STREAK CONFIGURATION AND REAL-TIME SYNCS ---
      const savedReminderTime = localStorage.getItem("vnu1001_streak_reminder_time_v1");
      if (savedReminderTime) setReminderTime(savedReminderTime);
      const savedReminderActive = localStorage.getItem("vnu1001_streak_reminder_active_v1");
      if (savedReminderActive) setReminderActive(savedReminderActive === "true");

      const todayStr = getTodayString();
      const savedLastDate = localStorage.getItem("vnu1001_last_active_date_v1");
      if (savedLastDate !== todayStr) {
        localStorage.setItem("vnu1001_last_active_date_v1", todayStr);
        setTodayPracticedCount(0);
        localStorage.setItem("vnu1001_today_practiced_v1", "0");
        setTodayMockSubmitted(false);
        localStorage.setItem("vnu1001_today_mock_submitted_v1", "false");
        // Show motivational welcome toast for a brand new day
        setTimeout(() => {
          addStreakToast(`🌅 Chào mừng ngày mới! Hãy củng cố và bảo vệ Streak ${localStorage.getItem(STORAGE_STREAK_KEY) || 3} ngày của bạn hôm nay nhé.`, "info");
        }, 1500);
      } else {
        const savedPracticed = localStorage.getItem("vnu1001_today_practiced_v1");
        if (savedPracticed) setTodayPracticedCount(parseInt(savedPracticed, 10));
        const savedMockSubbed = localStorage.getItem("vnu1001_today_mock_submitted_v1");
        if (savedMockSubbed) setTodayMockSubmitted(savedMockSubbed === "true");
        
        // Friendly reminder toast if streak tasks are incomplete
        setTimeout(() => {
          const count = savedPracticed ? parseInt(savedPracticed, 10) : 0;
          if (count < 3) {
            addStreakToast(`🔥 Đừng quên hoàn thành thêm ${3 - count} câu ôn luyện để gia cố chuỗi Streak!`, "warning");
          } else {
            addStreakToast(`🎉 Streak của bạn hôm nay đã được bảo bọc an toàn! Tuyệt vời!`, "success");
          }
        }, 2000);
      }
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
        
        // Fire celebration toast for updating the streak
        setTimeout(() => {
          addStreakToast(`🔥 Tuyệt vời! Bạn vừa gia cố chuỗi ngày học thành công! Streak tăng lên ${nextStreak} ngày liên tục!`, 'success');
        }, 100);

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
    const isSaved = bookmarkedIds.includes(qId);
    const next = isSaved 
      ? bookmarkedIds.filter(id => id !== qId) 
      : [...bookmarkedIds, qId];
    setBookmarkedIds(next);
    localStorage.setItem(STORAGE_BOOKMARKS_KEY, JSON.stringify(next));
    addStreakToast(isSaved ? "📌 Đã gỡ lưu câu hỏi khỏi sổ tay!" : "📌 Đã lưu câu hỏi thành công vào sổ tay ôn tập!", "info");
  };

    // Record practice answer
  const handleAnswerQuestion = (q: VNUQuestion, optionIndex: number) => {
    if (practiceExamMode) {
      setPracticeTempAnswers(prev => ({
        ...prev,
        [q.id]: optionIndex
      }));
      setChosenOption(optionIndex);
      return;
    }

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
        localStorage.setItem("vnu1001_today_practiced_v1", next.toString());
        if (next === 3) {
          customAlert("🎉 Chúc mừng! Bạn đã trả lời đúng 3 câu trắc nghiệm hôm nay và hoàn thành mục tiêu ôn luyện để củng cố Streak!");
          addStreakToast("🏆 Đã Đạt Mục Tiêu Ngày: Streak của bạn hôm nay đã được bảo vệ!", "success");
        } else if (next < 3) {
          addStreakToast(`🎯 Đúng rồi! Tiến trình rèn luyện hôm nay: ${next}/3 câu đúng.`, "success");
        } else {
          addStreakToast(`🎯 Câu trả lời chính xác! Tiếp tục bồi dưỡng kiến thức nhé.`, "success");
        }
        return next;
      });
    } else {
      addStreakToast("💡 Đáp án chưa đúng! Hãy xem phần giải thuật chi tiết để nắm vững bản chất.", "info");
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
    const hasAnswers = qIds.some(id => answeredHistory[id] !== undefined || practiceTempAnswers[id] !== undefined);
    if (!hasAnswers) {
      customAlert("Bạn chưa làm bài nào trong chuyên đề này!");
      return;
    }
    
    const countWrong = qIds.filter(id => answeredHistory[id] !== undefined && !answeredHistory[id].correct).length;
    if (!all && countWrong === 0 && !practiceExamMode) {
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

      setPracticeTempAnswers(prev => {
        const next = { ...prev };
        qIds.forEach(id => {
          if (all) {
            delete next[id];
          } else {
            const h = answeredHistory[id];
            if (!h || !h.correct) {
              delete next[id];
            }
          }
        });
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
      setShowPracticeResult(false);
      
      // Move to practice tab
      setActiveTab('practice');
      
      // Scroll smoothly to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      customAlert(all ? "Đã đặt lại học phần và đếm thời gian từ đầu. Hãy bắt đầu ôn tập nhé!" : "Đã đặt lại các câu bị sai. Sẵn sàng ôn luyện lại!");
    });
  };

  // Reset a specific single question choice so the candidate can answer it again
  const handleRetryCurrentQuestion = (qId: string) => {
    setPracticeTempAnswers(prev => {
      const next = { ...prev };
      delete next[qId];
      return next;
    });
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
    setCurrentOfficialExamId(null);
    setActiveTab('mock_exam');
  };

  // Launch a pre-defined official exam
  const handleStartOfficialExam = (exam: PLDCOfficialExam) => {
    const mappedQuestions = exam.questions.map((cq, idx) => ({
      id: `${exam.id}-q-${idx}`,
      topicId: 1,
      difficulty: 'thong_hieu' as const,
      questionText: cq.q,
      options: cq.o,
      correctOption: cq.c,
      explanation: cq.e,
    }));
    
    setMockQuestions(mappedQuestions);
    setMockAnswers({});
    setExamSubmitted(false);
    setExamTimer(1800); // 30 minutes
    setIsTimerActive(true);
    setExamSavedResult(null);
    setCurrentOfficialExamId(exam.id);
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

    // Generate Azota simulated competition leaderboard
    const virtuals = generateMockCompetitors(mockQuestions.length, finalScore, timeSpentSec);
    const userCompetitor = {
      name: "Bạn (Cá nhân)",
      className: currentSubject === 'vnu1001' 
        ? "Kỳ thi thử Kỹ năng số" 
        : currentSubject === 'pldc'
          ? "Kỳ thi Pháp luật đại cương"
          : currentSubject === 'mldg'
            ? "Kỳ thi Đo lường đánh giá đại học"
            : "Kỳ thi Tâm lý học trong giáo dục",
      correctCount: correctCount,
      totalCount: mockQuestions.length,
      score: finalScore,
      timeSpentSec: timeSpentSec,
      timeSpentStr: timeString,
      avatarBg: "bg-blue-600 text-white ring-2 ring-blue-300 ring-offset-1 font-bold",
      isVirtual: false,
    };
    
    const combined = [...virtuals, userCompetitor];
    combined.sort((a, b) => {
      // sort by score descending
      if (Math.abs(b.score - a.score) > 0.01) {
        return b.score - a.score;
      }
      // then by time Spent ascending
      return a.timeSpentSec - b.timeSpentSec;
    });

    const ranked = combined.map((item, idx) => ({
      ...item,
      rank: idx + 1
    }));
    setExamLeaderboard(ranked);
    setLeaderboardSearchQuery('');

    // Save mock exam to history list
    const newHistoryItem = {
      id: "mock_exam_" + Date.now(),
      timestamp: new Date().toLocaleString('vi-VN'),
      ...newResult,
      questions: mockQuestions,
      answers: mockAnswers,
      examId: currentOfficialExamId
    };

    registerStudyActivity();
    setTodayMockSubmitted(true);
    localStorage.setItem("vnu1001_today_mock_submitted_v1", "true");

    setTimeout(() => {
      addStreakToast(`📝 Nộp đề thi thành công! Điểm số đạt được: ${finalScore.toFixed(1)}/10đ. Đã lưu báo cáo học lực!`, "success");
    }, 150);

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
    if (currentSubject === 'vnu1050' || currentSubject === 'vnu1001') {
      return [
        { id: 1, name: "BÀI 1: Máy tính & Thiết bị ngoại vi", icon: BookOpen, accent: "from-blue-500 to-indigo-600", desc: "Phần cứng thô, RAM, SSD, CPU, NPU, cổng liên kết Thunderbolt và mạng LAN/WAN căn bản thiết bị." },
        { id: 2, name: "BÀI 2: Khai thác dữ liệu & Thông tin", icon: Sparkles, accent: "from-amber-500 to-orange-600", desc: "Mô hình tháp DIKW dữ liệu lớn, Metadata, tệp phi cấu trúc và phương pháp khai phá tri thức tự động." },
        { id: 3, name: "BÀI 3: Công cụ làm việc số văn phòng", icon: CheckCircle2, accent: "from-emerald-500 to-teal-600", desc: "Thành thạo ứng dụng Word, Mail Merge, hàm nâng cao Excel, biểu đồ dữ liệu và Morph PowerPoint." },
        { id: 4, name: "BÀI 4: Mạng máy tính & Internet toàn cầu", icon: Timer, accent: "from-purple-500 to-pink-600", desc: "Địa chỉ IPv4/6, DNS phân giải, Router điều phối gói tin bảo mật HTTPS và mã hóa VPN an toàn." },
        { id: 5, name: "BÀI 5: Thuật toán & Tư duy máy tính", icon: ShieldAlert, accent: "from-rose-500 to-red-600", desc: "Tư duy phân rã, nhận dạng mẫu, thuật toán tìm kiếm nhị phân Binary Search và độ phức tạp O(1)." },
        { id: 6, name: "BÀI 6: An toàn thông tin & Đạo đức số", icon: Flame, accent: "from-cyan-500 to-blue-600", desc: "Phòng vệ tấn công lừa đảo Social Engineering, Ransomware độc hại và quyền tác giả học thuật." }
      ];
    } else if (currentSubject === 'pldc') {
      return [
        { id: 1, name: "CHƯƠNG 1: Nhà nước pháp quyền XHCN", icon: BookOpen, accent: "from-blue-500 to-indigo-600", desc: "Bản chất giai cấp và xã hội của nhà nước, sự ra đời của nhà nước pháp quyền XHCN Việt Nam, Nghị quyết số 27-NQ/TW." },
        { id: 2, name: "CHƯƠNG 2: Bộ máy, chức năng và hình thức", icon: Sparkles, accent: "from-amber-500 to-orange-600", desc: "Cơ cấu hệ thống chính trị, Quốc hội, Chính phủ, Tòa án, Viện kiểm sát nhân dân, hình thức chính thể và cấu trúc nhà nước đơn nhất." },
        { id: 3, name: "CHƯƠNG 3: Pháp luật, vai trò và chức năng", icon: CheckCircle2, accent: "from-emerald-500 to-teal-600", desc: "Thuộc tính cơ bản, nguồn pháp luật, vai trò điều chỉnh, bảo vệ, giáo dục của pháp luật trong đời sống." },
        { id: 4, name: "CHƯƠNG 4: Quy phạm và quan hệ pháp luật", icon: Timer, accent: "from-purple-500 to-pink-600", desc: "Giả định, quy định, chế tài, năng lực pháp luật và năng lực hành vi dân sự của cá nhân, hình thức thực hiện pháp luật." },
        { id: 5, name: "CHƯƠNG 5: Ý thức, vi phạm và trách nhiệm", icon: ShieldAlert, accent: "from-rose-500 to-red-600", desc: "Mặt khách quan và chủ quan của vi phạm, lỗi cố ý và vô ý, bồi thường thiệt hại dân sự, trách nhiệm hình sự v.v." },
        { id: 6, name: "CHƯƠNG 6: Các ngành luật cơ bản ở Việt Nam", icon: Flame, accent: "from-cyan-500 to-blue-600", desc: "Luật Hiến pháp, Luật Hành chính, Luật Dân sự, Luật Hình sự, Luật Tố tụng, Luật Hôn nhân & Gia đình, Bộ luật Lao động chuẩn chỉnh." }
      ];
    } else if (currentSubject === 'tlhgd') {
      return [
        { id: 1, name: "CHƯƠNG 1: Hiện tượng tâm lý và phương pháp nghiên cứu", icon: BookOpen, accent: "from-blue-500 to-indigo-600", desc: "Bản chất, nguồn gốc khách quan và cấu trúc của tâm lý người, cùng các phương pháp nghiên cứu tâm lý khoa học sòng phẳng." },
        { id: 2, name: "CHƯƠNG 2 & 3: Yếu tố sinh học & Hoạt động - Giao tiếp", icon: Sparkles, accent: "from-amber-500 to-orange-600", desc: "Hệ thần kinh, phản xạ có/không điều kiện, và hoạt động chủ đạo theo lứa tuổi dậy thì thiếu niên từ mầm non đến THPT." },
        { id: 3, name: "CHƯƠNG 4 & 5: Quá trình nhận thức và điều kiện", icon: CheckCircle2, accent: "from-emerald-500 to-teal-600", desc: "Cảm giác, tri giác trọn vẹn, trí nhớ, ngôn ngữ thầm nội tâm, ảo giác và các thuộc tính tập trung của Chú ý." },
        { id: 4, name: "CHƯƠNG 6 & 7: Tình cảm - Ý chí & Nhân cách", icon: Timer, accent: "from-purple-500 to-pink-600", desc: "Sáu quy luật tình cảm (lây lan, pha trộn, di chuyển, thích ứng, tương phản), hành động ý chí đấu tranh động cơ và thuộc tính khí chất nhân cách." },
        { id: 5, name: "CHƯƠNG 8 & 9: Tâm lý hoạt động học và dạy học", icon: ShieldAlert, accent: "from-rose-500 to-red-600", desc: "Động cơ học tập nội tại bên trong, lý thuyết Piaget phát triển trí tuệ, thuyết ZPD Vygotsky, phong cách dân chủ và độc đoán sư phạm giáo viên." },
        { id: 6, name: "CHƯƠNG 10-12: Môi trường, Đạo đức & Tham vấn học đường", icon: Flame, accent: "from-cyan-500 to-blue-600", desc: "Nhân cách nhà giáo đức tài, tham vấn gỡ rối bạo lực học đường trầm cảm, hỗ trợ trẻ hòa nhập tự kỷ, trí tuệ cảm xúc EQ & Growth Mindset." }
      ];
    } else if (currentSubject === 'khqlgd') {
      return [
        { id: 1, name: "CHỦ ĐỀ 1: Đại cương về tổ chức & các trường phái quản lý", icon: BookOpen, accent: "from-blue-500 to-indigo-600", desc: "Căn cứ nhận biết tổ chức, tính tất yếu của quản lý, tư tưởng đức trị/pháp trị cổ đại, trường phái cổ điển Taylor/Fayol, định lượng và văn hóa quản trị Nhật Bản." },
        { id: 2, name: "CHỦ ĐỀ 2: Lý thuyết và quy trình quản lý giáo dục", icon: Sparkles, accent: "from-amber-500 to-orange-600", desc: "Định vị quản lý cấp vĩ mô & vi mô, cấu trúc đa thành phần hệ thống giáo dục, mối quan hệ hữu cơ đổi mới sư phạm học đường." },
        { id: 3, name: "CHỦ ĐỀ 3: Đưa quyết định và quản lý thông tin giáo dục", icon: CheckCircle2, accent: "from-emerald-500 to-teal-600", desc: "Vai trò trung tâm của quyết định, quy trình 5 bước ra quyết định khoa học, hệ thống xử lý thông tin 8 bước, tiêu chuẩn tin cậy thông tin." },
        { id: 4, name: "CHỦ ĐỀ 4: Các mô hình quản lý & Đổi mới theo Nghị quyết 29", icon: Timer, accent: "from-purple-500 to-pink-600", desc: "So sánh 4 mô hình Tony Bush (chính thức, tập thể, chính trị, văn hóa), quyền tự chủ cơ sở giáo dục và tinh thần cốt lõi Nghị quyết 29." }
      ];
    } else {
      return [
        { id: 1, name: "CHƯƠNG 1: Khái niệm & Lịch sử đo lường đánh giá", icon: BookOpen, accent: "from-blue-500 to-indigo-600", desc: "Các thuật ngữ đo lường, đánh giá, kiểm tra, lịch sử phát triển, học thuyết trắc nghiệm cổ điển và lý thuyết hiện đại." },
        { id: 2, name: "CHƯƠNG 2: Lập kế hoạch kiểm tra đánh giá", icon: Sparkles, accent: "from-amber-500 to-orange-600", desc: "Xây dựng ma trận đề, Bản đặc tả đề kiểm tra trắc nghiệm và tự luận (Test Specification), các dải tiêu chí Rubric chuẩn." },
        { id: 3, name: "CHƯƠNG 3: Các nội dung đánh giá trong giáo dục", icon: CheckCircle2, accent: "from-emerald-500 to-teal-600", desc: "Mô hình dải chất lượng CIPO, đánh giá quá trình (Formative), đánh giá tổng kết (Summative), tự đánh giá (IQA) và kiểm định ngoài." },
        { id: 4, name: "CHƯƠNG 4: Phân tích & Sử dụng kết quả đánh giá", icon: Timer, accent: "from-purple-500 to-pink-600", desc: "Phân tích câu hỏi (độ khó P, độ phân biệt D, rpbi), lý thuyết phản hồi câu đặc ICC (IRT), độ tin cậy Alpha, độ giá trị." }
      ];
    }
  }, [currentSubject]);

  return (
    <div className={`w-full h-full flex flex-col bg-slate-100 text-slate-800 font-sans transition-all duration-300 ${isDarkMode ? 'vnu-dark-theme' : ''}`} id="vnu-portal-root">
      
      {/* HEADER BANNER */}
      <header className="h-16 bg-slate-900 px-4 sm:px-8 flex items-center justify-between shrink-0 text-white shadow-md border-b border-slate-800 z-10 animate-fade-in print:hidden" id="vnu-header">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="p-1 px-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-black text-xs sm:text-sm tracking-tight shadow-md shadow-blue-500/30 shrink-0">
            {currentSubject === 'vnu1001' ? "VNU1001" : currentSubject === 'pldc' ? "PLDC" : currentSubject === 'mldg' ? "MLDG" : currentSubject === 'tlhgd' ? "TLHGD" : "KHQLGD"}
          </div>
          <div className="truncate hidden md:block">
            <h1 className="text-xs sm:text-sm font-black tracking-wide uppercase text-white leading-none truncate">
              {currentSubject === 'vnu1001' 
                ? "Cổng Ôn Thi Trắc Nghiệm Kỹ Năng Số" 
                : currentSubject === 'pldc' 
                  ? "Cổng Ôn Thi Pháp Luật Đại Cương" 
                  : currentSubject === 'mldg'
                    ? "Cổng Ôn Thi Nhập Môn Đo Lường Đánh Giá"
                    : currentSubject === 'tlhgd'
                      ? "Cổng Ôn Thi Tâm Lý Học Trong Giáo Dục"
                      : "Cổng Ôn Thi Khoa Học Quản Lý Trong Giáo Dục"}
            </h1>
            <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold truncate mt-1">
              {fullDatabase.length > 50 
                ? `${currentSubject === 'vnu1001' 
                    ? "Giáo trình 600 câu chuẩn" 
                    : currentSubject === 'pldc' 
                      ? "Giáo trình trắc nghiệm pháp luật tối ưu" 
                      : currentSubject === 'mldg'
                        ? "Giáo trình đo lường đánh giá giáo dục 400 câu chuẩn"
                        : currentSubject === 'tlhgd'
                          ? "Giáo trình tâm lý học trong giáo dục 250 câu chuẩn"
                          : "Tài liệu ôn tập Khoa học quản lý trong giáo dục chuẩn"}`
                : `Đang ôn luyện đề thi tự nạp của riêng bạn (${fullDatabase.length} câu)`}
            </p>
          </div>

          {/* SUBJECT DROPDOWN SELECTOR */}
          <div className="flex items-center gap-1 bg-slate-800 border border-slate-700 rounded-xl px-1.5 py-0.5 print:hidden">
            <span className="hidden sm:inline pl-1 text-[9px] uppercase font-black tracking-wider text-slate-400">Phần học:</span>
            <select
              value={currentSubject}
              onChange={(e) => handleSwitchSubject(e.target.value as 'vnu1050' | 'pldc' | 'mldg' | 'tlhgd' | 'khqlgd' | any)}
              className="bg-transparent text-slate-200 text-xs font-black py-1.5 px-1 outline-none cursor-pointer focus:ring-0 transition"
            >
              <option value="vnu1001" className="bg-slate-900 text-white font-bold">💻 Kỹ Năng Số (VNU1001)</option>
              <option value="pldc" className="bg-slate-900 text-white font-bold">⚖️ Pháp Luật Đại Cương</option>
              <option value="mldg" className="bg-slate-900 text-white font-bold">📊 Đo Lường Đánh Giá Giáo Dục</option>
              <option value="tlhgd" className="bg-slate-900 text-white font-bold">🧠 Tâm Lý Học Trong Giáo Dục</option>
              <option value="khqlgd" className="bg-slate-900 text-white font-bold">🏫 Khoa Học Quản Lý Trong Giáo Dục</option>
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

          {/* SHUFFLE TOGGLE BUTTON */}
          <button
            onClick={() => {
              const nextShuffle = !shuffleOptions;
              setShuffleOptions(nextShuffle);
              localStorage.setItem("vnu1001_shuffle_options_v1", nextShuffle ? "true" : "false");
            }}
            className={`flex items-center justify-center p-2 rounded-xl border transition cursor-pointer ${
              shuffleOptions
                ? "bg-emerald-950/40 border-emerald-500/55 text-emerald-400 hover:bg-emerald-900/30 font-black"
                : "bg-slate-800 border-slate-700 hover:bg-slate-700 hover:border-slate-600 text-slate-400"
            }`}
            title={shuffleOptions ? "Đảo đáp án đang Bật" : "Đảo đáp án đang Tắt (Thứ tự gốc A-B-C-D)"}
          >
            <div className="flex items-center gap-1.5 px-0.5">
              <Shuffle className={`w-3.5 h-3.5 ${shuffleOptions ? "text-emerald-400 animate-pulse animate-spin" : "text-slate-400"}`} />
              <span className="text-[9.5px] font-extrabold uppercase hidden lg:inline">
                Đảo đáp án: {shuffleOptions ? "Bật" : "Tắt"}
              </span>
            </div>
          </button>

          <button
            onClick={() => {
              customConfirm(
                streakEnabled 
                  ? "Bạn có chắc chắn muốn TẮT hệ thống theo dõi Streak và Nhiệm vụ hàng ngày không?" 
                  : "Bạn có muốn BẬT lại hệ thống theo dõi Streak và Nhiệm vụ hàng ngày?",
                () => {
                  const nextVal = !streakEnabled;
                  setStreakEnabled(nextVal);
                  localStorage.setItem("vnu1001_streak_enabled_v1", nextVal.toString());
                  if (nextVal) {
                    addStreakToast("🔥 Đã kích hoạt lại hệ thống Streak!", "success");
                  } else {
                    customAlert("Hệ thống đã ẩn tất cả widget Streak và Nhiệm vụ hàng ngày để bạn tập trung ôn thi thoải mái nhất!");
                  }
                },
                streakEnabled ? "Tạm tắt Streak" : "Bật lại Streak"
              );
            }}
            className={`flex items-center gap-1.5 text-xs border px-2 sm:px-3 py-1.5 rounded-xl transition cursor-pointer select-none ring-1 active:translate-y-0.5 ${
              streakEnabled 
                ? "bg-amber-950/45 border-amber-500/50 text-orange-400 ring-amber-500/10 hover:bg-amber-900/40" 
                : "bg-slate-800/80 border-slate-705 text-slate-400 ring-transparent hover:bg-slate-750"
            }`}
            title={streakEnabled ? "Streak đang Bật (Click để Tắt)" : "Streak đang Tắt (Click để Bật)"}
          >
            <Flame className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${streakEnabled ? "text-orange-500 fill-orange-500 animate-pulse animate-bounce" : "text-slate-450"}`} />
            <span className="font-extrabold text-[11px] sm:text-xs">
              {streakEnabled ? `Streak: ${streakDays}d` : "Streak: Off"}
            </span>
          </button>

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
                    <h4 className="text-sm font-extrabold">{fullDatabase === getFullVNU1001Database() ? (currentSubject === 'vnu1001' ? "Đề Chuẩn VNU1001" : currentSubject === 'pldc' ? "Đề Chuẩn Pháp Luật ĐC" : "Đề Chuẩn Đo Lường ĐG") : "Đề Nhập Tự Do"}</h4>
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
                        <h4 className="text-[12px] font-black text-slate-800 uppercase tracking-tight">Tỷ Lệ Học Tập Theo Phân Môn</h4>
                        <p className="text-[10px] text-slate-400 font-bold block mt-0.5">Hiệu suất và độ chính xác chia theo 6 phân môn nền tảng</p>
                      </div>
                      <span className="text-[9px] uppercase font-black px-2.5 py-1 rounded bg-indigo-50 text-indigo-700 whitespace-nowrap">Tổng quan (%)</span>
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
                            fill="#3b82f6" 
                            radius={[4, 4, 0, 0]} 
                            name="Luyện tập" 
                          />
                          <Bar 
                            dataKey="Thi thử (%)" 
                            fill="#10b981" 
                            radius={[4, 4, 0, 0]} 
                            name="Thi thử" 
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
                          <span className="text-lg font-black text-indigo-650 block mt-1 font-mono">
                            {mockHistory.length > 0 
                              ? (mockHistory.reduce((sum, h) => sum + h.score, 0) / mockHistory.length).toFixed(1) 
                              : "0.0"}/10
                          </span>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-105 shadow-sm text-center">
                          <span className="text-[9px] text-slate-400 font-black uppercase block">Tỷ lệ thi đỗ</span>
                          <span className="text-lg font-black text-emerald-600 block mt-1 font-mono">
                            {mockHistory.length > 0 
                              ? `${Math.round((mockHistory.filter(h => h.passed).length / mockHistory.length) * 100)}%` 
                              : "0%"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {!streakEnabled ? (
                      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl text-center space-y-4">
                        <div className="w-11 h-11 rounded-full bg-slate-800/80 flex items-center justify-center border border-slate-700/60 mx-auto shadow-sm">
                          <Flame className="w-5 h-5 text-slate-500 fill-slate-600" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-xs font-black text-slate-200 uppercase tracking-wide">Chuỗi Streak Đang Tắt</h4>
                          <p className="text-[10.5px] text-slate-400 font-medium leading-relaxed max-w-xs mx-auto">
                            Hệ thống nhiệm vụ rèn luyện và nhắc nhở ngày vàng đang tạm khóa để bạn học tự do thoải mái.
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setStreakEnabled(true);
                            localStorage.setItem("vnu1001_streak_enabled_v1", "true");
                            addStreakToast("🔥 Đã kích hoạt lại hệ thống ngày vàng Streak!", "success");
                          }}
                          className="w-full py-2 px-4 rounded-xl bg-indigo-600 hover:bg-slate-950 text-white hover:text-indigo-400 border border-transparent hover:border-indigo-500/30 text-xs font-black shadow-lg transition duration-200 cursor-pointer active:translate-y-0.5"
                        >
                          Kích hoạt lại Streak học tập
                        </button>
                      </div>
                    ) : (
                      <div className="bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-5 rounded-3xl border border-indigo-500/15 shadow-xl text-white space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] bg-orange-500/10 text-orange-400 border border-orange-500/20 font-black px-2.5 py-1 rounded-md uppercase tracking-wider flex items-center gap-1.5 shadow-inner">
                            <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500 animate-pulse" /> NHẮC NHỞ STREAK
                          </span>
                          
                          {todayPracticedCount >= 3 ? (
                            <span className="text-[9px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-black px-2 py-0.5 rounded uppercase flex items-center gap-1.5 shadow">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" /> AN TOÀN
                            </span>
                          ) : (
                            <span className="text-[9px] bg-red-500/15 text-red-400 border border-red-500/30 font-black px-2 py-0.5 rounded uppercase flex items-center gap-1.5 animate-pulse shadow">
                              <AlertCircle className="w-3 h-3 text-red-450" /> CẦN DUY TRÌ
                            </span>
                          )}
                        </div>

                        <div className="space-y-1 bg-white/2 p-2 rounded-2xl">
                          <h4 className="text-xs font-black text-slate-150 uppercase tracking-tight flex items-center gap-1.5">
                            Kỷ Luật Học Tập Hàng Ngày
                          </h4>
                          <p className="text-[10.5px] text-slate-450 font-semibold leading-relaxed">
                            {todayPracticedCount >= 3 
                              ? "🎉 Tuyệt vời! Bạn đã hoàn thành 3 câu luyện tập để bảo vệ Streak cho hôm nay. Ngày mai tiếp tục nhé!"
                              : `⏳ Bạn còn thiếu ${3 - todayPracticedCount} câu trắc nghiệm đúng nữa để duy trì streak ${streakDays} ngày liên tiếp!`
                            }
                          </p>
                        </div>

                        {/* Interactive Steps indicators with quick-action buttons */}
                        <div className="space-y-2 pt-1 font-sans">
                          <div className="flex items-center justify-between text-xs p-3 rounded-2xl bg-white/5 border border-white/5">
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-black border border-emerald-500/20">
                                ✓
                              </div>
                              <span className="text-[11px] font-bold text-slate-200">Đăng nhập cổng VNU1001</span>
                            </div>
                            <span className="text-[9px] text-slate-400 font-black tracking-widest">OK</span>
                          </div>

                          <div className="flex items-center justify-between text-xs p-3 rounded-2xl bg-white/5 border border-white/5">
                            <div className="flex items-center gap-2">
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black border ${
                                todayPracticedCount >= 3 
                                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/25' 
                                  : 'bg-orange-500/20 text-orange-400 border-orange-500/25 animate-pulse'
                              }`}>
                                {todayPracticedCount >= 3 ? "✓" : "2"}
                              </div>
                              <span className="text-[11px] font-bold text-slate-200">Đúng 3 câu ôn luyện ({todayPracticedCount}/3)</span>
                            </div>
                            {todayPracticedCount >= 3 ? (
                              <span className="text-[9px] text-emerald-400 font-black tracking-wider">Xong</span>
                            ) : (
                              <button 
                                onClick={() => {
                                  setSelectedTopic(1);
                                  setPracticeIndex(0);
                                  setChosenOption(null);
                                  setShowExplanation(false);
                                  setActiveTab('practice');
                                  addStreakToast("📖 Hãy rèn luyện kiến thức và trả lời đúng 3 câu trắc nghiệm nhé!", "info");
                                }}
                                className="text-[9.5px] bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold px-3 py-1.5 rounded-xl transition cursor-pointer select-none active:translate-y-0.5 border-none outline-none"
                              >
                                HỌC NGAY
                              </button>
                            )}
                          </div>

                          <div className="flex items-center justify-between text-xs p-3 rounded-2xl bg-white/5 border border-white/5">
                            <div className="flex items-center gap-2 font-semibold">
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black border ${
                                (todayMockSubmitted || pomoCompletedSessions > 0) 
                                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/25' 
                                  : 'bg-slate-800 text-slate-450 border-slate-700'
                              }`}>
                                {(todayMockSubmitted || pomoCompletedSessions > 0) ? "✓" : "3"}
                              </div>
                              <span className="text-[11px] font-bold text-slate-200">Thi thử hoặc 1 Pomodoro</span>
                            </div>
                            {(todayMockSubmitted || pomoCompletedSessions > 0) ? (
                              <span className="text-[9px] text-emerald-400 font-black tracking-wider">Xong</span>
                            ) : (
                              <div className="flex gap-1">
                                <button 
                                  onClick={() => {
                                    handleStartMockExam();
                                    addStreakToast("📝 Hãy chọn 1 đề thi thử học kỳ để rèn luyện tư duy phản biện nhé!", "info");
                                  }}
                                  className="text-[9.5px] bg-slate-800 hover:bg-slate-750 text-slate-200 font-extrabold px-2 py-1.5 rounded-xl transition cursor-pointer select-none active:translate-y-0.5 border-none outline-none"
                                >
                                  THI THỬ
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Interactive Streak Scheduler Widget */}
                        <div className="mt-4 pt-4 border-t border-slate-800/85 space-y-3">
                          <label className="text-[9px] font-black text-indigo-300 uppercase tracking-widest block font-mono">
                            ⚙️ Cấu Hình Giờ Nhắc Nhở Học Tập
                          </label>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <span className="text-[8.5px] text-slate-455 font-black uppercase tracking-wider block">Mốc thời gian</span>
                              <select
                                value={reminderTime}
                                onChange={(e) => {
                                  setReminderTime(e.target.value);
                                  localStorage.setItem("vnu1001_streak_reminder_time_v1", e.target.value);
                                  addStreakToast(`⏰ Hệ thống sẽ nhắc nhở rèn luyện học tập vào lúc ${e.target.value} mỗi ngày!`, "info");
                                }}
                                className="w-full text-xs font-bold text-slate-200 bg-slate-900 border border-slate-800 rounded-xl py-2 px-2.5 cursor-pointer outline-none focus:border-indigo-500 transition shadow-inner"
                              >
                                <option value="08:00">08:00 Sáng</option>
                                <option value="12:00">12:00 Trưa</option>
                                <option value="18:00">18:00 Chiều</option>
                                <option value="20:00">20:00 Tối</option>
                                <option value="21:30">21:30 Đêm</option>
                                <option value="22:00">22:00 Đêm</option>
                              </select>
                            </div>

                            <div className="space-y-1">
                              <span className="text-[8.5px] text-slate-450 font-black uppercase tracking-wider block">Yêu cầu báo</span>
                              <button
                                onClick={() => {
                                  const nextActive = !reminderActive;
                                  setReminderActive(nextActive);
                                  localStorage.setItem("vnu1001_streak_reminder_active_v1", nextActive.toString());
                                  addStreakToast(nextActive ? "🔔 Đã BẬT chuông thông báo đẩy nhắc nhở Streak!" : "🔕 Đã TẮT chuông nhắc nhở Streak.", "info");
                                }}
                                className={`w-full text-xs font-bold py-2 px-2.5 rounded-xl transition cursor-pointer text-center flex items-center justify-center gap-1.5 border select-none border-transparent ${
                                  reminderActive 
                                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/15" 
                                    : "bg-slate-900 text-slate-500 border-slate-800 hover:bg-slate-850"
                                }`}
                              >
                                {reminderActive ? "🔔 BẬT NHẮC" : "🔕 TẮT NHẮC"}
                              </button>
                            </div>
                          </div>

                          {/* Quick trigger test notification button */}
                          <div className="pt-1.5 select-none">
                            <button
                              onClick={() => {
                                const msgs = [
                                  `⏰ KỶ LUẬT STREAK: Hôm nay bạn ôn bài chưa? Đừng bỏ rơi mục tiêu học tập VNU1001 ngày hôm nay nhé!`,
                                  `🔥 CẢNH BÁO STREAK: Chuỗi vàng ${streakDays} ngày học liên hoàn của bạn sắp hết kỳ hạn! Ôn tập 3 câu ngay để bảo vệ chuỗi nào!`,
                                  `🌟 TRÁCH NHIỆM: Kỷ luật là nền tảng của sự bứt phá! Nhấp ngay học 3 câu trắc nghiệm siêu tốc bảo vệ streak.`
                                ];
                                const randomMsg = msgs[Math.floor(Math.random() * msgs.length)];
                                addStreakToast(randomMsg, "warning");
                              }}
                              className="w-full text-center py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white border border-slate-800 text-[10px] font-black tracking-widest font-mono transition cursor-pointer uppercase shadow-sm active:translate-y-0.5"
                            >
                              🔔 Phát thử thông báo đẩy mẫu
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
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
                                setShowPracticeResult(false);
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

              {/* SECTION: 15 OFFICIAL EXAMS FOR PLDC */}
              {currentSubject === 'pldc' && (
                <div id="pldc-exams-section" className="space-y-5 pt-8 border-t border-slate-200 mt-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                        <Award className="w-5 h-5 text-emerald-600 shrink-0" />
                        Trọn bộ 15 đề thi học kỳ Pháp luật đại cương
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">Bản quyền 15 đề thi thử chất lượng cao, có đáp án chi tiết và đồng hồ đếm ngược 30 phút rèn áp lực cực chuẩn</p>
                    </div>
                    
                    {/* Search filter input */}
                    <div className="relative shrink-0 w-full sm:w-64">
                      <input 
                        type="text"
                        placeholder="Tìm kiếm đề thi..."
                        value={pldcSearchQuery}
                        onChange={(e) => setPldcSearchQuery(e.target.value)}
                        className="w-full text-xs font-semibold px-4 py-2.5 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 transition shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredOfficialExams.map(exam => {
                      const examStat = getExamStats(exam.id);
                      return (
                        <div 
                          key={exam.id}
                          className="bg-white rounded-3xl border border-slate-200 hover:border-emerald-500/55 transition duration-205 flex flex-col justify-between p-5 space-y-4 relative overflow-hidden shadow-sm"
                        >
                          {/* Top badge or decor line */}
                          <div className="flex justify-between items-start gap-2">
                            <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 font-extrabold px-2 py-0.5 rounded uppercase tracking-wider block">
                              ĐỀ SỐ {exam.testId}
                            </span>
                            <span className="text-[10px] text-slate-400 font-bold block">
                              40 Câu • 30 Phút
                            </span>
                          </div>

                          <div className="space-y-1">
                            <h4 className="text-sm font-black text-slate-900 line-clamp-1 hover:text-emerald-700 transition">
                              {exam.title}
                            </h4>
                            <p className="text-[11px] text-slate-500 font-medium leading-relaxed line-clamp-2">
                              {exam.description}
                            </p>
                          </div>

                          {/* Stats section if attempted */}
                          <div className="pt-3.5 border-t border-slate-100/80 flex justify-between items-center text-xs">
                            {examStat.attempts > 0 ? (
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-md ${
                                  examStat.passed ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                                }`}>
                                  {examStat.passed ? 'ĐÃ ĐẠT' : 'CHƯA ĐẠT'}
                                </span>
                                <span className="text-[10px] text-slate-500 font-bold">
                                  Cao nhất: <strong className="text-slate-800">{examStat.highScore?.toFixed(1)}/10đ</strong>
                                </span>
                              </div>
                            ) : (
                              <span className="text-[10px] text-slate-400 italic font-semibold">
                                Chưa làm đề thi này
                              </span>
                            )}

                            <button
                              onClick={() => {
                                handleStartOfficialExam(exam);
                              }}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-black py-2 px-3.5 rounded-xl transition cursor-pointer flex items-center justify-center gap-1 border-b-2 border-emerald-800 active:translate-y-0.5"
                            >
                              VÀO THI <ArrowRight className="w-3 h-3 shrink-0" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
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
              <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-6 space-y-5 shadow-sm flex flex-col justify-between" style={{ minHeight: '680px' }}>
                <div className="space-y-4">
                  {/* Outer navigation back action */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setActiveTab('dashboard')}
                      className="text-xs font-black text-slate-400 hover:text-indigo-505 transition-luxury flex items-center gap-1 cursor-pointer"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" /> Bảng học tập
                    </button>
                    
                    <span className="text-[9px] font-mono font-black text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md uppercase">
                      Chuyên đề {selectedTopic}
                    </span>
                  </div>

                  {/* Header info */}
                  <div className="space-y-2 pb-3.5 border-b border-slate-150/50">
                    <h3 className="text-sm font-black text-slate-900 leading-snug tracking-tight">
                      {VNU_TOPICS[selectedTopic - 1]}
                    </h3>
                    
                    {/* Progress tracking bar */}
                    {(() => {
                      const topicQs = fullDatabase.filter(q => q.topicId === selectedTopic);
                      const topicAnsweredCount = topicQs.filter(q => answeredHistory[q.id] !== undefined).length;
                      const progressVal = topicQs.length > 0 ? Math.round((topicAnsweredCount / topicQs.length) * 100) : 0;
                      return (
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                            <span>Đã cọ xát: {topicAnsweredCount} / {topicQs.length} câu</span>
                            <span className="text-indigo-650 font-black">{progressVal}%</span>
                          </div>
                          <div className="relative w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className="absolute top-0 left-0 h-full bg-indigo-600 rounded-full transition-all duration-300"
                              style={{ width: `${progressVal}%` }}
                            />
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* DESIGN SYSTEM TABBED CONTROLLER */}
                  <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100/80 rounded-2xl border border-slate-205">
                    <button
                      type="button"
                      onClick={() => setSidebarActiveTab('questions')}
                      className={`py-2 rounded-xl text-xs font-black transition-luxury flex flex-col items-center gap-0.5 cursor-pointer ${
                        sidebarActiveTab === 'questions'
                          ? "bg-white text-indigo-650 shadow-sm border border-slate-200/50"
                          : "text-slate-404 hover:text-slate-700"
                      }`}
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span className="text-[8px] uppercase tracking-wide">Đặt đề</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSidebarActiveTab('tools')}
                      className={`py-2 rounded-xl text-xs font-black transition-luxury flex flex-col items-center gap-0.5 cursor-pointer ${
                        sidebarActiveTab === 'tools'
                          ? "bg-white text-indigo-650 shadow-sm border border-slate-200/50"
                          : "text-slate-404 hover:text-slate-700"
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span className="text-[8px] uppercase tracking-wide">Tiện ích</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSidebarActiveTab('settings')}
                      className={`py-2 rounded-xl text-xs font-black transition-luxury flex flex-col items-center gap-0.5 cursor-pointer ${
                        sidebarActiveTab === 'settings'
                          ? "bg-white text-indigo-650 shadow-sm border border-slate-200/50"
                          : "text-slate-404 hover:text-slate-700"
                      }`}
                    >
                      <Settings className="w-3.5 h-3.5" />
                      <span className="text-[8px] uppercase tracking-wide">Cấu hình</span>
                    </button>
                  </div>

                  {/* TAB CONTENT: QUESTIONS LIST */}
                  {sidebarActiveTab === 'questions' && (
                    <div className="space-y-4 animate-fade-in">
                      {/* Interactive Dual Filters Row */}
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="space-y-1">
                          <label className="text-[9px] text-slate-400 font-black uppercase tracking-wider block">Mức độ</label>
                          <select 
                            value={practiceDifficulty}
                            onChange={(e) => {
                              setPracticeDifficulty(e.target.value);
                              setPracticeIndex(0);
                              setChosenOption(null);
                              setShowExplanation(false);
                            }}
                            className="w-full text-[10px] font-black rounded-xl py-2 px-2 border border-slate-200 bg-slate-50 cursor-pointer outline-none focus:border-indigo-500 transition-luxury"
                          >
                            <option value="all">Tất cả mức độ</option>
                            <option value="nhan_biet">Nhận biết</option>
                            <option value="thong_hieu">Thông hiểu</option>
                            <option value="van_dung">Vận dụng</option>
                            <option value="van_dung_cao">Vận dụng cao</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] text-slate-450 font-black uppercase tracking-wider block">Trạng thái</label>
                          <select 
                            value={practiceStatusFilter}
                            onChange={(e) => {
                              setPracticeStatusFilter(e.target.value);
                              setPracticeIndex(0);
                              setChosenOption(null);
                              setShowExplanation(false);
                            }}
                            className="w-full text-[10px] font-black rounded-xl py-2 px-2 border border-slate-200 bg-slate-50 cursor-pointer outline-none focus:border-indigo-500 transition-luxury"
                          >
                            <option value="all">Mọi trạng thái</option>
                            <option value="wrong">⚠️ Câu làm sai</option>
                            <option value="correct">✅ Câu làm đúng</option>
                            <option value="unanswered">📝 Chưa làm</option>
                          </select>
                        </div>
                      </div>

                      {/* Header count indicators */}
                      <div className="text-[10px] font-black text-slate-400 flex justify-between items-center py-1.5 border-t border-b border-dashed border-slate-200/60">
                        <span className="uppercase tracking-wider">Cơ sở dữ liệu đáp ứng:</span>
                        <span className="font-mono text-indigo-650 bg-indigo-50/80 px-2 py-0.5 rounded-md font-extrabold">{filteredPracticeQuestions.length} câu</span>
                      </div>

                      {/* Matrix question grid scrollable container */}
                      {filteredPracticeQuestions.length === 0 ? (
                        <div className="py-12 text-center text-xs text-slate-400 font-semibold bg-slate-50/50 rounded-2xl border border-dashed border-slate-150">
                          Chưa tìm thấy câu hỏi thuộc bộ lọc này!
                        </div>
                      ) : (
                        <div className="grid grid-cols-5 gap-2 max-h-76 overflow-y-auto pr-1">
                          {filteredPracticeQuestions.map((q, idx) => {
                            const historyItem = answeredHistory[q.id];
                            const tempAnswer = practiceTempAnswers[q.id];
                            const isCurrent = idx === practiceIndex;
                            let bgStyle = "bg-slate-50/70 text-slate-500 hover:bg-slate-100 border border-slate-150";

                            if (isCurrent) {
                              bgStyle = "bg-indigo-600 text-white scale-103 font-black shadow-md glow-indigo border-indigo-605";
                            } else if (practiceExamMode) {
                              if (tempAnswer !== undefined) {
                                bgStyle = "bg-indigo-50 text-indigo-800 border-indigo-200 font-black shadow-sm";
                              } else if (historyItem) {
                                bgStyle = historyItem.correct 
                                  ? "bg-emerald-50/40 text-emerald-650/80 border border-emerald-150/40" 
                                  : "bg-red-50/40 text-red-655/80 border border-red-151/40";
                              }
                            } else if (historyItem) {
                              bgStyle = historyItem.correct 
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-150" 
                                : "bg-red-50 text-red-700 border border-red-150";
                            }

                            let difTag = "NB";
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
                                className={`h-11 rounded-xl text-[10px] font-mono font-bold flex flex-col justify-center items-center cursor-pointer transition-luxury ${bgStyle}`}
                                title={`Mức độ: ${difTag}`}
                              >
                                <span className={isCurrent ? "font-black" : ""}>#{idx + 1}</span>
                                <span className="text-[7.5px] scale-95 tracking-tighter opacity-80 block">{difTag}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB CONTENT: UTILITIES & STREAK */}
                  {sidebarActiveTab === 'tools' && (
                    <div className="space-y-4 animate-fade-in max-h-[460px] overflow-y-auto pr-1">
                      {/* Pomodoro block */}
                      <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-150 flex flex-col items-center relative overflow-hidden">
                        <div className="absolute right-0 bottom-0 select-none opacity-[0.03] scale-125 text-red-505">
                          <Timer className="w-16 h-16" />
                        </div>
                        
                        <div className="text-center space-y-0.5">
                          <span className="text-[8.5px] uppercase tracking-widest font-black text-slate-400 block font-sans">
                            {pomoMode === 'focus' ? "⏱️ Phiên Tập Trung Học" : "☕ Phiên Nghỉ Thư Giãn"}
                          </span>
                          <div className="text-2xl font-mono font-black text-slate-800 flex items-center justify-center gap-1">
                            {pomoMode === 'focus' ? (
                              <Flame className="w-4.5 h-4.5 text-red-500 fill-red-500 animate-pulse" />
                            ) : (
                              <Coffee className="w-4.5 h-4.5 text-emerald-500 animate-bounce" />
                            )}
                            <span>{formatTime(pomoTimeLeft)}</span>
                          </div>
                        </div>

                        {/* Presets and adjustment controls */}
                        <div className="grid grid-cols-4 gap-1 w-full mt-3">
                          {[15, 25, 45, 60].map(mins => (
                            <button
                              key={mins}
                              type="button"
                              onClick={() => handlePomoConfigure(mins)}
                              className={`py-1 rounded-lg text-[8px] font-black transition-luxury cursor-pointer ${
                                pomoMinutes === mins && pomoMode === 'focus'
                                  ? "bg-slate-900 text-white shadow-sm"
                                  : "bg-white hover:bg-slate-100 text-slate-600 border border-slate-200"
                              }`}
                            >
                              {mins}m
                            </button>
                          ))}
                        </div>

                        <div className="flex gap-2 w-full mt-3">
                          <button
                            type="button"
                            onClick={() => setPomoIsActive(!pomoIsActive)}
                            className={`flex-1 py-1.5 rounded-xl text-[10px] font-black transition-luxury flex items-center justify-center gap-1.5 shadow-sm cursor-pointer ${
                              pomoIsActive 
                                ? "bg-amber-500 hover:bg-amber-600 text-white" 
                                : "bg-indigo-600 hover:bg-indigo-700 text-white"
                            }`}
                          >
                            {pomoIsActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                            <span>{pomoIsActive ? "Tạm dừng" : "Khởi động"}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setPomoTimeLeft(pomoMinutes * 60);
                              setPomoIsActive(false);
                            }}
                            className="py-1.5 px-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 transition flex items-center justify-center cursor-pointer"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Daily study streak details container */}
                      {streakEnabled && (
                        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-4 rounded-2xl text-white space-y-3.5 relative overflow-hidden border border-indigo-900/60 shadow-lg shadow-indigo-950/20">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] bg-orange-500/10 text-orange-400 border border-orange-500/20 font-black px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1 font-sans">
                              <Flame className="w-3 h-3 text-orange-500 fill-orange-500" /> STREAK TRACK
                            </span>
                            <span className="text-[10px] text-slate-350 font-black tracking-tight font-mono">
                              Chỉ tiêu ({todayPracticedCount}/3)
                            </span>
                          </div>

                          <div className="flex items-center justify-between z-10 relative">
                            <div className="space-y-0.5">
                              <span className="text-[9px] text-slate-450 font-extrabold uppercase block tracking-wider font-sans">Chuỗi Ngày Ôn Tập</span>
                              <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-black font-mono leading-none">{streakDays}</span>
                                <span className="text-[10px] font-bold text-slate-400 font-sans">ngày</span>
                              </div>
                            </div>
                            
                            <div className="text-right font-sans">
                              <span className="text-[8px] text-slate-455 font-extrabold block leading-none">KỶ LỤC</span>
                              <span className="text-[11px] font-black text-indigo-300 font-mono flex items-center justify-end gap-1 mt-0.5">
                                <Award className="w-3 h-3 text-indigo-400" /> {maxStreak} ngày
                              </span>
                            </div>
                          </div>

                          {/* Quick checklist */}
                          <div className="space-y-1 text-[10px] font-sans">
                            {/* Target 1 */}
                            <div className="flex items-center justify-between bg-white/5 py-1 px-2 rounded-lg border border-white/5">
                              <span className="flex items-center gap-1.5 text-slate-200">
                                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                                Đăng nhập cổng VNU1001
                              </span>
                              <span className="text-[8px] font-black text-emerald-400 uppercase">ĐỦ</span>
                            </div>
                            {/* Target 2 */}
                            <div className="flex items-center justify-between bg-white/5 py-1 px-2 rounded-lg border border-white/5">
                              <span className="flex items-center gap-1.5 text-slate-200">
                                <span className={`w-3 h-3 rounded-full flex items-center justify-center shrink-0 border ${
                                  todayPracticedCount >= 3 ? 'bg-emerald-500 border-emerald-500' : 'border-slate-500'
                                }`}>
                                  {todayPracticedCount >= 3 && <Check className="w-1.5 h-1.5 text-white" />}
                                </span>
                                Đúng 3 câu ôn ({todayPracticedCount}/3)
                              </span>
                              <span className={`text-[8.5px] font-black ${todayPracticedCount >= 3 ? 'text-emerald-400' : 'text-slate-400'}`}>
                                {todayPracticedCount >= 3 ? "OK" : "Thiếu"}
                              </span>
                            </div>
                          </div>

                          {/* Weekly Calendar Row */}
                          <div className="grid grid-cols-7 gap-0.5 pt-2 border-t border-white/5">
                            {getWeekDates().map((dayOpt, idx) => (
                              <div key={idx} className="flex flex-col items-center gap-0.5">
                                <span className={`text-[8px] font-black ${dayOpt.isToday ? 'text-indigo-300' : 'text-slate-400'}`}>
                                  {dayOpt.label}
                                </span>
                                <div 
                                  className={`w-6 h-6 rounded flex items-center justify-center text-xs font-black transition-all ${
                                    dayOpt.isCompleted
                                      ? 'bg-gradient-to-br from-orange-400/90 to-red-500 border border-orange-500/10 text-white shadow-sm'
                                      : dayOpt.isToday
                                        ? 'border border-indigo-400 bg-indigo-950 text-indigo-450'
                                        : 'bg-white/5 text-slate-400 border border-white/5'
                                  }`}
                                  title={dayOpt.isCompleted ? `Đã hoàn thành` : `Chưa học`}
                                >
                                  {dayOpt.isCompleted ? (
                                    <Flame className="w-3.5 h-3.5 fill-white text-white" />
                                  ) : (
                                    <span className="text-[8px] font-mono font-bold font-sans">
                                      {dayOpt.dateStr.split('-')[2]}
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Dev Streak Control */}
                          <div className="flex justify-between items-center bg-slate-950 border border-white/5 p-1.5 rounded-xl mt-1 text-[8px] text-slate-400 select-none">
                            <span>Giả lập:</span>
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
                                  registerStudyActivity();
                                  const yes = new Date();
                                  yes.setDate(yes.getDate() - 1);
                                  const yesStr = `${yes.getFullYear()}-${String(yes.getMonth() + 1).padStart(2, '0')}-${String(yes.getDate()).padStart(2, '0')}`;
                                  setCompletedDates(prev => {
                                    const next = prev.includes(yesStr) ? prev : [...prev, yesStr];
                                    localStorage.setItem(STORAGE_COMPLETED_DATES_KEY, JSON.stringify(next));
                                    return next;
                                  });
                                }}
                                className="px-1 py-0.5 bg-white/10 text-white rounded font-bold hover:bg-white/15 transition cursor-pointer"
                              >
                                +1d
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
                                className="px-1 py-0.5 bg-red-500/10 text-red-400 rounded font-bold hover:bg-red-550/15 transition cursor-pointer"
                              >
                                Reset
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB CONTENT: CONFIG & SETTINGS */}
                  {sidebarActiveTab === 'settings' && (
                    <div className="space-y-4 animate-fade-in max-h-[460px] overflow-y-auto pr-1 text-xs">
                      {/* Interactive practice simulation switcher */}
                      <div className="bg-slate-50/70 p-3.5 rounded-2xl border border-slate-150 space-y-2">
                        <div className="flex items-center gap-1 text-[9px] uppercase font-black tracking-widest text-slate-450">
                          <Target className="w-3.5 h-3.5 text-indigo-500" /> Chế độ ôn tập
                        </div>
                        
                        <div className="grid grid-cols-1 gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              if (practiceExamMode) {
                                setPracticeExamMode(false);
                                addStreakToast("⚡ Instant Answer: Phản hồi ngay tức thì!", "info");
                              }
                            }}
                            className={`p-2.5 rounded-xl border text-left flex flex-col gap-0.5 transition-luxury cursor-pointer ${
                              !practiceExamMode 
                                ? "bg-white border-indigo-500 shadow-sm ring-1 ring-indigo-505/10" 
                                : "bg-slate-50/50 border-slate-200 hover:bg-slate-55"
                            }`}
                          >
                            <span className={`text-[10.5px] font-black ${!practiceExamMode ? "text-indigo-600" : "text-slate-700"}`}>
                              ⚡ Instant Answer (Xem giải ngay)
                            </span>
                            <span className="text-[9px] text-slate-450 leading-tight block font-sans">
                              Lời giải chi tiết và đúng sai hiển thị ngay sau khi chọn đáp án.
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              if (!practiceExamMode) {
                                setPracticeExamMode(true);
                                setPracticeTempAnswers({});
                                addStreakToast("📝 Đã bật Chế độ Thi Thử: Chọn xong hoãn chấm cho đến khi nhấn Nộp Bài!", "warning");
                              }
                            }}
                            className={`p-2.5 rounded-xl border text-left flex flex-col gap-0.5 transition-luxury cursor-pointer ${
                              practiceExamMode 
                                ? "bg-white border-indigo-500 shadow-sm ring-1 ring-indigo-505/10" 
                                : "bg-slate-50/50 border-slate-200 hover:bg-slate-55"
                            }`}
                          >
                            <span className={`text-[10.5px] font-black ${practiceExamMode ? "text-indigo-600" : "text-slate-700"}`}>
                              📝 Simulated Exam (Thi thử)
                            </span>
                            <span className="text-[9px] text-slate-450 leading-tight block font-sans">
                              Hoàn toàn ẩn giải thích và đúng sai cho đến khi bạn nhấn nút "Nộp Bài".
                            </span>
                          </button>
                        </div>
                      </div>

                      {/* Reminder hours configurations */}
                      <div className="bg-slate-50/70 p-3.5 rounded-2xl border border-slate-150 space-y-2">
                        <div className="flex items-center gap-1.5 text-[9px] uppercase font-black tracking-widest text-slate-450">
                          <Clock className="w-3.5 h-3.5 text-indigo-505" /> Nhắc nhở học tập
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <select
                            value={reminderTime}
                            onChange={(e) => {
                              setReminderTime(e.target.value);
                              localStorage.setItem("vnu1001_streak_reminder_time_v1", e.target.value);
                              addStreakToast(`⏰ Đã cài báo học vào lúc ${e.target.value} hàng ngày!`, "info");
                            }}
                            className="w-full text-[10px] font-black text-slate-700 bg-white border border-slate-200/80 rounded-xl py-2 px-2.5 cursor-pointer outline-none focus:border-indigo-500"
                          >
                            <option value="08:00">08:00 Sáng</option>
                            <option value="12:05">12:05 Trưa</option>
                            <option value="18:00">18:00 Tối</option>
                            <option value="20:00">20:00 Tối</option>
                            <option value="21:30">21:30 Đêm</option>
                            <option value="22:00">22:00 Đêm</option>
                          </select>

                          <button
                            type="button"
                            onClick={() => {
                              const nextActive = !reminderActive;
                              setReminderActive(nextActive);
                              localStorage.setItem("vnu1001_streak_reminder_active_v1", nextActive.toString());
                              addStreakToast(nextActive ? "🔔 Đã bật nhắc nhở" : "🔕 Đã tắt nhắc nhở", "info");
                            }}
                            className={`text-[10px] font-black py-2 px-2 rounded-xl border transition-luxury cursor-pointer text-center select-none ${
                              reminderActive 
                                ? "bg-emerald-500/10 text-emerald-700 border-emerald-300"
                                : "bg-white text-slate-405 border-slate-200"
                            }`}
                          >
                            {reminderActive ? "🔔 BẬT NHẮC" : "🔕 TẮT NHẮC"}
                          </button>
                        </div>
                      </div>

                      {/* PRACTICE RE-LEARN AND RESET CONTROLS */}
                      <div className="bg-slate-50/70 p-3.5 rounded-2xl border border-slate-150 space-y-2.5">
                        <div className="flex items-center gap-1.5 text-[9px] uppercase font-black tracking-widest text-slate-450 select-none">
                          <RefreshCw className="w-3 h-3 text-indigo-500 animate-spin" style={{ animationDuration: '6s' }} /> Tiến độ ôn tập
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

                        {/* Red/Danger link to reset chapter */}
                        <div className="pt-2 border-t border-slate-150 flex justify-center">
                          <button
                            onClick={() => handleResetTopicPractice(true)}
                            className="text-[9.5px] font-extrabold text-red-650 hover:text-red-700 hover:underline transition cursor-pointer flex items-center gap-1 bg-transparent border-none outline-none"
                            title="Xóa hết kết quả chương này"
                          >
                            <Trash2 className="w-3 h-3" /> Đặt lại cả chương
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Legend badges always at bottom representing status indicators */}
                  <div className="pt-3 border-t border-slate-150/50 flex flex-wrap gap-x-3 gap-y-1 text-[9.5px] font-black text-slate-400 uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 bg-emerald-500 border border-emerald-600/20 rounded-full inline-block" /> Trả lời Đúng
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 bg-red-500 border border-red-600/20 rounded-full inline-block" /> Làm Sai
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 bg-indigo-650 rounded-full inline-block" /> Hiện tại
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Question Display Card */}
              <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-md p-8 relative min-h-[500px] flex flex-col justify-between">
                
                {showPracticeResult ? (
                  <div className="flex-1 flex flex-col justify-between space-y-6">
                    {/* Header */}
                    <div className="flex justify-between items-start pb-4 border-b border-slate-100">
                      <div>
                        <span className="text-[10px] bg-emerald-100 text-emerald-850 font-black px-2.5 py-1 rounded-md uppercase tracking-wider select-none">
                          KẾT QUẢ ÔN TẬP CHUYÊN ĐỀ
                        </span>
                        <h3 className="text-sm font-black text-slate-900 mt-2 leading-snug">
                          {VNU_TOPICS[selectedTopic - 1]}
                        </h3>
                        <p className="text-[11px] text-slate-500 font-bold mt-1">Hệ thống ghi nhận và đối chiếu kết quả ôn luyện của bạn tại Azota</p>
                      </div>
                      <button
                        onClick={() => setShowPracticeResult(false)}
                        className="text-[11px] font-black text-slate-600 hover:text-slate-900 transition flex items-center gap-1 bg-slate-100 hover:bg-slate-205 py-2 px-3 rounded-xl cursor-pointer shadow-sm border border-slate-200/40"
                      >
                        Quay lại câu hỏi
                      </button>
                    </div>
                    {(() => {
                      const totalCount = filteredPracticeQuestions.length;
                      const answeredCount = filteredPracticeQuestions.filter(q => answeredHistory[q.id] !== undefined).length;
                      const correctCount = filteredPracticeQuestions.filter(q => answeredHistory[q.id]?.correct).length;
                      const wrongCount = answeredCount - correctCount;
                      const unansweredCount = totalCount - answeredCount;
                      const accuracyRate = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
                      const score = totalCount > 0 ? (correctCount / totalCount) * 10 : 0;
                      const passed = score >= 5.0;

                      return (
                        <div className="space-y-6 flex-1">
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                            {/* Estimated score panel */}
                            <div className="md:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-150/40 text-center shadow-inner relative overflow-hidden group">
                              <div className="w-14 h-14 rounded-full bg-white/50 flex items-center justify-center border border-indigo-200 shadow-sm mb-3">
                                <Trophy className="w-7 h-7 text-indigo-600 animate-bounce" />
                              </div>
                              <span className="text-[9px] text-indigo-400 font-extrabold uppercase tracking-widest block mb-1">Điểm số ước tính</span>
                              <span className="text-3xl font-black text-indigo-950 font-mono">{score.toFixed(1)} / 10đ</span>
                              <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md mt-3 inline-block shadow-sm ${
                                passed ? "bg-emerald-100 text-emerald-800 border border-emerald-250" : "bg-rose-100 text-rose-800 border border-rose-250"
                              }`}>
                                {passed ? "ĐẠT CHỈ TIÊU" : "CẦN LÀM LẠI"}
                              </span>
                            </div>

                            {/* Details breakdown */}
                            <div className="md:col-span-7 grid grid-cols-2 gap-4">
                              <div className="p-4 rounded-xl border border-slate-100 bg-emerald-50/20">
                                <span className="text-[9px] text-emerald-650 font-black uppercase tracking-wider block">Trả lời Đúng</span>
                                <span className="text-xl font-black text-emerald-600 mt-1 block">{correctCount} <span className="text-xs text-slate-400 font-medium font-sans">câu</span></span>
                                <p className="text-[9.5px] text-slate-400 font-semibold mt-1">Đạt {accuracyRate}% câu hỏi</p>
                              </div>

                              <div className="p-4 rounded-xl border border-slate-100 bg-red-50/10">
                                <span className="text-[9px] text-rose-650 font-black uppercase tracking-wider block">Trả lời Sai</span>
                                <span className="text-xl font-black text-rose-600 mt-1 block">{wrongCount} <span className="text-xs text-slate-400 font-medium font-sans">câu</span></span>
                                <p className="text-[9.5px] text-slate-400 font-semibold mt-1">Cần củng cố kiến thức</p>
                              </div>

                              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50">
                                <span className="text-[9px] text-slate-450 font-black uppercase tracking-wider block">Chưa rèn luyện</span>
                                <span className="text-xl font-black text-slate-705 mt-1 block">{unansweredCount} <span className="text-xs text-slate-400 font-medium font-sans">câu</span></span>
                                <p className="text-[9.5px] text-slate-400 font-semibold mt-1">Số câu bỏ sót</p>
                              </div>

                              <div className="p-4 rounded-xl border border-slate-100 bg-blue-50/10">
                                <span className="text-[9px] text-blue-650 font-black uppercase tracking-wider block">Tổng số chuyên đề</span>
                                <span className="text-xl font-black text-blue-600 mt-1 block">{totalCount} <span className="text-xs text-slate-400 font-medium font-sans">câu</span></span>
                                <p className="text-[9.5px] text-slate-400 font-semibold mt-1">Các câu thuộc mức lọc</p>
                              </div>
                            </div>
                          </div>

                          {/* Leaderboard Section */}
                          <div className="space-y-2.5">
                            <div className="flex justify-between items-center select-none">
                              <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                                <Trophy className="w-4 h-4 text-amber-500 fill-amber-500" /> BẢNG VÀNG THI ĐƯA CHUYÊN ĐỀ
                              </span>
                              <span className="text-[9px] bg-indigo-50 text-indigo-700 font-black px-2 py-0.5 rounded shadow-inner">
                                Giả lập thi đua trực tuyến (Azota)
                              </span>
                            </div>

                            <div className="border border-slate-150 rounded-2xl overflow-hidden max-h-[190px] overflow-y-auto bg-slate-50/50 p-2 space-y-1.5">
                              {practiceLeaderboard.map((item) => {
                                const isUser = !item.isVirtual;
                                const initials = item.name.trim().split(" ").slice(-2).map((n: string) => n[0]).join("");
                                
                                let rankTag = <span className="text-[10px] font-mono text-slate-400 font-bold">#{item.rank}</span>;
                                if (item.rank === 1) rankTag = <span className="text-[10px] bg-yellow-405 text-amber-955 font-black px-1 py-0.2 rounded shadow-sm">🥇 1</span>;
                                if (item.rank === 2) rankTag = <span className="text-[10px] bg-slate-300 text-slate-800 font-black px-1 py-0.2 rounded shadow-sm">🥈 2</span>;
                                if (item.rank === 3) rankTag = <span className="text-[10px] bg-amber-600 text-white font-black px-1 py-0.2 rounded shadow-sm">🥉 3</span>;

                                return (
                                  <div
                                    key={item.name}
                                    className={`p-2.5 rounded-xl border flex items-center justify-between gap-1.5 transition text-[11px] ${
                                      isUser 
                                        ? "bg-indigo-50/80 border-indigo-300 shadow-sm text-indigo-950 ring-1 ring-indigo-505/20 font-bold" 
                                        : "bg-white border-slate-100 hover:border-slate-200"
                                    }`}
                                  >
                                    <div className="flex items-center gap-2 min-w-0">
                                      <span className="w-7 text-center shrink-0">{rankTag}</span>
                                      <div className={`w-6 h-6 rounded-md flex items-center justify-center text-[9px] font-black shrink-0 ${item.avatarBg}`}>
                                        {initials}
                                      </div>
                                      <span className={`truncate ${isUser ? "font-black text-indigo-900" : "font-semibold text-slate-850"}`}>
                                        {item.name}
                                      </span>
                                    </div>
                                    
                                    <div className="text-right shrink-0 font-bold">
                                      <span className={`font-black ${isUser ? "text-indigo-650" : "text-slate-800"}`}>
                                        {item.completionRate}%
                                      </span>
                                      <span className="text-[8.5px] text-slate-400 block leading-none font-semibold">
                                        {item.correctCount} câu đúng
                                      </span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Footer action buttons */}
                          <div className="pt-4 border-t border-slate-100 flex flex-wrap justify-between items-center gap-3 select-none">
                            <button
                              onClick={() => {
                                setShowPracticeResult(false);
                                setPracticeStatusFilter('wrong');
                                setPracticeIndex(0);
                                setChosenOption(null);
                                setShowExplanation(false);
                                customAlert("Hệ thống đã kích hoạt bộ lọc, hiển thị tất cả các câu làm SAI để bạn rà soát lại lỗi nhé!");
                              }}
                              disabled={wrongCount === 0}
                              className={`text-[11px] font-black py-2.5 px-4 rounded-xl flex items-center gap-1 shadow-sm transition border cursor-pointer ${
                                wrongCount > 0 
                                  ? "bg-amber-50 border-amber-250 text-amber-800 hover:bg-amber-100"
                                  : "bg-slate-50 text-slate-400 border-slate-200/50 cursor-not-allowed opacity-60"
                              }`}
                            >
                              <AlertCircle className="w-3.5 h-3.5 animate-pulse" /> Sửa câu SAI ({wrongCount})
                            </button>

                            <button
                              onClick={() => {
                                handleResetTopicPractice(true);
                                setShowPracticeResult(false);
                              }}
                              className="text-[11px] font-black py-2.5 px-4 rounded-xl flex items-center gap-1 shadow-sm border border-slate-250 hover:bg-slate-100 transition cursor-pointer text-slate-700 bg-white"
                            >
                              <RotateCcw className="w-3.5 h-3.5" /> Reset chương
                            </button>

                            <div className="flex gap-2">
                              <button
                                onClick={() => setShowPracticeResult(false)}
                                className="text-[11px] font-black bg-slate-900 border border-slate-950 text-white hover:bg-slate-950 py-2.5 px-4 rounded-xl transition cursor-pointer shadow-sm"
                              >
                                Tiếp tục ôn tập
                              </button>
                              
                              <button
                                onClick={() => {
                                  setActiveTab('dashboard');
                                }}
                                className="text-[11px] font-black bg-blue-600 text-white hover:bg-blue-700 py-2.5 px-4 rounded-xl transition cursor-pointer shadow-sm shadow-blue-650/10"
                              >
                                Về bảng tổng quan
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                ) : filteredPracticeQuestions.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-4 bg-white rounded-3xl border border-slate-200 shadow-sm">
                    <AlertCircle className="w-12 h-14 text-slate-400/80" />
                    <h4 className="text-base font-black text-slate-800">Không có dữ liệu câu hỏi phù hợp!</h4>
                    <p className="text-xs text-slate-400">Hãy tăng khoảng lọc hoặc đổi bài học khác bên ngoài chuyên mục.</p>
                  </div>
                ) : (() => {
                  const currentQ = filteredPracticeQuestions[practiceIndex];
                  const shuffledInfo = getShuffledOptions(currentQ, shuffleOptions);
                  const alreadyAnsweredItem = answeredHistory[currentQ.id];
                  
                  // In exam simulation, hide correct answers/explanations until submitted (merging to history)
                  const showInstantFeedback = !practiceExamMode || alreadyAnsweredItem !== undefined;
                  const hasResolved = showInstantFeedback && (chosenOption !== null || alreadyAnsweredItem !== undefined);
                  
                  // For styling selected option (shows blue/indigo choice in exam, red/green in instant)
                  const activeChosenOriginal = hasResolved 
                    ? (chosenOption !== null ? chosenOption : (alreadyAnsweredItem ? alreadyAnsweredItem.chosenOption : null))
                    : (practiceTempAnswers[currentQ.id] !== undefined ? practiceTempAnswers[currentQ.id] : null);

                  let diffColor = "bg-teal-50 text-teal-650 border-teal-200/50";
                  let diffLabel = "NHẬN BIẾT";
                  if (currentQ.difficulty === 'thong_hieu') {
                    diffColor = "bg-blue-50 text-blue-700 border-blue-200/50";
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
                    <div className="flex-1 flex flex-col bg-white rounded-3xl border border-slate-250/60 p-8 shadow-sm">
                      {/* Top bar indicators */}
                      <div className="flex items-center justify-between pb-5 border-b border-slate-100 select-none">
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className="text-[10px] text-slate-500 font-extrabold font-mono bg-slate-100 py-1 px-2.5 rounded-lg">CÂU {practiceIndex + 1} / {filteredPracticeQuestions.length}</span>
                          <span className={`text-[9px] font-extrabold px-2.5 py-1 border rounded-lg ${diffColor}`}>
                            {diffLabel}
                          </span>
                          {practiceExamMode && !alreadyAnsweredItem && (
                            <span className="text-[9px] bg-indigo-50 text-indigo-750 border border-indigo-200/50 rounded-lg px-2.5 py-1 font-black animate-pulse select-none">
                              📝 CHẾ ĐỘ THI THỬ (ẨN ĐÁP ÁN)
                            </span>
                          )}
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
                          {shuffledInfo.options.map((opt, optIdx) => {
                            const originalIdx = shuffledInfo.shuffledToOriginal[optIdx];
                            const isThisTarget = activeChosenOriginal === originalIdx;
                            const isCorrectAnswerIdx = currentQ.correctOption === originalIdx;

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
                            } else if (isThisTarget) {
                              // Styling when selected in exam simulation mode (non-resolved)
                              optStyle = "border-indigo-600 bg-indigo-50 text-indigo-950 font-extrabold shadow-sm ring-2 ring-indigo-500/20";
                              iconBadge = <span className="text-[11px] font-black text-indigo-700">{alphabets[optIdx]}</span>;
                            }

                            return (
                              <button
                                key={optIdx}
                                type="button"
                                disabled={hasResolved}
                                onClick={() => handleAnswerQuestion(currentQ, originalIdx)}
                                className={`p-4.5 rounded-2xl border text-left text-xs font-bold leading-relaxed transition-all duration-150 flex items-center gap-3.5 cursor-pointer ${optStyle}`}
                              >
                                <span className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 ${
                                  hasResolved && isCorrectAnswerIdx ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm shadow-emerald-500/10' :
                                  hasResolved && isThisTarget ? 'bg-red-500 text-white border-red-500 shadow-sm shadow-red-500/10' :
                                  (!hasResolved && isThisTarget) ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-500/10' :
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
                        {showInstantFeedback && (showExplanation || alreadyAnsweredItem) && (
                          <DetailedExplanationBox question={currentQ} />
                        )}
                      </div>

                      {/* Bottom navigation control block */}
                      <div className="pt-5 border-t border-slate-100 flex flex-wrap justify-between items-center select-none shrink-0 gap-3">
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

                        {/* CENTRED INTEGRATIVE NỘP BÀI BUTTON FOR PRACTICE */}
                        <button
                          onClick={() => {
                            const answeredCount = practiceExamMode 
                              ? filteredPracticeQuestions.filter(q => practiceTempAnswers[q.id] !== undefined).length
                              : filteredPracticeQuestions.filter(q => answeredHistory[q.id] !== undefined).length;
                            
                            if (answeredCount === 0) {
                              customAlert("Bạn chưa trả lời câu hỏi nào trong chuyên đề này cả! Hãy rèn luyện một vài câu trước khi nộp để có số liệu xếp hạng nhé.", "Nhắc nhở");
                              return;
                            }
                            
                            customConfirm("Bạn có thực sự muốn nộp bài ôn tập chuyên đề lúc này để xem thống kê xếp hạng?", () => {
                              if (practiceExamMode) {
                                // Merge exam temporary answers into the persistent score list
                                const updatedHistory = { ...answeredHistory };
                                let newlyCorrectCount = 0;
                                filteredPracticeQuestions.forEach(q => {
                                  const chosen = practiceTempAnswers[q.id];
                                  if (chosen !== undefined) {
                                    const isCorrect = chosen === q.correctOption;
                                    updatedHistory[q.id] = { correct: isCorrect, chosenOption: chosen };
                                    if (isCorrect) {
                                      newlyCorrectCount++;
                                    }
                                  }
                                });
                                setAnsweredHistory(updatedHistory);
                                localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(updatedHistory));

                                if (newlyCorrectCount > 0) {
                                  registerStudyActivity();
                                  setTodayPracticedCount(prev => {
                                    const next = prev + newlyCorrectCount;
                                    localStorage.setItem("vnu1001_today_practiced_v1", next.toString());
                                    return next;
                                  });
                                }
                              }
                              setShowPracticeResult(true);
                            }, "Nộp bài ôn tập");
                          }}
                          className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:shadow-emerald-600/15 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-black active:scale-95 transition flex items-center gap-1.5 cursor-pointer shadow border-b border-emerald-750"
                        >
                          <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                          Nộp Bài Ôn Tập
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
                    </div>
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
                  {(() => {
                    const officialExam = ALL_PLDC_EXAMS.find(e => e.id === currentOfficialExamId);
                    if (officialExam) {
                      return (
                        <>
                          <span className="text-[10px] bg-emerald-600 font-extrabold px-3 py-1 rounded-md tracking-wider uppercase">Đề Thi Pháp Luật Đại Cương Bản Pro</span>
                          <h3 className="font-black text-lg">{officialExam.title}</h3>
                          <p className="text-xs text-slate-300 font-medium">{officialExam.description}</p>
                        </>
                      );
                    }
                    return (
                      <>
                        <span className="text-[10px] bg-blue-600 font-extrabold px-3 py-1 rounded-md tracking-wider uppercase">{currentSubject === 'vnu1001' ? "VNU1001" : currentSubject === 'pldc' ? "PLDC" : "MLDG"} Mock Exam</span>
                        <h3 className="font-black text-lg">Đề Khảo Sát Tổng Hợp Ngẫu Nhiên</h3>
                        <p className="text-xs text-slate-300 font-medium">Đề thi gồm {mockQuestions.length} câu hỏi ngẫu nhiên. Đạt từ 50% câu trả lời đúng trở lên để nhận chứng nhận vượt ải.</p>
                      </>
                    );
                  })()}
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
                        {(() => {
                          const shuffledInfo = getShuffledOptions(q, shuffleOptions);
                          return shuffledInfo.options.map((opt, optIdx) => {
                            const originalIdx = shuffledInfo.shuffledToOriginal[optIdx];
                            const isSelected = mockAnswers[q.id] === originalIdx;
                            return (
                              <button
                                key={optIdx}
                                type="button"
                                onClick={() => {
                                  setMockAnswers({
                                    ...mockAnswers,
                                    [q.id]: originalIdx
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
                          });
                        })()}
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
              className="max-w-6xl mx-auto space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* LEFT COLUMN: VISUAL CERTIFICATE AND CONTROLS */}
                <div className="lg:col-span-6 space-y-6">
                  {/* Visual splash score */}
                  <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl text-center">
                    <div className={`p-8 text-white flex flex-col items-center justify-center space-y-3 ${
                      examSavedResult.passed ? 'bg-gradient-to-br from-indigo-600 to-blue-600' : 'bg-gradient-to-br from-rose-500 to-red-600'
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
                    <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 border-b border-slate-105">
                      <div className="text-center space-y-1">
                        <span className="text-[9px] text-slate-400 font-extrabold uppercase block tracking-wider">Số câu Đúng</span>
                        <span className="text-sm font-black text-emerald-600">{examSavedResult.correctCount} câu</span>
                      </div>
                      <div className="text-center space-y-1">
                        <span className="text-[9px] text-slate-400 font-extrabold uppercase block tracking-wider">Số câu Sai</span>
                        <span className="text-sm font-black text-red-500">{examSavedResult.wrongCount} câu</span>
                      </div>
                      <div className="text-center space-y-1">
                        <span className="text-[9px] text-slate-400 font-extrabold uppercase block tracking-wider">Thời gian làm bài</span>
                        <span className="text-xs font-bold font-mono text-slate-800 leading-none h-6 block py-1">{examSavedResult.timeSpent}</span>
                      </div>
                      <div className="text-center space-y-1">
                        <span className="text-[9px] text-slate-400 font-extrabold uppercase block tracking-wider">Chứng nhận</span>
                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md inline-block ${
                          examSavedResult.passed ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}>{examSavedResult.passed ? "ĐÃ ĐẠT" : "CHƯA ĐẠT"}</span>
                      </div>
                    </div>

                    <div className="p-6 bg-white border-t border-slate-100 space-y-4">
                      <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider text-center select-none">
                         Lựa chọn ôn tập & khắc phục lỗ hổng kiến thức
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={handleRetakeAll}
                          className="bg-slate-900 hover:bg-slate-950 text-white text-xs font-black py-3 px-1.5 rounded-2xl transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                        >
                          <RefreshCw className="w-3.5 h-3.5" /> Làm lại toàn bộ đề
                        </button>
                        
                        <button
                          onClick={handleRetakeWrong}
                          className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-black py-3 px-1.5 rounded-2xl transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                        >
                          <AlertCircle className="w-3.5 h-3.5" /> Chỉ làm lại câu SAI
                        </button>

                        <button
                          onClick={handleStartMockExam}
                          className="bg-indigo-600 hover:bg-indigo-750 text-white text-xs font-black py-3 px-1.5 rounded-2xl transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                        >
                          <Play className="w-3.5 h-3.5 fill-white animate-pulse" /> Đề ngẫu nhiên mới
                        </button>

                        <button
                          onClick={() => setActiveTab('dashboard')}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black py-3 px-1.5 rounded-2xl transition cursor-pointer border border-slate-350/50"
                        >
                          Quay về tổng quan
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN: INTERACTIVE AZOTA LEADERBOARD PANEL */}
                <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden flex flex-col h-[490px]">
                  {/* Azota branded header */}
                  <div className="bg-gradient-to-r from-teal-650 via-blue-700 to-indigo-850 p-5 text-white flex flex-col">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-yellow-350 fill-yellow-350 animate-bounce" />
                        <span className="font-black text-sm uppercase tracking-wide">Bảng điểm thi đua Azota</span>
                      </div>
                      <span className="text-[9px] bg-red-600 text-white shrink-0 uppercase tracking-widest font-black px-2 py-0.5 rounded-full animate-pulse flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-white block"></span> Trực tuyến
                      </span>
                    </div>
                    <p className="text-[10px] text-teal-50/80 font-bold mt-1.5">Mô phỏng thi đua tương tác trực tiếp với các học viên khác tại hệ thống Azota VNU</p>
                  </div>

                  {/* Leaderboard search searcher */}
                  <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-105 flex items-center justify-between gap-3 text-xs">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Tìm thủ khoa hoặc tên đối thủ..."
                        value={leaderboardSearchQuery}
                        onChange={(e) => setLeaderboardSearchQuery(e.target.value)}
                        className="w-full text-[11px] font-semibold pl-8 pr-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 text-slate-800"
                      />
                      <Users className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    </div>
                    <span className="text-[10px] text-slate-500 font-extrabold shrink-0 bg-slate-200/50 px-2 py-1 rounded-lg">
                      {examLeaderboard.length} thí sinh
                    </span>
                  </div>

                  {/* Competitor scroll zone */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-2.5 scrollbar-thin">
                    {(() => {
                      const filtered = examLeaderboard.filter(c => 
                        c.name.toLowerCase().includes(leaderboardSearchQuery.toLowerCase())
                      );

                      if (filtered.length === 0) {
                        return (
                          <div className="py-14 text-center text-xs text-slate-405 font-bold">
                            Không có kết quả nào khớp với tìm kiếm...
                          </div>
                        );
                      }

                      return filtered.map((item) => {
                        const isUser = !item.isVirtual;
                        const isPodium = item.rank <= 3;
                        const initials = item.name.split(" ").slice(-2).map((n: string) => n[0]).join("");

                        let rankTag = <span className="text-xs font-bold text-slate-450 font-mono w-6 text-center shrink-0">#{item.rank}</span>;
                        if (item.rank === 1) rankTag = <span className="text-xs bg-yellow-405 text-amber-950 font-black px-1.5 py-0.5 rounded shadow shrink-0">🥇 1</span>;
                        if (item.rank === 2) rankTag = <span className="text-xs bg-slate-250 text-slate-850 font-black px-1.5 py-0.5 rounded shadow shrink-0">🥈 2</span>;
                        if (item.rank === 3) rankTag = <span className="text-xs bg-amber-600 text-white font-black px-1.5 py-0.5 rounded shadow shrink-0">🥉 3</span>;

                        return (
                          <div
                            key={item.name}
                            className={`p-3 rounded-2xl border flex items-center justify-between gap-3 transition-all duration-150 ${
                              isUser 
                                ? "bg-indigo-50/70 border-indigo-400 shadow shadow-indigo-650/15 ring-1 ring-indigo-500/20"
                                : isPodium
                                  ? "bg-amber-50/20 border-amber-250/50"
                                  : "bg-white border-slate-105 hover:border-slate-200"
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div>{rankTag}</div>
                              
                              <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-[10px] shrink-0 font-mono ${item.avatarBg}`}>
                                {initials}
                              </div>

                              <div className="min-w-0">
                                <h4 className={`text-xs truncate text-slate-900 flex items-center gap-1.5 ${isUser ? 'font-black text-indigo-950' : 'font-extrabold'}`}>
                                  {item.name}
                                  {isUser && (
                                    <span className="text-[8px] bg-indigo-600 text-white font-black px-1.5 py-0.5 rounded tracking-wide shrink-0 animate-pulse">
                                      BẠN
                                    </span>
                                  )}
                                </h4>
                                <p className="text-[10px] text-slate-450 font-semibold truncate leading-none mt-1">{item.className}</p>
                              </div>
                            </div>

                            <div className="text-right shrink-0">
                              <span className={`text-xs font-black block leading-none ${isUser ? 'text-indigo-600' : 'text-slate-800'}`}>
                                {item.score.toFixed(1)} <span className="text-[8.5px] text-slate-400 font-bold">đ</span>
                              </span>
                              <span className="text-[9px] text-slate-400 font-mono font-bold block pt-1.5">
                                {item.correctCount}/{item.totalCount}Đ • {item.timeSpentStr.replace(" phút", "p").replace(" giây", "s")}
                              </span>
                            </div>
                          </div>
                        );
                      });
                    })()}
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
                          {(() => {
                            const shuffledInfo = getShuffledOptions(q, shuffleOptions);
                            return (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                                {shuffledInfo.options.map((opt, optIdx) => {
                                  const originalIdx = shuffledInfo.shuffledToOriginal[optIdx];
                                  let itemBorder = "border-slate-100";
                                  let iconMark = <span className="text-[10px] pr-1.5 text-slate-400">{String.fromCharCode(65 + optIdx)}.</span>;

                                  if (originalIdx === correctIdx) {
                                    itemBorder = "border-emerald-250 bg-emerald-50/50 text-emerald-950 font-extrabold";
                                    iconMark = <Check className="w-3.5 h-3.5 text-emerald-600 mr-1" />;
                                  } else if (originalIdx === chosen) {
                                    itemBorder = "border-red-250 bg-red-50/50 text-red-950 font-extrabold";
                                    iconMark = <X className="w-3.5 h-3.5 text-red-650 mr-1" />;
                                  }

                                  return (
                                    <div key={optIdx} className={`p-2.5 border rounded-xl flex items-center text-[11px] font-medium leading-normal ${itemBorder}`}>
                                      {iconMark}
                                      <span>{opt}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          })()}

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
                          {(() => {
                            const shuffledInfo = getShuffledOptions(q, shuffleOptions);
                            return shuffledInfo.options.map((opt, optIdx) => {
                              const originalIdx = shuffledInfo.shuffledToOriginal[optIdx];
                              const isCorrect = originalIdx === corrIdx;
                              return (
                                <div 
                                  key={optIdx} 
                                  className={`p-3.5 border rounded-2xl flex items-center gap-2 font-bold ${
                                    isCorrect ? 'border-emerald-250 bg-emerald-50/30 text-emerald-950' : 'border-slate-100 text-slate-600'
                                  }`}
                                >
                                  <span className={`w-6 h-6 rounded-full border text-center leading-5 shrink-0 text-xs ${
                                    isCorrect ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-slate-50 border-slate-300 text-slate-500'
                                  }`}>
                                    {String.fromCharCode(65 + optIdx)}
                                  </span>
                                  <span>{opt}</span>
                                </div>
                              );
                            });
                          })()}
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
                    <RotateCcw className="w-3.5 h-3.5" /> Khôi Phục Đề Chuẩn {currentSubject === 'vnu1001' ? "VNU1001" : currentSubject === 'pldc' ? "Pháp Luật ĐC" : "Đo Lường ĐG"}
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
                        <Plus className="w-4 h-4 animate-pulse" /> Trộn Cùng Đề Chuẩn {currentSubject === 'vnu1001' ? "VNU1001" : currentSubject === 'pldc' ? "Pháp Luật ĐC" : "Đo Lường ĐG"}
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
                      {certFullName || (currentSubject === 'vnu1001' ? "Học viên VNU1001" : currentSubject === 'pldc' ? "Học viên Pháp Luật" : currentSubject === 'mldg' ? "Học viên Đo Lường GD" : currentSubject === 'tlhgd' ? "Học viên Tâm Lý Học" : "Học viên Khoa Học Quản Lý")}
                    </span>
                  </div>

                  <p className="text-[9px] font-bold text-slate-650 max-w-sm mx-auto leading-normal m-0 animate-pulse">
                    {currentSubject === 'mldg' 
                      ? "Đã xuất sắc hoàn thành lộ trình trắc nghiệm khảo thí gồm 4 chuyên đề cốt lõi với điểm số vượt bậc."
                      : currentSubject === 'tlhgd'
                        ? "Đã xuất sắc hoàn thành lộ trình trắc nghiệm khảo thí gồm 6 chuyên đề tâm lý giáo dục cốt lõi với điểm số vượt bậc."
                        : currentSubject === 'khqlgd'
                          ? "Đã xuất sắc hoàn thành lộ trình trắc nghiệm khảo thí gồm 4 chuyên đề khoa học quản lý giáo dục với điểm số vượt bậc."
                          : "Đã xuất sắc hoàn thành lộ trình trắc nghiệm khảo thí gồm 6 chuyên đề cốt lõi với điểm số vượt bậc."}
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
            <h2 className="text-xl font-black text-slate-900 tracking-tight m-0 font-sans">{currentSubject === 'vnu1001' ? "CỔNG LUYỆN THI TRẮC NGHIỆM TIÊU CHUẨN VNU1001" : currentSubject === 'pldc' ? "CỔNG LUYỆN THI PHÁP LUẬT ĐẠI CƯƠNG PRO" : currentSubject === 'mldg' ? "CỔNG LUYỆN THI ĐO LƯỜNG ĐÁNH GIÁ TRONG GIÁO DỤC" : "CỔNG LUYỆN THI TÂM LÝ HỌC TRONG GIÁO DỤC"}</h2>
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
              Ban quản lý chương trình bồi dưỡng và kiểm tra kiến thức {currentSubject === 'vnu1001' ? "Kỹ năng số VNU1001" : currentSubject === 'pldc' ? "Pháp luật đại cương" : currentSubject === 'mldg' ? "Nhập môn đo lường đánh giá trong giáo dục" : "Tâm lý học trong giáo dục"} chứng nhận:
            </p>

            <div className="space-y-1 py-1">
              <span className="text-xl font-black text-slate-900 font-sans border-b-2 border-dashed border-slate-400 px-8 pb-1 inline-block">
                {certFullName || `Học viên ${currentSubject === 'vnu1001' ? "VNU1001" : currentSubject === 'pldc' ? "Pháp Luật" : currentSubject === 'mldg' ? "Đo Lường Giáo Dục" : "Tâm Lý Học"}`}
              </span>
              <span className="text-[9px] text-slate-400 tracking-widest uppercase block mt-1">Họ tên học viên / Candidate Name</span>
            </div>

            <p className="text-[10px] font-semibold text-slate-705 max-w-md mx-auto leading-relaxed font-sans">
              {currentSubject === 'vnu1001' 
                ? "Đã kết thúc lộ trình khảo thí trực tuyến gồm 6 học phần kỹ năng số, thực hành trả lời câu hỏi phân loại ngẫu nhiên bám sát Khung năng lực số chuẩn Đại học Quốc Gia."
                : currentSubject === 'pldc'
                  ? "Đã hoàn thành xuất sắc hệ thống 6 chuyên đề lý thuyết và giải thích loại trừ trực tiếp, nắm vững kiến thức căn bản về Nhà nước, Hệ thống pháp luật và các ngành luật ở Việt Nam."
                  : currentSubject === 'mldg'
                    ? "Đã hoàn thành xuất sắc chương trình đo lường đánh giá giáo dục 4 chương lý thuyết thực nghiệm, chuẩn hóa tư duy thiết kế ma trận đề thi dốc khó và độ tin cậy Alpha nâng tầm chất lượng."
                    : "Đã hoàn thành xuất sắc chương trình tâm lý học trong giáo dục gồm 12 chương lý thuyết hành vi, hoạt động dạy học, tham vấn học đường và nhân cách nhà giáo bồi đắp kỹ năng sâu sắc."}
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
                <p className="text-[9px] text-slate-500 font-bold m-0">Detailed Academic Record & Skill Testing Profile - {currentSubject === 'vnu1001' ? 'VNU1001' : currentSubject === 'pldc' ? 'PLDC' : currentSubject === 'mldg' ? 'MLDG' : 'TLHGD'}</p>
              </div>
              <div className="text-right text-[9px] text-slate-400 font-bold font-mono">
                BÁO CÁO CHI TIẾT SỐ LƯU
              </div>
            </div>

            {/* Candidate summary */}
            <div className="grid grid-cols-2 gap-4 text-[11px] font-sans py-2 bg-slate-50 rounded-xl p-4 border border-slate-100">
              <div>
                <span className="text-slate-400 font-bold block uppercase text-[8px] tracking-wide">Học viên ôn học:</span>
                <span className="font-extrabold text-slate-800">{certFullName || `Học viên ${currentSubject === 'vnu1001' ? "VNU1001" : currentSubject === 'pldc' ? "Pháp Luật" : "Đo Lường Giáo Dục"}`}</span>
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

      {/* Dynamic Floating Streak Toasts / Reminders */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none select-none">
        <AnimatePresence>
          {streakToasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.92 }}
              transition={{ type: "spring", damping: 15, stiffness: 120 }}
              className={`p-4 rounded-2xl border pointer-events-auto flex items-start gap-3 shadow-xl backdrop-blur-md ${
                toast.type === 'success' 
                  ? 'bg-emerald-500/95 text-white border-emerald-400' 
                  : toast.type === 'warning' 
                    ? 'bg-amber-500/95 text-white border-amber-400' 
                    : 'bg-slate-900/95 text-slate-100 border-slate-750'
              }`}
            >
              {toast.type === 'success' ? (
                <Flame className="w-5 h-5 text-yellow-300 fill-yellow-300 animate-bounce shrink-0 mt-0.5" />
              ) : toast.type === 'warning' ? (
                <AlertCircle className="w-5 h-5 text-white fill-amber-600/30 shrink-0 mt-0.5 animate-pulse" />
              ) : (
                <Sparkles className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              )}
              <div className="flex-1 space-y-0.5 leading-snug">
                <span className="text-[10px] font-black uppercase tracking-wider block font-mono opacity-85">
                  {toast.type === 'success' ? 'CỦNG CỐ STREAK' : toast.type === 'warning' ? 'CẢNH BÁO KỶ LUẬT' : 'HOẠT ĐỘNG STUDY'}
                </span>
                <p className="text-xs font-bold leading-normal">{toast.message}</p>
              </div>
              <button 
                onClick={() => setStreakToasts(prev => prev.filter(t => t.id !== toast.id))}
                className="text-white/65 hover:text-white transition cursor-pointer p-0.5 border-none bg-transparent"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}
