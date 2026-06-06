'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Candy } from '@/types';
import CandyCard from './CandyCard';

interface CandyWrapperProps {
  candy: Candy | null;
  isOpening: boolean;
  onOpen: () => void;
  onCollect: (candy: Candy) => void;
}

export default function CandyWrapper({ candy, isOpening, onOpen, onCollect }: CandyWrapperProps) {
  if (!candy) {
    return (
      <div className="bg-white border border-[#F0E0D0] rounded-2xl p-8 text-center shadow-sm">
        <div className="text-5xl mb-4">🍬</div>
        <p className="text-sm text-[#9B8E84]">今天的糖果已经吃完了</p>
        <p className="text-xs text-[#9B8E84] mt-1 opacity-60">明天再来领取新的治愈糖果</p>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {isOpening ? (
        <motion.div
          key="wrapped"
          initial={{ scale: 0.9, rotate: -3 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 1.1, opacity: 0, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <button
            onClick={onOpen}
            className="w-full bg-gradient-to-br from-[#F0A58E] to-[#7CB8D4] rounded-2xl p-8 text-center cursor-pointer hover:shadow-2xl hover:shadow-[rgba(240,165,142,0.3)] transition-all duration-300"
          >
            <motion.div
              animate={{ rotate: [0, -5, 5, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="text-6xl mb-4"
            >
              🍬
            </motion.div>
            <p className="text-white font-bold text-lg">拆开今天的糖纸</p>
            <p className="text-white/60 text-xs mt-2">点我剥开看看今天的治愈糖果</p>
            <div className="mt-4 flex justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse" />
            </div>
          </button>
        </motion.div>
      ) : (
        <motion.div
          key="unwrapped"
          initial={{ scale: 0.5, opacity: 0, rotate: 10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <CandyCard candy={candy} onCollect={onCollect} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
