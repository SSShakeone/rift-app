'use client';

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { EmotionRecord, RecordState, RecordAction } from '@/types';
import { getToday } from '@/lib/utils';

const STORAGE_KEY = 'rift-records';

function recordReducer(state: RecordState, action: RecordAction): RecordState {
  switch (action.type) {
    case 'ADD_RECORD':
      return { ...state, records: [action.payload, ...state.records] };
    case 'DELETE_RECORD':
      return { ...state, records: state.records.filter(r => r.id !== action.payload) };
    case 'LOAD_RECORDS':
      return { ...state, records: action.payload, isLoading: false };
    default:
      return state;
  }
}

interface RecordsContextValue {
  state: RecordState;
  addRecord: (record: EmotionRecord) => void;
  deleteRecord: (id: string) => void;
  getTodayRecords: () => EmotionRecord[];
  getRecentRecords: (days: number) => EmotionRecord[];
  getAllRecords: () => EmotionRecord[];
}

const RecordsContext = createContext<RecordsContextValue | null>(null);

export function RecordsProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(recordReducer, {
    records: [],
    isLoading: true,
  });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        dispatch({ type: 'LOAD_RECORDS', payload: parsed });
      } catch {
        dispatch({ type: 'LOAD_RECORDS', payload: [] });
      }
    } else {
      dispatch({ type: 'LOAD_RECORDS', payload: [] });
    }
  }, []);

  useEffect(() => {
    if (!state.isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.records));
    }
  }, [state.records, state.isLoading]);

  const addRecord = useCallback((record: EmotionRecord) => {
    dispatch({ type: 'ADD_RECORD', payload: record });
  }, []);

  const deleteRecord = useCallback((id: string) => {
    dispatch({ type: 'DELETE_RECORD', payload: id });
  }, []);

  const getTodayRecords = useCallback(() => {
    const today = getToday();
    return state.records.filter(r => r.createdAt.startsWith(today));
  }, [state.records]);

  const getRecentRecords = useCallback((days: number) => {
    const since = new Date();
    since.setDate(since.getDate() - days);
    const sinceStr = since.toISOString().split('T')[0];
    return state.records.filter(r => r.createdAt >= sinceStr);
  }, [state.records]);

  const getAllRecords = useCallback(() => {
    return state.records;
  }, [state.records]);

  return (
    <RecordsContext.Provider value={{ state, addRecord, deleteRecord, getTodayRecords, getRecentRecords, getAllRecords }}>
      {children}
    </RecordsContext.Provider>
  );
}

export function useRecords() {
  const ctx = useContext(RecordsContext);
  if (!ctx) throw new Error('useRecords must be used within RecordsProvider');
  return ctx;
}
