import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, FolderPlus, Trash2, Film, CheckCircle2 } from 'lucide-react'
import api from '../api/client'
import LoadingSpinner from '../components/LoadingSpinner'

export default function AddCategoryPage() {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [categoryName, setCategoryName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await api.get('/api/movies/categories/')
      setCategories(res.data.results || res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!categoryName.trim()) return

    setSubmitting(true)
    setErrorMessage('')
    setStatusMessage('')

    try {
      const res = await api.post('/api/movies/categories/', {
        category: categoryName.trim(),
      })
      setCategories((prev) => [...prev, res.data])
      setStatusMessage(`Category "${categoryName}" added successfully!`)
      setCategoryName('')
    } catch (err) {
      setErrorMessage(
        err.response?.data?.category?.[0] ||
        err.response?.data?.detail ||
        'Failed to add category. It may already exist.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteCategory = async (id, name) => {
    if (!window.confirm(`Delete category "${name}"? Movies belonging to this category will also be affected.`)) return
    try {
      await api.delete(`/api/movies/categories/${id}/`)
      setCategories((prev) => prev.filter((c) => c.id !== id))
    } catch (err) {
      alert('Failed to delete category: ' + (err.response?.data?.detail || err.message))
    }
  }

  if (loading) {
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

      {/* Add Form */}
      <div className="card-base" style={{ padding: '32px', marginBottom: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
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
            <FolderPlus size={26} />
          </div>
          <h1 style={{ fontSize: '1.7rem', fontWeight: 800, color: 'var(--primary)' }}>
            ➕ Add Movie Category
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Create genres such as Action, Thriller, Sci-Fi, Drama, Romance
          </p>
        </div>

        {statusMessage && (
          <div
            style={{
              padding: '12px',
              background: 'rgba(40, 167, 69, 0.15)',
              border: '1px solid #28a745',
              borderRadius: 'var(--radius-md)',
              color: '#28a745',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '20px',
            }}
          >
            <CheckCircle2 size={18} />
            <span>{statusMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div
            style={{
              padding: '12px',
              background: 'rgba(229, 9, 20, 0.15)',
              border: '1px solid var(--danger)',
              borderRadius: 'var(--radius-md)',
              color: '#ff6b6b',
              fontSize: '0.9rem',
              marginBottom: '20px',
            }}
          >
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <input
            type="text"
            className="form-input"
            placeholder="Enter new category name (e.g. Anime, Crime, Mystery)"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            style={{ flex: '1 1 280px' }}
            required
          />
          <button type="submit" disabled={submitting} className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
            {submitting ? 'Adding...' : 'Add Category'}
          </button>
        </form>
      </div>

      {/* Existing Categories List */}
      <div>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '16px' }}>
          Existing Categories ({categories.length})
        </h2>

        {categories.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>No categories registered yet.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '14px' }}>
            {categories.map((c) => (
              <div
                key={c.id}
                className="card-base"
                style={{
                  padding: '16px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <Link
                    to={`/movies?category=${c.id}`}
                    style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}
                    title="Click to view movies in this category"
                  >
                    {c.category}
                  </Link>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {c.movies_count || 0} movies
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '6px' }}>
                  <Link
                    to={`/movies?category=${c.id}`}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '4px 8px' }}
                    title="Browse"
                  >
                    <Film size={14} />
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDeleteCategory(c.id, c.category)}
                    className="btn btn-danger btn-sm"
                    style={{ padding: '4px 8px' }}
                    title="Delete Category"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
