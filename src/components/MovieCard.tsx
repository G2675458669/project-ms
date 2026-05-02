// src/components/MovieCard.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import type { Movie, MarkStatus } from '@/types';
import { useAppContext } from '@/context/AppContext';

interface MovieCardProps {
  movie: Movie;
}

const statusConfig: Record<MarkStatus, { label: string; icon: string }> = {
  want_to_watch: { label: '想看', icon: '👁' },
  watching: { label: '正在看', icon: '▶' },
};

const GENRE_STYLES: Record<string, { text: string; bg: string; border: string }> = {
  '剧情': { text: '#e8b339', bg: 'rgba(232,179,57,0.12)', border: '1px solid rgba(232,179,57,0.25)' },
  '犯罪': { text: '#e0524b', bg: 'rgba(224,82,75,0.12)', border: '1px solid rgba(224,82,75,0.25)' },
  '动作': { text: '#e85d2c', bg: 'rgba(232,93,44,0.12)', border: '1px solid rgba(232,93,44,0.25)' },
  '科幻': { text: '#4da6ff', bg: 'rgba(77,166,255,0.12)', border: '1px solid rgba(77,166,255,0.25)' },
  '战争': { text: '#7a8c8d', bg: 'rgba(122,140,141,0.12)', border: '1px solid rgba(122,140,141,0.25)' },
  '悬疑': { text: '#a78bfa', bg: 'rgba(167,139,250,0.12)', border: '1px solid rgba(167,139,250,0.25)' },
  '喜剧': { text: '#f59e0b', bg: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.25)' },
  '动画': { text: '#34d399', bg: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.25)' },
  '奇幻': { text: '#c084fc', bg: 'rgba(192,132,252,0.12)', border: '1px solid rgba(192,132,252,0.25)' },
  '爱情': { text: '#f472b6', bg: 'rgba(244,114,182,0.12)', border: '1px solid rgba(244,114,182,0.25)' },
  '恐怖': { text: '#ef4444', bg: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)' },
};

