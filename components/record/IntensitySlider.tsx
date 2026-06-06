'use client';

interface IntensitySliderProps {
  value: number;
  onChange: (v: number) => void;
}

const labels = ['轻微', '不算太糟', '有点烦躁', '明显不适', '挺难受的', '很不好了', '非常痛苦', '快要溢出来', '压不住了', '彻底爆发'];

export default function IntensitySlider({ value, onChange }: IntensitySliderProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-[#9B8E84]">情绪强度</label>
        <span className="text-2xl font-bold text-[#F0A58E]">{value}</span>
      </div>
      <input
        type="range"
        min="1"
        max="10"
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer accent-[#F0A58E]"
        style={{
          background: `linear-gradient(to right, #7CB8D4, #F0A58E ${(value - 1) * 11.1}%, #F0E0D0 ${(value - 1) * 11.1}%)`,
        }}
      />
      <div className="flex justify-between">
        <span className="text-[10px] text-[#9B8E84]">1</span>
        <span className="text-[10px] text-[#9B8E84]">10</span>
      </div>
      <p className="text-xs text-[#9B8E84] text-center">{labels[value - 1]}</p>
    </div>
  );
}
