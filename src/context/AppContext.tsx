// src/context/AppContext.tsx
'use client';

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { UserMark, MarkStatus, ViewType } from '@/types';
import { loadMarks, saveMarks } from '@/lib/storage';

interface AppState {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  marks: UserMark[];
  toggleMark: (movieId: string, status: MarkStatus) => void;
  getMarkStatus: (movieId: string) => MarkStatus | null;
  getMarkedMovies: (status: MarkStatus) => string[];
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeView, setActiveView] = useState<ViewType>('home');
  const [marks, setMarks] = useState<UserMark[]>([]);

  // 初始化时从 localStorage 加载
  useEffect(() => {
    setMarks(loadMarks());
  }, []);

  // 标记变更时同步到 localStorage
  useEffect(() => {
    saveMarks(marks);
  }, [marks]);

  const toggleMark = useCallback((movieId: string, status: MarkStatus) => {
    setMarks(prev => {
      const existing = prev.find(m => m.movieId === movieId);
      if (existing && existing.status === status) {
        // 再次点击相同状态 → 取消标记
        return prev.filter(m => m.movieId !== movieId);
      }
      if (existing) {
        // 切换状态
        return prev.map(m => m.movieId === movieId ? { ...m, status } : m);
      }
      // 新增标记
      return [...prev, { movieId, status }];
    });
  }, []);

  const getMarkStatus = useCallback((movieId: string): MarkStatus | null => {
    const mark = marks.find(m => m.movieId === movieId);
    return mark ? mark.status : null;
  }, [marks]);

  const getMarkedMovies = useCallback((status: MarkStatus): string[] => {
    return marks.filter(m => m.status === status).map(m => m.movieId);
  }, [marks]);

  return (
    <AppContext.Provider value={{ activeView, setActiveView, marks, toggleMark, getMarkStatus, getMarkedMovies }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}
