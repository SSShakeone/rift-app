'use client';

import { EmotionRecord } from '@/types';
import { computeRatio } from '@/lib/utils';

interface RedBlueRatioProps {
  records: EmotionRecord[];
}

export default function RedBlueRatio({ records }: RedBlueRatioProps) {
  const { external, internal, total } = computeRatio(records);

  if (total === 0) {
    return (
      <div className="bg-white border border-[#F0E0D0] rounded-2xl p-5 shadow-sm">
        <h3 className="text-sm font-medium text-[#9B8E84] mb-4">↗↙ 内外消耗比</h3>
        <p className="text-xs text-[#9B8E84] text-center py-4">还没有数据，记录一些情绪后再来看</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#F0E0D0] rounded-2xl p-5 shadow-sm">
      <h3 className="text-sm font-medium text-[#9B8E84] mb-4">↗↙ 内外消耗比</h3>
      <div className="flex h-8 rounded-full overflow-hidden">
        <div
          className="bg-[#E8927C] flex items-center justify-center text-xs font-bold text-white transition-all duration-700"
          style={{ width: `${external}%` }}
        >
          {external > 10 && `↗ ${external}%`}
        </div>
        <div
          className="bg-[#7CB8D4] flex items-center justify-center text-xs font-bold text-white transition-all duration-700"
          style={{ width: `${internal}%` }}
        >
          {internal > 10 && `↙ ${internal}%`}
        </div>
      </div>
      <div className="flex justify-between mt-2 text-xs text-[#9B8E84]">
        <span>对外 {external}%</span>
        <span>共 {total} 条记录</span>
        <span>对内 {internal}%</span>
      </div>
      <p className="text-xs text-[#9B8E84] mt-3 text-center">
        {external > internal
          ? '你的情绪更多由外部事件触发，边界保护可能是关键。'
          : '你的情绪更多来自内在消耗，自我关怀或许更为重要。'}
      </p>
    </div>
  );
}
