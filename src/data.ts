/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ClassGroup, Exam, Submission } from './types';

// Preset sample student handwriting sheets (canvas layouts) for teachers to practice grading.
// We model them as interactive visual canvases containing mock text.
export const SAMPLE_ESSAY_SHEETS = [
  "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=1000", // Notebook paper
  "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=1000"  // Texturized sheet
];

export const INITIAL_CLASSES: ClassGroup[] = [
  {
    id: "class-1",
    name: "Lớp 12A1",
    grade: "Khối 12",
    code: "TOAN12A1",
    students: [
      { id: "std-101", name: "Nguyễn Văn An", studentCode: "HS1201" },
      { id: "std-102", name: "Trần Thị Bình", studentCode: "HS1202" },
      { id: "std-103", name: "Lê Hoàng Châu", studentCode: "HS1203" },
      { id: "std-104", name: "Phạm Minh Đức", studentCode: "HS1204" },
      { id: "std-105", name: "Vũ Hải Yến", studentCode: "HS1205" }
    ]
  },
  {
    id: "class-2",
    name: "Lớp 11B2",
    grade: "Khối 11",
    code: "VAN11B2",
    students: [
      { id: "std-201", name: "Đặng Thu Thảo", studentCode: "HS1101" },
      { id: "std-202", name: "Phan Văn Nam", studentCode: "HS1102" },
      { id: "std-203", name: "Trương Quỳnh Anh", studentCode: "HS1103" },
      { id: "std-204", name: "Ngô Quốc Khánh", studentCode: "HS1104" }
    ]
  }
];

export const INITIAL_EXAMS: Exam[] = [
  {
    id: "exam-1",
    title: "Đề ôn tập Khảo sát Giải tích 12",
    type: "multiple_choice",
    classId: "class-1",
    duration: 15, // 15 phut
    description: "Đề thi khảo sát chất lượng toán tuần 1. Đề gồm có 5 câu lý thuyết và tính toán cơ bản.",
    createdAt: "2026-06-01T08:00:00Z",
    questions: [
      {
        id: "q-1",
        questionText: "Tìm tập xác định của hàm số y = (x - 1)⁻³ ?",
        options: [
          "D = R \\ {1}",
          "D = (1; +∞)",
          "D = R",
          "D = (-∞; 1)"
        ],
        correctOption: 0,
        points: 2
      },
      {
        id: "q-2",
        questionText: "Đường tiệm cận đứng của đồ thị hàm số y = (2x - 1) / (x + 1) là:",
        options: [
          "x = 2",
          "y = 2",
          "x = -1",
          "y = -1"
        ],
        correctOption: 2,
        points: 2
      },
      {
        id: "q-3",
        questionText: "Công thức tính thể tích khối lăng trụ có diện tích đáy B và chiều cao h là:",
        options: [
          "V = 1/3 * B * h",
          "V = B * h",
          "V = 4/3 * B * h",
          "V = 2 * B * h"
        ],
        correctOption: 1,
        points: 2
      },
      {
        id: "q-4",
        questionText: "Cho hàm số f(x) có bảng biến thiên với f'(x) đổi dấu từ dương sang âm tại x = 2. Khẳng định nào đúng?",
        options: [
          "Học số đạt cực tiểu tại x = 2",
          "Hàm số đạt cực đại tại x = 2",
          "Hàm số không có cực trị",
          "Đồ thị lồi trong khoảng (-∞; 2)"
        ],
        correctOption: 1,
        points: 2
      },
      {
        id: "q-5",
        questionText: "Số giao điểm của đồ thị hàm số y = x³ - 3x và trục hoành Ox là:",
        options: [
          "1",
          "2",
          "3",
          "0"
        ],
        correctOption: 2,
        points: 2
      }
    ]
  },
  {
    id: "exam-2",
    title: "Nghị luận xã hội: Sức mạnh của sự tử tế",
    type: "essay",
    classId: "class-2",
    duration: 0, // khong gioi han
    description: "Viết một bài văn ngắn (khoảng 400 - 600 từ) trình bày ý kiến của em về vai trò của 'Sự tử tế' trong xã hội hiện đại.",
    createdAt: "2026-06-02T14:30:00Z",
    essayPrompt: "Yêu cầu:\n1. Nêu rõ quan niệm thế nào là lòng tử tế.\n2. Phân tích các dẫn chứng cụ thể trong cuộc sống hiện đại.\n3. Đúc rút bài học liên hệ bản thân.\n\nNhớ canh giờ viết và chụp ảnh nộp bài lên hệ thống Azota đúng hạn nhé các em!",
    essayAttachedImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=800"
  }
];

