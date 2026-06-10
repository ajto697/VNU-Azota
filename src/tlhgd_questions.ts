/**
 * Compiled question database for Tâm Lý Học Trong Giáo Dục (Educational Psychology)
 * Organizes chapters into 6 cohesive study modules and merges 250 high-quality questions.
 */

import { VNUQuestion } from "./vnu1001_questions";
import { TLHGD_QUESTIONS_P1 } from "./tlhgd_questions_p1";
import { TLHGD_QUESTIONS_P2 } from "./tlhgd_questions_p2";
import { TLHGD_QUESTIONS_P3 } from "./tlhgd_questions_p3";
import { TLHGD_QUESTIONS_P4 } from "./tlhgd_questions_p4";
import { TLHGD_QUESTIONS_P5 } from "./tlhgd_questions_p5";

export const TLHGD_TOPICS = [
  "CHƯƠNG 1: HIỆN TƯỢNG TÂM LÝ NGƯỜI VÀ PHƯƠNG PHÁP NGHIÊN CỨU",
  "CHƯƠNG 2 & 3: YẾU TỐ SINH HỌC & SỰ PHÁT TRIỂN / HOẠT ĐỘNG – GIAO TIẾP",
  "CHƯƠNG 4 & 5: QUÁ TRÌNH NHẬN THỨC VÀ ĐIỀU KIỆN NHẬN THỨC",
  "CHƯƠNG 6 & 7: TÌNH CẢM – Ý CHÍ VÀ SỰ HÌNH THÀNH NHÂN CÁCH",
  "CHƯƠNG 8 & 9: TÂM LÝ HỌC HOẠT ĐỘNG HỌC VÀ HOẠT ĐỘNG DẠY",
  "CHƯƠNG 10–12: MÔI TRƯỜNG, ĐẠO ĐỨC & PHẨM CHẤT NHÀ GIÁO DỤC"
];

export function getFullTLHGDDatabase(): VNUQuestion[] {
  return [
    ...TLHGD_QUESTIONS_P1,
    ...TLHGD_QUESTIONS_P2,
    ...TLHGD_QUESTIONS_P3,
    ...TLHGD_QUESTIONS_P4,
    ...TLHGD_QUESTIONS_P5
  ];
}
