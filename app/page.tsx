'use client';

import { useState } from 'react';
import { Direction } from '@/types';
import { useRecords } from '@/hooks/useRecords';
import { generateId } from '@/lib/utils';
import Header from '@/components/layout/Header';
import DirectionSlider from '@/components/record/DirectionSlider';
import TagSelector from '@/components/record/TagSelector';
import IntensitySlider from '@/components/record/IntensitySlider';
import SceneInput from '@/components/record/SceneInput';
import FreeTextField from '@/components/record/FreeTextField';
import DeepQuestions from '@/components/record/DeepQuestions';
import RecordList from '@/components/record/RecordList';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

export default function HomePage() {
  const { state, addRecord, deleteRecord, getTodayRecords } = useRecords();
  const [direction, setDirection] = useState<Direction>('external');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedSubTags, setSelectedSubTags] = useState<string[]>([]);
  const [intensity, setIntensity] = useState(5);
  const [targetPerson, setTargetPerson] = useState('');
  const [targetScene, setTargetScene] = useState('');
  const [freeText, setFreeText] = useState('');
  const [deepAnswers, setDeepAnswers] = useState<{
    stingSentence?: string;
    worstPoint?: string;
    desiredTreatment?: string;
  }>({});
  const [saved, setSaved] = useState(false);

  const todayRecords = getTodayRecords();

  const canSave = selectedTags.length > 0;

  const handleSave = () => {
    if (!canSave) return;

    const record = {
      id: generateId(),
      direction,
      tags: selectedTags,
      subTags: selectedSubTags.length > 0 ? selectedSubTags : undefined,
      intensity,
      targetPerson: targetPerson || undefined,
      targetScene: targetScene || undefined,
      freeText: freeText || undefined,
      deepAnswers: deepAnswers.stingSentence || deepAnswers.worstPoint || deepAnswers.desiredTreatment
        ? deepAnswers : undefined,
      createdAt: new Date().toISOString(),
    };

    addRecord(record);
    resetForm();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const resetForm = () => {
    setSelectedTags([]);
    setSelectedSubTags([]);
    setIntensity(5);
    setTargetPerson('');
    setTargetScene('');
    setFreeText('');
    setDeepAnswers({});
  };

  const handleTagsChange = (tags: string[], subTags: string[]) => {
    setSelectedTags(tags);
    setSelectedSubTags(subTags);
  };

  if (state.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-[#9B8E84]">加载中...</div>
      </div>
    );
  }

  return (
    <>
      <Header title="🌋 裂缝记录舱" subtitle="记录每一次情绪摩擦" />
      <main className="px-5 py-4 space-y-6">
        <section className="space-y-5">
          <DirectionSlider value={direction} onChange={setDirection} />
          <TagSelector
            direction={direction}
            selectedTags={selectedTags}
            selectedSubTags={selectedSubTags}
            onTagsChange={handleTagsChange}
          />
          <IntensitySlider value={intensity} onChange={setIntensity} />
          <SceneInput
            targetPerson={targetPerson}
            targetScene={targetScene}
            onPersonChange={setTargetPerson}
            onSceneChange={setTargetScene}
          />
          <FreeTextField value={freeText} onChange={setFreeText} />
          <DeepQuestions values={deepAnswers} onChange={setDeepAnswers} />

          <motion.button
            whileTap={canSave ? { scale: 0.97 } : {}}
            onClick={handleSave}
            disabled={!canSave}
            className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 ${
              canSave
                ? 'bg-[#F0A58E] text-white shadow-lg shadow-[rgba(240,165,142,0.3)] hover:bg-[#E8927C]'
                : 'bg-white text-[#9B8E84] cursor-not-allowed border border-[#F0E0D0]'
            }`}
          >
            <Send size={16} />
            保存记录
          </motion.button>

          {!canSave && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-xs text-[#F0A58E] font-medium flex items-center justify-center gap-1"
            >
              <span>👆</span>
              <span>请至少选择一个触发标签才能保存</span>
            </motion.p>
          )}

          {saved && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center text-sm text-[#7CB8D4] font-medium"
            >
              ✓ 记录已保存
            </motion.p>
          )}
        </section>

        {state.records.length === 0 && !state.isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-[#F0E0D0] rounded-2xl p-6 text-center shadow-sm"
          >
            <div className="text-4xl mb-3">🌋</div>
            <h3 className="text-sm font-bold text-[#4A3728] mb-1">开始你的第一条记录</h3>
            <p className="text-xs text-[#9B8E84] leading-relaxed">
              每次情绪摩擦都是一次自我了解的机会。<br />
              先选择情绪方向，然后挑选触发标签，写下你的感受——<br />
              然后去「洞察」页看看你内耗的规律。
            </p>
          </motion.div>
        )}

        <div className="border-t border-[#F0E0D0]" />

        <section>
          <RecordList records={todayRecords} onDelete={deleteRecord} />
        </section>

        <div className="h-4" />
      </main>
    </>
  );
}