export const INITIAL_SUBMISSIONS: Submission[] = [
  {
    id: "sub-1",
    examId: "exam-1",
    studentId: "std-101",
    studentName: "Nguyễn Văn An",
    submittedAt: "2026-06-03T09:15:00Z",
    status: "graded",
    score: 8.0,
    multipleChoiceAnswers: {
      "q-1": 0, // Correct
      "q-2": 2, // Correct
      "q-3": 1, // Correct
      "q-4": 0, // Wrong (correct is 1)
      "q-5": 2  // Correct
    }
  },
  {
    id: "sub-2",
    examId: "exam-1",
    studentId: "std-102",
    studentName: "Trần Thị Bình",
    submittedAt: "2026-06-03T09:40:00Z",
    status: "submitted",
    multipleChoiceAnswers: {
      "q-1": 1, // Wrong
      "q-2": 2, // Correct
      "q-3": 1, // Correct
      "q-4": 1, // Correct
      "q-5": 0  // Wrong
    }
  },
  {
    id: "sub-3",
    examId: "exam-2",
    studentId: "std-201",
    studentName: "Đặng Thu Thảo",
    submittedAt: "2026-06-04T15:22:00Z",
    status: "submitting", // Let's simplify status, just 'submitted' is un-graded
    essayAttachments: [
      SAMPLE_ESSAY_SHEETS[0]
    ]
  } as unknown as Submission, // Let's correct this object structure to match Submission
  {
    id: "sub-4",
    examId: "exam-2",
    studentId: "std-202",
    studentName: "Phan Văn Nam",
    submittedAt: "2026-06-04T16:05:00Z",
    status: "graded",
    score: 9.0,
    essayAttachments: [
      SAMPLE_ESSAY_SHEETS[1]
    ],
    teacherFeedback: "Bài làm rất xuất sắc, luận điểm rõ ràng mạch lạc! Cần chú ý thêm một chút về liên hệ thực tế.",
    annotations: [
      { id: "an-1", x: 45, y: 25, type: 'correct' },
      { id: "an-2", x: 60, y: 48, type: 'correct' },
      { id: "an-3", x: 50, y: 72, type: 'text', text: "Lời khai triển tốt!" }
    ]
  }
];

// LocalStorage helpers
const LOCAL_CLASSES_KEY = "azota_classes_v1";
const LOCAL_EXAMS_KEY = "azota_exams_v1";
const LOCAL_SUBMISSIONS_KEY = "azota_submissions_v1";

export function loadClasses(): ClassGroup[] {
  const data = localStorage.getItem(LOCAL_CLASSES_KEY);
  if (!data) {
    localStorage.setItem(LOCAL_CLASSES_KEY, JSON.stringify(INITIAL_CLASSES));
    return INITIAL_CLASSES;
  }
  return JSON.parse(data);
}

export function saveClasses(classes: ClassGroup[]) {
  localStorage.setItem(LOCAL_CLASSES_KEY, JSON.stringify(classes));
}

export function loadExams(): Exam[] {
  const data = localStorage.getItem(LOCAL_EXAMS_KEY);
  if (!data) {
    localStorage.setItem(LOCAL_EXAMS_KEY, JSON.stringify(INITIAL_EXAMS));
    return INITIAL_EXAMS;
  }
  return JSON.parse(data);
}

export function saveExams(exams: Exam[]) {
  localStorage.setItem(LOCAL_EXAMS_KEY, JSON.stringify(exams));
}

export function loadSubmissions(): Submission[] {
  const data = localStorage.getItem(LOCAL_SUBMISSIONS_KEY);
  if (!data) {
    // Normalise sub-3 to match 'submitted' status
    const initial = INITIAL_SUBMISSIONS.map(sub => {
      if ((sub as any).status === "submitting") {
        return { ...sub, status: 'submitted' as const };
      }
      return sub;
    });
    localStorage.setItem(LOCAL_SUBMISSIONS_KEY, JSON.stringify(initial));
    return initial;
  }
  return JSON.parse(data);
}

export function saveSubmissions(submissions: Submission[]) {
  localStorage.setItem(LOCAL_SUBMISSIONS_KEY, JSON.stringify(submissions));
}
