// src/components/HomeView.tsx
'use client';

import { useState, useMemo } from 'react';
import movies, { getAllGenres } from '@/data/movies';
import SearchBar from './SearchBar';
import GenreTags from './GenreTags';
import MovieGrid from './MovieGrid';

export default function HomeView() {
  const [keyword, setKeyword] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const allGenres = useMemo(() => getAllGenres(), []);

  const filteredMovies = useMemo(() => {
    let result = movies;

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
  }, [searchQuery, selectedGenres]);

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
