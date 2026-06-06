'use client';

import { EmotionRecord } from '@/types';
import { computeRatio, computeTopTriggers, computeAverageIntensity } from '@/lib/utils';
import { Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface AIAnalysisCardProps {
  records: EmotionRecord[];
}

function generateMockAnalysis(records: EmotionRecord[]): string {
  const ratio = computeRatio(records);
  const triggers = computeTopTriggers(records, 3);
  const avgIntensity = computeAverageIntensity(records);

  if (records.length === 0) {
    return '还没有足够的记录来生成分析。开始记录你的情绪吧，累计一定数据后，这里会出现属于你的"破茧分析"。';
  }

  let analysis = `嘿，来看看这段时间的数据。你一共记录了 ${ratio.total} 次情绪事件，`;

  if (ratio.external > ratio.internal) {
    analysis += `其中 ${ratio.external}% 的情绪来自外部事件。你似乎经常因为别人的言行而感到不安——`;
  } else {
    analysis += `其中 ${ratio.internal}% 是对内的自我消耗。你的内心世界比身边的大多数人都更活跃——这也意味着你更容易和自己"打官司"。`;
  }

  if (triggers.length > 0) {
    analysis += `\n\n你的主要情绪触发点是"${triggers[0].name}"`;
    if (triggers.length > 1) {
      analysis += `，其次是"${triggers[1].name}"`;
    }
    analysis += `。这些触发了你 ${triggers[0].count} 次情绪波动。`;
  }

  analysis += `\n\n平均情绪强度为 ${avgIntensity}/10。`;
  if (avgIntensity >= 7) {
    analysis += '这是一个偏高的水平——说明这些事件对你的冲击不小。当你感到自己快要被情绪淹没时，要不要试试先记录，等冷静一点后再回来看看？';
  } else if (avgIntensity >= 5) {
    analysis += '处于中等水平，说明这些事件确实让你不舒服了，但你也有一定的调节能力。记得在记录时给自己一点肯定——每一个觉察的瞬间都在帮助你更好地理解自己。';
  } else {
    analysis += '你保持了一个相对稳定的情绪状态。即使有不舒服，你也能比较快地调整自己。这本身就是一种能力。';
  }

  analysis += '\n\n💡 小提示：当同一个触发标签反复出现时，它可能指向一个更深层的模式——比如某种未被满足的需要，或某种重复的关系剧本。试着在记录时多问一句："这次的感受，我曾经在哪里也体验过？"';

  return analysis;
}

export default function AIAnalysisCard({ records }: AIAnalysisCardProps) {
  const [showAnalysis, setShowAnalysis] = useState(false);
  const analysis = generateMockAnalysis(records);

  return (
    <div className="bg-white border border-[#F0E0D0] rounded-2xl p-5 shadow-sm">
      <h3 className="text-sm font-medium text-[#9B8E84] mb-4 flex items-center gap-2">
        <Sparkles size={16} className="text-[#F0A58E]" />
        AI 破茧分析
        <span className="text-[10px] text-[#9B8E84] opacity-50 ml-auto">示例 · AI接入后升级</span>
      </h3>

      <button
        onClick={() => setShowAnalysis(!showAnalysis)}
        className="w-full text-center py-3 rounded-xl text-sm font-medium transition-all duration-200 bg-gradient-to-r from-[rgba(232,147,124,0.15)] to-[rgba(124,184,212,0.15)] text-[#4A3728] hover:opacity-80"
      >
        {showAnalysis ? '收起' : '展开分析'}
      </button>

      <AnimatePresence>
        {showAnalysis && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-sm text-[#4A3728] leading-relaxed whitespace-pre-line pt-4 border-t border-[#F0E0D0] mt-4">
              {analysis}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
