// src/components/SearchBar.tsx
'use client';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

export default function SearchBar({ value, onChange, onSearch }: SearchBarProps) {
  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      width: '100%',
      maxWidth: '560px',
    }}>
      <div style={{ position: 'relative', flex: 1 }}>
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
          onKeyDown={e => { if (e.key === 'Enter') onSearch(); }}
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
      <button
        onClick={onSearch}
        style={{
          padding: '12px 20px',
          backgroundColor: 'var(--color-gold)',
          color: '#000',
          border: 'none',
          borderRadius: '10px',
          fontSize: '14px',
          fontWeight: 600,
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          transition: 'opacity 200ms ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
        onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
      >
        搜索
      </button>
    </div>
  );
}
