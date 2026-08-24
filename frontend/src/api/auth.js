import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({ baseURL: BASE_URL })

// Attach token ke setiap request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export async function apiLogin({ email, password }) {
  const { data } = await api.post('/api/auth/login', { email, password })
  return data
}

export async function apiRegister({ full_name, email, whatsapp }) {
  const { data } = await api.post('/api/auth/register', { full_name, email, whatsapp })
  return data
}

export async function apiForgotPassword({ email }) {
  const { data } = await api.post('/api/auth/forgot-password', { email })
  return data
}

export async function apiLogout() {
  const { data } = await api.post('/api/auth/logout')
  return data
}

export async function apiMe() {
  const { data } = await api.get('/api/auth/me')
  return data
}
