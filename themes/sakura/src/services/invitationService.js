/**
 * Invitation Service — the ONLY file that changes when connecting to backend.
 *
 * Current: returns mock data
 * Future:  GET /api/invitations/:slug
 *
 * No React component imports this file directly — only the hook does.
 */
import mockInvitation from '@/data/mockInvitation'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const USE_API  = import.meta.env.VITE_USE_API === 'true'

/**
 * Fetch invitation by slug
 * @param {string} slug
 * @returns {Promise<object>} invitation data
 */
export async function getInvitationBySlug(slug) {
  if (!USE_API) {
    // Development: return mock data with simulated delay
    await new Promise(r => setTimeout(r, 800))
    return mockInvitation
  }

  // Production: fetch from Laravel API
  const res = await fetch(`${BASE_URL}/api/invitations/public/${slug}`)
  if (!res.ok) {
    if (res.status === 404) throw new Error('Undangan tidak ditemukan.')
    throw new Error('Gagal memuat undangan. Silakan coba lagi.')
  }
  const json = await res.json()
  return json.data ?? json
}
