'use client';

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { Candy, CandyState, CandyAction, CandyType } from '@/types';
import { getCandyForDirection } from '@/lib/candy-pool';
import { getToday, generateId } from '@/lib/utils';
import { EmotionRecord } from '@/types';
import {
  syncCandyToRemote,
  deleteCandyFromRemote,
  fetchRemoteCandies,
} from '@/lib/sync-service';

const STORAGE_KEY = 'rift-candies';

function candyReducer(state: CandyState, action: CandyAction): CandyState {
  switch (action.type) {
    case 'SET_TODAY_CANDY':
      return { ...state, todayCandy: action.payload, isOpening: true };
    case 'OPEN_CANDY':
      return { ...state, isOpening: false };
    case 'COLLECT_CANDY': {
      const exists = state.collectedCandies.find(c => c.id === action.payload.id);
      if (exists) return state;
      return {
        ...state,
        collectedCandies: [action.payload, ...state.collectedCandies],
        todayCandy: null,
      };
    }
    case 'UNCOLLECT_CANDY':
      return {
        ...state,
        collectedCandies: state.collectedCandies.filter(c => c.id !== action.payload),
      };
    case 'LOAD_CANDIES':
      return {
        ...state,
        todayCandy: action.payload.today,
        collectedCandies: action.payload.collected,
      };
    default:
      return state;
  }
}

interface CandyContextValue {
  state: CandyState;
  generateTodayCandy: (records: EmotionRecord[]) => void;
  openCandy: () => void;
  collectCandy: (candy: Candy) => void;
  uncollectCandy: (id: string) => void;
}

const CandyContext = createContext<CandyContextValue | null>(null);

export function CandyProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(candyReducer, {
    todayCandy: null,
    collectedCandies: [],
    isOpening: false,
  });

  useEffect(() => {
    async function loadCandies() {
      const stored = localStorage.getItem(STORAGE_KEY);
      let localToday: Candy | null = null;
      let localCollected: Candy[] = [];
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          localToday = parsed.today;
          localCollected = parsed.collected;
        } catch { /* ignore */ }
      }

      try {
        const remote = await fetchRemoteCandies();
        const today = remote.today ?? localToday;
        const collectedMap = new Map<string, Candy>();
        for (const c of localCollected) collectedMap.set(c.id, c);
        for (const c of remote.collected) collectedMap.set(c.id, c);
        const collected = Array.from(collectedMap.values());

        dispatch({ type: 'LOAD_CANDIES', payload: { today, collected } });
      } catch {
        dispatch({ type: 'LOAD_CANDIES', payload: { today: localToday, collected: localCollected } });
      }
    }
    loadCandies();
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      today: state.todayCandy,
      collected: state.collectedCandies,
    }));
  }, [state.todayCandy, state.collectedCandies]);

  const generateTodayCandy = useCallback((records: EmotionRecord[]) => {
    const today = getToday();
    const todayRecords = records.filter(r => r.createdAt.startsWith(today));

    // Determine direction from today's records
    let direction: 'external' | 'internal' = 'external';
    if (todayRecords.length > 0) {
      const externalCount = todayRecords.filter(r => r.direction === 'external').length;
      direction = externalCount >= todayRecords.length / 2 ? 'external' : 'internal';
    } else {
      direction = Math.random() < 0.5 ? 'external' : 'internal';
    }

    const entry = getCandyForDirection(direction);
    const candy: Candy = {
      id: generateId(),
      type: entry.type,
      content: entry.content,
      openedAt: today,
      isCollected: false,
      relatedRecordIds: todayRecords.map(r => r.id),
    };

    dispatch({ type: 'SET_TODAY_CANDY', payload: candy });
    syncCandyToRemote(candy);
  }, []);

  const openCandy = useCallback(() => {
    dispatch({ type: 'OPEN_CANDY' });
  }, []);

  const collectCandy = useCallback((candy: Candy) => {
    const collected = { ...candy, isCollected: true };
    dispatch({ type: 'COLLECT_CANDY', payload: collected });
    syncCandyToRemote(collected);
  }, []);

  const uncollectCandy = useCallback((id: string) => {
    dispatch({ type: 'UNCOLLECT_CANDY', payload: id });
    deleteCandyFromRemote(id);
  }, []);

  return (
    <CandyContext.Provider value={{ state, generateTodayCandy, openCandy, collectCandy, uncollectCandy }}>
      {children}
    </CandyContext.Provider>
  );
}

export function useCandy() {
  const ctx = useContext(CandyContext);
  if (!ctx) throw new Error('useCandy must be used within CandyProvider');
  return ctx;
}
