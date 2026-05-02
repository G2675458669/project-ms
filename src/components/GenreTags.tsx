// src/components/GenreTags.tsx
'use client';

interface GenreTagsProps {
  genres: string[];
  selected: string[];
  onToggle: (genre: string) => void;
}

export default function GenreTags({ genres, selected, onToggle }: GenreTagsProps) {
  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap',
    }}>
      {genres.map(genre => {
        const isSelected = selected.includes(genre);
        return (
          <button
            key={genre}
            onClick={() => onToggle(genre)}
            style={{
              padding: '6px 16px',
              border: `1px solid ${isSelected ? 'var(--color-gold)' : 'var(--color-border)'}`,
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '13px',
              color: isSelected ? '#000' : 'var(--color-text-dim)',
              backgroundColor: isSelected ? 'var(--color-gold)' : 'var(--color-surface)',
              fontWeight: isSelected ? 600 : 400,
              transition: 'all 200ms ease',
            }}
          >
            {genre}
          </button>
        );
      })}
    </div>
  );
}
