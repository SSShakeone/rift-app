'use client';

import { EmotionRecord } from '@/types';
import { formatTime, getTagLabel } from '@/lib/utils';
import { Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface RecordListProps {
  records: EmotionRecord[];
  onDelete: (id: string) => void;
}

export default function RecordList({ records, onDelete }: RecordListProps) {
  if (records.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-[#9B8E84] text-sm">今天还没有记录</p>
        <p className="text-[#9B8E84] text-xs mt-1 opacity-60">记录第一条情绪，开始拆解内心官司</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-[#9B8E84]">
        今日记录 <span className="text-[#F0A58E]">{records.length}</span>
      </label>
      <AnimatePresence>
        {records.map(record => (
          <motion.div
            key={record.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="relative bg-white border border-[#F0E0D0] rounded-2xl p-4 hover:border-[#F0D8C0] transition-colors shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  record.direction === 'external'
                    ? 'bg-[rgba(232,147,124,0.12)] text-[#E8927C]'
                    : 'bg-[rgba(124,184,212,0.12)] text-[#7CB8D4]'
                }`}>
                  {record.direction === 'external' ? '↗ 对外' : '↙ 对内'}
                </span>
                <span className="text-xs text-[#9B8E84]">{formatTime(record.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-[#F0A58E]">{record.intensity}/10</span>
                <button
                  onClick={() => onDelete(record.id)}
                  className="text-[#9B8E84] hover:text-[#E8927C] transition-colors p-1"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-2">
              {record.tags.map(tag => (
                <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-[#FFF0E5] text-[#4A3728]">
                  {getTagLabel(tag)}
                </span>
              ))}
              {record.subTags?.map(sub => (
                <span key={sub} className="text-xs px-2 py-0.5 rounded-full bg-[rgba(240,165,142,0.12)] text-[#F0A58E]">
                  {sub}
                </span>
              ))}
            </div>

            {(record.targetPerson || record.targetScene) && (
              <p className="text-xs text-[#9B8E84] mt-2">
                {record.targetPerson && `👤 ${record.targetPerson}`}
                {record.targetPerson && record.targetScene && ' · '}
                {record.targetScene && `📍 ${record.targetScene}`}
              </p>
            )}

            {record.freeText && (
              <p className="text-sm text-[#4A3728] mt-2 leading-relaxed">{record.freeText}</p>
            )}

            {record.deepAnswers && (
              <div className="mt-2 pt-2 border-t border-[#F0E0D0] space-y-1">
                {record.deepAnswers.stingSentence && (
                  <p className="text-xs text-[#F0A58E]">💔 "{record.deepAnswers.stingSentence}"</p>
                )}
                {record.deepAnswers.worstPoint && (
                  <p className="text-xs text-[#9B8E84]">最痛：{record.deepAnswers.worstPoint}</p>
                )}
                {record.deepAnswers.desiredTreatment && (
                  <p className="text-xs text-[#9B8E84]">想要：{record.deepAnswers.desiredTreatment}</p>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
