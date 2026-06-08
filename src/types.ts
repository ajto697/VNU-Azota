/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Student {
  id: string;
  name: string;
  studentCode: string;
}

export interface ClassGroup {
  id: string;
  name: string;
  grade: string;
  code: string; // Join code
  students: Student[];
}

export interface Question {
  id: string;
  questionText: string;
  options: string[]; // ['Đáp án A', 'Đáp án B', 'Đáp án C', 'Đáp án D']
  correctOption: number; // Index 0-3
  points: number; // e.g. 2.5
}

export interface Exam {
  id: string;
  title: string;
  type: 'multiple_choice' | 'essay';
  classId: string; // Target class
  duration: number; // in minutes (0 for no limit)
  description: string;
  createdAt: string;
  questions?: Question[]; // Array of questions for multiple choice
  essayPrompt?: string; // Instruction text for essay homework
  essayAttachedImage?: string; // Optional reference image for homework
}

export interface Annotation {
  id: string;
  x: number; // X coordinate percentages (0 to 100)
  y: number; // Y coordinate percentages (0 to 100)
  type: 'correct' | 'wrong' | 'text'; // Đúng (Đ) or Sai (S) or custom comment
  text?: string;
}

export interface Submission {
  id: string;
  examId: string;
  studentId: string;
  studentName: string;
  submittedAt: string;
  status: 'submitted' | 'graded';
  score?: number; // Calculated score (e.g. 8.5)
  multipleChoiceAnswers?: { [questionId: string]: number }; // questionId -> chosenOptionIndex
  essayAttachments?: string[]; // list of image data URLs or preset images
  teacherFeedback?: string;
  annotations?: Annotation[]; // annotation list on the student's submission sheet
}
