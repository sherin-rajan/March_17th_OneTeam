import { useState, useEffect, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Search, Film, PlusCircle, LayoutGrid, Rows, Filter, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react'
import api from '../api/client'
import { useAuth } from '../context/AuthContext'
import MovieCard from '../components/MovieCard'
import LoadingSpinner from '../components/LoadingSpinner'

export default function MoviesPage() {
  const { isManager } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()
  const [movies, setMovies] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({ count: 0, next: null, previous: null })
  const [viewMode, setViewMode] = useState('category') // 'category' or 'grid'

  const activeCategory = searchParams.get('category') || 'all'
  const searchQuery = searchParams.get('search') || ''
  const requestedSort = searchParams.get('sort') || 'newest'
  const sortBy = ['newest', 'rating', 'title'].includes(requestedSort) ? requestedSort : 'newest'
  const requestedPage = Number(searchParams.get('page') || 1)
  const currentPage = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1

  useEffect(() => {
    let cancelled = false

    const fetchData = async () => {
      setLoading(true)
      try {
        const params = { page: currentPage, sort: sortBy }
        if (activeCategory !== 'all') params.category = activeCategory
        if (searchQuery.trim()) params.search = searchQuery.trim()

        const response = await api.get('/api/movies/movies/', { params })
        if (cancelled) return
        setMovies(response.data.results || response.data)
        setPagination({
          count: response.data.count ?? response.data.length,
          next: response.data.next ?? null,
          previous: response.data.previous ?? null,
        })
      } catch (err) {
        if (cancelled) return
        console.error('Failed to load movies:', err)
        if (err.response?.status === 404 && currentPage > 1) {
          setSearchParams((params) => {
            const updatedParams = new URLSearchParams(params)
            updatedParams.delete('page')
            return updatedParams
          })
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchData()

    return () => {
      cancelled = true
    }
  }, [activeCategory, currentPage, searchQuery, setSearchParams, sortBy])

  useEffect(() => {
    api.get('/api/movies/categories/')
      .then((response) => setCategories(response.data.results || response.data))
      .catch((err) => console.error('Failed to load categories:', err))
  }, [])

  const handleDeleteMovie = async (id) => {
    try {
      await api.delete(`/api/movies/movies/${id}/`)
      setMovies((prev) => prev.filter((m) => m.id !== id))
      setPagination((prev) => ({ ...prev, count: Math.max(0, prev.count - 1) }))
      if (movies.length === 1 && currentPage > 1) {
        setSearchParams((params) => {
          const updatedParams = new URLSearchParams(params)
          updatedParams.set('page', String(currentPage - 1))
          return updatedParams
        })
      }
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
    newParams.delete('page')
    setSearchParams(newParams)
  }

  const handleSearchChange = (val) => {
    const newParams = new URLSearchParams(searchParams)
    if (val) {
      newParams.set('search', val)
    } else {
      newParams.delete('search')
    }
    newParams.delete('page')
    setSearchParams(newParams)
  }

  const handleSortChange = (value) => {
    const newParams = new URLSearchParams(searchParams)
    if (value === 'newest') {
      newParams.delete('sort')
    } else {
      newParams.set('sort', value)
    }
    newParams.delete('page')
    setSearchParams(newParams)
  }

  const handlePageChange = (page) => {
    const newParams = new URLSearchParams(searchParams)
    if (page === 1) {
      newParams.delete('page')
    } else {
      newParams.set('page', String(page))
    }
    setSearchParams(newParams)
  }

  // Group movies by category for row view
  const categoryGroups = useMemo(() => {
    const groups = []
    categories.forEach((cat) => {
      const groupMovies = movies.filter((m) => m.category === cat.id)
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
  }, [categories, movies, activeCategory])

  const filteredMovies = movies
  const pageCount = Math.ceil(pagination.count / 12)

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

        {isManager && (
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
                onChange={(e) => handleSortChange(e.target.value)}
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
            All Categories ({pagination.count})
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
            {isManager ? (
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
                      {group.movies.length} on this page
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

                {pageCount > 1 && (
                  <nav
                    aria-label="Movie pages"
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '16px',
                      marginTop: '36px',
                      paddingTop: '20px',
                      borderTop: '1px solid var(--border-color)',
                    }}
                  >
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      Showing {(currentPage - 1) * 12 + 1}-{(currentPage - 1) * 12 + movies.length} of {pagination.count} movies
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <button
                        type="button"
                        className="btn btn-outline btn-sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={!pagination.previous}
                        aria-label="Previous page"
                        title="Previous page"
                      >
                        <ChevronLeft size={17} />
                      </button>
                      <span aria-live="polite" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        Page {currentPage} of {pageCount}
                      </span>
                      <button
                        type="button"
                        className="btn btn-outline btn-sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={!pagination.next}
                        aria-label="Next page"
                        title="Next page"
                      >
                        <ChevronRight size={17} />
                      </button>
                    </div>
                  </nav>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
