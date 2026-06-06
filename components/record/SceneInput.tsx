'use client';

import { User, MapPin } from 'lucide-react';

interface SceneInputProps {
  targetPerson: string;
  targetScene: string;
  onPersonChange: (v: string) => void;
  onSceneChange: (v: string) => void;
}

export default function SceneInput({ targetPerson, targetScene, onPersonChange, onSceneChange }: SceneInputProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-[#9B8E84]">关联人物 / 场景（可选）</label>
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9B8E84]" />
          <input
            type="text"
            value={targetPerson}
            onChange={e => onPersonChange(e.target.value)}
            placeholder="人物"
            className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#F0E0D0] rounded-xl text-sm text-[#4A3728] placeholder-[#9B8E84] focus:outline-none focus:border-[#F0A58E] transition-colors"
          />
        </div>
        <div className="flex-1 relative">
          <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9B8E84]" />
          <input
            type="text"
            value={targetScene}
            onChange={e => onSceneChange(e.target.value)}
            placeholder="场景"
            className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#F0E0D0] rounded-xl text-sm text-[#4A3728] placeholder-[#9B8E84] focus:outline-none focus:border-[#F0A58E] transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
