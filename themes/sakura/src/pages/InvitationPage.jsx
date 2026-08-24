
import { useState, lazy, Suspense } from 'react'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { useInvitationContext } from '@/context/InvitationContext'
import LoadingScreen from '@/components/Loading/LoadingScreen'
import SakuraCanvas from '@/effects/SakuraCanvas'
import HeroSection from '@/components/Hero/HeroSection'
import FloatingNav from '@/components/Navigation/FloatingNav'
import MusicButton from '@/components/Music/MusicButton'

const CoupleSection   = lazy(() => import('@/components/Bride/CoupleSection'))
const CountdownSection = lazy(() => import('@/components/Countdown/CountdownSection'))
const EventSection    = lazy(() => import('@/components/Event/EventSection'))
const GallerySection  = lazy(() => import('@/components/Gallery/GallerySection'))
const StorySection    = lazy(() => import('@/components/Story/StorySection'))
const GiftSection     = lazy(() => import('@/components/Gift/GiftSection'))
const RSVPSection     = lazy(() => import('@/components/RSVP/RSVPSection'))
const WishSection     = lazy(() => import('@/components/Wish/WishSection'))
const FooterSection   = lazy(() => import('@/components/Footer/FooterSection'))

function SectionFallback() {
  return (
    <div className="flex items-center justify-center py-20">
      <span className="text-sakura-accent text-2xl animate-spin">✦</span>
    </div>
  )
}

export default function InvitationPage() {
  const { invitation, loading, error } = useInvitationContext()
  const [opened, setOpened] = useState(false)

  // Still loading from API
  if (loading) return <LoadingScreen show />

  // API error
  if (error || !invitation) {
    return (
      <div className="min-h-screen bg-sakura-bg flex items-center justify-center text-center px-6">
        <div>
          <p className="text-5xl mb-4">🌸</p>
          <h1 className="font-serif text-2xl text-sakura-dark mb-2">Undangan tidak ditemukan</h1>
          <p className="font-body text-sm text-sakura-muted">{error || 'Silakan cek kembali URL undangan Anda.'}</p>
        </div>
      </div>
    )
  }

  const handleOpen = () => setOpened(true)

  return (
    <HelmetProvider>
      <Helmet>
        <title>{invitation.seo?.title || 'Undangan Pernikahan'}</title>
        <meta name="description" content={invitation.seo?.description} />
        <meta property="og:title"       content={invitation.seo?.title} />
        <meta property="og:description" content={invitation.seo?.description} />
        <meta property="og:image"       content={invitation.seo?.thumbnail} />
        <meta property="og:url"         content={invitation.seo?.ogUrl} />
        <meta name="twitter:card"       content="summary_large_image" />
      </Helmet>

      {/* Sakura petals — always visible */}
      {invitation.animations?.sakuraPetals && <SakuraCanvas />}

      {/* Floating controls — only after opened */}
      {opened && <FloatingNav />}
      {opened && <MusicButton music={invitation.music} />}

      {/* Loading overlay — fade out after service loads */}
      <LoadingScreen show={false} />

      <main className="relative z-10">
        {/* Hero is always visible — gate for the rest */}
        <HeroSection
          couple={invitation.couple}
          settings={invitation.settings}
          onOpen={handleOpen}
          opened={opened}
        />

        {/* Rest of content shown only after "Buka Undangan" */}
        {opened && (
          <Suspense fallback={<SectionFallback />}>
            <CoupleSection   couple={invitation.couple} quote={invitation.quote} />
            <CountdownSection countdown={invitation.countdown} />
            <EventSection    events={invitation.events} />
            <GallerySection  gallery={invitation.gallery} />
            <StorySection    story={invitation.story} />
            <GiftSection     gift={invitation.gift} />
            <RSVPSection     rsvp={invitation.rsvp} />
            <WishSection />
            <FooterSection   couple={invitation.couple} settings={invitation.settings} />
          </Suspense>
        )}
      </main>
    </HelmetProvider>
  )
}
