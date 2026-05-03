// src/components/HomeView.tsx
'use client';

import { useState, useMemo } from 'react';
import movies, { getAllGenres } from '@/data/movies';
import SearchBar from './SearchBar';
import GenreTags from './GenreTags';
import MovieGrid from './MovieGrid';

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 16807 + 0) % 2147483647;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getDailySeed(): number {
  const date = new Date().toISOString().split('T')[0]; // UTC date YYYY-MM-DD
  let hash = 0;
  for (let i = 0; i < date.length; i++) {
    hash = ((hash << 5) - hash) + date.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

export default function HomeView() {
  const [keyword, setKeyword] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const allGenres = useMemo(() => getAllGenres(), []);
  const [shuffledMovies] = useState(() => seededShuffle(movies, getDailySeed()));

  const filteredMovies = useMemo(() => {
    let result = shuffledMovies;

    // 关键词模糊匹配
    if (searchQuery.trim()) {
      const kw = searchQuery.trim().toLowerCase();
      result = result.filter(m =>
        m.title.toLowerCase().includes(kw) ||
        m.titleZh.includes(kw)
      );
    }

    // 类型筛选（多选取并集）
    if (selectedGenres.length > 0) {
      result = result.filter(m =>
        selectedGenres.some(g => m.genre.includes(g))
      );
    }

    return result;
  }, [shuffledMovies, searchQuery, selectedGenres]);

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  return (
    <div style={{ padding: '24px 40px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '24px',
        marginBottom: '20px',
        flexWrap: 'wrap',
      }}>
        <SearchBar value={keyword} onChange={setKeyword} onSearch={() => setSearchQuery(keyword)} />
        <GenreTags genres={allGenres} selected={selectedGenres} onToggle={handleGenreToggle} />
      </div>
      <MovieGrid movies={filteredMovies} />
    </div>
  );
}
