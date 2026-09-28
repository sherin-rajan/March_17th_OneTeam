import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Save, AlertCircle } from 'lucide-react'
import api, { getImageUrl } from '../api/client'
import LoadingSpinner from '../components/LoadingSpinner'

export default function EditMoviePage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  const [movie, setMovie] = useState('')
  const [category, setCategory] = useState('')
  const [releaseDate, setReleaseDate] = useState('')
  const [description, setDescription] = useState('')
  const [currentPoster, setCurrentPoster] = useState('')
  const [newPosterFile, setNewPosterFile] = useState(null)
  const [newPosterPreview, setNewPosterPreview] = useState(null)
  const [trailerLink, setTrailerLink] = useState('')

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [movieRes, catsRes] = await Promise.all([
          api.get(`/api/movies/movies/${id}/`),
          api.get('/api/movies/categories/'),
        ])
        const m = movieRes.data
        setMovie(m.movie || '')
        setCategory(m.category || '')
        setReleaseDate(m.release_date || '')
        setDescription(m.description || '')
        setCurrentPoster(m.poster || '')
        setTrailerLink(m.trailer_link || '')
        setCategories(catsRes.data.results || catsRes.data)
      } catch (err) {
        console.error(err)
        setError('Failed to load movie for editing.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  const handlePosterChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setNewPosterFile(file)
      setNewPosterPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!movie.trim()) {
      setError('Movie title is required.')
      return
    }

    setSubmitting(true)
    setError('')

    const formData = new FormData()
    formData.append('movie', movie.trim())
    formData.append('category', category)
    formData.append('release_date', releaseDate)
    formData.append('description', description)
    formData.append('trailer_link', trailerLink)

    if (newPosterFile) {
      formData.append('poster', newPosterFile)
    }

    try {
      await api.patch(`/api/movies/movies/${id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      navigate(`/movies/${id}`)
    } catch (err) {
      console.error(err)
      const data = err.response?.data
      if (typeof data === 'object') {
        const msg = Object.entries(data)
          .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(' ') : v}`)
          .join(' | ')
        setError(msg)
      } else {
        setError(err.message || 'Failed to update movie.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <LoadingSpinner text="Loading movie data..." />
  }

  return (
    <div className="container" style={{ padding: '40px 24px 80px 24px', maxWidth: '780px' }}>
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
        <span>Back to Movie</span>
      </button>

      <div className="card-base" style={{ padding: '36px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '8px' }}>
          ✏️ Edit Movie
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
          Update movie details, category, poster, or trailer link
        </p>

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
              gap: '10px',
              marginBottom: '24px',
            }}
          >
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Movie Title</label>
            <input
              type="text"
              className="form-input"
              value={movie}
              onChange={(e) => setMovie(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.category}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Release Date</label>
            <input
              type="date"
              className="form-input"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description / Synopsis</label>
            <textarea
              rows="4"
              className="form-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Current & New Poster */}
          <div className="form-group">
            <label className="form-label">Movie Poster</label>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '12px' }}>
              {currentPoster && (
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Current:</p>
                  <img
                    src={getImageUrl(currentPoster)}
                    alt="Current poster"
                    style={{
                      width: '90px',
                      height: '130px',
                      objectFit: 'cover',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                    }}
                  />
                </div>
              )}
              {newPosterPreview && (
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--primary)', marginBottom: '4px' }}>New Preview:</p>
                  <img
                    src={newPosterPreview}
                    alt="New preview"
                    style={{
                      width: '90px',
                      height: '130px',
                      objectFit: 'cover',
                      borderRadius: 'var(--radius-md)',
                      border: '2px solid var(--primary)',
                    }}
                  />
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              className="form-input"
              onChange={handlePosterChange}
            />
            <small style={{ color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>
              Leave blank if you do not want to change the poster.
            </small>
          </div>

          <div className="form-group">
            <label className="form-label">Trailer Link</label>
            <input
              type="url"
              className="form-input"
              value={trailerLink}
              onChange={(e) => setTrailerLink(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary btn-lg"
            style={{ width: '100%', marginTop: '12px' }}
          >
            <Save size={18} />
            <span>{submitting ? 'Saving Changes...' : 'Update Movie'}</span>
          </button>
        </form>
      </div>
    </div>
  )
}
