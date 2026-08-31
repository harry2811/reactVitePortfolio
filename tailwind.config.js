/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#070914',
          secondary: '#0d111e',
          card: 'rgba(255,255,255,0.04)',
        },
        surface: {
          DEFAULT: 'rgba(255,255,255,0.04)',
          strong: 'rgba(255,255,255,0.06)',
        },
        ink: {
          primary: '#e6edf7',
          muted: '#8892b0',
          dim: '#5b6480',
        },
        accent: {
          cyan: '#64ffda',
          violet: '#a78bfa',
        },
      },
      fontFamily: {
        display: ['"Caveat"', 'cursive'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        // Modular scale, ratio 1.25
        '2xs': ['0.75rem', { lineHeight: '1rem' }],
        'xs':  ['0.8125rem', { lineHeight: '1.125rem' }],
        'sm':  ['0.875rem', { lineHeight: '1.25rem' }],
        'base':['1rem', { lineHeight: '1.5rem' }],
        'md':  ['1.125rem', { lineHeight: '1.75rem' }],
        'lg':  ['1.5rem', { lineHeight: '2rem' }],
        'xl':  ['2rem', { lineHeight: '2.5rem' }],
        '2xl': ['2.75rem', { lineHeight: '3rem' }],
        '3xl': ['4rem', { lineHeight: '1.05' }],
        '4xl': ['5.5rem', { lineHeight: '1.02' }],
      },
      letterSpacing: {
        'eyebrow': '0.18em',
      },
      maxWidth: {
        'container': '72rem',
      },
      boxShadow: {
        'glow-cyan':    '0 0 24px rgba(100,255,218,0.28), 0 0 48px rgba(100,255,218,0.10)',
        'glow-violet':  '0 0 24px rgba(167,139,250,0.28), 0 0 48px rgba(167,139,250,0.10)',
        'glass':        '0 8px 32px rgba(0,0,0,0.35)',
      },
      keyframes: {
        'spin-slow':  { to: { transform: 'rotate(360deg)' } },
        'caret':      { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
      },
      animation: {
        'spin-slow': 'spin-slow 14s linear infinite',
        'caret':     'caret 0.9s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
