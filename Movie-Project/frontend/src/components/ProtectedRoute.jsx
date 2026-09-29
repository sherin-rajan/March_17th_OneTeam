import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoadingSpinner from './LoadingSpinner'

export default function ProtectedRoute({ children, managerOnly = false }) {
  const { isAuthenticated, isManager, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <LoadingSpinner text="Checking authentication..." />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (managerOnly && !isManager) {
    return <Navigate to="/movies" replace />
  }

  return children
}
