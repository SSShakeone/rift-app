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
