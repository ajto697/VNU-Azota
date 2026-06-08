/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, BookOpen, Clock, CheckCircle2, ChevronRight, FileText, 
  Upload, Sparkles, Send, Award, ArrowRight, Eye, FileSpreadsheet, 
  Search, ShieldAlert, Key, AlertCircle, Plus, ChevronLeft
} from 'lucide-react';
import { ClassGroup, Student, Exam, Submission, Annotation } from '../types';
import { SAMPLE_ESSAY_SHEETS } from '../data';

interface StudentPortalProps {
  classes: ClassGroup[];
  exams: Exam[];
  submissions: Submission[];
  onUpdateClasses: (classes: ClassGroup[]) => void;
  onUpdateSubmissions: (submissions: Submission[]) => void;
}

export default function StudentPortal({
  classes,
  exams,
  submissions,
  onUpdateClasses,
  onUpdateSubmissions
}: StudentPortalProps) {
  // Current logged student credentials
  const [enrolledClassIds, setEnrolledClassIds] = useState<string[]>(['class-1', 'class-2']);
  const [currentStudentId, setCurrentStudentId] = useState<string>('std-101');
  const [currentStudentName, setCurrentStudentName] = useState<string>('Nguyễn Văn An');
  
  // Joincode interface
  const [joinCodeInput, setJoinCodeInput] = useState('');
  const [joinError, setJoinError] = useState('');
  const [joinSuccess, setJoinSuccess] = useState('');
  
  // Test views states
  const [activeScreen, setActiveScreen] = useState<'home' | 'taking_mc' | 'taking_essay' | 'view_graded'>('home');
  const [activeExamId, setActiveExamId] = useState<string | null>(null);
  const [activeSubmissionId, setActiveSubmissionId] = useState<string | null>(null);

  // States for Taking Multiple Choice
  const [mcAnswers, setMcAnswers] = useState<{ [qId: string]: number }>({});
  const [mcTimer, setMcTimer] = useState<number>(0);
  const [timerIntervalId, setTimerIntervalId] = useState<any>(null);

  // States for Uploading Essays
  const [essayBase64Img, setEssayBase64Img] = useState<string>('');
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  const [dragActive, setDragActive] = useState<boolean>(false);

  const activeExam = exams.find(e => e.id === activeExamId);
  const activeSubmission = submissions.find(s => s.id === activeSubmissionId);

  // Auto clean timer on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalId) clearInterval(timerIntervalId);
    };
  }, [timerIntervalId]);

  // Handle invitation code entry
  const handleJoinClassWithCode = (e: React.FormEvent) => {
    e.preventDefault();
    setJoinError('');
    setJoinSuccess('');
    
    if (!joinCodeInput.trim()) return;

    const targetClass = classes.find(c => c.code.toLowerCase() === joinCodeInput.trim().toLowerCase());
    if (!targetClass) {
      setJoinError('Mã lớp học không chính xác hoặc đã hết hiệu lực. Thử nhập "TOAN12A1" hoặc "VAN11B2"');
      return;
    }

    if (enrolledClassIds.includes(targetClass.id)) {
      setJoinError('Bạn vốn đã tham gia lớp học này rồi!');
      return;
    }

    // Auto add class to student enrolled list
    setEnrolledClassIds([...enrolledClassIds, targetClass.id]);
    
    // Choose/Build a student name in that class
    let randomOrNewName = "Học sinh Tự Do";
    if (targetClass.students.length > 0) {
      // Pick first un-allocated student as simulation or prompt names
      const randomStd = targetClass.students[0];
      setCurrentStudentId(randomStd.id);
      setCurrentStudentName(randomStd.name);
      randomOrNewName = randomStd.name;
    } else {
      // Auto register student to that class
      const stdCode = `HS${Math.floor(1000 + Math.random() * 9000)}`;
      const newStd: Student = {
        id: `std-${Date.now()}`,
        name: "Học sinh Mới Tham Gia",
        studentCode: stdCode
      };
      
      const updatedClasses = classes.map(c => {
        if (c.id === targetClass.id) {
          return {
            ...c,
            students: [...c.students, newStd]
          };
        }
        return c;
      });
      onUpdateClasses(updatedClasses);
      setCurrentStudentId(newStd.id);
      setCurrentStudentName(newStd.name);
      randomOrNewName = newStd.name;
    }

    setJoinSuccess(`Liên kết Lớp "${targetClass.name}" thành công! Hệ thống định danh bạn là: "${randomOrNewName}"`);
    setJoinCodeInput('');
  };

  // Switch identity for different mock test simulations
  const handleSwitchIdentity = (stdId: string, stdName: string) => {
    setCurrentStudentId(stdId);
    setCurrentStudentName(stdName);
    setActiveScreen('home');
  };

  // Start a Multiple-choice Exam
  const startMultipleChoiceExam = (exam: Exam) => {
    setActiveExamId(exam.id);
    setMcAnswers({});
    setActiveScreen('taking_mc');

    if (exam.duration > 0) {
      setMcTimer(exam.duration * 60); // convert to seconds
      const interval = setInterval(() => {
        setMcTimer(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            // Auto submit!
            alert("Hết giờ làm bài! Bài thi của bạn đã tự động nộp.");
            triggerSubmitMultipleChoice(exam.id, {});
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      setTimerIntervalId(interval);
    }
  };

  // Trigger submission save for multiple choice
  const triggerSubmitMultipleChoice = (exId: string, answersObj: { [qId: string]: number }) => {
    if (timerIntervalId) clearInterval(timerIntervalId);

    const exam = exams.find(e => e.id === exId);
    if (!exam || !exam.questions) return;

    // Calculate score immediately
    let scoreEarned = 0;
    exam.questions.forEach(q => {
      const studAns = answersObj[q.id];
      if (studAns === q.correctOption) {
        scoreEarned += q.points;
      }
    });

    const newSub: Submission = {
      id: `sub-${Date.now()}`,
      examId: exId,
      studentId: currentStudentId,
      studentName: currentStudentName,
      submittedAt: new Date().toISOString(),
      status: 'graded',
      score: parseFloat(scoreEarned.toFixed(1)),
      multipleChoiceAnswers: answersObj,
      teacherFeedback: `Chấm tự động: Đúng ${exam.questions.filter(q => answersObj[q.id] === q.correctOption).length}/${exam.questions.length} câu.`
    };

    onUpdateSubmissions([...submissions, newSub]);
    setActiveScreen('home');
    alert(`Nộp bài Trắc Nghiệm thành công! Điểm của bạn là: ${newSub.score}/10`);
  };

  // Start an Essay Assignment
  const startEssayExam = (exam: Exam) => {
    setActiveExamId(exam.id);
    setEssayBase64Img(SAMPLE_ESSAY_SHEETS[0]); // Default mock image
    setSelectedPresetIndex(0);
    setActiveScreen('taking_essay');
  };

  // File drag & drop simulator
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setEssayBase64Img(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setEssayBase64Img(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Select simulated document sheet easily
  const selectPresetSheet = (idx: number) => {
    setSelectedPresetIndex(idx);
    setEssayBase64Img(SAMPLE_ESSAY_SHEETS[idx]);
  };

  const triggerSubmitEssay = (exId: string) => {
    const newSub: Submission = {
      id: `sub-${Date.now()}`,
      examId: exId,
      studentId: currentStudentId,
      studentName: currentStudentName,
      submittedAt: new Date().toISOString(),
      status: 'submitted',
      essayAttachments: [essayBase64Img]
    };

    onUpdateSubmissions([...submissions, newSub]);
    setActiveScreen('home');
    alert("Nộp bài Tự Luật thành công! Hãy đợi Giáo viên đánh dấu bút đỏ nhé.");
  };

  // Load annotated paper review screen
  const viewGradedSubmission = (sub: Submission) => {
    setActiveSubmissionId(sub.id);
    setActiveExamId(sub.examId);
    setActiveScreen('view_graded');
  };

  // Format countdown text e.g. 15:40
  const formatCountdown = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remaining.toString().padStart(2, '0')}`;
  };

  // Filter exams available in enrolled classes
  const activeExamsList = exams.filter(e => enrolledClassIds.includes(e.classId));

  return (
    <div className="flex h-full bg-slate-50 text-slate-900 font-sans" id="student-portal-root">
      
      {/* Header static section */}
      <div className="flex-1 overflow-y-auto flex flex-col h-full min-w-0">
        
        {/* Navigation Banner for students */}
        <header className="h-16 bg-white px-8 flex items-center justify-between shrink-0 text-slate-950 border-b border-slate-200 shadow-sm">
          <div className="flex items-center gap-2.5">
            <span className="p-1 px-3 bg-blue-600 text-white rounded-xl font-extrabold text-sm tracking-tight shadow-md shadow-blue-500/10">Azota</span>
            <span className="text-xs font-bold tracking-wider text-slate-505 uppercase sm:inline hidden">Cổng Học Sinh Trực Tuyến</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right text-xs">
              <p className="font-extrabold text-slate-900">{currentStudentName}</p>
              <p className="text-[10px] text-slate-500 font-bold font-mono">Đã đóng: {enrolledClassIds.length} lớp học</p>
            </div>
            {/* Quick simulated account switcher dropdown */}
            <div className="relative group">
              <button className="h-9 w-9 rounded-full bg-blue-100 border border-blue-200/50 text-blue-700 text-xs font-extrabold font-mono hover:scale-105 active:scale-95 transition flex items-center justify-center cursor-pointer shadow-sm">
                HS
              </button>
              {/* Switching identities popup hover menu for seamless testing without registration */}
              <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xl hidden group-hover:block z-50 text-slate-700 text-xs">
                <span className="block px-4 py-3 bg-slate-50/80 font-bold border-b border-slate-100 text-slate-400 uppercase tracking-widest text-[9px]">Tài khoản HS giả lập</span>
                <button 
                  onClick={() => handleSwitchIdentity('std-101', 'Nguyễn Văn An')}
                  className="w-full text-left px-4 py-3 hover:bg-slate-50 transition border-b border-slate-100 flex justify-between items-center font-bold text-slate-800"
                >
                  <span>An - Lớp 12A1 (Toán)</span>
                  {currentStudentId === 'std-101' && <Check className="w-3.5 h-3.5 text-blue-650" />}
                </button>
                <button 
                  onClick={() => handleSwitchIdentity('std-102', 'Trần Thị Bình')}
                  className="w-full text-left px-4 py-3 hover:bg-slate-50 transition border-b border-slate-100 flex justify-between items-center font-bold text-slate-800"
                >
                  <span>Bình - Lớp 12A1 (Toán)</span>
                  {currentStudentId === 'std-102' && <Check className="w-3.5 h-3.5 text-blue-650" />}
                </button>
                <button 
                  onClick={() => handleSwitchIdentity('std-201', 'Đặng Thu Thảo')}
                  className="w-full text-left px-4 py-3 hover:bg-slate-50 transition flex justify-between items-center font-bold text-slate-800"
                >
                  <span>Thảo - Lớp 11B2 (Văn)</span>
                  {currentStudentId === 'std-201' && <Check className="w-3.5 h-3.5 text-blue-650" />}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Inner Screens Container */}
        <div className="p-8 flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            
            {/* SCREEN 1: SUDENT CONSOLE HOME */}
            {activeScreen === 'home' && (
              <motion.div 
                key="student-home"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
                id="student-panel-home"
              >
                
                {/* Join code entry panel */}
                <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-[0_4px_16px_rgba(15,23,42,0.015)] grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-4 space-y-1.5">
                    <h3 className="font-extrabold text-slate-905 text-sm flex items-center gap-2 leading-none uppercase tracking-tight">
                      <Key className="w-4 h-4 text-blue-600" /> Vào Lớp Học Mới
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">Đặt mã hiệu từ giáo viên để nhận bài tập và đề khảo sát ngay lập tức</p>
                  </div>

                  <form onSubmit={handleJoinClassWithCode} className="md:col-span-8 flex flex-col md:flex-row gap-3.5">
                    <input
                      type="text"
                      value={joinCodeInput}
                      onChange={e => setJoinCodeInput(e.target.value)}
                      placeholder="Mã CODE lớp học (Ví dụ: TOAN12A1, VAN11B2)"
                      className="flex-1 text-xs px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-500 bg-white"
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-5 py-3 rounded-xl font-bold shadow-md shadow-blue-500/10 transition duration-155 transform active:scale-95 shrink-0"
                    >
                      Kết nối ngay
                    </button>
                  </form>

                  {(joinError || joinSuccess) && (
                    <div className="md:col-span-12 py-1 text-xs font-semibold">
                      {joinError && <div className="text-red-550 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> {joinError}</div>}
                      {joinSuccess && <div className="text-emerald-600 flex items-center gap-1"><Check className="w-3.5 h-3.5" /> {joinSuccess}</div>}
                    </div>
                  )}
                </div>

                {/* Enrolled Classes timeline & assigned exams directory */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start animate-fade-in">
                  
                  {/* Left segment - Class subscriptions list */}
                  <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-[0_4px_16px_rgba(15,23,42,0.01)] flex flex-col gap-3.5">
                    <h3 className="font-extrabold text-slate-900 text-sm leading-none flex items-center gap-2 pb-3.5 border-b border-slate-100">
                      <Users className="w-4 h-4 text-slate-500" /> Lớp học liên kết ({enrolledClassIds.length})
                    </h3>

                    {enrolledClassIds.map(cid => {
                      const cl = classes.find(c => c.id === cid);
                      if (!cl) return null;
                      return (
                        <div key={cl.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200/40 transition flex items-center justify-between hover:border-slate-300">
                          <div className="space-y-1">
                            <h4 className="font-bold text-xs text-slate-950">{cl.name}</h4>
                            <p className="text-[10px] text-slate-500 font-semibold font-mono">Khối: {cl.grade}</p>
                          </div>
                          <span className="font-mono text-[9px] bg-slate-900 text-sky-400 font-extrabold px-2.5 py-1 rounded-md tracking-wider">
                            {cl.code}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Middle and Right segments - Active assigned exams list */}
                  <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-[0_4px_16px_rgba(15,23,42,0.015)] flex flex-col gap-5">
                    <div>
                      <h3 className="font-extrabold text-slate-905 text-sm uppercase tracking-tight">Danh sách các Bài khảo sát</h3>
                      <p className="text-xs text-slate-500 font-medium mt-1">Lựa chọn làm bài kiểm tra tự học trắc nghiệm hoặc bài làm tự luận</p>
                    </div>

                    {activeExamsList.length === 0 ? (
                      <div className="py-20 text-center text-slate-400 space-y-3.5 border border-dashed border-slate-200 rounded-2xl bg-slate-50/25">
                        <AlertCircle className="w-10 h-10 mx-auto text-slate-300" />
                        <h4 className="font-bold text-slate-700 text-xs">Chưa có bài kiểm tra nào nộp phát ở lớp học này!</h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">Thầy cô chưa phát bài, hoặc bạn hãy thử kết nối bằng mã mời "TOAN12A1" hoặc "VAN11B2"</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {activeExamsList.map(ex => {
                          const cl = classes.find(c => c.id === ex.classId);
                          // Lookup if this student submitted
                          const studentSub = submissions.find(s => s.examId === ex.id && s.studentId === currentStudentId);

                          return (
                            <div key={ex.id} className="p-5 border border-slate-220/80 rounded-2xl bg-white flex flex-col justify-between space-y-5 hover:border-blue-400 hover:shadow-md transitionduration-200">
                              <div className="space-y-3">
                                <span className={`text-[9px] uppercase font-bold p-1 px-2.5 py-1 rounded-lg ${
                                  ex.type === 'multiple_choice' ? 'bg-amber-100 text-amber-800' : 'bg-pink-100 text-pink-700'
                                }`}>
                                  {ex.type === 'multiple_choice' ? 'Trắc nghiệm' : 'Tự luận'}
                                </span>
                                <h4 className="font-extrabold text-slate-900 text-sm leading-snug line-clamp-2 mt-2">{ex.title}</h4>
                                <p className="text-slate-500 text-xs line-clamp-2 font-medium">{ex.description}</p>
                              </div>

                              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                {studentSub ? (
                                  studentSub.status === 'graded' ? (
                                    <div className="flex items-center gap-2">
                                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-250 px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                                        Đã chấm: <b className="font-extrabold text-xs">{studentSub.score}đ</b>
                                      </span>
                                      <button 
                                        onClick={() => viewGradedSubmission(studentSub)}
                                        className="text-slate-500 hover:text-blue-600 p-2 rounded-xl hover:bg-slate-50 transition"
                                        title="Xem đáp án và bài văn bút đỏ"
                                      >
                                        <Eye className="w-4 h-4" />
                                      </button>
                                    </div>
                                  ) : (
                                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-200/40 px-3 py-1.5 rounded-full">
                                      Đã nộp bài - Đang chờ chấm
                                    </span>
                                  )
                                ) : (
                                  <button
                                    onClick={() => {
                                      if (ex.type === 'multiple_choice') {
                                        startMultipleChoiceExam(ex);
                                      } else {
                                        startEssayExam(ex);
                                      }
                                    }}
                                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-2 rounded-xl font-bold shadow-md shadow-blue-500/10 transition flex items-center gap-1.5"
                                  >
                                    Làm bài ngay <ArrowRight className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                </div>

              </motion.div>
            )}

            {/* SCREEN 2: TAKING MULTIPLE-CHOICE EXAM */}
            {activeScreen === 'taking_mc' && activeExam && (
              <motion.div 
                key="taking-mc"
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-4xl mx-auto space-y-6"
                id="student-panel-mc"
              >
                
                {/* Header info sheet with real-time countdown clock */}
                <div className="bg-slate-900 text-white p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4 shadow-xl">
                  <div className="space-y-1.5 text-center md:text-left">
                    <span className="text-[9px] bg-amber-600 text-white font-extrabold px-3 py-1 rounded-md tracking-wider uppercase">Bài Thi Trắc Nghiệm Tập Trung</span>
                    <h3 className="font-extrabold text-base md:text-lg mt-1">{activeExam.title}</h3>
                    <p className="text-xs text-slate-300 font-medium">Tích chọn đáp án đúng nhất. Bài làm sẽ tự lưu mỗi khi click</p>
                  </div>

                  {activeExam.duration > 0 && (
                    <div className="text-center font-mono py-2.5 px-5 bg-slate-800 border border-slate-750 rounded-xl flex items-center gap-3 shrink-0">
                      <Clock className="w-5 h-5 text-amber-550 animate-pulse" />
                      <div className="text-left">
                        <span className="text-[9px] text-slate-400 uppercase tracking-widest block font-sans font-bold">Thời gian còn lại</span>
                        <span className="text-lg font-bold text-amber-500 font-mono tracking-tight">{formatCountdown(mcTimer)}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Panel: Questions container */}
                  <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-[0_4px_16px_rgba(15,23,42,0.015)] p-6 space-y-6">
                    {activeExam.questions?.map((q, idx) => (
                      <div key={q.id} className="space-y-4 pb-6 border-b border-slate-100 last:border-b-0">
                        <h4 className="font-extrabold text-slate-900 text-sm leading-snug">
                          <span className="text-blue-600 mr-1">Câu {idx + 1}:</span> {q.questionText}
                        </h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
                          {q.options.map((opt, optIdx) => {
                            const isSelected = mcAnswers[q.id] === optIdx;
                            return (
                              <button
                                key={optIdx}
                                type="button"
                                onClick={() => setMcAnswers({ ...mcAnswers, [q.id]: optIdx })}
                                className={`p-3.5 rounded-xl border text-left font-bold transition flex items-center ${
                                  isSelected 
                                    ? 'bg-blue-50 border-blue-500 text-blue-800 shadow-sm' 
                                    : 'border-slate-200 text-slate-650 hover:border-blue-300 focus:outline-none'
                                }`}
                              >
                                <span className={`inline-block w-6 h-6 rounded-full border text-center leading-5 mr-3 text-[11px] font-bold shrink-0 ${
                                  isSelected ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 border-slate-300 text-slate-500'
                                }`}>
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Right Panel: Bubble checklist selection visual summary */}
                  <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-[0_4px_16px_rgba(15,23,42,0.015)] p-5 space-y-4 font-sans">
                    <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Phiếu câu trả lời nhanh</h4>
                    
                    <div className="grid grid-cols-5 gap-2 font-mono">
                      {activeExam.questions?.map((q, idx) => {
                        const filled = mcAnswers[q.id] !== undefined;
                        return (
                          <div 
                            key={idx}
                            className={`h-11 border text-xs font-extrabold rounded-xl flex flex-col justify-center items-center ${
                              filled ? 'bg-blue-600 border-blue-600 text-white' : 'bg-slate-50 border-slate-200/80 text-slate-400'
                            }`}
                          >
                            <span>{idx + 1}</span>
                            <span className="text-[10px] leading-tight mt-0.5">
                              {filled ? String.fromCharCode(65 + mcAnswers[q.id]) : '?'}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => triggerSubmitMultipleChoice(activeExam.id, mcAnswers)}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs py-3 rounded-xl font-bold tracking-wide transition shadow-md shadow-emerald-500/10 mt-3 transform active:scale-98"
                    >
                      Hoàn thành & nộp bài
                    </button>
                  </div>

                </div>

              </motion.div>
            )}

            {/* SCREEN 3: TAKING/UPLOADING ESSAY HOMEWORK */}
            {activeScreen === 'taking_essay' && activeExam && (
              <motion.div 
                key="taking-essay"
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-4xl mx-auto space-y-6"
                id="student-panel-essay"
              >
                {/* Topic guidelines description banner */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-start justify-between flex-wrap gap-2 pb-3.5 border-b border-slate-100">
                    <div>
                      <span className="text-[9px] bg-blue-105 text-blue-700 font-extrabold px-3 py-1 rounded-md uppercase">Đề làm văn: Tự luận</span>
                      <h3 className="font-extrabold text-slate-900 text-lg mt-3">{activeExam.title}</h3>
                    </div>
                    <button
                      onClick={() => { setActiveScreen('home'); setActiveExamId(null); }}
                      className="text-xs font-extrabold text-slate-600 bg-slate-50 hover:bg-slate-100 px-3.5 py-1.5 rounded-xl border border-slate-200 transition"
                    >
                      Quay lại
                    </button>
                  </div>

                  <div className="text-xs text-slate-650 leading-relaxed pr-6 whitespace-pre-line font-medium">
                    <p className="font-extrabold text-slate-900 uppercase tracking-wider text-[10px] mb-2.5">ĐỀ BÀI CHI TIẾT & YÊU CẦU:</p>
                    {activeExam.essayPrompt}
                  </div>
                </div>

                {/* Upload drag-box panel along with preset test paper templates */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left block - presets & manual file selection */}
                  <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
                    <div className="space-y-1">
                      <h4 className="font-extrabold text-slate-900 text-sm">Chụp ảnh / Chọn File bài nộp giấy của học sinh</h4>
                      <p className="text-xs text-slate-500 font-medium">Kéo thả ảnh bài viết của bạn hoặc chọn nhanh mẫu bài luận mẫu bên dưới</p>
                    </div>

                    {/* Preset papers list visual selector */}
                    <div className="space-y-2.5">
                      <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Bài viết mẫu dựng sẵn:</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => selectPresetSheet(0)}
                          className={`p-3.5 border rounded-2xl flex items-center gap-3 transition text-left cursor-pointer ${
                            selectedPresetIndex === 0 ? 'border-blue-600 bg-blue-50/50 shadow-sm' : 'border-slate-200 hover:border-blue-300'
                          }`}
                        >
                          <FileText className="w-5 h-5 text-blue-600" />
                          <div className="text-xs leading-tight">
                            <p className="font-extrabold text-slate-900">Giấy tập học sinh</p>
                            <p className="text-[10px] text-slate-500 font-medium mt-0.5">Giả lập bài làm 1</p>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => selectPresetSheet(1)}
                          className={`p-3.5 border rounded-2xl flex items-center gap-3 transition text-left cursor-pointer ${
                            selectedPresetIndex === 1 ? 'border-blue-600 bg-blue-50/50 shadow-sm' : 'border-slate-200 hover:border-blue-300'
                          }`}
                        >
                          <FileText className="w-5 h-5 text-blue-600" />
                          <div className="text-xs leading-tight">
                            <p className="font-extrabold text-slate-900">Bài khảo sát kẻ ô</p>
                            <p className="text-[10px] text-slate-500 font-medium mt-0.5">Giả lập bài làm 2</p>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Drag-n-drop dropzone */}
                    <div 
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      className={`h-40 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-6 text-center cursor-pointer transition ${
                        dragActive ? 'border-blue-600 bg-blue-50/40' : 'border-slate-300 hover:border-blue-400 bg-slate-50/40'
                      }`}
                    >
                      <input 
                        type="file"
                        id="essay-input-file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <label htmlFor="essay-input-file" className="cursor-pointer space-y-2.5 text-center select-none w-full">
                        <Upload className="w-8 h-8 text-slate-400 mx-auto animate-bounce" />
                        <div className="text-xs font-extrabold text-slate-800">Tải ảnh chụp bài làm lên từ thư viện thiết bị</div>
                        <div className="text-[10px] text-slate-400 font-medium font-mono">Hỗ trợ định dạng hình ảnh JPG, PNG | Dung lượng kéo thả</div>
                      </label>
                    </div>

                    <button
                      onClick={() => triggerSubmitEssay(activeExam.id)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs py-3.5 rounded-xl font-bold tracking-wide transition shadow-lg shadow-blue-500/10 transform active:scale-98"
                    >
                      Xác nhận Nộp bài lên lớp
                    </button>
                  </div>

                  {/* Right block - Live previews */}
                  <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col gap-3">
                    <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Hình ảnh bài giải nháp</h4>
                    <div className="border border-slate-100 rounded-xl overflow-hidden aspect-[4/5] bg-slate-100 flex items-center justify-center shadow-inner">
                      {essayBase64Img ? (
                        <img 
                          referrerPolicy="no-referrer"
                          src={essayBase64Img} 
                          alt="Essay preview" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center text-slate-400 p-8 text-xs font-semibold space-y-2">
                          <Eye className="w-8 h-8 text-slate-300 mx-auto" />
                          <p>Chưa chọn ảnh hoặc mẫu</p>
                        </div>
                      )}
                    </div>
                  </div>

                </div>

              </motion.div>
            )}

            {/* SCREEN 4: GRANTED CONCURRENT ASSIGNMENTS REVIEW PAGE */}
            {activeScreen === 'view_graded' && activeSubmission && activeExam && (
              <motion.div 
                key="view-graded"
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-4xl mx-auto space-y-6"
                id="student-panel-graded"
              >
                
                {/* Student Scoreboard overview card */}
                <div className="bg-slate-900 text-white p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4 shadow-xl">
                  <div className="space-y-1.5 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2.5">
                      <button
                        onClick={() => { setActiveScreen('home'); setActiveSubmissionId(null); }}
                        className="p-1 hover:bg-slate-800 rounded-xl transition text-slate-400 hover:text-white"
                      >
                        <ChevronLeft className="w-5 h-5 cursor-pointer" />
                      </button>
                      <span className="text-[9px] bg-emerald-600 text-white font-extrabold px-3 py-1 rounded-md tracking-wider uppercase">Vở Chấm Bút Đỏ Trực Quan</span>
                    </div>
                    <h3 className="font-extrabold text-base md:text-lg mt-2">{activeExam.title}</h3>
                    <p className="text-xs text-slate-300 font-medium">Thời điểm nộp: {new Date(activeSubmission.submittedAt).toLocaleDateString('vi-VN')}</p>
                  </div>

                  <div className="text-center py-2.5 px-6 bg-slate-800 border border-slate-750 rounded-xl shrink-0">
                    <span className="text-[9px] text-slate-405 uppercase tracking-widest block font-bold">Điểm số thu được</span>
                    <span className="text-2xl font-extrabold text-emerald-400">{activeSubmission.score?.toFixed(1)} / 10.0</span>
                  </div>
                </div>

                {/* Left score details & annotations canvas illustration */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left detail column: Teacher comments */}
                  <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-[0_4px_16px_rgba(15,23,42,0.015)] p-6 space-y-4">
                    <div className="space-y-2 pb-4 border-b border-slate-100">
                      <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Bình luận của Thầy cô:</span>
                      <p className="text-xs text-slate-700 italic leading-relaxed whitespace-pre-line font-medium">
                        {activeSubmission.teacherFeedback || "Giáo viên không để lại bình luận viết tay. Xem các nét bút đỏ trên tập nộp."}
                      </p>
                    </div>

                    <div className="p-5 bg-emerald-50/50 border border-emerald-200 rounded-2xl space-y-3">
                      <h5 className="text-[10px] font-bold text-emerald-850 uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-605" /> PHÂN TÍCH ĐÁNH GIÁ:
                      </h5>
                      <div className="text-[11px] text-slate-650 space-y-2 font-medium">
                        <p className="flex justify-between"><span>📍 Điểm số Đúng (Đ)</span> <b className="text-emerald-700">{activeSubmission.annotations?.filter(a => a.type === 'correct').length || 0} lần</b></p>
                        <p className="flex justify-between"><span>📍 Số lỗi Sai (S)</span> <b className="text-red-650">{activeSubmission.annotations?.filter(a => a.type === 'wrong').length || 0} lần</b></p>
                        <p className="flex justify-between"><span>📍 Đánh dấu bút đen</span> <b className="text-indigo-705">{activeSubmission.annotations?.filter(a => a.type === 'text').length || 0} lần</b></p>
                      </div>
                    </div>
                  </div>

                  {/* Right column: Interactive paper loaded with stamps red markings */}
                  <div className="lg:col-span-8 flex flex-col gap-3">
                    <span className="text-xs text-slate-505 font-bold uppercase tracking-wider">Mặt giấy phê điểm trực quan:</span>
                    
                    <div className="relative border border-slate-350 rounded-2xl overflow-hidden shadow-lg bg-slate-900 flex justify-center select-none">
                      <div className="relative max-w-full">
                        <img 
                          referrerPolicy="no-referrer"
                          src={activeSubmission.essayAttachments?.[0] || SAMPLE_ESSAY_SHEETS[0]}
                          alt="Student marked sheet"
                          className="block max-h-[80vh] w-auto pointer-events-none object-contain select-none"
                        />

                        {/* Rendering dynamic overlay markings */}
                        {activeSubmission.annotations?.map((ann) => (
                          <div 
                            key={ann.id}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none select-none flex items-center gap-1.5"
                            style={{ left: `${ann.x}%`, top: `${ann.y}%` }}
                          >
                            {ann.type === 'correct' && (
                              <div className="w-8 h-8 border-2 border-red-650 bg-white text-red-600 font-extrabold text-sm flex items-center justify-center rounded-full leading-none shadow shadow-red-500/10">
                                Đ
                              </div>
                            )}
                            {ann.type === 'wrong' && (
                              <div className="w-8 h-8 border-2 border-red-650 bg-white text-red-600 font-extrabold text-sm flex items-center justify-center rounded-full leading-none shadow shadow-red-500/10">
                                S
                              </div>
                            )}
                            {ann.type === 'text' && (
                              <span className="p-0.5 px-2 bg-red-600 text-white font-bold text-[10px] select-none italic font-sans italic-red-pen shadow-md border border-red-400 rounded">
                                {ann.text}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>

              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}

// Quick inner components
function Check({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 6 9 17l-5-5"/>
    </svg>
  );
}
