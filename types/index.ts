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

export interface RecordRow {
  id: string;
  device_id: string;
  direction: Direction;
  tags: string[];
  sub_tags: string[] | null;
  intensity: number;
  target_person: string | null;
  target_scene: string | null;
  free_text: string | null;
  sting_sentence: string | null;
  worst_point: string | null;
  desired_treatment: string | null;
  created_at: string;
}

export interface CandyRow {
  id: string;
  device_id: string;
  type: CandyType;
  content: string;
  opened_at: string;
  is_collected: boolean;
  related_record_ids: string[] | null;
}

export type CandyAction =
  | { type: 'SET_TODAY_CANDY'; payload: Candy }
  | { type: 'OPEN_CANDY' }
  | { type: 'COLLECT_CANDY'; payload: Candy }
  | { type: 'UNCOLLECT_CANDY'; payload: string }
  | { type: 'LOAD_CANDIES'; payload: { today: Candy | null; collected: Candy[] } };
