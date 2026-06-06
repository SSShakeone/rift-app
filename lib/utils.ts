import { EmotionRecord } from '@/types';

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function formatTime(dateStr: string): string {
  const d = new Date(dateStr);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export function formatRelativeDate(dateStr: string): string {
  const d = new Date(dateStr);
  const today = new Date();
  const diff = Math.floor((today.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return '今天';
  if (diff === 1) return '昨天';
  if (diff < 7) return `${diff}天前`;
  return formatDate(dateStr);
}

export function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

export function getWeekStart(dateStr: string): Date {
  const d = new Date(dateStr);
  const day = d.getDay();
  const diff = day === 0 ? 6 : day - 1;
  d.setDate(d.getDate() - diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function getWeekLabel(dateStr: string): string {
  const d = new Date(dateStr);
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  return weekdays[d.getDay()];
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
}

export function computeRatio(records: EmotionRecord[]): { external: number; internal: number; total: number } {
  const total = records.length;
  if (total === 0) return { external: 0, internal: 0, total: 0 };
  const external = records.filter(r => r.direction === 'external').length;
  const internal = records.filter(r => r.direction === 'internal').length;
  return {
    external: Math.round((external / total) * 100),
    internal: Math.round((internal / total) * 100),
    total,
  };
}

export function computeTopTriggers(records: EmotionRecord[], limit = 5): { name: string; count: number; direction: string }[] {
  const tagCount: Record<string, { count: number; direction: string }> = {};
  for (const r of records) {
    for (const tag of r.tags) {
      if (!tagCount[tag]) tagCount[tag] = { count: 0, direction: r.direction };
      tagCount[tag].count++;
    }
  }
  return Object.entries(tagCount)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, limit)
    .map(([name, { count, direction }]) => ({ name, count, direction }));
}

export function computeAverageIntensity(records: EmotionRecord[]): number {
  if (records.length === 0) return 0;
  const sum = records.reduce((acc, r) => acc + r.intensity, 0);
  return Math.round((sum / records.length) * 10) / 10;
}

export const TAG_LABELS: Record<string, string> = {
  et1: '界限被冒犯',
  et2: '感到不公平',
  et3: '被否定/批评',
  et4: '被控制/被入侵',
  it1: '自我怀疑',
  it2: '后悔/自责',
  it3: '孤独感',
  it4: '完美主义',
};

export function getTagLabel(tagId: string): string {
  return TAG_LABELS[tagId] || tagId;
}

export function getDirectionLabel(direction: string): string {
  return direction === 'external' ? '↗ 对外' : '↙ 对内';
}
