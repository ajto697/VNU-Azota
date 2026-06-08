/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, BookOpen, FileSpreadsheet, Eye, Plus, Check, X, 
  Trash2, Award, ChevronRight, FileText, CheckCircle2, Clock, 
  ChevronLeft, AlertCircle, Sparkles, RefreshCw, Undo, Save
} from 'lucide-react';
import { ClassGroup, Student, Exam, Submission, Question, Annotation } from '../types';
import { SAMPLE_ESSAY_SHEETS } from '../data';

interface TeacherPortalProps {
  classes: ClassGroup[];
  exams: Exam[];
  submissions: Submission[];
  onUpdateClasses: (classes: ClassGroup[]) => void;
  onUpdateExams: (exams: Exam[]) => void;
  onUpdateSubmissions: (submissions: Submission[]) => void;
}

export default function TeacherPortal({
  classes,
  exams,
  submissions,
  onUpdateClasses,
  onUpdateExams,
  onUpdateSubmissions
}: TeacherPortalProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'classes' | 'exams' | 'grading'>('dashboard');
  
  // States for Class Management
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [newClassGrade, setNewClassGrade] = useState('Khối 12');
  const [newClassCode, setNewClassCode] = useState('');
  
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentCode, setNewStudentCode] = useState('');

  // States for Exam Creation
  const [showCreateExamModal, setShowCreateExamModal] = useState(false);
  const [newExamType, setNewExamType] = useState<'multiple_choice' | 'essay'>('multiple_choice');
  const [newExamTitle, setNewExamTitle] = useState('');
  const [newExamClassId, setNewExamClassId] = useState(classes[0]?.id || '');
  const [newExamDuration, setNewExamDuration] = useState('15');
  const [newExamDesc, setNewExamDesc] = useState('');
  const [newExamEssayPrompt, setNewExamEssayPrompt] = useState('');
  const [newExamQuestions, setNewExamQuestions] = useState<Question[]>([
    { id: 'q-tmp-1', questionText: 'Câu hỏi số 1?', options: ['Đáp án A', 'Đáp án B', 'Đáp án C', 'Đáp án D'], correctOption: 0, points: 2 }
  ]);

  // States for Interactive Grading Screen
  const [activeGradingSubmissionId, setActiveGradingSubmissionId] = useState<string | null>(null);
  const [gradingAnnotations, setGradingAnnotations] = useState<Annotation[]>([]);
  const [gradingScore, setGradingScore] = useState<number>(10);
  const [gradingFeedback, setGradingFeedback] = useState<string>('');
  const [gradingTool, setGradingTool] = useState<'correct' | 'wrong' | 'text'>('correct');
  const [commentInputText, setCommentInputText] = useState('');
  const [pendingClickPos, setPendingClickPos] = useState<{ x: number, y: number } | null>(null);
  const [showCommentForm, setShowCommentForm] = useState(false);
  
  const essayCanvasRef = useRef<HTMLDivElement>(null);

  // Active items helpers
  const gradingSubmission = submissions.find(s => s.id === activeGradingSubmissionId);
  const gradingExam = gradingSubmission ? exams.find(e => e.id === gradingSubmission.examId) : null;
  const selectedClass = classes.find(c => c.id === selectedClassId);

  // Generate a random join code
  const generateRandomCode = (className: string) => {
    const clean = className.toUpperCase().replace(/\s+/g, '');
    const num = Math.floor(1000 + Math.random() * 9000);
    return `${clean}${num}`;
  };

  useEffect(() => {
    if (newClassName) {
      setNewClassCode(generateRandomCode(newClassName));
    }
  }, [newClassName]);

  // Handle Class Submission
  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim()) return;

    const newClass: ClassGroup = {
      id: `class-${Date.now()}`,
      name: newClassName,
      grade: newClassGrade,
      code: newClassCode || `${newClassName.toUpperCase().replace(/\s+/g, '')}${Math.floor(100 + Math.random() * 900)}`,
      students: []
    };

    onUpdateClasses([...classes, newClass]);
    setNewClassName('');
    setNewClassCode('');
    setShowAddClassModal(false);
  };

  // Add student manually to selected class
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClassId || !newStudentName.trim() || !newStudentCode.trim()) return;

    const newStudent: Student = {
      id: `std-${Date.now()}`,
      name: newStudentName,
      studentCode: newStudentCode
    };

    const updatedClasses = classes.map(c => {
      if (c.id === selectedClassId) {
        return {
          ...c,
          students: [...c.students, newStudent]
        };
      }
      return c;
    });

    onUpdateClasses(updatedClasses);
    setNewStudentName('');
    setNewStudentCode('');
    setShowAddStudentForm(false);
  };

  // Delete student
  const handleDeleteStudent = (studentId: string) => {
    if (!selectedClassId) return;
    const updatedClasses = classes.map(c => {
      if (c.id === selectedClassId) {
        return {
          ...c,
          students: c.students.filter(s => s.id !== studentId)
        };
      }
      return c;
    });
    onUpdateClasses(updatedClasses);
  };

  // Multiple Choice Question Helpers
  const addQuestionField = () => {
    const nextNum = newExamQuestions.length + 1;
    const newQ: Question = {
      id: `q-tmp-${Date.now()}`,
      questionText: `Câu hỏi số ${nextNum}?`,
      options: ['Đáp án A', 'Đáp án B', 'Đáp án C', 'Đáp án D'],
      correctOption: 0,
      points: 2
    };
    setNewExamQuestions([...newExamQuestions, newQ]);
  };

  const updateQuestion = (index: number, updated: Question) => {
    const copy = [...newExamQuestions];
    copy[index] = updated;
    setNewExamQuestions(copy);
  };

  const removeQuestionField = (index: number) => {
    if (newExamQuestions.length <= 1) return;
    setNewExamQuestions(newExamQuestions.filter((_, i) => i !== index));
  };

  // Handle Exam creation
  const handleCreateExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExamTitle.trim()) return;

    // Distribute remaining scores if Multiple Choice to ensure sum is 10
    let finalQuestions = undefined;
    if (newExamType === 'multiple_choice') {
      const pts_per_q = parseFloat((10 / newExamQuestions.length).toFixed(2));
      finalQuestions = newExamQuestions.map((q, idx) => ({
        ...q,
        points: idx === newExamQuestions.length - 1 ? parseFloat((10 - (pts_per_q * (newExamQuestions.length - 1))).toFixed(2)) : pts_per_q
      }));
    }

    const newExam: Exam = {
      id: `exam-${Date.now()}`,
      title: newExamTitle,
      type: newExamType,
      classId: newExamClassId,
      duration: parseInt(newExamDuration) || 0,
      description: newExamDesc,
      createdAt: new Date().toISOString(),
      questions: finalQuestions,
      essayPrompt: newExamType === 'essay' ? newExamEssayPrompt : undefined,
      essayAttachedImage: newExamType === 'essay' ? "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800" : undefined
    };

    onUpdateExams([...exams, newExam]);
    setNewExamTitle('');
    setNewExamDesc('');
    setNewExamEssayPrompt('');
    setNewExamQuestions([{ id: 'q-tmp-1', questionText: 'Câu hỏi số 1?', options: ['Đáp án A', 'Đáp án B', 'Đáp án C', 'Đáp án D'], correctOption: 0, points: 2 }]);
    setShowCreateExamModal(false);
  };

  // Delete Exam
  const handleDeleteExam = (examId: string) => {
    if (confirm("Bạn có tin chắc chắn muốn xóa đề thi này?")) {
      onUpdateExams(exams.filter(e => e.id !== examId));
      onUpdateSubmissions(submissions.filter(s => s.examId !== examId));
    }
  };

  // Load interactive grading screen
  const startGrading = (subId: string) => {
    const sub = submissions.find(s => s.id === subId);
    if (!sub) return;
    setActiveGradingSubmissionId(subId);
    setGradingAnnotations(sub.annotations || []);
    setGradingScore(sub.score || 10);
    setGradingFeedback(sub.teacherFeedback || '');
    setActiveTab('grading');
  };

  // Click on the student's submission sheet image to place annotations
  const handlePaperClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!essayCanvasRef.current) return;
    const rect = essayCanvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    if (gradingTool === 'correct' || gradingTool === 'wrong') {
      const newAnn: Annotation = {
        id: `ann-${Date.now()}`,
        x,
        y,
        type: gradingTool
      };
      setGradingAnnotations([...gradingAnnotations, newAnn]);
    } else if (gradingTool === 'text') {
      setPendingClickPos({ x, y });
      setCommentInputText('');
      setShowCommentForm(true);
    }
  };

  const handleAddTextComment = () => {
    if (!pendingClickPos || !commentInputText.trim()) return;

    const newAnn: Annotation = {
      id: `ann-${Date.now()}`,
      x: pendingClickPos.x,
      y: pendingClickPos.y,
      type: 'text',
      text: commentInputText
    };

    setGradingAnnotations([...gradingAnnotations, newAnn]);
    setPendingClickPos(null);
    setShowCommentForm(false);
    setCommentInputText('');
  };

  const undoLastAnnotation = () => {
    if (gradingAnnotations.length === 0) return;
    setGradingAnnotations(gradingAnnotations.slice(0, -1));
  };

  const clearAllAnnotations = () => {
    setGradingAnnotations([]);
  };

  // Submit the completed score sheet
  const handleSaveGrading = () => {
    if (!activeGradingSubmissionId) return;

    const updatedSubmissions = submissions.map(sub => {
      if (sub.id === activeGradingSubmissionId) {
        return {
          ...sub,
          status: 'graded' as const,
          score: Math.min(Math.max(0, gradingScore), 10), // clamp score 0-10
          teacherFeedback: gradingFeedback,
          annotations: gradingAnnotations
        };
      }
      return sub;
    });

    onUpdateSubmissions(updatedSubmissions);
    setActiveGradingSubmissionId(null);
    setActiveTab('dashboard');
  };

  // AI-Powered Grade generator (Simulated intelligent review using local logic, acting instantly!)
  const handleAiAutoAnalyze = () => {
    if (!gradingSubmission) return;
    
    // Simulate smart reading logic matching student essay
    const keywordsCount = 5; 
    const randomFdbks = [
      "Bài văn viết có bố cục đầy đủ 3 phần, luận cứ phong phú, lập luận chặt chẽ về lòng hiếu thảo và sự tử tế. Cần chú ý cách ngắt dòng.",
      "Bài làm rất trôi chảy, giàu cảm xúc, có liên hệ thực tế tốt. Tuy nhiên nên tránh các từ biểu cảm lặp lại quá nhiều lần.",
      "Lập luận đốp chát sắc sảo, dẫn chứng chân thực về tình người trong thời dịch. Đóng góp ý thức công dân cao!"
    ];

    const predictedScore = 8.5 + (Math.random() * 1.5 - 0.5); // 8.0 - 9.5
    setGradingScore(parseFloat(predictedScore.toFixed(1)));
    setGradingFeedback(randomFdbks[Math.floor(Math.random() * randomFdbks.length)]);

    // Add some automatic correct highlights!
    const mockAns: Annotation[] = [
      { id: `ann-ai-1`, x: 30, y: 22, type: 'correct' },
      { id: `ann-ai-2`, x: 62, y: 45, type: 'correct' },
      { id: `ann-ai-3`, x: 45, y: 70, type: 'text', text: "Lập luận xuất sắc!" }
    ];
    setGradingAnnotations([...gradingAnnotations, ...mockAns]);
  };

  // Auto grade a multiple-choice submission with 1 click
  const handleAutoGradeMultipleChoice = (sub: Submission) => {
    const exam = exams.find(e => e.id === sub.examId);
    if (!exam || !exam.questions) return;

    let earnedScore = 0;
    const studentAnswers = sub.multipleChoiceAnswers || {};

    exam.questions.forEach(q => {
      const studentAns = studentAnswers[q.id];
      if (studentAns === q.correctOption) {
        earnedScore += q.points;
      }
    });

    const updated = submissions.map(s => {
      if (s.id === sub.id) {
        return {
          ...s,
          status: 'graded' as const,
          score: parseFloat(earnedScore.toFixed(1)),
          teacherFeedback: `Tự động chấm: Đúng ${exam.questions!.filter(q => studentAnswers[q.id] === q.correctOption).length}/${exam.questions!.length} câu.`
        };
      }
      return s;
    });

    onUpdateSubmissions(updated);
  };

  // Calculate generic dashboard metrics
  const totalStudents = classes.reduce((acc, c) => acc + c.students.length, 0);
  const pendingGradingCount = submissions.filter(s => s.status === 'submitted').length;
  const gradedPercentage = submissions.length ? Math.round((submissions.filter(s => s.status === 'graded').length / submissions.length) * 100) : 0;

  return (
    <div className="flex h-full bg-slate-50/50 text-slate-800 font-sans" id="teacher-portal-root">
      
      {/* Teacher Navigation Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0 border-r border-slate-800">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="p-2.5 bg-blue-600 rounded-xl text-white font-black text-lg shadow-lg shadow-blue-500/20">AZ</span>
            <div>
              <h2 className="font-extrabold text-sm tracking-tight leading-none text-slate-100">Azota Giáo Viên</h2>
              <span className="text-[10px] text-blue-400 font-semibold uppercase tracking-wider block mt-1">Hệ Thống Quản Trị</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5" id="teacher-navigation">
          <button
            id="nav-dash"
            onClick={() => { setActiveTab('dashboard'); setActiveGradingSubmissionId(null); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition duration-150 ${activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <BookOpen className="w-4.5 h-4.5" /> Bảng điều khiển
          </button>
          
          <button
            id="nav-classes"
            onClick={() => { setActiveTab('classes'); setActiveGradingSubmissionId(null); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition duration-150 ${activeTab === 'classes' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Users className="w-4.5 h-4.5" /> Quản lý Lớp học ({classes.length})
          </button>

          <button
            id="nav-exams"
            onClick={() => { setActiveTab('exams'); setActiveGradingSubmissionId(null); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition duration-150 ${activeTab === 'exams' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <FileSpreadsheet className="w-4.5 h-4.5" /> Đề thi & Bài tập ({exams.length})
          </button>

          {activeTab === 'grading' && (
            <div className="pt-2">
              <span className="px-4 text-[9px] font-bold text-slate-500 uppercase tracking-widest">Đang chấm bài</span>
              <div className="mt-1 flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold bg-amber-950/40 text-amber-400 border border-amber-900/40">
                <FileText className="w-4 h-4 shrink-0" /> {gradingSubmission?.studentName}
              </div>
            </div>
          )}
        </nav>

        {/* Footer info */}
        <div className="p-4 border-t border-slate-800 text-[11px] text-slate-550 flex flex-col gap-1">
          <p>Tài khoản cá nhân: <strong className="text-slate-300">Giáo viên</strong></p>
          <p className="text-[10px] text-slate-600">Hỗ trợ kỹ thuật Azota VN</p>
        </div>
      </aside>

      {/* Main Workspace Frame */}
      <main className="flex-1 overflow-y-auto flex flex-col h-full min-w-0" id="teacher-workspace">
        
        {/* Top bar header */}
        <header className="h-16 bg-white border-b border-slate-200/80 px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-900 text-base tracking-tight">
              {activeTab === 'dashboard' && "Tổng quan hoạt động lớp"}
              {activeTab === 'classes' && "Quản lý học sinh các lớp"}
              {activeTab === 'exams' && "Kho đề kiểm tra của tôi"}
              {activeTab === 'grading' && "Giao diện Chấm bài Tự luận thông minh"}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {activeTab === 'dashboard' && (
              <button 
                id="header-create-ex"
                onClick={() => setShowCreateExamModal(true)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-xs px-4 py-2.5 rounded-xl font-bold text-white shadow-md shadow-blue-500/10 transition duration-150 transform active:scale-95"
              >
                <Plus className="w-4 h-4" /> Giao đề thi mới
              </button>
            )}
            <div className="flex items-center gap-2 bg-slate-100/80 border border-slate-200/50 px-3 py-1.5 rounded-full text-[11px] text-slate-600 font-semibold leading-none">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              Đầy đủ quyền Quản trị
            </div>
          </div>
        </header>

        {/* Dynamic Pages Area */}
        <div className="p-8 flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            
            {/* TAB 1: DASHBOARD OVERVIEW */}
            {activeTab === 'dashboard' && (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
                id="panel-dashboard"
              >
                {/* 4 Stats Cards in Bento layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-white to-slate-50/50 rounded-2xl p-6 border border-slate-200 shadow-[0_4px_12px_rgba(15,23,42,0.02)] flex items-center gap-4 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0 shadow-sm">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Học sinh quản lý</p>
                      <h4 className="text-xl font-extrabold text-slate-900 mt-0.5 tracking-tight">{totalStudents} em</h4>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-white to-slate-50/50 rounded-2xl p-6 border border-slate-200 shadow-[0_4px_12px_rgba(15,23,42,0.02)] flex items-center gap-4 hover:border-violet-400 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300">
                    <div className="p-3 bg-violet-50 text-violet-600 rounded-xl shrink-0 shadow-sm">
                      <FileSpreadsheet className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Đề đã phát hành</p>
                      <h4 className="text-xl font-extrabold text-slate-900 mt-0.5 tracking-tight">{exams.length} đề</h4>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-white to-slate-50/50 rounded-2xl p-6 border border-slate-200 shadow-[0_4px_12px_rgba(15,23,42,0.02)] flex items-center gap-4 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/5 transition-all duration-300">
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-xl shrink-0 shadow-sm">
                      <Clock className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Chưa hoàn thành chấm</p>
                      <h4 className="text-xl font-extrabold text-amber-600 mt-0.5 tracking-tight">{pendingGradingCount} bài</h4>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-white to-slate-50/50 rounded-2xl p-6 border border-slate-200 shadow-[0_4px_12px_rgba(15,23,42,0.02)] flex items-center gap-4 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl shrink-0 shadow-sm">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Tỷ lệ chấm xong</p>
                      <h4 className="text-xl font-extrabold text-emerald-650 mt-0.5 tracking-tight">{gradedPercentage}%</h4>
                    </div>
                  </div>
                </div>

                {/* Main section: Bento grid with 12 cols */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Left component: list of submissions waiting to be evaluated */}
                  <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-[0_4px_16px_rgba(15,23,42,0.02)] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div>
                          <h3 className="font-extrabold text-slate-900 text-sm tracking-tight leading-none">Học sinh mới nộp bài tập</h3>
                          <p className="text-xs text-slate-500 mt-1.5 font-medium">Cần bạn xem duyệt chấm điểm</p>
                        </div>
                        <span className="text-[10px] bg-amber-50 text-amber-700 px-3 py-1 rounded-full font-bold border border-amber-200 leading-none">
                          {pendingGradingCount} Chờ Chấm
                        </span>
                      </div>

                      {submissions.length === 0 ? (
                        <div className="py-20 text-center text-slate-400 space-y-2.5">
                          <AlertCircle className="w-10 h-10 mx-auto text-slate-300" />
                          <p className="text-xs font-semibold">Chưa có học sinh nào nộp câu trả lời bài kiểm tra</p>
                        </div>
                      ) : (
                        <div className="divide-y divide-slate-100 max-h-[440px] overflow-y-auto pr-1">
                          {submissions.map(sub => {
                            const exam = exams.find(e => e.id === sub.examId);
                            const isEssay = exam?.type === 'essay';

                            return (
                              <div key={sub.id} className="py-4 flex items-center justify-between hover:bg-slate-50/80 px-2 rounded-xl transition duration-150">
                                <div className="flex items-center gap-3">
                                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 shadow-sm ${
                                    sub.status === 'graded' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'
                                  }`}>
                                    {sub.studentName.split(' ').pop()?.substring(0, 2) || "HS"}
                                  </div>
                                  <div className="space-y-1">
                                    <h4 className="text-xs font-extrabold text-slate-800 leading-none">{sub.studentName}</h4>
                                    <p className="text-[11px] text-slate-500 flex items-center gap-1.5 max-w-[280px] truncate font-medium">
                                      <span className={`font-bold px-1.5 py-0.5 rounded text-[9px] ${
                                        exam?.type === 'multiple_choice' ? 'bg-amber-55/60 text-amber-800 border border-amber-200/50' : 'bg-cyan-55/60 text-cyan-850 border border-cyan-200/50'
                                      }`}>
                                        {exam?.type === 'multiple_choice' ? 'Trắc nghiệm' : 'Tự luận'}
                                      </span>
                                      {exam?.title}
                                    </p>
                                  </div>
                                </div>

                                <div className="text-right">
                                  {sub.status === 'graded' ? (
                                    <div className="flex items-center gap-2">
                                      <span className="text-[11px] text-emerald-700 font-extrabold bg-emerald-50 px-2.5 py-1.5 rounded-xl border border-emerald-250/50">
                                        {sub.score} / 10 điểm
                                      </span>
                                      {isEssay ? (
                                        <button 
                                          onClick={() => startGrading(sub.id)}
                                          className="text-slate-400 hover:text-blue-600 p-1.5 rounded-lg hover:bg-slate-100 transition"
                                          title="Xem chi tiết nét chấm"
                                        >
                                          <Eye className="w-4 h-4" />
                                        </button>
                                      ) : null}
                                    </div>
                                  ) : (
                                    <div className="flex items-center gap-1.5">
                                      {isEssay ? (
                                        <button
                                          onClick={() => startGrading(sub.id)}
                                          className="bg-red-550 hover:bg-red-600 text-white text-[11px] px-3.5 py-2 rounded-xl font-extrabold shadow-md shadow-red-500/10 transition leading-none"
                                        >
                                          Chấm Bài viết
                                        </button>
                                      ) : (
                                        <button
                                          onClick={() => handleAutoGradeMultipleChoice(sub)}
                                          className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] px-3.5 py-2 rounded-xl font-extrabold shadow-md shadow-blue-500/10 transition flex items-center gap-1 leading-none"
                                        >
                                          <RefreshCw className="w-3 h-3 animate-spin duration-1000" /> Chấm Tự Động
                                        </button>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right component: list of exams currently active with student overview */}
                  <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-[0_4px_16px_rgba(15,23,42,0.02)] flex flex-col">
                    <div className="mb-5">
                      <h3 className="font-extrabold text-slate-900 text-sm tracking-tight leading-none">Các kì kiểm tra đã giao</h3>
                      <p className="text-xs text-slate-500 mt-1.5 font-medium">Toàn bộ kho câu đố đang mở</p>
                    </div>
                    
                    <div className="flex-1 space-y-3.5 max-h-[440px] overflow-y-auto pr-1">
                      {exams.map(ex => {
                        const targetClass = classes.find(c => c.id === ex.classId);
                        const exSubmissions = submissions.filter(s => s.examId === ex.id);
                        
                        return (
                          <div key={ex.id} className="p-4 bg-slate-50 border border-slate-200/60 rounded-2xl space-y-3.5 hover:border-blue-400 hover:shadow-sm transition-all duration-200">
                            <div className="flex justify-between items-start gap-2">
                              <div className="space-y-1">
                                <h4 className="font-extrabold text-xs text-slate-800 leading-tight">{ex.title}</h4>
                                <span className="text-[10px] text-slate-500 font-bold block mt-1">Lớp: {targetClass?.name || 'Tất cả'}</span>
                              </div>
                              <span className={`text-[9px] font-extrabold px-2 py-1 rounded-lg shrink-0 ${
                                ex.type === 'multiple_choice' ? 'bg-amber-100 text-amber-800' : 'bg-cyan-100 text-cyan-800'
                              }`}>
                                {ex.type === 'multiple_choice' ? 'Trắc nghiệm' : 'Tự luận'}
                              </span>
                            </div>

                            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-200/60 text-[10px] font-bold text-slate-500 font-mono">
                              <span className="flex items-center gap-1">Đã nộp: <b className="text-slate-800">{exSubmissions.length} bài</b></span>
                              <span className="flex items-center gap-1">Đã chấm: <b className="text-emerald-600">{exSubmissions.filter(s => s.status === 'graded').length} bài</b></span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* TAB 2: CLASSES & STUDENT LISTS */}
            {activeTab === 'classes' && (
              <motion.div 
                key="classes"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
                id="panel-classes"
              >
                <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-[0_4px_12px_rgba(15,23,42,0.01)]">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm tracking-tight leading-none">Danh sách Nhóm & Lớp học</h3>
                    <p className="text-xs text-slate-500 mt-1.5 font-medium">Giáo viên quản lý học sinh theo lớp, phát mã mời tham gia thi</p>
                  </div>
                  <button 
                    onClick={() => setShowAddClassModal(true)}
                    className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-2.5 rounded-xl font-bold transition duration-155 transform active:scale-95 shadow-md shadow-blue-500/10"
                  >
                    <Plus className="w-4 h-4" /> Thêm lớp học mới
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column: Classes cards directory */}
                  <div className="lg:col-span-4 space-y-3.5">
                    {classes.map(cl => (
                      <div 
                        key={cl.id}
                        onClick={() => setSelectedClassId(cl.id)}
                        className={`p-5 rounded-2xl border transition-all cursor-pointer transform active:scale-98 ${
                          selectedClassId === cl.id 
                            ? 'bg-gradient-to-br from-blue-50 to-blue-100/30 border-blue-400 shadow-sm shadow-blue-500/5' 
                            : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-md'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[9px] uppercase font-bold tracking-wider text-blue-605 bg-blue-150/40 border border-blue-200/30 px-2.5 py-1 rounded-md">
                              {cl.grade}
                            </span>
                            <h4 className="font-extrabold text-slate-800 text-sm mt-3 tracking-tight">{cl.name}</h4>
                          </div>
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-bold">
                            {cl.students.length} HS
                          </span>
                        </div>

                        <div className="mt-5 flex items-center justify-between text-xs text-slate-500 font-medium font-mono">
                          <span>Mã mời Azota:</span>
                          <span className="font-mono bg-slate-900 text-sky-400 px-2.5 py-1 rounded-lg font-bold uppercase tracking-wider text-[11px] shadow-sm animate-pulse">
                            {cl.code}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Right Column: Students in the selected class */}
                  <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-[0_4px_16px_rgba(15,23,42,0.02)]">
                    {selectedClass ? (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                          <div>
                            <h4 className="font-extrabold text-slate-900 text-sm">Danh sách học sinh - {selectedClass.name}</h4>
                            <p className="text-xs text-slate-500 font-medium mt-1">Khối lớp: {selectedClass.grade} | Mã tuyển đăng nhập: {selectedClass.code}</p>
                          </div>
                          <button
                            onClick={() => setShowAddStudentForm(!showAddStudentForm)}
                            className="text-xs bg-slate-100 hover:bg-slate-250/85 text-slate-700 px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5"
                          >
                            <Plus className="w-3.5 h-3.5" /> Thêm học sinh
                          </button>
                        </div>

                        {/* Slide open Form to build new custom student */}
                        {showAddStudentForm && (
                          <form onSubmit={handleAddStudent} className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200/60 space-y-3.5">
                            <h5 className="text-[10px] font-bold text-slate-550 uppercase tracking-widest">Học sinh mới</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Họ tên học sinh</label>
                                <input
                                  type="text"
                                  required
                                  value={newStudentName}
                                  onChange={e => setNewStudentName(e.target.value)}
                                  placeholder="Ví dụ: Nguyễn Văn Hải"
                                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-305 bg-white focus:outline-none focus:border-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Mã định danh (SBD)</label>
                                <input
                                  type="text"
                                  required
                                  value={newStudentCode}
                                  onChange={e => setNewStudentCode(e.target.value)}
                                  placeholder="Ví dụ: HS1280"
                                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-305 bg-white focus:outline-none focus:border-blue-500"
                                />
                              </div>
                            </div>
                            <div className="flex justify-end gap-2 pt-1">
                              <button
                                type="button"
                                onClick={() => setShowAddStudentForm(false)}
                                className="text-xs text-slate-550 hover:bg-slate-200/50 px-3.5 py-2 rounded-xl transition font-bold"
                              >
                                Hủy bỏ
                              </button>
                              <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-2 rounded-xl font-bold transition shadow-sm"
                              >
                                Lưu học sinh
                              </button>
                            </div>
                          </form>
                        )}

                        {selectedClass.students.length === 0 ? (
                          <div className="py-20 text-center text-slate-400 border border-dashed border-slate-200 rounded-2xl bg-slate-50/20">
                            <AlertCircle className="w-10 h-10 mx-auto text-slate-300 mb-2.5" />
                            <p className="text-xs font-semibold text-slate-600">Chưa có học sinh nào đăng ký tham gia lớp tự học này.</p>
                            <p className="text-[11px] text-slate-500 mt-1 font-medium select-all">Sử dụng Mã mời bên trái để học sinh tham gia tự nộp bài!</p>
                          </div>
                        ) : (
                          <div className="border border-slate-100/80 rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(15,23,42,0.01)] bg-white">
                            <table className="w-full text-left text-xs border-collapse">
                              <thead>
                                <tr className="bg-slate-50/85 border-b border-slate-200/60 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                                  <th className="p-4">STT</th>
                                  <th className="p-4">SBD</th>
                                  <th className="p-4">Học sinh</th>
                                  <th className="p-4 text-right">Hành động</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100/80">
                                {selectedClass.students.map((std, idx) => (
                                  <tr key={std.id} className="hover:bg-slate-50/50 transition duration-100">
                                    <td className="p-4 font-mono text-slate-400 font-semibold">{idx + 1}</td>
                                    <td className="p-4 font-mono text-slate-655 font-bold">{std.studentCode}</td>
                                    <td className="p-4 font-bold text-slate-850">{std.name}</td>
                                    <td className="p-4 text-right">
                                      <button 
                                        onClick={() => handleDeleteStudent(std.id)}
                                        className="text-slate-400 hover:text-red-650 p-1.5 rounded-lg hover:bg-slate-100/85 transition inline-block ml-auto"
                                        title="Xóa học sinh khỏi danh sách lớp"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="py-24 text-center text-slate-400 space-y-4 border border-dashed border-slate-200 rounded-2xl bg-slate-50/25">
                        <Users className="w-12 h-12 mx-auto text-slate-300" />
                        <h4 className="font-extrabold text-slate-705 text-sm">Vui lòng chọn một Lớp để quản lý danh sách</h4>
                        <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed font-semibold">Xem danh sinh, SBD, hành trình điểm số & cập nhật sinh viên</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 3: EXAM / EXPERIMENTS INVENTORY */}
            {activeTab === 'exams' && (
              <motion.div 
                key="exams"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
                id="panel-exams"
              >
                <div className="flex justify-between items-center bg-white p-6 border border-slate-200 rounded-2xl shadow-[0_4px_12px_rgba(15,23,42,0.01)]">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm tracking-tight leading-none font-sans">Kho đề kiểm tra phát hành</h3>
                    <p className="text-xs text-slate-500 mt-1.5 font-medium">Người dùng có thể tạo câu đố tự luận, chọn bài toán trắc nghiệm tự chia điểm</p>
                  </div>
                  <button
                    onClick={() => setShowCreateExamModal(true)}
                    className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-2.5 rounded-xl font-bold shadow-md shadow-blue-500/10 transition duration-155 transform active:scale-95"
                  >
                    <Plus className="w-4 h-4" /> Tạo đề khảo sát mới
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {exams.map(ex => {
                    const cl = classes.find(c => c.id === ex.classId);
                    const subCount = submissions.filter(s => s.examId === ex.id).length;

                    return (
                      <div key={ex.id} className="bg-white rounded-2xl border border-slate-200/85 shadow-[0_4px_12px_rgba(15,23,42,0.02)] flex flex-col hover:border-blue-400 hover:shadow-lg transition-all duration-200">
                        <div className="p-6 flex-1 space-y-3.5">
                          <div className="flex items-start justify-between gap-2">
                            <span className={`text-[9px] uppercase font-extrabold px-2.5 py-1 rounded-lg ${
                              ex.type === 'multiple_choice' ? 'bg-amber-100 text-amber-800' : 'bg-pink-100 text-pink-700'
                            }`}>
                              {ex.type === 'multiple_choice' ? 'Trắc nghiệm' : 'Tự luận'}
                            </span>
                            <span className="text-[10px] text-slate-400 font-bold font-mono">
                              {new Date(ex.createdAt).toLocaleDateString('vi-VN')}
                            </span>
                          </div>

                          <h4 className="font-extrabold text-slate-900 text-sm leading-snug line-clamp-2">{ex.title}</h4>
                          <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 font-medium">{ex.description}</p>

                          <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-bold">
                            <span className="bg-slate-100/80 text-slate-600 px-3 py-1 rounded-full border border-slate-200/40">Lớp: {cl?.name || 'Tự do'}</span>
                            <span className="bg-slate-100/80 text-slate-605 px-3 py-1 rounded-full border border-slate-200/40 flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-slate-400" />
                              {ex.duration > 0 ? `${ex.duration} phút` : 'Tự do'}
                            </span>
                          </div>
                        </div>

                        <div className="bg-slate-50/85 p-5 border-t border-slate-200/60 flex items-center justify-between rounded-b-2xl">
                          <span className="text-xs font-bold text-blue-600">{subCount} Lượt nộp bài</span>
                          <button
                            onClick={() => handleDeleteExam(ex.id)}
                            className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-slate-200/60 transition"
                            title="Xóa đề kiểm tra"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* TAB 4: INTERACTIVE GRADING DESK */}
            {activeTab === 'grading' && gradingSubmission && (
              <motion.div 
                key="grading"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
                id="panel-grading"
              >
                {/* Grading Nav Controls */}
                <div className="flex items-center justify-between bg-white px-5 py-4 border border-slate-200 rounded-xl shadow-sm leading-none">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => { setActiveTab('dashboard'); setActiveGradingSubmissionId(null); }}
                      className="text-slate-500 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">Chấm bài của: {gradingSubmission.studentName}</h4>
                      <p className="text-[11px] text-slate-400 mt-1">Đề bài: {gradingExam?.title}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleAiAutoAnalyze}
                      type="button"
                      className="flex items-center gap-1.5 bg-gradient-to-r from-violet-600 to-indigo-650 text-white text-xs px-3 py-2 rounded-lg font-bold hover:shadow-indigo-500/10 hover:shadow-md transition shrink-0"
                    >
                      <Sparkles className="w-3.5 h-3.5" /> AI Chấm Nhanh
                    </button>

                    <button 
                      onClick={handleSaveGrading}
                      className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-4 py-2 rounded-lg font-bold transition shadow-sm"
                    >
                      <Save className="w-3.5 h-3.5" /> Lưu điểm & Trả bài
                    </button>
                  </div>
                </div>

                {/* Main Desk Layout: Left grading panel / Right annotated canvas drawing */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Side: Score & Core details */}
                  <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5">
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Chọn Thang điểm (0 - 10)</label>
                      <div className="flex items-center gap-3">
                        <input
                          id="input-score"
                          type="number"
                          step="0.1"
                          min="0"
                          max="10"
                          value={gradingScore}
                          onChange={e => setGradingScore(parseFloat(e.target.value) || 0)}
                          className="w-24 text-center font-bold text-2xl px-3 py-2 border border-slate-300 rounded-xl focus:border-blue-500 text-red-600 focus:outline-none focus:ring-1"
                        />
                        <span className="text-slate-400 font-medium">/ 10.0 điểm</span>
                      </div>
                      <p className="text-[10px] text-slate-400">Bạn cũng có thể cho điểm lẻ ví dụ: 8.5 hoặc 9.25</p>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Nhận xét của Giáo viên</label>
                      <textarea
                        id="input-feedback"
                        rows={5}
                        placeholder="Em viết văn có chiều sâu, lập luận khúc chiết và kết luận ý nghĩa...."
                        value={gradingFeedback}
                        onChange={e => setGradingFeedback(e.target.value)}
                        className="w-full text-xs p-3.5 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-150 space-y-2">
                      <h5 className="text-[11px] font-bold text-slate-600 uppercase tracking-widest flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 text-slate-500" /> HƯỚNG DẪN AZOTA RED PEN:
                      </h5>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        1. Lựa chọn các nét chấm ở thanh công cụ bên phải hình bút đỏ.<br />
                        2. <strong>Click trực tiếp lên mặt giấy làm bài của học sinh</strong> để đóng dấu biểu tượng hoặc nhận xét tương đương.<br />
                        3. Click nút "Quay lại" hoặc "Xóa hết" để hiệu chỉnh các nét chấm sai.
                      </p>
                    </div>
                  </div>

                  {/* Right Side: Paper with Visual Click Mark Stamps */}
                  <div className="lg:col-span-8 flex flex-col gap-4">
                    
                    {/* Top Canvas Toolbar */}
                    <div className="bg-slate-800 text-white p-3.5 rounded-xl border border-slate-700 flex items-center justify-between shadow-md">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 font-bold tracking-wider mr-2 uppercase">Công cụ viết:</span>
                        
                        <button
                          onClick={() => setGradingTool('correct')}
                          className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border font-bold transition ${
                            gradingTool === 'correct' 
                              ? 'bg-red-500/20 text-red-400 border-red-500' 
                              : 'border-transparent text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          <span className="w-5 h-5 bg-red-650 text-white rounded-full flex items-center justify-center font-black text-xs leading-none">Đ</span>
                          Nhấn Đúng
                        </button>

                        <button
                          onClick={() => setGradingTool('wrong')}
                          className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border font-bold transition ${
                            gradingTool === 'wrong' 
                              ? 'bg-red-500/20 text-red-400 border-red-500' 
                              : 'border-transparent text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          <span className="w-5 h-5 bg-red-650 text-white rounded-full flex items-center justify-center font-black text-xs leading-none">S</span>
                          Nhấn Sai
                        </button>

                        <button
                          onClick={() => setGradingTool('text')}
                          className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border font-bold transition ${
                            gradingTool === 'text' 
                              ? 'bg-red-500/20 text-red-400 border-red-500' 
                              : 'border-transparent text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          <span className="w-5 h-5 bg-red-650 text-white rounded-full flex items-center justify-center font-semibold text-xs leading-none">💬</span>
                          Viết Bút Đỏ
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={undoLastAnnotation}
                          disabled={gradingAnnotations.length === 0}
                          className="p-1 px-2 text-[11px] flex items-center gap-1 hover:bg-slate-700 rounded text-slate-300 disabled:opacity-40 transition"
                        >
                          <Undo className="w-3.5 h-3.5" /> Quay Lại
                        </button>
                        <button
                          onClick={clearAllAnnotations}
                          disabled={gradingAnnotations.length === 0}
                          className="p-1 px-2 text-[11px] hover:bg-slate-700 rounded text-red-400 disabled:opacity-45 transition font-semibold"
                        >
                          Xoá Tất Cả
                        </button>
                      </div>
                    </div>

                    {/* Image Canvas wrapping interactive marks */}
                    <div className="relative border border-slate-300 rounded-2xl overflow-hidden shadow-lg bg-slate-900 flex justify-center selection:bg-transparent">
                      <div 
                        ref={essayCanvasRef}
                        onClick={handlePaperClick}
                        className="relative max-w-full cursor-crosshair overflow-hidden"
                        style={{ height: 'auto' }}
                      >
                        <img 
                          referrerPolicy="no-referrer"
                          src={gradingSubmission.essayAttachments?.[0] || SAMPLE_ESSAY_SHEETS[0]}
                          alt="Student submission"
                          className="block max-h-[80vh] w-auto pointer-events-none object-contain opacity-95 select-none"
                        />

                        {/* Renders annotations list dynamic overlay */}
                        {gradingAnnotations.map((ann) => (
                          <div 
                            key={ann.id}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none select-none flex items-center gap-1.5"
                            style={{ left: `${ann.x}%`, top: `${ann.y}%` }}
                          >
                            {ann.type === 'correct' && (
                              <div className="w-9 h-9 border-2 border-red-600 bg-white shadow-md text-red-600 font-extrabold text-lg flex items-center justify-center rounded-full leading-none animate-bounce">
                                Đ
                              </div>
                            )}
                            {ann.type === 'wrong' && (
                              <div className="w-9 h-9 border-2 border-red-600 bg-white shadow-md text-red-600 font-extrabold text-lg flex items-center justify-center rounded-full leading-none animate-bounce">
                                S
                              </div>
                            )}
                            {ann.type === 'text' && (
                              <span className="p-1 px-2.5 bg-red-600 text-white font-bold text-xs select-none italic font-sans italic-red-pen shadow-lg border border-red-400 rounded-md whitespace-nowrap block">
                                {ann.text}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Modal overlay to prompt input for Red Pen Comments */}
                      {showCommentForm && pendingClickPos && (
                        <div className="absolute inset-0 bg-black/60 z-45 flex items-center justify-center p-4">
                          <div className="bg-white p-5 rounded-xl max-w-sm w-full space-y-4 shadow-2xl">
                            <h5 className="font-bold text-slate-800 text-sm">Viết lời phê bút đỏ trực tiếp</h5>
                            <input
                              type="text"
                              value={commentInputText}
                              onChange={e => setCommentInputText(e.target.value)}
                              placeholder="Ví dụ: Chỗ này lập luận rất sắc bén! +1 point"
                              autoFocus
                              className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                              onKeyDown={e => { if (e.key === 'Enter') handleAddTextComment(); }}
                            />
                            <div className="flex justify-end gap-2 text-xs">
                              <button
                                onClick={() => { setShowCommentForm(false); setPendingClickPos(null); }}
                                className="px-3 py-1.5 text-slate-500 hover:bg-slate-100 rounded-lg transition"
                              >
                                Hủy bớt
                              </button>
                              <button
                                onClick={handleAddTextComment}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-lg font-bold transition"
                              >
                                Đóng dấu phê
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                    </div>

                  </div>

                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </main>

      {/* MODAL WINDOWS FOR DIALOGS */}
      
      {/* 1. Modal create brand-new Class */}
      {showAddClassModal && (
        <div className="fixed inset-0 bg-slate-900/40 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-slate-800 text-base">Thêm Lớp học Azota mới</h3>
              <button 
                onClick={() => setShowAddClassModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-full transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateClass} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">Tên Lớp học</label>
                <input
                  type="text"
                  required
                  value={newClassName}
                  onChange={e => setNewClassName(e.target.value)}
                  placeholder="Ví dụ: Lớp 10A2 Lý, Lớp 12 Sinh"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-350 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">Khối lớp tương ứng</label>
                <select
                  value={newClassGrade}
                  onChange={e => setNewClassGrade(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-350 bg-white focus:outline-none focus:border-blue-500"
                >
                  <option>Khối 10</option>
                  <option>Khối 11</option>
                  <option>Khối 12</option>
                  <option>Khối Khác</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">Mã nhập lớp học tự do</label>
                <input
                  type="text"
                  value={newClassCode}
                  onChange={e => setNewClassCode(e.target.value)}
                  placeholder="Lấy tự động hoặc tự điền..."
                  className="w-full font-mono text-xs px-3.5 py-2.5 rounded-xl border border-slate-350 focus:outline-none focus:border-blue-500 focus:ring-1"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs py-3.5 rounded-xl font-bold transition shadow-md shadow-blue-500/10"
              >
                Tạo lớp ngay lập tức
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* 2. Modal Create Exam & HW */}
      {showCreateExamModal && (
        <div className="fixed inset-0 bg-slate-900/40 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl relative my-8"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-slate-800 text-base">Phát hành Bài Đánh Giá - Đề Khảo Sát</h3>
              <button 
                onClick={() => setShowCreateExamModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-full transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateExam} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase">Hình thức làm bài</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setNewExamType('multiple_choice')}
                      className={`py-2 px-3 text-xs font-bold rounded-lg border transition ${
                        newExamType === 'multiple_choice' 
                          ? 'border-blue-600 bg-blue-50 text-blue-700' 
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      Trắc nghiệm (Hệ thống tự chấm)
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewExamType('essay')}
                      className={`py-2 px-3 text-xs font-bold rounded-lg border transition ${
                        newExamType === 'essay' 
                          ? 'border-blue-600 bg-blue-50 text-blue-700' 
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      Tự luận (Học sinh chụp ảnh nộp)
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase">Giao cho Lớp học</label>
                  <select
                    value={newExamClassId}
                    onChange={e => setNewExamClassId(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white"
                  >
                    {classes.map(cl => (
                      <option key={cl.id} value={cl.id}>{cl.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase">Tiêu đề đề kiểm tra - Khảo sát</label>
                  <input
                    type="text"
                    required
                    value={newExamTitle}
                    onChange={e => setNewExamTitle(e.target.value)}
                    placeholder="Ví dụ: Giữa kì 2 Hình học, Viết luận văn số 1..."
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase">Thời gian làm bài (Phút)</label>
                  <input
                    type="number"
                    min="0"
                    value={newExamDuration}
                    onChange={e => setNewExamDuration(e.target.value)}
                    placeholder="0 là không giới hạn"
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase">Mô tả tổng quát / Lời căn dặn</label>
                <textarea
                  rows={2}
                  value={newExamDesc}
                  onChange={e => setNewExamDesc(e.target.value)}
                  placeholder="Các em đọc kĩ đề bài, chú ý căn dặn giờ nộp bài để đạt kết quả tốt nhất."
                  className="w-full text-xs p-3.5 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Dynamic parameters depending on Essay vs Multiple Choice */}
              {newExamType === 'essay' ? (
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase">Chi tiết đề tự luận (Hiển thị văn bản hướng dẫn)</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Nêu ý kiến của học sinh về sự tử tế..."
                    value={newExamEssayPrompt}
                    onChange={e => setNewExamEssayPrompt(e.target.value)}
                    className="w-full text-xs p-3.5 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-550 focus:ring-1"
                  />
                </div>
              ) : (
                <div className="space-y-3.5">
                  <div className="flex justify-between items-center bg-slate-50 p-2 px-3 rounded-lg border">
                    <span className="text-xs font-bold text-slate-700">DANH SÁCH BỘ CÂU HỎI TRẮC NGHIỆM</span>
                    <button
                      type="button"
                      onClick={addQuestionField}
                      className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1.5 rounded-lg font-bold transition flex items-center gap-1 shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" /> Thêm câu hỏi
                    </button>
                  </div>

                  <div className="space-y-4 max-h-48 overflow-y-auto pr-1">
                    {newExamQuestions.map((q, qIdx) => (
                      <div key={q.id} className="p-4 bg-slate-50/50 rounded-xl border border-slate-200 shadow-sm space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-blue-600">Câu số {qIdx + 1}</span>
                          <button
                            type="button"
                            onClick={() => removeQuestionField(qIdx)}
                            className="text-red-500 hover:text-red-700 text-xs font-semibold px-2 py-1 hover:bg-red-50 rounded"
                          >
                            Xóa câu này
                          </button>
                        </div>

                        <input
                          type="text"
                          required
                          value={q.questionText}
                          onChange={e => {
                            updateQuestion(qIdx, { ...q, questionText: e.target.value });
                          }}
                          placeholder="Ý nghĩa của..."
                          className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white"
                        />

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {q.options.map((opt, optIdx) => (
                            <div key={optIdx} className="flex items-center gap-2">
                              <input
                                type="radio"
                                name={`correct-${q.id}`}
                                checked={q.correctOption === optIdx}
                                onChange={() => {
                                  updateQuestion(qIdx, { ...q, correctOption: optIdx });
                                }}
                                className="text-blue-605"
                              />
                              <span className="font-bold text-slate-500 mr-1">{String.fromCharCode(65 + optIdx)}.</span>
                              <input
                                type="text"
                                required
                                value={opt}
                                onChange={e => {
                                  const copyOpts = [...q.options];
                                  copyOpts[optIdx] = e.target.value;
                                  updateQuestion(qIdx, { ...q, options: copyOpts });
                                }}
                                className="w-full border-b border-dashed border-slate-300 bg-transparent py-1 text-xs focus:outline-none focus:border-blue-500"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-3 pb-1">
                <button
                  type="button"
                  onClick={() => setShowCreateExamModal(false)}
                  className="text-xs font-semibold hover:bg-slate-100 text-slate-500 px-4 py-2.5 rounded-lg transition"
                >
                  Ở lại soạn sau
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-5 py-2.5 rounded-lg font-bold shadow-md shadow-blue-500/15 transition"
                >
                  Giao bài khảo sát ngay
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
}
