import axios from 'axios'

export const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

const api = axios.create({
  baseURL: BACKEND_URL,
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      const refreshToken = localStorage.getItem('refresh_token')
      if (refreshToken) {
        originalRequest._retry = true
        try {
          const res = await axios.post(`${BACKEND_URL}/api/accounts/refresh/`, {
            refresh: refreshToken,
          })
          const newAccess = res.data.access
          localStorage.setItem('access_token', newAccess)
          originalRequest.headers.Authorization = `Bearer ${newAccess}`
          return api(originalRequest)
        } catch {
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          localStorage.removeItem('user')
        }
      }
    }
    return Promise.reject(error)
  }
)

export function getImageUrl(path, fallbackType = 'movie') {
  if (!path) {
    if (fallbackType === 'actor') {
      return 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
    }
    return 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80'
  }
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${BACKEND_URL}${cleanPath}`
}

export function getYoutubeEmbedUrl(url) {
  if (!url) return null
  try {
    if (url.includes('embed/')) {
      return url
    }
    let videoId = null
    if (url.includes('watch?v=')) {
      videoId = url.split('watch?v=')[1]?.split('&')[0]
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0]
    }
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`
    }
    return url
  } catch {
    return url
  }
}

export default api
