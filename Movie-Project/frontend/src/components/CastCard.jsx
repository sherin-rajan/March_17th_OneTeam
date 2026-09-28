import { Link } from 'react-router-dom'
import { getImageUrl } from '../api/client'

export default function CastCard({ cast }) {
  const actorId = cast.actor || cast.id
  const actorName = cast.actor_name || cast.name
  const actorPhoto = cast.actor_picture || cast.picture
  const roleName = cast.role || 'ACTOR'
  const characterName = cast.character_name

  return (
    <Link
      to={`/actors/${actorId}`}
      className="card-base"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '10px 14px',
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-md)',
        transition: 'var(--transition)',
      }}
    >
      <img
        src={getImageUrl(actorPhoto, 'actor')}
        alt={actorName}
        style={{
          width: '54px',
          height: '54px',
          borderRadius: '50%',
          objectFit: 'cover',
          border: '2px solid var(--border-color)',
          flexShrink: 0,
        }}
      />
      <div style={{ overflow: 'hidden' }}>
        <h4
          style={{
            fontSize: '0.95rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {actorName}
        </h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
          {characterName ? (
            <span
              style={{
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              as {characterName}
            </span>
          ) : (
            <span
              className="badge badge-dark"
              style={{ fontSize: '0.65rem', padding: '2px 6px' }}
            >
              {roleName}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
