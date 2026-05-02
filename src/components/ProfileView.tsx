// src/components/ProfileView.tsx
'use client';

import { useState } from 'react';
import type { MarkStatus } from '@/types';
import { useAppContext } from '@/context/AppContext';
import movies from '@/data/movies';
import MovieGrid from './MovieGrid';

const tabs: { key: MarkStatus; label: string }[] = [
  { key: 'want_to_watch', label: '想看' },
  { key: 'watching', label: '正在看' },
];

export default function ProfileView() {
  const [activeTab, setActiveTab] = useState<MarkStatus>('want_to_watch');
  const { getMarkedMovies } = useAppContext();

  const markedIds = getMarkedMovies(activeTab);
  const markedMovies = movies.filter(m => markedIds.includes(m.id));

  return (
    <div style={{ padding: '24px 40px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Tab 切换 */}
      <div style={{
        display: 'flex',
        gap: '4px',
        marginBottom: '24px',
        borderBottom: '1px solid var(--color-border)',
        paddingBottom: '12px',
      }}>
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: '10px 24px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: activeTab === tab.key ? 600 : 400,
              color: activeTab === tab.key ? 'var(--color-gold)' : 'var(--color-text-dim)',
              backgroundColor: activeTab === tab.key ? 'rgba(212,175,55,0.1)' : 'transparent',
              transition: 'all 200ms ease',
            }}
          >
            {tab.label}
            <span style={{
              marginLeft: '8px',
              padding: '2px 8px',
              borderRadius: '10px',
              fontSize: '12px',
              backgroundColor: activeTab === tab.key ? 'var(--color-gold)' : 'var(--color-border)',
              color: activeTab === tab.key ? '#000' : 'var(--color-text-dim)',
            }}>
              {getMarkedMovies(tab.key).length}
            </span>
          </button>
        ))}
      </div>

      <MovieGrid
        movies={markedMovies}
        emptyMessage={
          activeTab === 'want_to_watch'
            ? '还没有想看的电影，去首页发现好片吧'
            : '还没有正在看的电影，快去首页找一部开始吧'
        }
      />
    </div>
  );
}
