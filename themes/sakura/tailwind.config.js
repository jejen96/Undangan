/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        sakura: {
          bg:        '#FFF9FA',
          primary:   '#F6D4DC',
          secondary: '#FCEEF2',
          accent:    '#C8A165',
          dark:      '#3A3A3A',
          muted:     '#8A8A8A',
          gold:      '#D4AF7A',
        },
      },
      fontFamily: {
        serif:  ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body:   ['"Poppins"', 'system-ui', 'sans-serif'],
        button: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'sakura-fall':   'sakuraFall linear infinite',
        'float':         'float 3s ease-in-out infinite',
        'pulse-soft':    'pulseSoft 2s ease-in-out infinite',
        'fade-in-up':    'fadeInUp .7s ease forwards',
        'shimmer':       'shimmer 2s linear infinite',
      },
      keyframes: {
        sakuraFall: {
          '0%':   { transform: 'translateY(-10%) rotate(0deg)', opacity: 0 },
          '10%':  { opacity: 1 },
          '90%':  { opacity: 0.6 },
          '100%': { transform: 'translateY(110vh) rotate(720deg)', opacity: 0 },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-12px)' },
        },
        pulseSoft: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(246,212,220,0.5)' },
          '50%':     { boxShadow: '0 0 0 14px rgba(246,212,220,0)' },
        },
        fadeInUp: {
          '0%':   { opacity: 0, transform: 'translateY(28px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backdropBlur: { xs: '2px' },
    },
  },
  plugins: [],
}
