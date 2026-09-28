import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, MapPin, Film, Star, Calendar } from 'lucide-react'
import api, { getImageUrl } from '../api/client'
import LoadingSpinner from '../components/LoadingSpinner'

export default function ActorDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [actor, setActor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchActor = async () => {
      try {
        setLoading(true)
        const res = await api.get(`/api/actors/${id}/`)
        setActor(res.data)
      } catch (err) {
        console.error(err)
        setError('Actor profile not found.')
      } finally {
        setLoading(false)
      }
    }
    fetchActor()
  }, [id])

  if (loading) {
    return <LoadingSpinner text="Loading artist profile..." />
  }

  if (error || !actor) {
    return (
      <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--danger)', marginBottom: '16px' }}>{error || 'Actor not found'}</h2>
        <button type="button" onClick={() => navigate(-1)} className="btn btn-outline">
          ← Go Back
        </button>
      </div>
    )
  }

  const filmography = actor.filmography || []
  // Unique roles played by the actor
  const roles = [...new Set(filmography.map((f) => f.role).filter(Boolean))]

  return (
    <div className="container" style={{ padding: '40px 24px 80px 24px' }}>
      <button
        type="button"
        onClick={() => navigate(-1)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: 'var(--text-secondary)',
          fontSize: '0.9rem',
          fontWeight: 600,
          marginBottom: '24px',
        }}
      >
        <ArrowLeft size={18} />
        <span>Back</span>
      </button>

      {/* Profile Header Card */}
      <div
        className="card-base"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(220px, 300px) 1fr',
          gap: '36px',
          padding: '32px',
          marginBottom: '48px',
        }}
        className="actor-header-grid card-base"
      >
        {/* Photo */}
        <div style={{ overflow: 'hidden', borderRadius: 'var(--radius-lg)' }}>
          <img
            src={getImageUrl(actor.picture, 'actor')}
            alt={actor.name}
            style={{
              width: '100%',
              height: '100%',
              minHeight: '320px',
              objectFit: 'cover',
            }}
          />
        </div>

        {/* Info */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>
            {actor.name}
          </h1>

          {/* Roles Badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
            {roles.length > 0 ? (
              roles.map((r, i) => (
                <span key={i} className="badge badge-gold">
                  {r}
                </span>
              ))
            ) : (
              <span className="badge badge-gold">Artist</span>
            )}
          </div>

          {/* Place */}
          {actor.place && (
            <p style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '20px' }}>
              <MapPin size={18} color="var(--primary)" />
              <span>{actor.place}</span>
            </p>
          )}

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '16px 0' }} />

          {/* Biography */}
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '10px', color: '#fff' }}>
            About
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
            {actor.about || 'No biography details provided.'}
          </p>
        </div>
      </div>

      {/* Filmography Section */}
      <div>
        <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '24px' }}>
          🎬 Filmography ({filmography.length})
        </h2>

        {filmography.length === 0 ? (
          <div
            className="card-base"
            style={{
              padding: '40px 20px',
              textAlign: 'center',
              color: 'var(--text-secondary)',
            }}
          >
            <Film size={36} color="var(--text-muted)" style={{ margin: '0 auto 10px auto' }} />
            <p>No associated films found for this artist.</p>
          </div>
        ) : (
          <div className="movies-grid">
            {filmography.map((f, idx) => (
              <Link
                key={idx}
                to={`/movies/${f.id}`}
                className="card-base"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  transition: 'var(--transition)',
                }}
              >
                <div style={{ position: 'relative', paddingTop: '140%', background: '#161824' }}>
                  <img
                    src={getImageUrl(f.poster)}
                    alt={f.title}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <span
                    className="badge badge-gold"
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      left: '10px',
                      fontSize: '0.65rem',
                    }}
                  >
                    {f.role}
                  </span>
                </div>

                <div style={{ padding: '14px' }}>
                  <h4
                    style={{
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      marginBottom: '4px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {f.title}
                  </h4>
                  {f.character_name && (
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      as {f.character_name}
                    </p>
                  )}
                  {f.release_date && (
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      {f.release_date.split('-')[0]}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .actor-header-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
