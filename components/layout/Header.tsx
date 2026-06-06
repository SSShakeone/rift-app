'use client';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#FFF8F0]/90 backdrop-blur-md border-b border-[#F0E0D0]">
      <div className="max-w-md mx-auto px-6 py-4">
        <h1 className="text-lg font-bold text-[#4A3728]">{title}</h1>
        {subtitle && <p className="text-xs text-[#9B8E84] mt-1">{subtitle}</p>}
      </div>
    </header>
  );
}
