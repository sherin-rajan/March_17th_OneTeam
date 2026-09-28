import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Film, PlusCircle, FolderPlus, LogIn, LogOut, User, Menu, X, Search } from 'lucide-react'

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/movies?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setMobileMenuOpen(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
    setMobileMenuOpen(false)
  }

  const isActive = (path) => location.pathname === path

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'rgba(15, 16, 20, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '70px',
        }}
      >
        {/* Brand Logo */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '1.45rem',
            fontWeight: 800,
            color: 'var(--primary)',
            letterSpacing: '-0.5px',
          }}
        >
          <Film size={26} color="var(--primary)" />
          <span>MovieHub</span>
        </Link>

        {/* Search Bar - Desktop */}
        <form
          onSubmit={handleSearch}
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'var(--bg-input)',
            borderRadius: 'var(--radius-md)',
            padding: '6px 14px',
            border: '1px solid var(--border-color)',
            maxWidth: '320px',
            width: '100%',
            marginLeft: '20px',
            marginRight: 'auto',
          }}
          className="desktop-search"
        >
          <Search size={18} color="var(--text-muted)" style={{ marginRight: '8px' }} />
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: '0.9rem',
              width: '100%',
            }}
          />
        </form>

        {/* Desktop Nav Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}
          className="desktop-nav"
        >
          <Link
            to="/"
            style={{
              fontWeight: 600,
              fontSize: '0.95rem',
              color: isActive('/') ? 'var(--primary)' : 'var(--text-primary)',
              transition: 'var(--transition)',
            }}
          >
            Home
          </Link>
          <Link
            to="/movies"
            style={{
              fontWeight: 600,
              fontSize: '0.95rem',
              color: isActive('/movies') ? 'var(--primary)' : 'var(--text-primary)',
              transition: 'var(--transition)',
            }}
          >
            All Movies
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/movies/add"
                className="btn btn-outline btn-sm"
                style={{ gap: '6px' }}
              >
                <PlusCircle size={16} />
                <span>Add Movie</span>
              </Link>

              <Link
                to="/categories/add"
                className="btn btn-secondary btn-sm"
                style={{ gap: '6px' }}
                title="Add Category"
              >
                <FolderPlus size={16} />
                <span>Category</span>
              </Link>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  paddingLeft: '10px',
                  borderLeft: '1px solid var(--border-color)',
                }}
              >
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    background: 'var(--primary)',
                    color: '#000',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textTransform: 'uppercase',
                  }}
                  title={user?.email || user?.username}
                >
                  {user?.first_name ? user.first_name[0] : (user?.username ? user.username[0] : 'U')}
                </div>
                <span
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    maxWidth: '120px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {user?.first_name || user?.username}
                </span>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="btn btn-secondary btn-sm"
                  style={{ padding: '6px 10px' }}
                  title="Logout"
                >
                  <LogOut size={16} />
                </button>
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Link to="/login" className="btn btn-outline btn-sm" style={{ gap: '6px' }}>
                <LogIn size={16} />
                <span>Login</span>
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                <span>Register</span>
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="mobile-trigger"
          style={{
            display: 'none',
            color: 'var(--text-primary)',
          }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            background: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-color)',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ padding: '8px 12px' }}
            />
            <button type="submit" className="btn btn-primary btn-sm">
              <Search size={16} />
            </button>
          </form>

          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontWeight: 600, color: isActive('/') ? 'var(--primary)' : 'inherit' }}
          >
            Home
          </Link>
          <Link
            to="/movies"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontWeight: 600, color: isActive('/movies') ? 'var(--primary)' : 'inherit' }}
          >
            All Movies
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/movies/add"
                onClick={() => setMobileMenuOpen(false)}
                style={{ fontWeight: 600 }}
              >
                + Add Movie
              </Link>
              <Link
                to="/categories/add"
                onClick={() => setMobileMenuOpen(false)}
                style={{ fontWeight: 600 }}
              >
                + Add Category
              </Link>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '12px',
                  borderTop: '1px solid var(--border-color)',
                }}
              >
                <span>Logged in as <strong>{user?.username}</strong></span>
                <button
                  onClick={handleLogout}
                  className="btn btn-danger btn-sm"
                  style={{ gap: '6px' }}
                >
                  <LogOut size={14} /> Logout
                </button>
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', gap: '10px', paddingTop: '10px' }}>
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-outline"
                style={{ flex: 1 }}
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-primary"
                style={{ flex: 1 }}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .desktop-search,
          .desktop-nav {
            display: none !important;
          }
          .mobile-trigger {
            display: block !important;
          }
        }
      `}</style>
    </header>
  )
}
