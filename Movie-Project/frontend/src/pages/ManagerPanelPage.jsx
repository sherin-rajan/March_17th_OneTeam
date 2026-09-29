import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Film, FolderPlus, Pencil, Plus, Trash2, UserPlus } from 'lucide-react'
import api, { getImageUrl } from '../api/client'
import { useAuth } from '../context/AuthContext'
import LoadingSpinner from '../components/LoadingSpinner'

export default function ManagerPanelPage() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [movies, setMovies] = useState([])
  const [movieCount, setMovieCount] = useState(0)
  const [categoryCount, setCategoryCount] = useState(0)
  const [actorCount, setActorCount] = useState(0)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadPanel = async () => {
      try {
        const [movieResponse, categoryResponse, actorResponse] = await Promise.all([
          api.get('/api/movies/movies/'),
          api.get('/api/movies/categories/'),
          api.get('/api/actors/'),
        ])
        const movieData = movieResponse.data.results || movieResponse.data
        const categoryData = categoryResponse.data.results || categoryResponse.data
        const actorData = actorResponse.data.results || actorResponse.data
        setMovies(movieData.slice(0, 8))
        setMovieCount(movieResponse.data.count ?? movieData.length)
        setCategoryCount(categoryResponse.data.count ?? categoryData.length)
        setActorCount(actorResponse.data.count ?? actorData.length)
      } catch (requestError) {
        setError(requestError.response?.data?.detail || 'Could not load manager panel data.')
      } finally {
        setLoading(false)
      }
    }

    loadPanel()
  }, [])

  const handleDelete = async (movie) => {
    if (!window.confirm(`Delete "${movie.movie}"? This cannot be undone.`)) return
    try {
      await api.delete(`/api/movies/movies/${movie.id}/`)
      setMovies((current) => current.filter((item) => item.id !== movie.id))
      setMovieCount((current) => Math.max(0, current - 1))
    } catch (requestError) {
      setError(requestError.response?.data?.detail || 'Could not delete this movie.')
    }
  }

  if (loading) return <LoadingSpinner text="Loading manager panel..." />

  return (
    <div className="container" style={{ padding: '40px 24px 80px' }}>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '32px',
        }}
      >
        <div>
          <span className="badge badge-gold" style={{ marginBottom: '12px' }}>MANAGER ACCESS</span>
          <h1 style={{ color: '#fff', fontSize: '2rem', fontWeight: 800, marginBottom: '6px' }}>
            Manager Panel
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Catalog controls for {user?.first_name || user?.username}
          </p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <Link to="/movies/add" className="btn btn-primary" style={{ gap: '7px' }}>
            <Plus size={17} /> Add movie
          </Link>
          <Link to="/categories/add" className="btn btn-outline" style={{ gap: '7px' }}>
            <FolderPlus size={17} /> Manage categories
          </Link>
          <Link to="/cast/add" className="btn btn-outline" style={{ gap: '7px' }}>
            <UserPlus size={17} /> Assign cast
          </Link>
        </div>
      </header>

      {error && (
        <div
          role="alert"
          style={{
            color: '#ff8c8c',
            borderLeft: '3px solid var(--danger)',
            padding: '10px 14px',
            marginBottom: '22px',
            background: 'rgba(229, 9, 20, 0.08)',
          }}
        >
          {error}
        </div>
      )}

      <section
        aria-label="Catalog totals"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1px',
          background: 'var(--border-color)',
          border: '1px solid var(--border-color)',
          marginBottom: '40px',
        }}
      >
        {[
          { label: 'Movies', value: movieCount, icon: Film },
          { label: 'Categories', value: categoryCount, icon: FolderPlus },
          { label: 'Cast profiles', value: actorCount, icon: UserPlus },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} style={{ background: 'var(--bg-primary)', padding: '22px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '9px', color: 'var(--text-muted)', marginBottom: '12px' }}>
              <Icon size={17} />
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{label}</span>
            </div>
            <strong style={{ color: '#fff', fontSize: '1.8rem' }}>{value}</strong>
          </div>
        ))}
      </section>

      <section>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '14px',
          }}
        >
          <h2 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 750 }}>Recent movies</h2>
          <Link to="/movies" style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem' }}>
            Browse catalog
          </Link>
        </div>

        {movies.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)', padding: '20px 0' }}>No movies to manage yet.</p>
        ) : (
          <div style={{ borderTop: '1px solid var(--border-color)' }}>
            {movies.map((movie) => (
              <div
                key={movie.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '48px minmax(0, 1fr) auto',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '12px 0',
                  borderBottom: '1px solid var(--border-color)',
                }}
              >
                <img
                  src={getImageUrl(movie.poster)}
                  alt=""
                  style={{ width: '48px', height: '64px', objectFit: 'cover', borderRadius: '4px' }}
                />
                <div style={{ minWidth: 0 }}>
                  <Link
                    to={`/movies/${movie.id}`}
                    style={{ display: 'block', color: '#fff', fontWeight: 650, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                  >
                    {movie.movie}
                  </Link>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                    {movie.category_name || 'Uncategorized'}{movie.release_date ? ` · ${movie.release_date.slice(0, 4)}` : ''}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Link
                    to={`/movies/${movie.id}/edit`}
                    className="btn btn-outline btn-sm"
                    aria-label={`Edit ${movie.movie}`}
                    title="Edit movie"
                  >
                    <Pencil size={15} />
                  </Link>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(movie)}
                    aria-label={`Delete ${movie.movie}`}
                    title="Delete movie"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}