export default function MovieCard({ movie }: MovieCardProps) {
  const [hovered, setHovered] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { toggleMark, getMarkStatus } = useAppContext();
  const currentStatus = getMarkStatus(movie.id);
  const hasMark = currentStatus !== null;

  // 点击外部关闭下拉
  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [dropdownOpen]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setDropdownOpen(false); }}
      style={{
        position: 'relative',
        borderRadius: 'var(--radius-card)',
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        transition: 'transform 200ms ease, border-color 200ms ease',
        transform: hovered ? 'translateY(-4px)' : 'none',
        borderColor: hovered ? 'var(--color-gold-dim)' : 'var(--color-border)',
      }}
    >
      {/* 海报区 */}
      <div style={{
        position: 'relative',
        aspectRatio: '2/3',
        overflow: 'hidden',
        borderRadius: 'var(--radius-card) var(--radius-card) 0 0',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: (() => {
            const primaryGenre = movie.genre[0];
            const style = GENRE_STYLES[primaryGenre];
            const accent = style?.text ?? 'var(--color-gold)';
            return `linear-gradient(135deg, ${accent}22 0%, ${accent}44 40%, ${accent}11 100%)`;
          })(),
          borderBottom: `2px solid ${(() => {
            const primaryGenre = movie.genre[0];
            const style = GENRE_STYLES[primaryGenre];
            return style?.text ?? 'var(--color-gold)';
          })()}33`,
          transition: 'filter 350ms ease, transform 350ms ease',
          filter: hovered ? 'blur(6px) brightness(0.35)' : 'none',
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
        }}>
          <h2 style={{
            color: '#fff',
            fontSize: '20px',
            fontWeight: 700,
            textAlign: 'center',
            padding: '16px',
            fontFamily: 'var(--font-zh-title)',
            textShadow: '0 2px 12px rgba(0,0,0,0.6)',
            lineHeight: 1.6,
            letterSpacing: '2px',
          }}>
            {movie.titleZh}
          </h2>
        </div>

        {/* 简介覆盖层 */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.15) 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '14px',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 400ms ease',
          pointerEvents: 'none',
        }}>
          <p style={{
            margin: 0,
            fontSize: '12px',
            lineHeight: '1.7',
            color: 'rgba(255,255,255,0.85)',
            display: '-webkit-box',
            WebkitLineClamp: 6,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            animation: hovered ? 'fadeInUp 400ms ease forwards' : 'none',
          }}>
            {movie.overview}
          </p>
        </div>

      </div>

      {/* 书签按钮（海报右上角外侧） */}
      <div ref={dropdownRef} style={{
        position: 'absolute',
        top: '8px',
        right: '8px',
        zIndex: 20,
      }}>
        <button
          onClick={(e) => { e.stopPropagation(); setDropdownOpen(prev => !prev); }}
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '8px',
            border: hasMark
              ? '1.5px solid var(--color-gold)'
              : '1.5px solid rgba(255,255,255,0.2)',
            backgroundColor: hasMark
              ? 'rgba(212,175,55,0.2)'
              : 'rgba(0,0,0,0.5)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(8px)',
            transition: 'all 250ms ease',
            boxShadow: hasMark
              ? '0 0 12px rgba(212,175,55,0.4)'
              : 'none',
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
          }}
          aria-label="标记电影"
        >
          <svg width="15" height="15" viewBox="0 0 16 16"
            fill={hasMark ? 'var(--color-gold)' : 'none'}
            stroke={hasMark ? 'var(--color-gold)' : 'rgba(255,255,255,0.7)'}
            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 2v12l5-3.5L13 14V2a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1z" />
          </svg>
        </button>

        {/* 下拉菜单 */}
        {dropdownOpen && (
          <div style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            right: 0,
            minWidth: '140px',
            backgroundColor: 'rgba(18,18,26,0.97)',
            border: '1px solid var(--color-border)',
            borderRadius: '10px',
            padding: '6px',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.1)',
            animation: 'slideDown 200ms ease forwards',
            zIndex: 30,
          }}>
            {(Object.keys(statusConfig) as MarkStatus[]).map(status => {
              const cfg = statusConfig[status];
              const isActive = currentStatus === status;
              return (
                <button
                  key={status}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMark(movie.id, status);
                    setDropdownOpen(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? 'var(--color-gold)' : 'var(--color-text)',
                    backgroundColor: isActive ? 'rgba(212,175,55,0.12)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 150ms ease',
                    boxShadow: isActive ? '0 0 8px rgba(212,175,55,0.25)' : 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <span style={{ fontSize: '14px' }}>{cfg.icon}</span>
                  <span>{cfg.label}</span>
                  {isActive && (
                    <span style={{ marginLeft: 'auto', fontSize: '10px', color: 'var(--color-gold)' }}>✓</span>
                  )}
                </button>
              );
            })}
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
          fontFamily: 'var(--font-zh-title)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {movie.titleZh}
        </h3>
        <p style={{
          margin: '0 0 8px 0',
          fontSize: '12px',
          color: 'var(--color-text-dim)',
          fontFamily: 'var(--font-en-title)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {movie.title}
        </p>
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center', flexWrap: 'wrap' }}>
          {movie.genre.map(g => {
            const style = GENRE_STYLES[g] ?? {
              text: 'var(--color-text-muted)',
              bg: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--color-border)',
            };
            return (
              <span key={g} style={{
                fontSize: '10.5px',
                padding: '2px 7px',
                borderRadius: '4px',
                color: style.text,
                backgroundColor: style.bg,
                border: style.border,
                whiteSpace: 'nowrap',
                fontWeight: 500,
              }}>
                {g}
              </span>
            );
          })}
          <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginLeft: 'auto' }}>
            📅 {movie.releaseDate.slice(0, 4)}
          </span>
        </div>
      </div>
    </div>
  );
}
