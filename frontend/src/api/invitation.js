import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const api = axios.create({ baseURL: BASE_URL })

api.interceptors.request.use((c) => {
  const token = localStorage.getItem('auth_token')
  if (token) c.headers.Authorization = `Bearer ${token}`
  return c
})

export const fetchInvitation    = async (slug) => { const { data } = await api.get(`/api/invitations/${slug}`); return data.data ?? data }
export const createInvitation   = async (tid) => { const { data } = await api.post('/api/invitations', { template_id: tid }); return data.data ?? data }
export const updateInvitation   = async (slug, body) => { const { data } = await api.put(`/api/invitations/${slug}`, body); return data }
export const deleteInvitation   = async (slug) => { const { data } = await api.delete(`/api/invitations/${slug}`); return data }

export async function uploadPhoto(slug, file, type) {
  const f = new FormData(); f.append('photo', file); f.append('type', type)
  const { data } = await api.post(`/api/invitations/${slug}/upload-photo`, f, { headers: { 'Content-Type': 'multipart/form-data' } })
  return data
}

export async function uploadGallery(slug, files) {
  const f = new FormData()
  files.forEach(file => f.append('photos[]', file))
  const { data } = await api.post(`/api/invitations/${slug}/upload-gallery`, f, { headers: { 'Content-Type': 'multipart/form-data' } })
  return data
}

export async function deleteGalleryPhoto(slug, url) {
  const { data } = await api.post(`/api/invitations/${slug}/delete-gallery`, { url })
  return data
}
