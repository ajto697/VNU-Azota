/**
 * Compiled question database for Pháp luật đại cương (General Law / Introduction to Law)
 * Derived directly from the fully comprehensive 100-question chapters provided.
 * Contains detailed explanations detailing why the correct answer is chosen and why others are excluded.
 */

import { VNUQuestion } from "./vnu1001_questions";
import { PLDC_TOPIC_1_RAW } from "./pldc_topic1";
import { PLDC_TOPIC_2_RAW } from "./pldc_topic2";
import { PLDC_TOPIC_3_RAW } from "./pldc_topic3";
import { PLDC_TOPIC_4_RAW } from "./pldc_topic4";
import { PLDC_TOPIC_5_RAW } from "./pldc_topic5";
import { PLDC_TOPIC_6_RAW } from "./pldc_topic6";

export const PLDC_TOPICS = [
  "CHƯƠNG 1: NHÀ NƯỚC PHÁP QUYỀN XÃ HỘI CHỦ NGHĨA VIỆT NAM",
  "CHƯƠNG 2: BỘ MÁY, CHỨC NĂNG, HÌNH THỨC NHÀ NƯỚC",
  "CHƯƠNG 3: PHÁP LUẬT, VAI TRÒ, CHỨC NĂNG CỦA PHÁP LUẬT",
  "CHƯƠNG 4: QUY PHẠM PHÁP LUẬT, QUAN HỆ PHÁP LUẬT VÀ THỰC HIỆN PHÁP LUẬT",
  "CHƯƠNG 5: Ý THỨC PHÁP LUẬT, VI PHẠM PHÁP LUẬT VÀ TRÁCH NHIỆM PHÁP LÝ",
  "CHƯƠNG 6: CÁC NGÀNH LUẬT CƠ BẢN TRONG HỆ THỐNG PHÁP LUẬT VIỆT NAM"
];

interface RawCompactQ {
  q: string;
  o: string[];
  c: number;
  e: string;
  d: string;
}

function getRawTopicQuestions(topicId: number): RawCompactQ[] {
  switch (topicId) {
    case 1:
      return PLDC_TOPIC_1_RAW;
    case 2:
      return PLDC_TOPIC_2_RAW;
    case 3:
      return PLDC_TOPIC_3_RAW;
    case 4:
      return PLDC_TOPIC_4_RAW;
    case 5:
      return PLDC_TOPIC_5_RAW;
    case 6:
      return PLDC_TOPIC_6_RAW;
    default:
      return [];
  }
}

let CACHED_PLDC_DATABASE: VNUQuestion[] | null = null;

export function getFullPLDCDatabase(): VNUQuestion[] {
  if (CACHED_PLDC_DATABASE) return CACHED_PLDC_DATABASE;

  const full: VNUQuestion[] = [];
  for (let tid = 1; tid <= 6; tid++) {
    const rawList = getRawTopicQuestions(tid);
    const topicQuestions = rawList.map((raw, idx) => ({
      id: `pldc-q-t${tid}-${idx + 1}`,
      topicId: tid,
      difficulty: (raw.d === "nb" ? "nhan_biet" : raw.d === "th" ? "thong_hieu" : raw.d === "vd" ? "van_dung" : "van_dung_cao") as VNUQuestion["difficulty"],
      questionText: raw.q,
      options: raw.o,
      correctOption: raw.c,
      explanation: raw.e
    }));
    full.push(...topicQuestions);
  }

  CACHED_PLDC_DATABASE = full;
  return CACHED_PLDC_DATABASE;
}
