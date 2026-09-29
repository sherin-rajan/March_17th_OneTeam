import { createContext, useContext, useState, useEffect } from 'react'
import api from '../api/client'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('user')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('access_token')
      if (token) {
        try {
          const res = await api.get('/api/accounts/me/')
          setUser(res.data)
          localStorage.setItem('user', JSON.stringify(res.data))
        } catch {
          // Token might be expired or invalid
          setUser(null)
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          localStorage.removeItem('user')
        }
      }
      setLoading(false)
    }

    initAuth()
  }, [])

  const login = async (username, password) => {
    const res = await api.post('/api/accounts/login/', { username, password })
    const { access, refresh, user: userData } = res.data

    localStorage.setItem('access_token', access)
    localStorage.setItem('refresh_token', refresh)

    let finalUser = userData
    if (!finalUser) {
      try {
        const meRes = await api.get('/api/accounts/me/', {
          headers: { Authorization: `Bearer ${access}` },
        })
        finalUser = meRes.data
      } catch {
        finalUser = { username }
      }
    }

    setUser(finalUser)
    localStorage.setItem('user', JSON.stringify(finalUser))
    return finalUser
  }

  const register = async (userData) => {
    const res = await api.post('/api/accounts/register/', userData)
    const { access, refresh, user: newUser } = res.data

    if (access) {
      localStorage.setItem('access_token', access)
      localStorage.setItem('refresh_token', refresh)
      setUser(newUser)
      localStorage.setItem('user', JSON.stringify(newUser))
    }
    return res.data
  }

  const logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isManager: !!user?.is_manager,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
