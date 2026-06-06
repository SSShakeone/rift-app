'use client';

interface FreeTextFieldProps {
  value: string;
  onChange: (v: string) => void;
}

export default function FreeTextField({ value, onChange }: FreeTextFieldProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-[#9B8E84]">自由记录（可选）</label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="写下你想说的任何话..."
        rows={3}
        className="w-full px-4 py-3 bg-white border border-[#F0E0D0] rounded-xl text-sm text-[#4A3728] placeholder-[#9B8E84] focus:outline-none focus:border-[#F0A58E] transition-colors resize-none"
      />
    </div>
  );
}
