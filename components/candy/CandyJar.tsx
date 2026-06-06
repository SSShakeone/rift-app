'use client';

import { Candy } from '@/types';
import { getCandyTypeLabel } from '@/lib/candy-pool';
import { formatRelativeDate } from '@/lib/utils';
import { Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CandyJarProps {
  candies: Candy[];
  onUncollect: (id: string) => void;
}

const typeEmojis: Record<string, string> = {
  self_acceptance: '🫂',
  boundary: '🛡️',
  insight: '🔍',
  growth: '🌱',
  humor: '😄',
};

export default function CandyJar({ candies, onUncollect }: CandyJarProps) {
  if (candies.length === 0) {
    return (
      <div className="bg-white border border-[#F0E0D0] rounded-2xl p-6 text-center shadow-sm">
        <div className="text-4xl mb-3">🏺</div>
        <p className="text-sm text-[#9B8E84]">糖果罐空空如也</p>
        <p className="text-xs text-[#9B8E84] mt-1 opacity-60">拆开今天的糖纸，开始收集吧！</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-[#9B8E84]">
        🏺 糖果罐 <span className="text-[#F0A58E]">{candies.length}</span>
      </h3>
      <div className="space-y-2">
        <AnimatePresence>
          {candies.map((candy, index) => (
            <motion.div
              key={candy.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white border border-[#F0E0D0] rounded-xl p-4 hover:border-[#F0D8C0] transition-colors shadow-sm"
            >
              <div className="flex items-start gap-3">
                <span className="text-xl">{typeEmojis[candy.type]}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] text-[#9B8E84]">{getCandyTypeLabel(candy.type)}</span>
                    <span className="text-[10px] text-[#9B8E84] opacity-50">{formatRelativeDate(candy.openedAt)}</span>
                  </div>
                  <p className="text-sm text-[#4A3728] leading-relaxed">{candy.content}</p>
                </div>
                <button
                  onClick={() => onUncollect(candy.id)}
                  className="text-[#9B8E84] hover:text-[#E8927C] transition-colors p-1 shrink-0"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
