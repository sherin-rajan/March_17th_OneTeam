import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Film, LogIn, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const from = location.state?.from?.pathname || '/movies'

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username.trim() || !password) {
      setError('Please fill in both fields.')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      await login(username.trim(), password)
      navigate(from, { replace: true })
    } catch (err) {
      console.error(err)
      setError(
        err.response?.data?.detail ||
        'Invalid username or password. Please try again.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      className="container"
      style={{
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
      }}
    >
      <div
        className="card-base"
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: '40px 32px',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
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
            <Film size={26} />
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>
            Welcome Back
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
            Login to continue to your MovieHub account
          </p>
        </div>

        {error && (
          <div
            style={{
              padding: '12px 14px',
              background: 'rgba(229, 9, 20, 0.15)',
              border: '1px solid var(--danger)',
              borderRadius: 'var(--radius-md)',
              color: '#ff6b6b',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '20px',
            }}
          >
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary btn-lg"
            style={{ width: '100%', marginTop: '8px' }}
          >
            <LogIn size={18} />
            <span>{submitting ? 'Logging in...' : 'Login'}</span>
          </button>
        </form>

        <p
          style={{
            textAlign: 'center',
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            marginTop: '24px',
          }}
        >
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 600 }}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  )
}
