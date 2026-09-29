import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, Edit3, Trash2, Calendar, Star } from 'lucide-react'
import { getImageUrl } from '../api/client'
import { useAuth } from '../context/AuthContext'
import StarRating from './StarRating'

export default function MovieCard({ movie, onDelete }) {
  const { isManager } = useAuth()
  const [isDeleting, setIsDeleting] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : ''

  const handleDelete = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!window.confirm(`Are you sure you want to delete "${movie.movie}"?`)) return
    setIsDeleting(true)
    try {
      if (onDelete) {
        await onDelete(movie.id)
      }
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div
      className="card-base"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease',
        transform: isHovered ? 'translateY(-6px)' : 'none',
      }}
    >
      {/* Poster Wrapper */}
      <div
        style={{
          position: 'relative',
          paddingTop: '145%',
          overflow: 'hidden',
          backgroundColor: '#151722',
        }}
      >
        <img
          src={getImageUrl(movie.poster)}
          alt={movie.movie}
          loading="lazy"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease',
            transform: isHovered ? 'scale(1.06)' : 'scale(1)',
          }}
        />

        {/* Category Badge */}
        {movie.category_name && (
          <span
            className="badge badge-gold"
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              zIndex: 2,
              fontSize: '0.7rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
            }}
          >
            {movie.category_name}
          </span>
        )}

        {/* Rating Badge */}
        {movie.average_rating > 0 && (
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              zIndex: 2,
              background: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(6px)',
              padding: '4px 8px',
              borderRadius: '999px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--primary)',
            }}
          >
            <Star size={12} fill="var(--primary)" />
            <span>{movie.average_rating}</span>
          </div>
        )}

        {/* Hover Action Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.2) 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '16px',
            gap: '8px',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.25s ease',
            zIndex: 3,
          }}
        >
          <Link
            to={`/movies/${movie.id}`}
            className="btn btn-primary btn-sm"
            style={{ width: '100%', gap: '6px' }}
          >
            <Eye size={15} />
            <span>View Details</span>
          </Link>

          {isManager && (
            <div style={{ display: 'flex', gap: '6px' }}>
              <Link
                to={`/movies/${movie.id}/edit`}
                className="btn btn-secondary btn-sm"
                style={{ flex: 1, padding: '6px', gap: '4px' }}
                title="Edit Movie"
              >
                <Edit3 size={14} />
                <span>Edit</span>
              </Link>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="btn btn-danger btn-sm"
                style={{ padding: '6px 10px' }}
                title="Delete Movie"
              >
                <Trash2 size={14} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Card Info */}
      <div
        style={{
          padding: '14px 16px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        <Link
          to={`/movies/${movie.id}`}
          style={{
            fontWeight: 700,
            fontSize: '1rem',
            color: 'var(--text-primary)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            marginBottom: '4px',
          }}
          title={movie.movie}
        >
          {movie.movie}
        </Link>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
            marginTop: 'auto',
          }}
        >
          {releaseYear ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={13} color="var(--text-muted)" />
              {releaseYear}
            </span>
          ) : <span>Movie</span>}

          {movie.average_rating > 0 ? (
            <StarRating rating={movie.average_rating} size={12} />
          ) : (
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>No reviews</span>
          )}
        </div>
      </div>
    </div>
  )
}
