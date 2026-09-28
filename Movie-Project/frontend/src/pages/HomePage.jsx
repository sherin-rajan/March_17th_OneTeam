import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Film, Play, Compass, Star, ChevronRight, Sparkles, PlusCircle } from 'lucide-react'
import api, { getImageUrl } from '../api/client'
import { useAuth } from '../context/AuthContext'
import MovieCard from '../components/MovieCard'
import LoadingSpinner from '../components/LoadingSpinner'

export default function HomePage() {
  const { isAuthenticated } = useAuth()
  const [movies, setMovies] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [heroMovie, setHeroMovie] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesRes, catRes] = await Promise.all([
          api.get('/api/movies/movies/'),
          api.get('/api/movies/categories/'),
        ])
        const allMovies = moviesRes.data.results || moviesRes.data
        const allCats = catRes.data.results || catRes.data

        setMovies(allMovies)
        setCategories(allCats)

        if (allMovies.length > 0) {
          // Pick the first movie with trailer or poster as hero
          const featured = allMovies.find((m) => m.trailer_link) || allMovies[0]
          setHeroMovie(featured)
        }
      } catch (err) {
        console.error('Failed to load home page data:', err)
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
      if (heroMovie?.id === id) {
        const remaining = movies.filter((m) => m.id !== id)
        setHeroMovie(remaining[0] || null)
      }
    } catch (err) {
      alert('Failed to delete movie: ' + (err.response?.data?.detail || err.message))
    }
  }

  if (loading) {
    return <LoadingSpinner text="Loading MovieHub..." />
  }

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* Hero Banner */}
      <section
        style={{
          position: 'relative',
          minHeight: '480px',
          display: 'flex',
          alignItems: 'center',
          background: heroMovie?.poster
            ? `linear-gradient(to right, rgba(15, 16, 20, 0.96) 30%, rgba(15, 16, 20, 0.75) 70%, rgba(15, 16, 20, 0.95) 100%), url(${getImageUrl(heroMovie.poster)}) center/cover no-repeat`
            : 'linear-gradient(135deg, #181a24 0%, #0f1014 100%)',
          borderBottom: '1px solid var(--border-color)',
          overflow: 'hidden',
        }}
      >
        <div className="container" style={{ padding: '60px 24px', width: '100%', zIndex: 2 }}>
          <div style={{ maxWidth: '640px' }}>
            {heroMovie?.category_name && (
              <span className="badge badge-gold" style={{ marginBottom: '14px' }}>
                <Sparkles size={12} /> {heroMovie.category_name}
              </span>
            )}

            <h1
              style={{
                fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                marginBottom: '16px',
                color: '#fff',
                letterSpacing: '-0.5px',
              }}
            >
              {heroMovie ? heroMovie.movie : 'Welcome to MovieHub'}
            </h1>

            <p
              style={{
                fontSize: '1.05rem',
                color: 'var(--text-secondary)',
                marginBottom: '28px',
                lineHeight: 1.6,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {heroMovie?.description ||
                'Discover your favourite movies, explore different genres, and manage your personal movie collection with ease.'}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
              {heroMovie ? (
                <Link to={`/movies/${heroMovie.id}`} className="btn btn-primary btn-lg">
                  <Play size={18} fill="#000" />
                  <span>Watch & Explore</span>
                </Link>
              ) : null}

              <Link to="/movies" className="btn btn-outline btn-lg">
                <Compass size={18} />
                <span>Browse All Movies</span>
              </Link>

              {isAuthenticated && (
                <Link to="/movies/add" className="btn btn-secondary btn-lg">
                  <PlusCircle size={18} />
                  <span>Add Movie</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Category Quick Chips */}
      {categories.length > 0 && (
        <section style={{ padding: '30px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflowX: 'auto', paddingBottom: '6px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Genres:
              </span>
              <Link to="/movies" className="badge badge-dark" style={{ padding: '6px 14px' }}>
                All ({movies.length})
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/movies?category=${cat.id}`}
                  className="badge badge-dark"
                  style={{ padding: '6px 14px', textDecoration: 'none' }}
                >
                  {cat.category} {cat.movies_count !== undefined && `(${cat.movies_count})`}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Movies Section */}
      <section style={{ paddingTop: '50px' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: '28px',
            }}
          >
            <div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>
                Featured Movies
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Explore popular titles and community reviews
              </p>
            </div>

            <Link
              to="/movies"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                color: 'var(--primary)',
                fontWeight: 600,
                fontSize: '0.95rem',
              }}
            >
              <span>View All</span>
              <ChevronRight size={18} />
            </Link>
          </div>

          {movies.length === 0 ? (
            <div
              className="card-base"
              style={{
                padding: '48px 20px',
                textAlign: 'center',
                color: 'var(--text-secondary)',
              }}
            >
              <Film size={48} color="var(--primary)" style={{ margin: '0 auto 16px auto' }} />
              <h3 style={{ color: '#fff', marginBottom: '8px' }}>No movies yet</h3>
              <p style={{ marginBottom: '20px' }}>Be the first to add a movie to MovieHub!</p>
              {isAuthenticated ? (
                <Link to="/movies/add" className="btn btn-primary">
                  + Add Movie
                </Link>
              ) : (
                <Link to="/login" className="btn btn-primary">
                  Login to Add Movie
                </Link>
              )}
            </div>
          ) : (
            <div className="movies-grid">
              {movies.slice(0, 8).map((movie) => (
                <MovieCard key={movie.id} movie={movie} onDelete={handleDeleteMovie} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Showcase Section */}
      <section style={{ marginTop: '70px', paddingTop: '50px', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, textAlign: 'center', marginBottom: '36px' }}>
            Why Choose MovieHub?
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            <div className="card-base" style={{ padding: '28px' }}>
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '12px',
                  background: 'var(--primary-glow)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '18px',
                }}
              >
                <Film size={26} color="var(--primary)" />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Movie Catalog</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Store, categorize, and browse your entire cinema catalog with posters, trailers, and release dates.
              </p>
            </div>

            <div className="card-base" style={{ padding: '28px' }}>
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '12px',
                  background: 'var(--primary-glow)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '18px',
                }}
              >
                <Star size={26} color="var(--primary)" />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Reviews & Ratings</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Rate movies from 1 to 5 stars, leave detailed feedback, and explore genuine reviews from other movie buffs.
              </p>
            </div>

            <div className="card-base" style={{ padding: '28px' }}>
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '12px',
                  background: 'var(--primary-glow)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '18px',
                }}
              >
                <Play size={26} color="var(--primary)" fill="var(--primary)" />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Trailers & Cast Profiles</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Watch embedded trailers in high definition, track cast directors, producers, and explore actor filmographies.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
