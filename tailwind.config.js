/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#12131A',
          900: '#191B25',
          800: '#262838',
        },
        paper: {
          50: '#F7F8FB',
          100: '#EEF0F6',
          200: '#E3E6F0',
        },
        iris: {
          400: '#7C6CFF',
          500: '#5B45F5',
          600: '#4A34DE',
          700: '#3B27B8',
        },
        rose: { 500: '#EF4360', 100: '#FDE3E9' },
        azure: { 500: '#3E7BFA', 100: '#E1EAFE' },
        moss: { 500: '#1FA971', 100: '#DBF6E9' },
        amber: { 500: '#F2924A', 100: '#FDEADA' },
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(18,19,26,0.04), 0 8px 24px -8px rgba(18,19,26,0.12)',
        pop: '0 12px 32px -8px rgba(91,69,245,0.35)',
      },
      keyframes: {
        loadbar: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(220%)' },
        },
        scanpulse: {
          '0%,100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
        risein: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        sheetup: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        loadbar: 'loadbar 1.6s ease-in-out infinite',
        scanpulse: 'scanpulse 1.8s ease-in-out infinite',
        risein: 'risein 0.35s ease-out both',
        sheetup: 'sheetup 0.28s cubic-bezier(0.32,0.72,0,1) both',
      },
    },
  },
  plugins: [],
}
