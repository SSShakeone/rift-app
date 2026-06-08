'use client';

import { useRecords } from '@/hooks/useRecords';
import Header from '@/components/layout/Header';
import RedBlueRatio from '@/components/insight/RedBlueRatio';
import AllergyTop5 from '@/components/insight/AllergyTop5';
import DiscomfortHeatmap from '@/components/insight/DiscomfortHeatmap';
import AIAnalysisCard from '@/components/insight/AIAnalysisCard';

export default function InsightPage() {
  const { state, getRecentRecords } = useRecords();

  if (state.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-[#9B8E84]">加载中...</div>
      </div>
    );
  }

  if (state.records.length === 0) {
    return (
      <>
        <Header title="反观镜" subtitle="看清你内耗的规律" />
        <main className="px-5 py-20 text-center">
          <div className="text-6xl mb-6">📊</div>
          <h2 className="text-base font-bold text-[#4A3728] mb-2">还没有数据可以分析</h2>
          <p className="text-sm text-[#9B8E84] leading-relaxed max-w-xs mx-auto">
            去「记录」页写下你的第一条情绪记录，<br />
            累计数据后，这里会出现：<br />
            内外消耗比、过敏原排行、不适周期热力图。
          </p>
        </main>
      </>
    );
  }

  const recentRecords = getRecentRecords(90);

  return (
    <>
      <Header title="反观镜" subtitle="看清你内耗的规律" />
      <main className="px-5 py-4 space-y-4">
        <RedBlueRatio records={recentRecords} />
        <AllergyTop5 records={recentRecords} />
        <DiscomfortHeatmap records={recentRecords} />
        <AIAnalysisCard records={recentRecords} />
        <div className="h-4" />
      </main>
    </>
  );
}
