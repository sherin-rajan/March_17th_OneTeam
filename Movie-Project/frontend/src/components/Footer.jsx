import { Film, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#0a0a0d',
        borderTop: '1px solid var(--border-color)',
        padding: '40px 0 24px 0',
        marginTop: 'auto',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px',
            paddingBottom: '24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Film size={22} color="var(--primary)" />
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>
              MovieHub
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginLeft: '12px' }}>
              Your ultimate movie & cast discovery portal
            </span>
          </div>

          <div style={{ display: 'flex', gap: '20px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            <Link to="/" style={{ transition: 'var(--transition)' }}>Home</Link>
            <Link to="/movies" style={{ transition: 'var(--transition)' }}>Browse</Link>
            <Link to="/categories/add" style={{ transition: 'var(--transition)' }}>Categories</Link>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            paddingTop: '20px',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
          }}
        >
          <p>© {new Date().getFullYear()} MovieHub. All Rights Reserved.</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            Decoupled React Frontend & Django REST Backend
          </p>
        </div>
      </div>
    </footer>
  )
}
