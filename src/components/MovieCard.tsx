// src/components/MovieCard.tsx
'use client';

import { useState } from 'react';
import type { Movie, MarkStatus } from '@/types';
import { useAppContext } from '@/context/AppContext';

interface MovieCardProps {
  movie: Movie;
}

const statusConfig: Record<MarkStatus, { label: string; icon: string }> = {
  want_to_watch: { label: '想看', icon: '👁' },
  watching: { label: '正在看', icon: '▶' },
};

export default function MovieCard({ movie }: MovieCardProps) {
  const [hovered, setHovered] = useState(false);
  const { toggleMark, getMarkStatus } = useAppContext();
  const currentStatus = getMarkStatus(movie.id);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        borderRadius: 'var(--radius-card)',
        overflow: 'hidden',
        cursor: 'pointer',
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        transition: 'transform 200ms ease, border-color 200ms ease',
        transform: hovered ? 'translateY(-4px)' : 'none',
        borderColor: hovered ? 'var(--color-gold-dim)' : 'var(--color-border)',
      }}
    >
      {/* 海报区 */}
      <div style={{ position: 'relative', aspectRatio: '2/3', overflow: 'hidden' }}>
        <img
          src={movie.poster}
          alt={movie.title}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'filter 300ms ease',
            filter: hovered ? 'blur(8px) brightness(0.3)' : 'none',
          }}
        />

        {/* 悬停遮罩 + 操作按钮 */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 300ms ease',
        }}>
          {(Object.keys(statusConfig) as MarkStatus[]).map(status => {
            const cfg = statusConfig[status];
            const isActive = currentStatus === status;
            return (
              <button
                key={status}
                onClick={(e) => { e.stopPropagation(); toggleMark(movie.id, status); }}
                style={{
                  padding: '10px 28px',
                  border: isActive ? '2px solid var(--color-gold)' : '2px solid rgba(255,255,255,0.3)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: isActive ? 'var(--color-gold)' : '#fff',
                  backgroundColor: isActive ? 'rgba(212,175,55,0.2)' : 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(4px)',
                  transition: 'all 200ms ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>{cfg.icon}</span>
                <span>{cfg.label}</span>
              </button>
            );
          })}
        </div>

        {/* 当前标记状态指示 */}
        {currentStatus && !hovered && (
          <div style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            padding: '4px 10px',
            borderRadius: '4px',
            fontSize: '11px',
            fontWeight: 600,
            color: '#000',
            backgroundColor: 'var(--color-gold)',
          }}>
            {statusConfig[currentStatus].label}
          </div>
        )}
      </div>

      {/* 信息区 */}
      <div style={{ padding: '12px' }}>
        <h3 style={{
          margin: '0 0 4px 0',
          fontSize: '14px',
          fontWeight: 600,
          color: 'var(--color-text)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {movie.titleZh}
        </h3>
        <p style={{
          margin: '0 0 6px 0',
          fontSize: '12px',
          color: 'var(--color-text-dim)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {movie.title}
        </p>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <span style={{
            fontSize: '11px',
            color: 'var(--color-text-muted)',
            padding: '2px 8px',
            borderRadius: '4px',
            backgroundColor: 'rgba(255,255,255,0.05)',
            border: '1px solid var(--color-border)',
          }}>
            {movie.genre[0]}
          </span>
          <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
            {movie.releaseDate.slice(0, 4)}
          </span>
        </div>
      </div>
    </div>
  );
}
