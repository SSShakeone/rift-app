'use client';

import BottomNav from '@/components/layout/BottomNav';
import { RecordsProvider } from '@/hooks/useRecords';
import { CandyProvider } from '@/hooks/useCandy';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <RecordsProvider>
      <CandyProvider>
        <div className="max-w-md mx-auto min-h-screen pb-20">
          {children}
        </div>
        <BottomNav />
      </CandyProvider>
    </RecordsProvider>
  );
}
