import type { Metadata } from 'next';
import './globals.css';
import ClientLayout from './ClientLayout';

export const metadata: Metadata = {
  title: '裂缝 — 用记录拆解你的内心官司',
  description: '记录每一次情绪摩擦，看清内耗的规律，拆开属于你的治愈糖果。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-[#FFF8F0] text-[#4A3728]">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
