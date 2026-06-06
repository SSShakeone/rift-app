'use client';

import { EmotionRecord } from '@/types';
import { computeTopTriggers, getTagLabel } from '@/lib/utils';

interface AllergyTop5Props {
  records: EmotionRecord[];
}

export default function AllergyTop5({ records }: AllergyTop5Props) {
  const triggers = computeTopTriggers(records, 5);

  if (triggers.length === 0) {
    return (
      <div className="bg-white border border-[#F0E0D0] rounded-2xl p-5 shadow-sm">
        <h3 className="text-sm font-medium text-[#9B8E84] mb-4">⚠️ 过敏原 Top 5</h3>
        <p className="text-xs text-[#9B8E84] text-center py-4">数据不够，至少需要 1 条记录</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#F0E0D0] rounded-2xl p-5 shadow-sm">
      <h3 className="text-sm font-medium text-[#9B8E84] mb-4">⚠️ 过敏原 Top 5</h3>
      <div className="space-y-2.5">
        {triggers.map((t, i) => {
          const maxCount = triggers[0].count;
          const width = (t.count / maxCount) * 100;
          return (
            <div key={t.name} className="flex items-center gap-3">
              <span className="text-xs font-bold text-[#9B8E84] w-5">{i + 1}</span>
              <div className="flex-1">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#4A3728]">{getTagLabel(t.name)}</span>
                  <span className="text-[#F0A58E] font-medium">{t.count}次</span>
                </div>
                <div className="h-2 rounded-full bg-[#FFF0E5] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${width}%`,
                      backgroundColor: t.direction === 'external' ? '#E8927C' : '#7CB8D4',
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
