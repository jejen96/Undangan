import { useState, useEffect, useCallback } from 'react'
import { getInvitationBySlug } from '@/services/invitationService'

/**
 * useInvitation — communicates only with invitationService, never with API directly.
 * @param {string} slug
 */
export function useInvitation(slug = 'sakura-demo') {
  const [invitation, setInvitation] = useState(null)
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState(null)

  const fetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getInvitationBySlug(slug)
      setInvitation(data)
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan.')
    } finally {
      setLoading(false)
    }
  }, [slug])

  useEffect(() => { fetch() }, [fetch])

  return { invitation, loading, error, refresh: fetch }
}
