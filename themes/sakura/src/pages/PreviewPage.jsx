
import { useState, useEffect, lazy, Suspense } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import SakuraCanvas from '@/effects/SakuraCanvas'
import HeroSection from '@/components/Hero/HeroSection'
import FloatingNav from '@/components/Navigation/FloatingNav'
import MusicButton from '@/components/Music/MusicButton'
import mockInvitation from '@/data/mockInvitation'

const CoupleSection    = lazy(() => import('@/components/Bride/CoupleSection'))
const CountdownSection = lazy(() => import('@/components/Countdown/CountdownSection'))
const EventSection     = lazy(() => import('@/components/Event/EventSection'))
const GallerySection   = lazy(() => import('@/components/Gallery/GallerySection'))
const StorySection     = lazy(() => import('@/components/Story/StorySection'))
const GiftSection      = lazy(() => import('@/components/Gift/GiftSection'))
const RSVPSection      = lazy(() => import('@/components/RSVP/RSVPSection'))
const WishSection      = lazy(() => import('@/components/Wish/WishSection'))
const FooterSection    = lazy(() => import('@/components/Footer/FooterSection'))

function SectionFallback() {
  return (
    <div className="flex items-center justify-center py-16">
      <span className="text-[#C8A165] text-2xl animate-spin">✦</span>
    </div>
  )
}

/**
 * PreviewPage — menerima data undangan dari portal via postMessage.
 * Juga bisa dibuka langsung sebagai standalone preview.
 */
export default function PreviewPage() {
  const [invitation, setInvitation] = useState(mockInvitation)
  const [template, setTemplate]     = useState(null)
  const [opened, setOpened]         = useState(false)

  // Terima pesan dari portal editor
  useEffect(() => {
    const handler = (event) => {
      // Security: only accept from known origins
      const allowed = ['http://localhost:5173', 'http://localhost:5174', window.location.origin]
      if (!allowed.includes(event.origin)) return

      if (event.data?.type === 'INVITATION_UPDATE') {
        if (event.data.invitation) setInvitation(event.data.invitation)
        if (event.data.template)   setTemplate(event.data.template)
      }

      // Auto-open untuk preview mode
      if (event.data?.type === 'PREVIEW_OPEN') {
        setOpened(true)
      }
    }

    window.addEventListener('message', handler)

    // Beri tahu portal bahwa iframe sudah siap
    window.parent?.postMessage({ type: 'PREVIEW_READY' }, '*')

    return () => window.removeEventListener('message', handler)
  }, [])

  // Jika standalone (bukan iframe), langsung buka
  useEffect(() => {
    const isIframe = window.self !== window.top
    if (!isIframe) setOpened(true)
  }, [])

  const inv = invitation || mockInvitation

  return (
    <HelmetProvider>
      <SakuraCanvas />
      {opened && <FloatingNav />}
      {opened && <MusicButton music={inv.music} />}

      <main className="relative z-10">
        <HeroSection
          couple={inv.couple}
          settings={inv.settings}
          onOpen={() => setOpened(true)}
          opened={opened}
        />

        {opened && (
          <Suspense fallback={<SectionFallback />}>
            <CoupleSection    couple={inv.couple}       quote={inv.quote} />
            <CountdownSection countdown={inv.countdown} />
            <EventSection     events={inv.events} />
            <GallerySection   gallery={inv.gallery} />
            <StorySection     story={inv.story} />
            <GiftSection      gift={inv.gift} />
            <RSVPSection      rsvp={inv.rsvp} />
            <WishSection />
            <FooterSection    couple={inv.couple} settings={inv.settings} />
          </Suspense>
        )}
      </main>
    </HelmetProvider>
  )
}
