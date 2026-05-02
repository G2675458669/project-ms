// src/components/SearchBar.tsx
'use client';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '480px' }}>
      <span style={{
        position: 'absolute',
        left: '14px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: 'var(--color-text-muted)',
        fontSize: '16px',
        pointerEvents: 'none',
      }}>
        🔍
      </span>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="搜索电影名称..."
        style={{
          width: '100%',
          padding: '12px 16px 12px 42px',
          border: '1px solid var(--color-border)',
          borderRadius: '10px',
          backgroundColor: 'var(--color-surface)',
          color: 'var(--color-text)',
          fontSize: '14px',
          outline: 'none',
          transition: 'border-color 200ms ease',
        }}
        onFocus={e => { e.target.style.borderColor = 'var(--color-gold)'; }}
        onBlur={e => { e.target.style.borderColor = 'var(--color-border)'; }}
      />
    </div>
  );
}
