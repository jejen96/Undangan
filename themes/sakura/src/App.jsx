import { InvitationProvider } from '@/context/InvitationContext'
import InvitationPage from '@/pages/InvitationPage'
import PreviewPage from '@/pages/PreviewPage'

/**
 * Simple client-side routing tanpa library tambahan.
 * /preview  → PreviewPage  (dipakai sebagai iframe di editor portal)
 * /u/:slug  → InvitationPage (undangan full untuk tamu)
 * /         → InvitationPage dengan slug demo
 */
function getRoute() {
  const path = window.location.pathname
  if (path === '/preview' || path.startsWith('/preview')) return 'preview'
  const parts = path.split('/')
  const idx   = parts.indexOf('u')
  const slug  = idx !== -1 && parts[idx + 1] ? parts[idx + 1] : 'sakura-demo'
  return { page: 'invitation', slug }
}

export default function App() {
  const route = getRoute()

  if (route === 'preview') {
    return <PreviewPage />
  }

  return (
    <InvitationProvider slug={route.slug}>
      <InvitationPage />
    </InvitationProvider>
  )
}
