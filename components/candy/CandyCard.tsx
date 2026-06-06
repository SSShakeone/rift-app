'use client';

import { Candy } from '@/types';
import { getCandyTypeLabel } from '@/lib/candy-pool';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

interface CandyCardProps {
  candy: Candy;
  onCollect: (candy: Candy) => void;
}

const typeEmojis: Record<string, string> = {
  self_acceptance: '🫂',
  boundary: '🛡️',
  insight: '🔍',
  growth: '🌱',
  humor: '😄',
};

const typeColors: Record<string, string> = {
  self_acceptance: 'from-[#3498DB] to-[#2980B9]',
  boundary: 'from-[#E74C3C] to-[#C0392B]',
  insight: 'from-[#9B59B6] to-[#8E44AD]',
  growth: 'from-[#2ECC71] to-[#27AE60]',
  humor: 'from-[#F39C12] to-[#E67E22]',
};

export default function CandyCard({ candy, onCollect }: CandyCardProps) {
  return (
    <div className={`bg-gradient-to-br ${typeColors[candy.type]} rounded-2xl p-6 text-white`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{typeEmojis[candy.type]}</span>
          <span className="text-xs font-medium opacity-80">{getCandyTypeLabel(candy.type)}</span>
        </div>
      </div>

      <p className="text-sm leading-relaxed font-medium mb-6">{candy.content}</p>

      <div className="flex justify-end">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onCollect(candy)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-xs font-medium hover:bg-white/30 transition-colors"
        >
          <Heart size={14} />
          收藏这颗糖
        </motion.button>
      </div>
    </div>
  );
}
