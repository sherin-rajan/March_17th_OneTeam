import { Star } from 'lucide-react'

export default function StarRating({ rating = 0, max = 5, size = 16, interactive = false, onChange = null }) {
  const stars = Array.from({ length: max }, (_, i) => i + 1)

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
      {stars.map((starVal) => {
        const isFilled = starVal <= rating
        return (
          <button
            key={starVal}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onChange && onChange(starVal)}
            style={{
              background: 'none',
              border: 'none',
              padding: interactive ? '2px' : '0',
              cursor: interactive ? 'pointer' : 'default',
              display: 'flex',
              alignItems: 'center',
              color: isFilled ? 'var(--star-filled)' : 'var(--star-empty)',
              transition: 'transform 0.15s ease',
            }}
            onMouseEnter={(e) => {
              if (interactive) e.currentTarget.style.transform = 'scale(1.2)'
            }}
            onMouseLeave={(e) => {
              if (interactive) e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            <Star
              size={size}
              fill={isFilled ? 'var(--star-filled)' : 'none'}
              strokeWidth={isFilled ? 0 : 1.5}
            />
          </button>
        )
      })}
    </div>
  )
}
