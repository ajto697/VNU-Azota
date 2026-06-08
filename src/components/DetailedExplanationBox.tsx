/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, HelpCircle, CheckCircle2, ShieldAlert, ListFilter, HelpCircle as HelpIcon, ArrowRightCircle } from 'lucide-react';
import { VNUQuestion } from '../vnu1001_questions';
import { getDetailedExplanation } from '../utils/explanationGenerator';

interface DetailedExplanationBoxProps {
  question: VNUQuestion;
}

export default function DetailedExplanationBox({ question }: DetailedExplanationBoxProps) {
  const [activeSubTab, setActiveSubTab] = useState<'correct' | 'all_options' | 'elimination'>('correct');
  const details = getDetailedExplanation(question);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border-2 border-slate-205 rounded-3xl overflow-hidden shadow-md mt-6"
    >
      {/* Tab bar header */}
      <div className="bg-slate-50 border-b border-slate-150 p-2.5 flex flex-wrap gap-1.5 select-none shrink-0">
        <button
          type="button"
          onClick={() => setActiveSubTab('correct')}
          className={`flex items-center gap-1.5 text-[11px] font-black px-4 py-2 rounded-xl transition duration-150 cursor-pointer ${
            activeSubTab === 'correct'
              ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/10'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" /> Lời giải đúng
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('all_options')}
          className={`flex items-center gap-1.5 text-[11px] font-black px-4 py-2 rounded-xl transition duration-150 cursor-pointer ${
            activeSubTab === 'all_options'
              ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/10'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <ListFilter className="w-3.5 h-3.5" /> Phân tích cả 4 đáp án
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('elimination')}
          className={`flex items-center gap-1.5 text-[11px] font-black px-4 py-2 rounded-xl transition duration-150 cursor-pointer ${
            activeSubTab === 'elimination'
              ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/10'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" /> Phương pháp loại trừ
        </button>
      </div>

      {/* Tab body content */}
      <div className="p-5.5 text-xs">
        {activeSubTab === 'correct' && (
          <motion.div
            key="correct"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            <div className="flex items-start gap-2.5 bg-emerald-50 text-emerald-950 p-4.5 rounded-2xl border border-emerald-150">
              <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-black tracking-wider text-emerald-800 block">Lời giải sư phạm chuẩn chỉnh</span>
                <p className="font-semibold leading-relaxed text-slate-800">
                  {details.correctReason}
                </p>
              </div>
            </div>
            <p className="text-slate-500 text-[10.5px] leading-relaxed font-bold px-1 select-none">
              💡 Học thuyết liên quan: Đáp án đúng phản ánh nguyên lý vận hành phần cứng bám sát tài liệu Ôn thi tin học đại cương VNU1001.
            </p>
          </motion.div>
        )}

        {activeSubTab === 'all_options' && (
          <motion.div
            key="all_options"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wide block pb-1">Đánh giá & phân tích chi tiết từng lựa chọn:</span>
            <div className="space-y-3">
              {details.optionsList.map((opt) => (
                <div
                  key={opt.letter}
                  className={`p-3.5 rounded-2xl border flex gap-3 items-start transition ${
                    opt.isCorrect
                      ? 'bg-emerald-50/45 border-emerald-200 text-slate-800 font-semibold'
                      : 'bg-slate-50/50 border-slate-200/80 text-slate-650'
                  }`}
                >
                  <span className={`w-6.5 h-6.5 rounded-full flex items-center justify-center shrink-0 font-extrabold text-[11px] border ${
                    opt.isCorrect
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'bg-slate-200 border-slate-300 text-slate-600'
                  }`}>
                    {opt.letter}
                  </span>
                  <div className="space-y-1 w-full text-[11px]">
                    <div className="flex justify-between items-center">
                      <span className="font-extrabold text-slate-900">{opt.text}</span>
                      <span className={`text-[8.5px] font-black uppercase px-2 py-0.5 rounded ${
                        opt.isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {opt.isCorrect ? 'Đúng' : 'Có thể loại trừ'}
                      </span>
                    </div>
                    <p className="text-slate-600 font-medium leading-relaxed">{opt.rationale}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeSubTab === 'elimination' && (
          <motion.div
            key="elimination"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="bg-slate-900 text-white p-4.5 rounded-2xl space-y-3">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-blue-400 flex items-center gap-1.5 leading-none">
                <ArrowRightCircle className="w-3.5 h-3.5" /> Quy trình tư duy & khoanh trắc nghiệm chuẩn xác
              </span>
              <p className="text-[11px] leading-relaxed text-slate-300 font-semibold">
                Khi đối mặt với câu hỏi này ở kì thi VNU1001, bạn có thể thực hiện 3 bước loại trừ siêu tốc dưới đây để tối đa hóa xác suất đúng lên tới 100%:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5">
              {details.eliminationTips.map((tip, tIdx) => {
                const stepNames = ["BƯỚC 1: Đọc đề & Từ khóa", "BƯỚC 2: Loại trừ nhiễu", "BƯỚC 3: Đối chiếu & Chọn"];
                const stepColors = [
                  "border-blue-200 bg-blue-50/30 text-blue-900",
                  "border-amber-200 bg-amber-50/20 text-amber-900",
                  "border-emerald-200 bg-emerald-50/20 text-emerald-900",
                ];

                return (
                  <div key={tIdx} className={`p-4 rounded-xl border leading-relaxed ${stepColors[tIdx]}`}>
                    <span className="text-[9.5px] font-black uppercase block tracking-widest pb-1">{stepNames[tIdx]}</span>
                    <p className="text-[11px] font-medium text-slate-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: tip }} />
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
