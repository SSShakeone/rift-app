'use client';

import { Direction } from '@/types';
import { getTagsByDirection } from '@/lib/mock-data';

interface TagSelectorProps {
  direction: Direction;
  selectedTags: string[];
  selectedSubTags: string[];
  onTagsChange: (tags: string[], subTags: string[]) => void;
}

export default function TagSelector({ direction, selectedTags, selectedSubTags, onTagsChange }: TagSelectorProps) {
  const tags = getTagsByDirection(direction);

  const toggleTag = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      onTagsChange(
        selectedTags.filter(t => t !== tagId),
        selectedSubTags.filter(st => !tags.find(t => t.id === tagId)?.subTags?.includes(st))
      );
    } else {
      onTagsChange([...selectedTags, tagId], selectedSubTags);
    }
  };

  const toggleSubTag = (subTag: string) => {
    if (selectedSubTags.includes(subTag)) {
      onTagsChange(selectedTags, selectedSubTags.filter(s => s !== subTag));
    } else {
      onTagsChange(selectedTags, [...selectedSubTags, subTag]);
    }
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-[#9B8E84]">触发标签</label>
      <div className="space-y-2">
        {tags.map(tag => {
          const isSelected = selectedTags.includes(tag.id);
          const color = direction === 'external' ? '#E8927C' : '#7CB8D4';
          const bgColor = direction === 'external'
            ? 'rgba(232,147,124,0.1)'
            : 'rgba(124,184,212,0.1)';
          return (
            <div key={tag.id}>
              <button
                type="button"
                onClick={() => toggleTag(tag.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium border transition-all duration-200 ${
                  isSelected
                    ? 'text-[#4A3728]'
                    : 'bg-white border-transparent text-[#9B8E84] hover:border-[#F0E0D0]'
                }`}
                style={isSelected ? { borderColor: color, backgroundColor: bgColor } : {}}
              >
                {tag.label}
              </button>
              {isSelected && tag.subTags && (
                <div className="flex flex-wrap gap-2 mt-2 pl-3">
                  {tag.subTags.map(sub => {
                    const subSelected = selectedSubTags.includes(sub);
                    return (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => toggleSubTag(sub)}
                        className={`px-3 py-1.5 rounded-full text-xs transition-all duration-200 ${
                          subSelected
                            ? 'bg-[#F0A58E] text-white'
                            : 'bg-white text-[#9B8E84] hover:text-[#4A3728] border border-[#F0E0D0]'
                        }`}
                      >
                        {sub}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
