import { supabase } from './supabase';
import { getDeviceId } from './utils';
import { EmotionRecord, Candy, RecordRow, CandyRow } from '@/types';

function recordToRow(record: EmotionRecord, deviceId: string): RecordRow {
  return {
    id: record.id,
    device_id: deviceId,
    direction: record.direction,
    tags: record.tags,
    sub_tags: record.subTags ?? null,
    intensity: record.intensity,
    target_person: record.targetPerson ?? null,
    target_scene: record.targetScene ?? null,
    free_text: record.freeText ?? null,
    sting_sentence: record.deepAnswers?.stingSentence ?? null,
    worst_point: record.deepAnswers?.worstPoint ?? null,
    desired_treatment: record.deepAnswers?.desiredTreatment ?? null,
    created_at: record.createdAt,
  };
}

function rowToRecord(row: RecordRow): EmotionRecord {
  return {
    id: row.id,
    direction: row.direction,
    tags: row.tags,
    subTags: row.sub_tags ?? undefined,
    intensity: row.intensity,
    targetPerson: row.target_person ?? undefined,
    targetScene: row.target_scene ?? undefined,
    freeText: row.free_text ?? undefined,
    deepAnswers:
      row.sting_sentence || row.worst_point || row.desired_treatment
        ? {
            stingSentence: row.sting_sentence ?? undefined,
            worstPoint: row.worst_point ?? undefined,
            desiredTreatment: row.desired_treatment ?? undefined,
          }
        : undefined,
    createdAt: row.created_at,
  };
}

function candyToRow(candy: Candy, deviceId: string): CandyRow {
  return {
    id: candy.id,
    device_id: deviceId,
    type: candy.type,
    content: candy.content,
    opened_at: candy.openedAt,
    is_collected: candy.isCollected,
    related_record_ids: candy.relatedRecordIds ?? null,
  };
}

function rowToCandy(row: CandyRow): Candy {
  return {
    id: row.id,
    type: row.type,
    content: row.content,
    openedAt: row.opened_at,
    isCollected: row.is_collected,
    relatedRecordIds: row.related_record_ids ?? undefined,
  };
}

export async function syncRecordToRemote(record: EmotionRecord): Promise<void> {
  const deviceId = getDeviceId();
  if (!deviceId) return;
  const row = recordToRow(record, deviceId);
  const { error } = await supabase.from('records').upsert(row, { onConflict: 'id' });
  if (error) console.warn('Supabase sync record failed:', error);
}

export async function deleteRecordFromRemote(id: string): Promise<void> {
  const deviceId = getDeviceId();
  if (!deviceId) return;
  const { error } = await supabase
    .from('records')
    .delete()
    .eq('id', id)
    .eq('device_id', deviceId);
  if (error) console.warn('Supabase delete record failed:', error);
}

export async function fetchRemoteRecords(): Promise<EmotionRecord[]> {
  const deviceId = getDeviceId();
  if (!deviceId) return [];
  const { data, error } = await supabase
    .from('records')
    .select('*')
    .eq('device_id', deviceId)
    .order('created_at', { ascending: false });
  if (error) {
    console.warn('Supabase fetch records failed:', error);
    return [];
  }
  return (data as RecordRow[]).map(rowToRecord);
}

export async function syncCandyToRemote(candy: Candy): Promise<void> {
  const deviceId = getDeviceId();
  if (!deviceId) return;
  const row = candyToRow(candy, deviceId);
  const { error } = await supabase.from('candies').upsert(row, { onConflict: 'id' });
  if (error) console.warn('Supabase sync candy failed:', error);
}

export async function deleteCandyFromRemote(id: string): Promise<void> {
  const deviceId = getDeviceId();
  if (!deviceId) return;
  const { error } = await supabase
    .from('candies')
    .delete()
    .eq('id', id)
    .eq('device_id', deviceId);
  if (error) console.warn('Supabase delete candy failed:', error);
}

export async function fetchRemoteCandies(): Promise<{
  today: Candy | null;
  collected: Candy[];
}> {
  const deviceId = getDeviceId();
  if (!deviceId) return { today: null, collected: [] };
  const { data, error } = await supabase
    .from('candies')
    .select('*')
    .eq('device_id', deviceId)
    .order('opened_at', { ascending: false });
  if (error) {
    console.warn('Supabase fetch candies failed:', error);
    return { today: null, collected: [] };
  }
  const rows = data as CandyRow[];
  const today = new Date().toISOString().split('T')[0];
  const todayCandy = rows.find((r) => r.opened_at === today && !r.is_collected);
  const collected = rows.filter((r) => r.is_collected).map(rowToCandy);
  return {
    today: todayCandy ? rowToCandy(todayCandy) : null,
    collected,
  };
}
