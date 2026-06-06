'use client';

import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface DeepQuestionsProps {
  values: {
    stingSentence?: string;
    worstPoint?: string;
    desiredTreatment?: string;
  };
  onChange: (v: DeepQuestionsProps['values']) => void;
}

export default function DeepQuestions({ values, onChange }: DeepQuestionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white border border-[#F0E0D0] rounded-xl text-sm text-[#9B8E84] hover:border-[#F0A58E]/30 transition-colors"
      >
        <span>💬 深度追问（可选）</span>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={16} />
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-3 overflow-hidden"
          >
            <div>
              <label className="text-xs text-[#9B8E84] mb-1.5 block">当时最刺痛你的那句话是什么？</label>
              <input
                type="text"
                value={values.stingSentence || ''}
                onChange={e => onChange({ ...values, stingSentence: e.target.value })}
                placeholder="写下那一刻最直击内心的话..."
                className="w-full px-4 py-2.5 bg-[#FFF8F0] border border-[#F0E0D0] rounded-xl text-sm text-[#4A3728] placeholder-[#9B8E84] focus:outline-none focus:border-[#F0A58E] transition-colors"
              />
            </div>
            <div>
              <label className="text-xs text-[#9B8E84] mb-1.5 block">那个瞬间里，最让你受不了的是什么？</label>
              <input
                type="text"
                value={values.worstPoint || ''}
                onChange={e => onChange({ ...values, worstPoint: e.target.value })}
                placeholder="比如：被当众否定、被忽视..."
                className="w-full px-4 py-2.5 bg-[#FFF8F0] border border-[#F0E0D0] rounded-xl text-sm text-[#4A3728] placeholder-[#9B8E84] focus:outline-none focus:border-[#F0A58E] transition-colors"
              />
            </div>
            <div>
              <label className="text-xs text-[#9B8E84] mb-1.5 block">你希望那一刻被怎样对待？</label>
              <input
                type="text"
                value={values.desiredTreatment || ''}
                onChange={e => onChange({ ...values, desiredTreatment: e.target.value })}
                placeholder={'比如：有人能说一句"不是你的错"...'}
                className="w-full px-4 py-2.5 bg-[#FFF8F0] border border-[#F0E0D0] rounded-xl text-sm text-[#4A3728] placeholder-[#9B8E84] focus:outline-none focus:border-[#F0A58E] transition-colors"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
