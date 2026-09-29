import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Calendar,
  Play,
  Edit3,
  Trash2,
  UserPlus,
  MessageSquarePlus,
  Send,
} from 'lucide-react'
import api, { getImageUrl, getYoutubeEmbedUrl } from '../api/client'
import { useAuth } from '../context/AuthContext'
import StarRating from '../components/StarRating'
import CastCard from '../components/CastCard'
import LoadingSpinner from '../components/LoadingSpinner'

export default function MovieDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated, isManager } = useAuth()

  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Review form state
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewComment, setReviewComment] = useState('')
  const [submittingReview, setSubmittingReview] = useState(false)
  const [reviewFeedback, setReviewFeedback] = useState('')

  useEffect(() => {
    fetchMovie()
  }, [id])

  const fetchMovie = async () => {
    try {
      setLoading(true)
      const res = await api.get(`/api/movies/movies/${id}/`)
      setMovie(res.data)
    } catch (err) {
      console.error(err)
      setError('Movie not found or failed to load.')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteMovie = async () => {
    if (!window.confirm(`Are you sure you want to delete "${movie.movie}"?`)) return
    try {
      await api.delete(`/api/movies/movies/${id}/`)
      navigate('/movies')
    } catch (err) {
      alert('Failed to delete movie: ' + (err.response?.data?.detail || err.message))
    }
  }

  const handleSubmitReview = async (e) => {
    e.preventDefault()
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/movies/${id}` } })
      return
    }
    if (!reviewComment.trim()) {
      alert('Please enter a comment.')
      return
    }

    setSubmittingReview(true)
    setReviewFeedback('')
    try {
      await api.post('/api/movies/reviews/', {
        movie: parseInt(id, 10),
        rating: reviewRating,
        comment: reviewComment,
      })
      setReviewFeedback('Review submitted successfully!')
      setReviewComment('')
      setShowReviewForm(false)
      // Refetch movie to refresh reviews and average rating
      await fetchMovie()
    } catch (err) {
      alert('Failed to submit review: ' + (err.response?.data?.detail || JSON.stringify(err.response?.data) || err.message))
    } finally {
      setSubmittingReview(false)
    }
  }

  if (loading) {
    return <LoadingSpinner text="Loading movie details..." />
  }

  if (error || !movie) {
    return (
      <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--danger)', marginBottom: '16px' }}>{error || 'Movie not found'}</h2>
        <Link to="/movies" className="btn btn-outline">
          ← Back to All Movies
        </Link>
      </div>
    )
  }

  const trailerEmbed = getYoutubeEmbedUrl(movie.trailer_link)

  // Filter casts by role
  const actors = (movie.casts || []).filter((c) => c.role === 'ACTOR')
  const directors = (movie.casts || []).filter((c) => c.role === 'DIRECTOR')
  const producers = (movie.casts || []).filter((c) => c.role === 'PRODUCER')

  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* Top Navigation Bar */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.02)',
          borderBottom: '1px solid var(--border-color)',
          padding: '12px 0',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
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
            }}
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>

          {isManager && (
            <div style={{ display: 'flex', gap: '8px' }}>
              <Link to={`/movies/${id}/cast/add`} className="btn btn-secondary btn-sm" style={{ gap: '6px' }}>
                <UserPlus size={15} />
                <span>Assign Cast</span>
              </Link>
              <Link to={`/movies/${id}/edit`} className="btn btn-secondary btn-sm" style={{ gap: '6px' }}>
                <Edit3 size={15} />
                <span>Edit</span>
              </Link>
              <button
                type="button"
                onClick={handleDeleteMovie}
                className="btn btn-danger btn-sm"
                style={{ gap: '6px' }}
              >
                <Trash2 size={15} />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Trailer Section */}
      <section style={{ backgroundColor: '#07070a', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ padding: '24px' }}>
          {trailerEmbed ? (
            <div
              style={{
                position: 'relative',
                width: '100%',
                paddingTop: '56.25%', // 16:9 ratio
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
                background: '#000',
              }}
            >
              <iframe
                src={trailerEmbed}
                title={`${movie.movie} Trailer`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          ) : (
            <div
              style={{
                padding: '40px 20px',
                textAlign: 'center',
                color: 'var(--text-muted)',
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Play size={36} color="var(--text-muted)" />
              <p>No trailer video link available for this movie.</p>
            </div>
          )}
        </div>
      </section>

      {/* Main Details Body */}
      <div className="container" style={{ marginTop: '40px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(260px, 320px) 1fr',
            gap: '40px',
          }}
          className="movie-detail-grid"
        >
          {/* Left Column: Poster & Review Form Trigger */}
          <div>
            <div
              className="card-base"
              style={{
                overflow: 'hidden',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                marginBottom: '24px',
              }}
            >
              <img
                src={getImageUrl(movie.poster)}
                alt={movie.movie}
                style={{ width: '100%', display: 'block', objectFit: 'cover' }}
              />
            </div>

            {/* Write a Review Button */}
            <button
              type="button"
              onClick={() => {
                if (!isAuthenticated) {
                  navigate('/login', { state: { from: `/movies/${id}` } })
                } else {
                  setShowReviewForm(!showReviewForm)
                }
              }}
              className="btn btn-primary"
              style={{ width: '100%', padding: '12px', gap: '8px', marginBottom: '24px' }}
            >
              <MessageSquarePlus size={18} />
              <span>{showReviewForm ? '✖ Close Review Form' : '✍ Write a Review'}</span>
            </button>

            {/* Collapsible Review Form */}
            {showReviewForm && (
              <div
                className="card-base"
                style={{
                  padding: '20px',
                  marginBottom: '24px',
                  border: '1px solid var(--primary)',
                }}
              >
                <h4 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--primary)' }}>
                  Rate & Review
                </h4>
                <form onSubmit={handleSubmitReview}>
                  <div className="form-group" style={{ marginBottom: '14px' }}>
                    <label className="form-label">Your Rating (1 to 5 Stars)</label>
                    <div style={{ padding: '6px 0' }}>
                      <StarRating
                        rating={reviewRating}
                        size={24}
                        interactive={true}
                        onChange={(r) => setReviewRating(r)}
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: '16px' }}>
                    <label className="form-label">Your Review</label>
                    <textarea
                      rows="4"
                      className="form-textarea"
                      placeholder="Share your thoughts on the acting, plot, direction..."
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submittingReview}
                    className="btn btn-primary btn-sm"
                    style={{ width: '100%', gap: '6px' }}
                  >
                    <Send size={15} />
                    <span>{submittingReview ? 'Submitting...' : 'Submit Review'}</span>
                  </button>
                </form>
              </div>
            )}

            {reviewFeedback && (
              <div
                style={{
                  padding: '12px',
                  background: 'rgba(40, 167, 69, 0.15)',
                  border: '1px solid #28a745',
                  borderRadius: 'var(--radius-md)',
                  color: '#28a745',
                  fontSize: '0.9rem',
                  marginBottom: '20px',
                  textAlign: 'center',
                }}
              >
                {reviewFeedback}
              </div>
            )}
          </div>

          {/* Right Column: Title, Metadata, Description, Cast, Reviews */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              {movie.category_name && (
                <span className="badge badge-gold">{movie.category_name}</span>
              )}
              {movie.release_date && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  <Calendar size={14} /> {movie.release_date}
                </span>
              )}
            </div>

            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, marginBottom: '16px', lineHeight: 1.15 }}>
              {movie.movie}
            </h1>

            {/* Average Rating Banner */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '12px 18px',
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                marginBottom: '24px',
                width: 'fit-content',
              }}
            >
              <StarRating rating={movie.average_rating || 0} size={20} />
              <span style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--primary)' }}>
                {movie.average_rating > 0 ? movie.average_rating : 'New'}
              </span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                ({movie.reviews?.length || 0} {movie.reviews?.length === 1 ? 'review' : 'reviews'})
              </span>
            </div>

            {/* Description */}
            <div style={{ marginBottom: '36px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '10px', color: 'var(--primary)' }}>
                About the Movie
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                {movie.description || 'No description provided.'}
              </p>
            </div>

            {/* Cast & Crew Section */}
            <section style={{ marginBottom: '44px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '18px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid var(--border-color)',
                }}
              >
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff' }}>
                  Cast & Crew
                </h3>
                {isManager && (
                  <Link to={`/movies/${id}/cast/add`} className="btn btn-outline btn-sm" style={{ gap: '4px' }}>
                    <UserPlus size={14} /> Assign Cast
                  </Link>
                )}
              </div>

              {/* Actors */}
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.5px' }}>
                  Actors ({actors.length})
                </h4>
                {actors.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No actors assigned yet.</p>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
                    {actors.map((cast) => (
                      <CastCard key={cast.id} cast={cast} />
                    ))}
                  </div>
                )}
              </div>

              {/* Directors */}
              {directors.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.5px' }}>
                    Directors ({directors.length})
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
                    {directors.map((cast) => (
                      <CastCard key={cast.id} cast={cast} />
                    ))}
                  </div>
                </div>
              )}

              {/* Producers */}
              {producers.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.5px' }}>
                    Producers ({producers.length})
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
                    {producers.map((cast) => (
                      <CastCard key={cast.id} cast={cast} />
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* Community Reviews Section */}
            <section>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid var(--border-color)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff' }}>
                    Audience Reviews
                  </h3>
                  <span className="badge badge-gold">{movie.reviews?.length || 0}</span>
                </div>
              </div>

              {(!movie.reviews || movie.reviews.length === 0) ? (
                <div
                  className="card-base"
                  style={{
                    padding: '36px 20px',
                    textAlign: 'center',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <p style={{ marginBottom: '14px' }}>No reviews yet. Be the first to share your thoughts!</p>
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(true)}
                    className="btn btn-outline btn-sm"
                  >
                    Write a Review
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {movie.reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="card-base"
                      style={{
                        padding: '18px 20px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              background: 'var(--primary-glow)',
                              color: 'var(--primary)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 700,
                              fontSize: '0.85rem',
                              border: '1px solid var(--primary)',
                            }}
                          >
                            {rev.username ? rev.username[0].toUpperCase() : 'U'}
                          </div>
                          <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                            {rev.username}
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <StarRating rating={rev.rating} size={14} />
                          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)' }}>
                            {rev.rating}/5
                          </span>
                        </div>
                      </div>

                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                        {rev.comment}
                      </p>

                      {rev.date && (
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', alignSelf: 'flex-end' }}>
                          {rev.date}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .movie-detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
