import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Film, Upload, PlusCircle, AlertCircle } from 'lucide-react'
import api from '../api/client'
import LoadingSpinner from '../components/LoadingSpinner'

export default function AddMoviePage() {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [loadingCats, setLoadingCats] = useState(true)

  const [movie, setMovie] = useState('')
  const [category, setCategory] = useState('')
  const [releaseDate, setReleaseDate] = useState('')
  const [description, setDescription] = useState('')
  const [posterFile, setPosterFile] = useState(null)
  const [posterPreview, setPosterPreview] = useState(null)
  const [trailerLink, setTrailerLink] = useState('')

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/api/movies/categories/')
        const cats = res.data.results || res.data
        setCategories(cats)
        if (cats.length > 0) {
          setCategory(cats[0].id)
        }
      } catch (err) {
        console.error('Failed to load categories', err)
      } finally {
        setLoadingCats(false)
      }
    }
    fetchCategories()
  }, [])

  const handlePosterChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPosterFile(file)
      setPosterPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!movie.trim()) {
      setError('Movie title is required.')
      return
    }
    if (!category) {
      setError('Please select a category.')
      return
    }
    if (!releaseDate) {
      setError('Please enter a release date.')
      return
    }
    if (!posterFile) {
      setError('Please upload a movie poster.')
      return
    }

    setSubmitting(true)
    setError('')

    const formData = new FormData()
    formData.append('movie', movie.trim())
    formData.append('category', category)
    formData.append('release_date', releaseDate)
    formData.append('description', description)
    formData.append('poster', posterFile)
    if (trailerLink.trim()) {
      formData.append('trailer_link', trailerLink.trim())
    }

    try {
      const res = await api.post('/api/movies/movies/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      navigate(`/movies/${res.data.id}`)
    } catch (err) {
      console.error(err)
      const data = err.response?.data
      if (typeof data === 'object') {
        const msg = Object.entries(data)
          .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(' ') : v}`)
          .join(' | ')
        setError(msg)
      } else {
        setError(err.message || 'Failed to create movie.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (loadingCats) {
    return <LoadingSpinner text="Loading categories..." />
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
        <span>Back</span>
      </button>

      <div className="card-base" style={{ padding: '36px' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              background: 'var(--primary-glow)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px auto',
            }}
          >
            <Film size={28} />
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>
            Add New Movie
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
            Enter film details and upload a high-resolution poster
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
              gap: '10px',
              marginBottom: '24px',
            }}
          >
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Movie Title */}
          <div className="form-group">
            <label className="form-label">Movie Title *</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Inception, Interstellar, Bramayugam"
              value={movie}
              onChange={(e) => setMovie(e.target.value)}
              required
            />
          </div>

          {/* Category Dropdown */}
          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label className="form-label" style={{ margin: 0 }}>Category / Genre *</label>
              <Link
                to="/categories/add"
                style={{ fontSize: '0.8rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <PlusCircle size={14} /> Add New Category
              </Link>
            </div>
            {categories.length === 0 ? (
              <div style={{ color: 'var(--danger)', fontSize: '0.85rem' }}>
                No categories available. Please <Link to="/categories/add" style={{ textDecoration: 'underline' }}>add a category</Link> first.
              </div>
            ) : (
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
            )}
          </div>

          {/* Release Date */}
          <div className="form-group">
            <label className="form-label">Release Date *</label>
            <input
              type="date"
              className="form-input"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label">Synopsis / Description</label>
            <textarea
              rows="4"
              className="form-textarea"
              placeholder="Write a brief storyline or synopsis..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Poster Upload */}
          <div className="form-group">
            <label className="form-label">Movie Poster Image *</label>
            <input
              type="file"
              accept="image/*"
              className="form-input"
              onChange={handlePosterChange}
              required
            />
            {posterPreview && (
              <div style={{ marginTop: '12px' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Preview:</p>
                <img
                  src={posterPreview}
                  alt="Poster Preview"
                  style={{
                    width: '120px',
                    height: '170px',
                    objectFit: 'cover',
                    borderRadius: 'var(--radius-md)',
                    border: '2px solid var(--border-color)',
                  }}
                />
              </div>
            )}
          </div>

          {/* Trailer Link */}
          <div className="form-group">
            <label className="form-label">YouTube Trailer Link</label>
            <input
              type="url"
              className="form-input"
              placeholder="https://www.youtube.com/watch?v=..."
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
            <Upload size={18} />
            <span>{submitting ? 'Adding Movie...' : 'Save & Publish Movie'}</span>
          </button>
        </form>
      </div>
    </div>
  )
}
