'use client';

import { Direction } from '@/types';

interface DirectionSliderProps {
  value: Direction;
  onChange: (d: Direction) => void;
}

export default function DirectionSlider({ value, onChange }: DirectionSliderProps) {
  const isExternal = value === 'external';

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-[#9B8E84]">情绪方向</label>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => onChange('external')}
          className={`flex-1 flex items-center justify-center gap-1 py-4 px-4 rounded-2xl text-base font-bold border-2 transition-all duration-300 ${
            isExternal
              ? 'bg-[rgba(232,147,124,0.12)] border-[#E8927C] text-[#E8927C] shadow-lg shadow-[rgba(232,147,124,0.15)]'
              : 'bg-white border-transparent text-[#9B8E84] hover:border-[#E8927C]/30'
          }`}
        >
          <span>↗ 对外</span>
        </button>
        <button
          type="button"
          onClick={() => onChange('internal')}
          className={`flex-1 flex items-center justify-center gap-1 py-4 px-4 rounded-2xl text-base font-bold border-2 transition-all duration-300 ${
            !isExternal
              ? 'bg-[rgba(124,184,212,0.12)] border-[#7CB8D4] text-[#7CB8D4] shadow-lg shadow-[rgba(124,184,212,0.15)]'
              : 'bg-white border-transparent text-[#9B8E84] hover:border-[#7CB8D4]/30'
          }`}
        >
          <span>↙ 对内</span>
        </button>
      </div>
      <p className="text-xs text-[#9B8E84] px-1">
        {isExternal ? '对外 — 情绪由他人/外部事件引发' : '对内 — 情绪来自自我内耗/自我对话'}
      </p>
    </div>
  );
}
