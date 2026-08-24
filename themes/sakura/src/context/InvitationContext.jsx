import { createContext, useContext } from 'react'
import { useInvitation } from '@/hooks/useInvitation'

const InvitationContext = createContext(null)

export function InvitationProvider({ slug, children }) {
  const { invitation, loading, error, refresh } = useInvitation(slug)

  return (
    <InvitationContext.Provider value={{ invitation, loading, error, refresh }}>
      {children}
    </InvitationContext.Provider>
  )
}

export function useInvitationContext() {
  const ctx = useContext(InvitationContext)
  if (!ctx) throw new Error('useInvitationContext must be used within InvitationProvider')
  return ctx
}
