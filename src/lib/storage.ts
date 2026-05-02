// src/lib/storage.ts
import type { UserMark } from '@/types';

const STORAGE_KEY = 'film-marks';

function isLocalStorageAvailable(): boolean {
  try {
    const key = '__storage_test__';
    localStorage.setItem(key, key);
    localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

export function loadMarks(): UserMark[] {
  if (!isLocalStorageAvailable()) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as UserMark[];
  } catch {
    return [];
  }
}

export function saveMarks(marks: UserMark[]): void {
  if (!isLocalStorageAvailable()) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(marks));
  } catch {
    // 静默降级
  }
}
