import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export async function fetchTemplates({ hasPhoto = null, category = null } = {}) {
  const params = {}
  if (hasPhoto !== null) params.has_photo = hasPhoto
  if (category !== null) params.category = category
  const { data } = await axios.get(`${BASE_URL}/api/templates`, { params })
  return data.data ?? data
}

export async function fetchTemplateBySlug(slug) {
  const { data } = await axios.get(`${BASE_URL}/api/templates/by-slug/${slug}`)
  return data.data ?? data
}
