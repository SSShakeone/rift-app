export type Direction = 'external' | 'internal';

export interface Tag {
  id: string;
  label: string;
  subTags?: string[];
}

export interface EmotionRecord {
  id: string;
  direction: Direction;
  tags: string[];
  subTags?: string[];
  intensity: number;
  targetPerson?: string;
  targetScene?: string;
  freeText?: string;
  deepAnswers?: {
    stingSentence?: string;
    worstPoint?: string;
    desiredTreatment?: string;
  };
  createdAt: string;
}

export interface AIReport {
  id: string;
  type: 'weekly' | 'biweekly';
  summary: string;
  redBlueRatio: { external: number; internal: number };
  topTriggers: { name: string; count: number }[];
  keywordAdvice: string;
  createdAt: string;
}

export interface Candy {
  id: string;
  type: CandyType;
  content: string;
  openedAt: string;
  isCollected: boolean;
  relatedRecordIds?: string[];
}

export type CandyType = 'self_acceptance' | 'boundary' | 'insight' | 'growth' | 'humor';

export interface RecordState {
  records: EmotionRecord[];
  isLoading: boolean;
}

export type RecordAction =
  | { type: 'ADD_RECORD'; payload: EmotionRecord }
  | { type: 'DELETE_RECORD'; payload: string }
  | { type: 'LOAD_RECORDS'; payload: EmotionRecord[] };

export interface CandyState {
  todayCandy: Candy | null;
  collectedCandies: Candy[];
  isOpening: boolean;
}

export type CandyAction =
  | { type: 'SET_TODAY_CANDY'; payload: Candy }
  | { type: 'OPEN_CANDY' }
  | { type: 'COLLECT_CANDY'; payload: Candy }
  | { type: 'UNCOLLECT_CANDY'; payload: string }
  | { type: 'LOAD_CANDIES'; payload: { today: Candy | null; collected: Candy[] } };
