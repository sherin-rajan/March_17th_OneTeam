import { useState, useEffect, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Search, Film, PlusCircle, LayoutGrid, Rows, Filter, ArrowUpDown } from 'lucide-react'
import api from '../api/client'
import { useAuth } from '../context/AuthContext'
import MovieCard from '../components/MovieCard'
import LoadingSpinner from '../components/LoadingSpinner'

export default function MoviesPage() {
  const { isAuthenticated } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()
  const [movies, setMovies] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState('category') // 'category' or 'grid'
  const [sortBy, setSortBy] = useState('newest') // 'newest', 'rating', 'title'

  const activeCategory = searchParams.get('category') || 'all'
  const searchQuery = searchParams.get('search') || ''

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesRes, catRes] = await Promise.all([
          api.get('/api/movies/movies/'),
          api.get('/api/movies/categories/'),
        ])
        setMovies(moviesRes.data.results || moviesRes.data)
        setCategories(catRes.data.results || catRes.data)
      } catch (err) {
        console.error('Failed to load movies:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleDeleteMovie = async (id) => {
    try {
      await api.delete(`/api/movies/movies/${id}/`)
      setMovies((prev) => prev.filter((m) => m.id !== id))
    } catch (err) {
      alert('Failed to delete movie: ' + (err.response?.data?.detail || err.message))
    }
  }

  const handleCategoryChange = (catId) => {
    const newParams = new URLSearchParams(searchParams)
    if (catId === 'all') {
      newParams.delete('category')
    } else {
      newParams.set('category', catId)
    }
    setSearchParams(newParams)
  }

  const handleSearchChange = (val) => {
    const newParams = new URLSearchParams(searchParams)
    if (val) {
      newParams.set('search', val)
    } else {
      newParams.delete('search')
    }
    setSearchParams(newParams)
  }

  // Filtered and Sorted Movies
  const filteredMovies = useMemo(() => {
    let result = [...movies]

    // Category filter
    if (activeCategory !== 'all') {
      const catId = parseInt(activeCategory, 10)
      result = result.filter((m) => m.category === catId)
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (m) =>
          m.movie.toLowerCase().includes(q) ||
          m.description?.toLowerCase().includes(q) ||
          m.category_name?.toLowerCase().includes(q)
      )
    }

    // Sorting
    if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.release_date || 0) - new Date(a.release_date || 0))
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.average_rating || 0) - (a.average_rating || 0))
    } else if (sortBy === 'title') {
      result.sort((a, b) => a.movie.localeCompare(b.movie))
    }

    return result
  }, [movies, activeCategory, searchQuery, sortBy])

  // Group movies by category for row view
  const categoryGroups = useMemo(() => {
    const groups = []
    categories.forEach((cat) => {
      let groupMovies = movies.filter((m) => m.category === cat.id)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        groupMovies = groupMovies.filter(
          (m) =>
            m.movie.toLowerCase().includes(q) ||
            m.description?.toLowerCase().includes(q)
        )
      }
      if (activeCategory === 'all' || activeCategory === String(cat.id)) {
        if (groupMovies.length > 0 || activeCategory === String(cat.id)) {
          groups.push({
            category: cat,
            movies: groupMovies,
          })
        }
      }
    })
    return groups
  }, [categories, movies, activeCategory, searchQuery])

  if (loading) {
    return <LoadingSpinner text="Loading movies catalog..." />
  }

  return (
    <div className="container" style={{ padding: '40px 24px 80px 24px' }}>
      {/* Page Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '32px',
        }}
      >
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>
            All Movies
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Explore our curated collection of cinema across all genres
          </p>
        </div>

        {isAuthenticated && (
          <Link to="/movies/add" className="btn btn-primary" style={{ gap: '8px' }}>
            <PlusCircle size={18} />
            <span>Add New Movie</span>
          </Link>
        )}
      </div>

      {/* Control Bar: Search, Category Filters, Sort, View Mode */}
      <div
        className="card-base"
        style={{
          padding: '16px 20px',
          marginBottom: '36px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Search Input */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '8px 14px',
              flex: '1 1 260px',
              maxWidth: '400px',
            }}
          >
            <Search size={18} color="var(--text-muted)" style={{ marginRight: '8px' }} />
            <input
              type="text"
              placeholder="Filter by title or keyword..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--text-primary)',
                width: '100%',
                fontSize: '0.9rem',
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {/* Sort Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ArrowUpDown size={16} color="var(--text-muted)" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select"
                style={{ padding: '8px 12px', width: 'auto', fontSize: '0.85rem' }}
              >
                <option value="newest">Latest Release</option>
                <option value="rating">Highest Rated</option>
                <option value="title">Alphabetical (A-Z)</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div
              style={{
                display: 'flex',
                background: 'var(--bg-input)',
                borderRadius: 'var(--radius-md)',
                padding: '3px',
                border: '1px solid var(--border-color)',
              }}
            >
              <button
                type="button"
                onClick={() => setViewMode('category')}
                style={{
                  padding: '6px 10px',
                  borderRadius: 'var(--radius-sm)',
                  background: viewMode === 'category' ? 'var(--primary)' : 'transparent',
                  color: viewMode === 'category' ? '#000' : 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                }}
                title="Group by Category"
              >
                <Rows size={15} />
                <span>Rows</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                style={{
                  padding: '6px 10px',
                  borderRadius: 'var(--radius-sm)',
                  background: viewMode === 'grid' ? 'var(--primary)' : 'transparent',
                  color: viewMode === 'grid' ? '#000' : 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                }}
                title="Grid View"
              >
                <LayoutGrid size={15} />
                <span>Grid</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            overflowX: 'auto',
            paddingTop: '8px',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          <Filter size={15} color="var(--text-muted)" style={{ flexShrink: 0 }} />
          <button
            type="button"
            onClick={() => handleCategoryChange('all')}
            className={`btn btn-sm ${activeCategory === 'all' ? 'btn-primary' : 'btn-outline'}`}
            style={{ borderRadius: '999px', padding: '4px 14px' }}
          >
            All Categories ({movies.length})
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => handleCategoryChange(String(c.id))}
              className={`btn btn-sm ${activeCategory === String(c.id) ? 'btn-primary' : 'btn-outline'}`}
              style={{ borderRadius: '999px', padding: '4px 14px', whiteSpace: 'nowrap' }}
            >
              {c.category} {c.movies_count !== undefined && `(${c.movies_count})`}
            </button>
          ))}
        </div>
      </div>

      {/* Movie Content */}
      {viewMode === 'grid' || activeCategory !== 'all' ? (
        // Grid View
        filteredMovies.length === 0 ? (
          <div
            className="card-base"
            style={{
              padding: '60px 20px',
              textAlign: 'center',
              color: 'var(--text-secondary)',
            }}
          >
            <Film size={48} color="var(--primary)" style={{ margin: '0 auto 16px auto' }} />
            <h3 style={{ color: '#fff', marginBottom: '8px' }}>No movies found</h3>
            <p style={{ marginBottom: '20px' }}>
              {searchQuery ? `No results matching "${searchQuery}"` : 'No movies available in this category.'}
            </p>
            {isAuthenticated ? (
              <Link to="/movies/add" className="btn btn-primary">
                + Add a Movie Now
              </Link>
            ) : null}
          </div>
        ) : (
          <div className="movies-grid">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} onDelete={handleDeleteMovie} />
            ))}
          </div>
        )
      ) : (
        // Category Rows View (Netflix Style)
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {categoryGroups.length === 0 ? (
            <div
              className="card-base"
              style={{
                padding: '60px 20px',
                textAlign: 'center',
                color: 'var(--text-secondary)',
              }}
            >
              <Film size={48} color="var(--primary)" style={{ margin: '0 auto 16px auto' }} />
              <h3 style={{ color: '#fff', marginBottom: '8px' }}>No movies found</h3>
              <p>Try searching for a different title or add a movie.</p>
            </div>
          ) : (
            categoryGroups.map((group) => (
              <div key={group.category.id} className="movie-category-section">
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '18px',
                    paddingBottom: '10px',
                    borderBottom: '2px solid var(--border-color)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--primary)' }}>
                      {group.category.category}
                    </h2>
                    <span className="badge badge-dark">
                      {group.movies.length} {group.movies.length === 1 ? 'Movie' : 'Movies'}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCategoryChange(String(group.category.id))}
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    View All →
                  </button>
                </div>

                {group.movies.length === 0 ? (
                  <div
                    style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      padding: '28px',
                      borderRadius: 'var(--radius-md)',
                      textAlign: 'center',
                      color: 'var(--text-muted)',
                      border: '1px dashed var(--border-color)',
                    }}
                  >
                    No movies yet in this category.
                  </div>
                ) : (
                  <div className="movies-grid">
                    {group.movies.map((movie) => (
                      <MovieCard key={movie.id} movie={movie} onDelete={handleDeleteMovie} />
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
