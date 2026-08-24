/**
 * 20 Theme Configs — setiap tema punya identitas visual unik
 * Digunakan untuk update database seeder
 */
export const THEME_CONFIGS = {
  /* ══════════════ 1. ELEGANT LUXURY ══════════════ */
  'elegant-luxury': {
    primary: '#1C1C1C', secondary: '#C8A96E', accent: '#E8D5A0',
    bg: '#FAF8F5', text: '#1C1C1C',
    font_serif: 'Cormorant Garamond', font_sans: 'Inter',
    cover_style: 'dark-overlay', ornament: '✦', layout: 'classic',
    particles: 'glitter', particle_color: '#C8A96E',
    gradient_cover: 'linear-gradient(160deg,#1C1C1C 0%,#3A2A1A 100%)',
    section_bg_alt: '#F5F0E8',
  },

  /* ══════════════ 2. WHITE GOLD ══════════════ */
  'white-gold': {
    primary: '#2A2118', secondary: '#D4AF7A', accent: '#F0D9A8',
    bg: '#FFFEF9', text: '#2A2118',
    font_serif: 'Playfair Display', font_sans: 'Lato',
    cover_style: 'light-overlay', ornament: '◇', layout: 'classic',
    particles: 'glitter', particle_color: '#D4AF7A',
    gradient_cover: 'linear-gradient(to bottom,rgba(255,255,255,.1),rgba(42,33,24,.6))',
    section_bg_alt: '#FBF7EE',
  },

  /* ══════════════ 3. ROYAL WEDDING ══════════════ */
  'royal-wedding': {
    primary: '#1A0A3A', secondary: '#9B59B6', accent: '#D4AF7A',
    bg: '#FAF7FF', text: '#1A0A3A',
    font_serif: 'Cormorant Garamond', font_sans: 'Raleway',
    cover_style: 'dark-overlay', ornament: '♔', layout: 'fullscreen',
    particles: 'glitter', particle_color: '#D4AF7A',
    gradient_cover: 'linear-gradient(160deg,#1A0A3A 0%,#4A1A6A 100%)',
    section_bg_alt: '#F5F0FF',
  },

  /* ══════════════ 4. MINIMALIST MODERN ══════════════ */
  'minimalist-modern': {
    primary: '#1A1A1A', secondary: '#555', accent: '#888',
    bg: '#FFFFFF', text: '#1A1A1A',
    font_serif: 'EB Garamond', font_sans: 'Inter',
    cover_style: 'dark-overlay', ornament: '—', layout: 'minimal',
    particles: 'none', particle_color: '#888',
    gradient_cover: 'linear-gradient(to bottom,rgba(0,0,0,.3),rgba(0,0,0,.8))',
    section_bg_alt: '#F8F8F8',
  },

  /* ══════════════ 5. CLASSIC FLORAL ══════════════ */
  'classic-floral': {
    primary: '#5A2D3A', secondary: '#C8856C', accent: '#F0C4A8',
    bg: '#FDF6F0', text: '#3A1A22',
    font_serif: 'Cormorant Garamond', font_sans: 'Montserrat',
    cover_style: 'light-overlay', ornament: '✿', layout: 'classic',
    particles: 'petals', particle_color: '#F4A8C0',
    gradient_cover: 'linear-gradient(to bottom,rgba(90,45,58,.2),rgba(90,45,58,.7))',
    section_bg_alt: '#FDF0E8',
  },

  /* ══════════════ 6. SAKURA ══════════════ */
  'sakura': {
    primary: '#5A2040', secondary: '#E8729A', accent: '#FFB7C5',
    bg: '#FFF5F8', text: '#3A0A28',
    font_serif: 'Cormorant Garamond', font_sans: 'Inter',
    cover_style: 'light-overlay', ornament: '🌸', layout: 'classic',
    particles: 'sakura', particle_color: '#FFB7C5',
    gradient_cover: 'linear-gradient(to bottom,rgba(255,183,197,.2),rgba(90,32,64,.6))',
    section_bg_alt: '#FFF0F5',
  },

  /* ══════════════ 7. GARDEN WEDDING ══════════════ */
  'garden-wedding': {
    primary: '#2A4A2A', secondary: '#6A9A5A', accent: '#A8D090',
    bg: '#F4FAF0', text: '#1A2A1A',
    font_serif: 'Playfair Display', font_sans: 'Nunito',
    cover_style: 'light-overlay', ornament: '🌿', layout: 'classic',
    particles: 'leaves', particle_color: '#6A9A5A',
    gradient_cover: 'linear-gradient(to bottom,rgba(42,74,42,.2),rgba(42,74,42,.7))',
    section_bg_alt: '#EEF8E8',
  },

  /* ══════════════ 8. RUSTIC ══════════════ */
  'rustic': {
    primary: '#4A2800', secondary: '#A06030', accent: '#D4924A',
    bg: '#FAF4EA', text: '#2A1800',
    font_serif: 'Playfair Display', font_sans: 'Lato',
    cover_style: 'dark-overlay', ornament: '⬡', layout: 'cultural',
    particles: 'leaves', particle_color: '#A06030',
    gradient_cover: 'linear-gradient(to bottom,rgba(74,40,0,.3),rgba(74,40,0,.8))',
    section_bg_alt: '#F5EDDC',
  },

  /* ══════════════ 9. TROPICAL BEACH ══════════════ */
  'tropical-beach': {
    primary: '#0A3A5A', secondary: '#2AB4D4', accent: '#70D4F0',
    bg: '#F0FBFF', text: '#0A1A2A',
    font_serif: 'Cormorant Garamond', font_sans: 'Poppins',
    cover_style: 'dark-overlay', ornament: '🌊', layout: 'fullscreen',
    particles: 'bubbles', particle_color: '#70D4F0',
    gradient_cover: 'linear-gradient(160deg,#0A3A5A 0%,#0A6A8A 100%)',
    section_bg_alt: '#E8F8FF',
  },

  /* ══════════════ 10. BOHEMIAN ══════════════ */
  'bohemian': {
    primary: '#4A2A1A', secondary: '#C87040', accent: '#F0B080',
    bg: '#FAF0E0', text: '#2A1A0A',
    font_serif: 'Cormorant Garamond', font_sans: 'Nunito',
    cover_style: 'pattern', ornament: '✧', layout: 'cultural',
    particles: 'petals', particle_color: '#F0B080',
    gradient_cover: 'linear-gradient(to bottom,rgba(74,42,26,.3),rgba(74,42,26,.75))',
    section_bg_alt: '#F5E8D0',
  },

  /* ══════════════ 11. KOREAN STYLE ══════════════ */
  'korean-style': {
    primary: '#2A1A3A', secondary: '#B090C8', accent: '#D8C0E8',
    bg: '#FAF8FF', text: '#1A1228',
    font_serif: 'Cormorant Garamond', font_sans: 'Inter',
    cover_style: 'light-overlay', ornament: '❁', layout: 'minimal',
    particles: 'petals', particle_color: '#D8C0E8',
    gradient_cover: 'linear-gradient(to bottom,rgba(176,144,200,.15),rgba(42,26,58,.65))',
    section_bg_alt: '#F5F0FF',
  },

  /* ══════════════ 12. JAPANESE STYLE ══════════════ */
  'japanese-style': {
    primary: '#1A0A0A', secondary: '#C03040', accent: '#E87080',
    bg: '#FFFAF8', text: '#1A0A0A',
    font_serif: 'Cormorant Garamond', font_sans: 'Inter',
    cover_style: 'dark-overlay', ornament: '⛩', layout: 'classic',
    particles: 'sakura', particle_color: '#E87080',
    gradient_cover: 'linear-gradient(to bottom,rgba(26,10,10,.2),rgba(26,10,10,.8))',
    section_bg_alt: '#FFF5F3',
  },

  /* ══════════════ 13. CHINESE WEDDING ══════════════ */
  'chinese-wedding': {
    primary: '#8A0000', secondary: '#D4AF7A', accent: '#F0C840',
    bg: '#FFF8F0', text: '#2A0808',
    font_serif: 'Cormorant Garamond', font_sans: 'Inter',
    cover_style: 'dark-overlay', ornament: '喜', layout: 'cultural',
    particles: 'glitter', particle_color: '#F0C840',
    gradient_cover: 'linear-gradient(160deg,#8A0000 0%,#4A0000 100%)',
    section_bg_alt: '#FFF0E0',
  },

  /* ══════════════ 14. SUNDANESE TRADITIONAL ══════════════ */
  'sundanese': {
    primary: '#1A3A1A', secondary: '#8A6030', accent: '#C4904A',
    bg: '#F8F4E8', text: '#0A1A0A',
    font_serif: 'Cormorant Garamond', font_sans: 'Inter',
    cover_style: 'pattern', ornament: '◈', layout: 'cultural',
    particles: 'leaves', particle_color: '#8A6030',
    gradient_cover: 'linear-gradient(to bottom,rgba(26,58,26,.3),rgba(26,58,26,.8))',
    section_bg_alt: '#F0ECD8',
  },

  /* ══════════════ 15. JAVANESE TRADITIONAL ══════════════ */
  'javanese': {
    primary: '#2A1400', secondary: '#8A5020', accent: '#C48040',
    bg: '#FAF0E0', text: '#1A0A00',
    font_serif: 'Cormorant Garamond', font_sans: 'Inter',
    cover_style: 'pattern', ornament: '⬟', layout: 'cultural',
    particles: 'glitter', particle_color: '#C48040',
    gradient_cover: 'linear-gradient(to bottom,rgba(42,20,0,.35),rgba(42,20,0,.8))',
    section_bg_alt: '#F5E8D0',
  },

  /* ══════════════ 16. ISLAMIC ELEGANT ══════════════ */
  'islamic-elegant': {
    primary: '#0A2A1A', secondary: '#2A8A5A', accent: '#60C890',
    bg: '#F0FAF5', text: '#0A1A12',
    font_serif: 'Cormorant Garamond', font_sans: 'Inter',
    cover_style: 'pattern', ornament: '☽', layout: 'islamic',
    particles: 'glitter', particle_color: '#60C890',
    gradient_cover: 'linear-gradient(160deg,#0A2A1A 0%,#1A4A2A 100%)',
    section_bg_alt: '#E8F8F0',
  },

  /* ══════════════ 17. ROMANTIC NIGHT ══════════════ */
  'romantic-night': {
    primary: '#08041A', secondary: '#8060C0', accent: '#C0A0F0',
    bg: '#0C081E', text: '#E8E0F8',
    font_serif: 'Cormorant Garamond', font_sans: 'Inter',
    cover_style: 'dark-overlay', ornament: '★', layout: 'fullscreen',
    particles: 'stars', particle_color: '#C0A0F0',
    gradient_cover: 'linear-gradient(160deg,#08041A 0%,#1A0A38 100%)',
    section_bg_alt: '#120828',
  },

  /* ══════════════ 18. VINTAGE ══════════════ */
  'vintage': {
    primary: '#2A1A10', secondary: '#8A6040', accent: '#C4A070',
    bg: '#FAF4E8', text: '#1A100A',
    font_serif: 'Playfair Display', font_sans: 'Lato',
    cover_style: 'pattern', ornament: '◉', layout: 'classic',
    particles: 'none', particle_color: '#C4A070',
    gradient_cover: 'linear-gradient(to bottom,rgba(42,26,16,.3),rgba(42,26,16,.8))',
    section_bg_alt: '#F5EDD8',
  },

  /* ══════════════ 19. PREMIUM DARK ══════════════ */
  'premium-dark': {
    primary: '#080808', secondary: '#C8A06E', accent: '#E8C890',
    bg: '#0C0C0C', text: '#E8E4D8',
    font_serif: 'Cormorant Garamond', font_sans: 'Inter',
    cover_style: 'dark-overlay', ornament: '✦', layout: 'fullscreen',
    particles: 'firefly', particle_color: '#E8C890',
    gradient_cover: 'linear-gradient(160deg,#080808 0%,#1A1208 100%)',
    section_bg_alt: '#111108',
  },

  /* ══════════════ 20. SANDHYA (existing) ══════════════ */
  'sandhya': {
    primary: '#1C2B4A', secondary: '#C8956C', accent: '#D4AF7A',
    bg: '#F7F3EE', text: '#2C2C2C',
    font_serif: 'Cormorant Garamond', font_sans: 'Inter',
    cover_style: 'dark-overlay', ornament: '✦', layout: 'classic',
    particles: 'petals', particle_color: '#E4B48A',
    gradient_cover: 'linear-gradient(160deg,#1C2B4A 0%,#2D3F6B 55%,#3D3060 100%)',
    section_bg_alt: '#F5EEE5',
  },
}
