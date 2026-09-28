import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, UserPlus, AlertCircle } from 'lucide-react'
import api from '../api/client'
import LoadingSpinner from '../components/LoadingSpinner'

export default function AddCastPage() {
  const { id: movieIdParam } = useParams()
  const navigate = useNavigate()

  const [movies, setMovies] = useState([])
  const [actors, setActors] = useState([])
  const [loading, setLoading] = useState(true)

  const [selectedMovie, setSelectedMovie] = useState(movieIdParam || '')
  const [selectedActor, setSelectedActor] = useState('')
  const [role, setRole] = useState('ACTOR')
  const [characterName, setCharacterName] = useState('')

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesRes, actorsRes] = await Promise.all([
          api.get('/api/movies/movies/'),
          api.get('/api/actors/'),
        ])
        const mList = moviesRes.data.results || moviesRes.data
        const aList = actorsRes.data.results || actorsRes.data
        setMovies(mList)
        setActors(aList)

        if (movieIdParam) {
          setSelectedMovie(movieIdParam)
        } else if (mList.length > 0) {
          setSelectedMovie(mList[0].id)
        }

        if (aList.length > 0) {
          setSelectedActor(aList[0].id)
        }
      } catch (err) {
        console.error(err)
        setError('Failed to load movie or actors data.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [movieIdParam])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedMovie) {
      setError('Please select a movie.')
      return
    }
    if (!selectedActor) {
      setError('Please select an actor / person.')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      await api.post('/api/movies/cast/', {
        movie: parseInt(selectedMovie, 10),
        actor: parseInt(selectedActor, 10),
        role: role,
        character_name: characterName.trim(),
      })
      navigate(`/movies/${selectedMovie}`)
    } catch (err) {
      console.error(err)
      const data = err.response?.data
      if (typeof data === 'object') {
        const msg = Object.entries(data)
          .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(' ') : v}`)
          .join(' | ')
        setError(msg)
      } else {
        setError(err.message || 'Failed to assign cast.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <LoadingSpinner text="Loading cast assignment options..." />
  }

  return (
    <div className="container" style={{ padding: '40px 24px 80px 24px', maxWidth: '640px' }}>
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

      <div className="card-base" style={{ padding: '36px' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'var(--primary-glow)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px auto',
            }}
          >
            <UserPlus size={26} />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)' }}>
            Assign Cast & Crew
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Link an actor, director, or producer to a movie
          </p>
        </div>

        {error && (
          <div
            style={{
              padding: '12px 16px',
              background: 'rgba(229, 9, 20, 0.15)',
              border: '1px solid var(--danger)',
              borderRadius: 'var(--radius-md)',
              color: '#ff6b6b',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '20px',
            }}
          >
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Movie Select */}
          <div className="form-group">
            <label className="form-label">Movie *</label>
            <select
              className="form-select"
              value={selectedMovie}
              onChange={(e) => setSelectedMovie(e.target.value)}
              required
            >
              {movies.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.movie}
                </option>
              ))}
            </select>
          </div>

          {/* Actor Select */}
          <div className="form-group">
            <label className="form-label">Person / Actor *</label>
            {actors.length === 0 ? (
              <p style={{ color: 'var(--danger)', fontSize: '0.85rem' }}>No actors registered in database.</p>
            ) : (
              <select
                className="form-select"
                value={selectedActor}
                onChange={(e) => setSelectedActor(e.target.value)}
                required
              >
                {actors.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} ({a.place || 'Unknown place'})
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Role Choice */}
          <div className="form-group">
            <label className="form-label">Role in Movie *</label>
            <select
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="ACTOR">Actor</option>
              <option value="DIRECTOR">Director</option>
              <option value="PRODUCER">Producer</option>
            </select>
          </div>

          {/* Character Name */}
          <div className="form-group">
            <label className="form-label">Character Name (for Actors)</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Jack Dawson, Dominic Cobb, The Detective"
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary btn-lg"
            style={{ width: '100%', marginTop: '12px' }}
          >
            {submitting ? 'Assigning...' : 'Assign to Movie'}
          </button>
        </form>
      </div>
    </div>
  )
}
