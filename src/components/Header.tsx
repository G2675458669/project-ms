// src/components/Header.tsx
'use client';

import { useAppContext } from '@/context/AppContext';
import type { ViewType } from '@/types';

export default function Header() {
  const { activeView, setActiveView } = useAppContext();

  const tabs: { key: ViewType; label: string }[] = [
    { key: 'home', label: '首页' },
    { key: 'profile', label: '我的片单' },
  ];

  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 40px',
      borderBottom: '1px solid var(--color-border)',
      backgroundColor: 'var(--color-surface)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <h1 style={{
        fontFamily: 'var(--font-display)',
        color: 'var(--color-gold)',
        fontSize: '24px',
        letterSpacing: '3px',
        margin: 0,
        userSelect: 'none',
      }}>
        CINEMA
      </h1>

      <nav style={{ display: 'flex', gap: '4px' }}>
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveView(tab.key)}
            style={{
              padding: '8px 20px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: activeView === tab.key ? 600 : 400,
              color: activeView === tab.key ? 'var(--color-gold)' : 'var(--color-text-dim)',
              backgroundColor: activeView === tab.key ? 'rgba(212,175,55,0.1)' : 'transparent',
              transition: 'all 200ms ease',
            }}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
