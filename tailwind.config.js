/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#031224',
          900: '#041b35',
          850: '#062447',
          DEFAULT: '#082D56',
          700: '#0d4078',
          600: '#1457a1',
        },
        polar: {
          blue: '#0B65D8',
          'blue-hover': '#0951ad',
          'blue-light': '#E6F4FF',
          'blue-subtle': '#F0F8FF',
          cyan: '#38BDF8',
          bg: '#F6FAFD',
          text: '#16324F',
          muted: '#627D98',
          border: '#D9E8F5',
          card: '#FFFFFF',
        },
        status: {
          success: '#10B981',
          warning: '#F59E0B',
          emergency: '#EF4444',
          offline: '#F97316',
        }
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(8, 45, 86, 0.05), 0 1px 2px 0 rgba(8, 45, 86, 0.03)',
        'card': '0 4px 14px 0 rgba(8, 45, 86, 0.06)',
        'elevated': '0 10px 25px -3px rgba(8, 45, 86, 0.1), 0 4px 6px -2px rgba(8, 45, 86, 0.05)',
      },
      borderRadius: {
        'card': '14px',
      }
    },
  },
  plugins: [],
}
