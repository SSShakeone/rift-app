'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Pencil, BarChart3, Candy } from 'lucide-react';

const tabs = [
  { path: '/', label: '记录', icon: Pencil },
  { path: '/insight', label: '洞察', icon: BarChart3 },
  { path: '/candy', label: '糖果', icon: Candy },
];

export default function BottomNav() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#FFF0E5]/95 backdrop-blur-md border-t border-[#F0E0D0]">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto px-4">
        {tabs.map(tab => {
          const isActive = tab.path === '/'
            ? pathname === '/'
            : pathname.startsWith(tab.path);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.path}
              href={tab.path}
              className={`flex flex-col items-center gap-1 px-5 py-2 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-[#F0A58E] scale-105'
                  : 'text-[#9B8E84] hover:text-[#4A3728]'
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 1.5} />
              <span className="text-xs font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
