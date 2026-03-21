export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        primary: {
          50: '#f9f9f9',
          100: '#f4f4f4',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        accent: {
          DEFAULT: '#a37e5c',
          light: '#c2a891',
          dark: '#7a5a3a',
        },
        success: '#16a34a',
      },
      backgroundImage: {
        noise: "url('https://grainy-gradients.vercel.app/noise.svg')",
        'grid-pattern': 'radial-gradient(circle, #737373 1px, transparent 1px)',
      },
      animation: {
        reveal: 'reveal 0.6s cubic-bezier(0.2, 0, 0, 1)',
        'content-fade': 'contentFade 1s cubic-bezier(0.2, 0, 0, 1)',
      },
      keyframes: {
        reveal: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        contentFade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.2, 0, 0, 1)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
