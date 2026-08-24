/**
 * Mock invitation data — mirrors the future REST API response exactly.
 * Structure: GET /api/invitations/:slug
 */
const mockInvitation = {
  slug: 'sakura-demo',
  theme: 'sakura',

  seo: {
    title:       'Undangan Pernikahan Budi & Sari',
    description: 'Kami mengundang Anda untuk hadir dalam momen bahagia pernikahan kami.',
    thumbnail:   'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
    ogUrl:       'https://undangteman.id/u/sakura-demo',
  },

  couple: {
    groom: {
      name:        'Budi Santoso',
      nickname:    'Budi',
      father:      'Bapak Hendra Santoso',
      mother:      'Ibu Dewi Santoso',
      photo:       'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
      instagram:   '@budi.santoso',
    },
    bride: {
      name:        'Sari Dewi Rahayu',
      nickname:    'Sari',
      father:      'Bapak Ahmad Rahayu',
      mother:      'Ibu Ratna Rahayu',
      photo:       'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
      instagram:   '@sari.dewi',
    },
  },

  quote: {
    arabic: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا',
    text:   'Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan dari jenismu sendiri, agar kamu merasa tenteram kepadanya.',
    source: 'QS. Ar-Rum: 21',
  },

  events: [
    {
      id:       'akad',
      name:     'Akad Nikah',
      date:     '2026-09-14',
      time:     '08:00',
      endTime:  '10:00',
      timezone: 'WIB',
      venue:    'Masjid Al-Ikhlas',
      address:  'Jl. Merpati No. 12, Kebayoran Baru, Jakarta Selatan',
      mapsUrl:  'https://maps.google.com',
      mapsEmbed: 'https://maps.google.com/maps?q=Jakarta&output=embed',
    },
    {
      id:       'resepsi',
      name:     'Resepsi Pernikahan',
      date:     '2026-09-14',
      time:     '11:00',
      endTime:  '14:00',
      timezone: 'WIB',
      venue:    'Grand Ballroom Hotel Mulia',
      address:  'Jl. Asia Afrika No. 8, Senayan, Jakarta Pusat',
      mapsUrl:  'https://maps.google.com',
      mapsEmbed: 'https://maps.google.com/maps?q=Jakarta&output=embed',
    },
  ],

  countdown: {
    targetDate: '2026-09-14T08:00:00+07:00',
  },

  gallery: [
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
    'https://images.unsplash.com/photo-1529636798458-92182e662485?w=600&q=80',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80',
    'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80',
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80',
    'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=600&q=80',
  ],

  story: [
    {
      id:    1,
      date:  '15 Maret 2020',
      title: 'Pertama Bertemu',
      desc:  'Sebuah pertemuan tak terduga di sebuah seminar yang mengubah segalanya.',
      photo: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&q=80',
    },
    {
      id:    2,
      date:  '1 Juni 2021',
      title: 'Mulai Bersama',
      desc:  'Langkah pertama membangun kisah cinta yang penuh warna.',
      photo: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&q=80',
    },
    {
      id:    3,
      date:  '25 Desember 2024',
      title: 'Lamaran',
      desc:  'Di bawah langit berbintang, sebuah pertanyaan yang mengubah hidup.',
      photo: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80',
    },
    {
      id:    4,
      date:  '14 September 2026',
      title: 'Hari Bahagia',
      desc:  'Hari yang selalu kami impikan, akhirnya tiba.',
      photo: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&q=80',
    },
  ],

  gift: {
    enabled: true,
    message: 'Doa dan kehadiran Anda adalah hadiah terbaik bagi kami. Namun jika Anda ingin memberikan tanda kasih, berikut informasinya.',
    banks: [
      { bank: 'BCA',     number: '1234567890', name: 'Budi Santoso' },
      { bank: 'BNI',     number: '0987654321', name: 'Sari Dewi Rahayu' },
      { bank: 'Mandiri', number: '1122334455', name: 'Budi & Sari' },
    ],
    qris: 'https://images.unsplash.com/photo-1595246135406-18b8e4dec1b3?w=300&q=80',
    address: 'Jl. Merpati No. 12, Kebayoran Baru, Jakarta Selatan 12110',
  },

  music: {
    enabled:  true,
    autoplay: false,
    url:      '',
    title:    'Perfect — Ed Sheeran',
    volume:   0.5,
  },

  rsvp: {
    enabled:   true,
    deadline:  '2026-09-07',
    maxGuests: 200,
  },

  settings: {
    heroBackground: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80',
    openingText:    'Kepada Yth.',
    guestNameLabel: 'Bapak/Ibu/Saudara/i',
    closingText:    'Wassalamu\'alaikum Warahmatullahi Wabarakatuh',
  },

  themeConfig: {
    primary:   '#F6D4DC',
    secondary: '#FCEEF2',
    accent:    '#C8A165',
    dark:      '#3A3A3A',
    bg:        '#FFF9FA',
  },

  animations: {
    sakuraPetals: true,
    parallax:     true,
    countUp:      true,
  },
}

export default mockInvitation
