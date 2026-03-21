export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        primary: {
          50: '#f6f7f9',
          100: '#eceef2',
          200: '#d5dae3',
          300: '#b0bccb',
          400: '#8396ad',
          500: '#627995',
          600: '#4d617a',
          700: '#3f4f64',
          800: '#364253',
          900: '#2f3947',
          950: '#1e252e',
        },
        accent: {
          DEFAULT: '#ff5733', // 珊瑚红/铁锈橙
          light: '#ff8a6f',
          dark: '#c72c0d',
        },
        success: '#2e8046',
      },
      backgroundImage: {
        noise: "url('https://grainy-gradients.vercel.app/noise.svg')",
        'grid-pattern': 'radial-gradient(circle, #627995 1px, transparent 1px)',
      },
      animation: {
        float: 'float 6s cubic-bezier(0.34, 1.56, 0.64, 1) infinite',
        reveal: 'reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'content-fade': 'contentFade 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        reveal: {
          '0%': {
            transform: 'translateY(30px)',
            opacity: '0',
            filter: 'blur(10px)',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
            filter: 'blur(0)',
          },
        },
        contentFade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
        elastic: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
