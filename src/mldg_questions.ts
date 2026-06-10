/**
 * Compiled question database for Nhập môn đo lường đánh giá trong giáo dục (MLDG)
 * Derived directly from the fully comprehensive 100-question chapters provided.
 * Contains detailed explanations detailing why the correct answer is chosen and why others are excluded.
 */

import { VNUQuestion } from "./vnu1001_questions";
import { MLDG_TOPIC_1_RAW } from "./mldg_topic1";
import { MLDG_TOPIC_2_RAW } from "./mldg_topic2";
import { MLDG_TOPIC_3_RAW } from "./mldg_topic3";
import { MLDG_TOPIC_4_RAW } from "./mldg_topic4";

export const MLDG_TOPICS = [
  "CHƯƠNG 1: KHÁI NIỆM CƠ BẢN VÀ LỊCH SỬ ĐO LƯỜNG ĐÁNH GIÁ TRONG GIÁO DỤC",
  "CHƯƠNG 2: LẬP KẾ HOẠCH KIỂM TRA ĐÁNH GIÁ TRONG DẠY HỌC",
  "CHƯƠNG 3: CÁC NỘI DUNG ĐÁNH GIÁ TRONG GIÁO DỤC",
  "CHƯƠNG 4: PHÂN TÍCH VÀ SỬ DỤNG KẾT QUẢ KIỂM TRA ĐÁNH GIÁ"
];

interface RawCompactQ {
  q: string;
  o: string[];
  c: number;
  e: string;
  d?: string;
}

function getRawTopicQuestions(topicId: number): RawCompactQ[] {
  switch (topicId) {
    case 1:
      return MLDG_TOPIC_1_RAW;
    case 2:
      return MLDG_TOPIC_2_RAW;
    case 3:
      return MLDG_TOPIC_3_RAW;
    case 4:
      return MLDG_TOPIC_4_RAW;
    default:
      return [];
  }
}

let CACHED_MLDG_DATABASE: VNUQuestion[] | null = null;

export function getFullMLDGDatabase(): VNUQuestion[] {
  if (CACHED_MLDG_DATABASE) return CACHED_MLDG_DATABASE;

  const full: VNUQuestion[] = [];
  for (let tid = 1; tid <= 4; tid++) {
    const rawList = getRawTopicQuestions(tid);
    const topicQuestions = rawList.map((raw, idx) => ({
      id: `mldg-q-t${tid}-${idx + 1}`,
      topicId: tid,
      difficulty: ((raw.d || "nb") === "nb" ? "nhan_biet" : raw.d === "th" ? "thong_hieu" : raw.d === "vd" ? "van_dung" : "van_dung_cao") as VNUQuestion["difficulty"],
      questionText: raw.q,
      options: raw.o,
      correctOption: raw.c,
      explanation: raw.e
    }));
    full.push(...topicQuestions);
  }

  CACHED_MLDG_DATABASE = full;
  return CACHED_MLDG_DATABASE;
}
