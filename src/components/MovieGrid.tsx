// src/components/MovieGrid.tsx
'use client';

import type { Movie } from '@/types';
import MovieCard from './MovieCard';

interface MovieGridProps {
  movies: Movie[];
  emptyMessage?: string;
}

export default function MovieGrid({ movies, emptyMessage = '未找到相关电影' }: MovieGridProps) {
  if (movies.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '80px 20px',
        color: 'var(--color-text-dim)',
        fontSize: '15px',
      }}>
        <p style={{ fontSize: '40px', marginBottom: '12px' }}>🎬</p>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '20px',
    }}>
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
