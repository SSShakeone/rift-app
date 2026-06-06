'use client';

import { useState, useEffect } from 'react';
import { Direction } from '@/types';
import { useRecords } from '@/hooks/useRecords';
import { generateMockRecords } from '@/lib/mock-data';
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

  useEffect(() => {
    if (state.isLoading) return;
    if (state.records.length === 0) {
      const mock = generateMockRecords(30);
      mock.forEach(r => addRecord(r));
    }
  }, [state.isLoading]);

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
            whileTap={{ scale: 0.97 }}
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

        <div className="border-t border-[#F0E0D0]" />

        <section>
          <RecordList records={todayRecords} onDelete={deleteRecord} />
        </section>

        <div className="h-4" />
      </main>
    </>
  );
}
