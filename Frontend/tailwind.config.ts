import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Librarian Project Color Palette
      colors: {
        brand: {
          primary: '#4F46E5',   // Indigo
          secondary: '#64748B', // Slate
          bg: '#F8FAFC',        // Off-white Background
          card: '#FFFFFF',      // Pure White for Cards
        }
      },
      // Custom Animation Logic
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
} satisfies Config