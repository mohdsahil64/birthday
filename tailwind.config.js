/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        script: ['"Dancing Script"', 'cursive'],
        display: ['"Playfair Display"', 'serif'],
        body: ['Poppins', 'sans-serif'],
      },
      colors: {
        romance: {
          bg: '#140016',
          pink: '#ff5d8f',
          rose: '#ff8fab',
          purple: '#b14aed',
          gold: '#ffd66b',
        },
      },
      keyframes: {
        floatUp: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0' },
          '10%': { opacity: '1' },
          '100%': { transform: 'translateY(-110vh) scale(1.4)', opacity: '0' },
        },
        glowPulse: {
          '0%,100%': { textShadow: '0 0 20px rgba(255,93,143,0.6), 0 0 40px rgba(177,74,237,0.4)' },
          '50%': { textShadow: '0 0 40px rgba(255,93,143,0.9), 0 0 80px rgba(177,74,237,0.7)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        floatUp: 'floatUp linear infinite',
        glowPulse: 'glowPulse 2.5s ease-in-out infinite',
        shimmer: 'shimmer 6s ease infinite',
        'spin-slow': 'spin 4s linear infinite',
      },
    },
  },
  plugins: [],
}
