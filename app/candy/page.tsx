'use client';

import { useEffect } from 'react';
import { useRecords } from '@/hooks/useRecords';
import { useCandy } from '@/hooks/useCandy';
import Header from '@/components/layout/Header';
import CandyWrapper from '@/components/candy/CandyWrapper';
import CandyJar from '@/components/candy/CandyJar';

export default function CandyPage() {
  const { getRecentRecords, state: recordsState } = useRecords();
  const { state, generateTodayCandy, openCandy, collectCandy, uncollectCandy } = useCandy();

  useEffect(() => {
    if (recordsState.isLoading) return;
    if (!state.todayCandy) {
      const recent = getRecentRecords(1);
      generateTodayCandy(recent);
    }
  }, [recordsState.isLoading, state.todayCandy, generateTodayCandy, getRecentRecords]);

  if (recordsState.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-[#9B8E84]">加载中...</div>
      </div>
    );
  }

  return (
    <>
      <Header title="拆糖纸" subtitle="剥开包装，解开价值" />
      <main className="px-5 py-4 space-y-5">
        <CandyWrapper
          candy={state.todayCandy}
          isOpening={state.isOpening && state.todayCandy !== null}
          onOpen={openCandy}
          onCollect={collectCandy}
        />
        <div className="border-t border-[#F0E0D0]" />
        <CandyJar candies={state.collectedCandies} onUncollect={uncollectCandy} />
        <div className="h-4" />
      </main>
    </>
  );
}
