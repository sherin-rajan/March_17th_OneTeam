import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'

import HomePage from './pages/HomePage'
import MoviesPage from './pages/MoviesPage'
import MovieDetailPage from './pages/MovieDetailPage'
import AddMoviePage from './pages/AddMoviePage'
import EditMoviePage from './pages/EditMoviePage'
import AddCategoryPage from './pages/AddCategoryPage'
import AddCastPage from './pages/AddCastPage'
import ActorDetailPage from './pages/ActorDetailPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ManagerPanelPage from './pages/ManagerPanelPage'

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/movies" element={<MoviesPage />} />
              <Route path="/movies/:id" element={<MovieDetailPage />} />
              <Route path="/actors/:id" element={<ActorDetailPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/manager"
                element={
                  <ProtectedRoute managerOnly>
                    <ManagerPanelPage />
                  </ProtectedRoute>
                }
              />

              {/* Protected / Management Routes */}
              <Route
                path="/movies/add"
                element={
                  <ProtectedRoute managerOnly>
                    <AddMoviePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/movies/:id/edit"
                element={
                  <ProtectedRoute managerOnly>
                    <EditMoviePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/movies/:id/cast/add"
                element={
                  <ProtectedRoute managerOnly>
                    <AddCastPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cast/add"
                element={
                  <ProtectedRoute managerOnly>
                    <AddCastPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/categories/add"
                element={
                  <ProtectedRoute managerOnly>
                    <AddCategoryPage />
                  </ProtectedRoute>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  )
}
