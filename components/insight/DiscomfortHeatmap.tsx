'use client';

import { EmotionRecord } from '@/types';
import { useMemo } from 'react';

interface DiscomfortHeatmapProps {
  records: EmotionRecord[];
}

export default function DiscomfortHeatmap({ records }: DiscomfortHeatmapProps) {
  const heatmapData = useMemo(() => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    const weeks = 12;
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - weeks * 7 + 1);
    startDate.setHours(0, 0, 0, 0);

    const grid: { date: Date; count: number; intensity: number }[] = [];

    for (let i = 0; i < weeks * 7; i++) {
      const d = new Date(startDate);
      d.setDate(d.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      const dayRecords = records.filter(r => r.createdAt.startsWith(dateStr));
      const count = dayRecords.length;
      const avgIntensity = count > 0
        ? dayRecords.reduce((s, r) => s + r.intensity, 0) / count
        : 0;
      grid.push({ date: d, count, intensity: avgIntensity });
    }
    return grid;
  }, [records]);

  const getColor = (count: number, intensity: number) => {
    if (count === 0) return 'bg-[#FFF0E5]';
    const level = Math.min(count, 4);
    if (intensity >= 7) {
      return ['bg-[rgba(232,147,124,0.2)]', 'bg-[rgba(232,147,124,0.35)]', 'bg-[rgba(232,147,124,0.55)]', 'bg-[rgba(232,147,124,0.75)]'][level - 1];
    }
    return ['bg-[rgba(124,184,212,0.2)]', 'bg-[rgba(124,184,212,0.35)]', 'bg-[rgba(124,184,212,0.55)]', 'bg-[rgba(124,184,212,0.75)]'][level - 1];
  };

  const weeks = [];
  for (let w = 0; w < 12; w++) {
    weeks.push(heatmapData.slice(w * 7, (w + 1) * 7));
  }

  const weekdays = ['一', '二', '三', '四', '五', '六', '日'];

  return (
    <div className="bg-white border border-[#F0E0D0] rounded-2xl p-5 shadow-sm">
      <h3 className="text-sm font-medium text-[#9B8E84] mb-4">📅 不适周期热力图</h3>
      <div className="overflow-x-auto">
        <div className="inline-flex gap-1">
          <div className="flex flex-col gap-1 mr-1">
            {weekdays.map(d => (
              <div key={d} className="h-3.5 w-5 flex items-center">
                <span className="text-[8px] text-[#9B8E84]">{d}</span>
              </div>
            ))}
          </div>
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.map((day, di) => (
                <div
                  key={di}
                  className={`h-3.5 w-3.5 rounded-sm ${getColor(day.count, day.intensity)}`}
                  title={`${day.date.toISOString().split('T')[0]}: ${day.count}条记录, 平均强度${day.intensity.toFixed(1)}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3 mt-3 text-[10px] text-[#9B8E84]">
        <span>轻</span>
        <div className="flex gap-0.5">
          <div className="w-3 h-3 rounded-sm bg-[#FFF0E5]" />
          <div className="w-3 h-3 rounded-sm bg-[rgba(124,184,212,0.35)]" />
          <div className="w-3 h-3 rounded-sm bg-[rgba(124,184,212,0.55)]" />
          <div className="w-3 h-3 rounded-sm bg-[rgba(232,147,124,0.55)]" />
          <div className="w-3 h-3 rounded-sm bg-[rgba(232,147,124,0.75)]" />
        </div>
        <span>重</span>
      </div>
    </div>
  );
}
