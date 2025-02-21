/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'slide-down': {
          '0%': { transform: 'translate(-50%, -100%)', opacity: 0 },
          '100%': { transform: 'translate(-50%, 0)', opacity: 1 },
        },
        'slide-up': {
          '0%': { transform: 'translate(-50%, 0)', opacity: 1 },
          '100%': { transform: 'translate(-50%, -100%)', opacity: 0 },
        },
      },
      animation: {
        'slide-down': 'slide-down 0.3s ease-out forwards',
        'slide-up': 'slide-up 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
}

