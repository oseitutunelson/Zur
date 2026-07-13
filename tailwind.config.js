/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  // Class-based dark mode is used only inside the admin dashboard (a `.dark`
  // wrapper). The public site uses fixed backgrounds and no `dark:` variants,
  // so enabling this does not affect it.
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ZUR Construction brand system — black + dark grey + gold accent.
        ink: {
          DEFAULT: '#1A1A1A',
          900: '#0A0A0A',
          800: '#161616',
          700: '#232323',
          600: '#333333',
        },
        bone: {
          DEFAULT: '#FAFAFA',
          200: '#F2F2F2',
          300: '#E5E5E5',
        },
        // Neutral dark-grey secondary — borders, muted surfaces, dividers.
        steel: {
          DEFAULT: '#6E6E6E',
          100: '#E8E8E8',
          200: '#CFCFCF',
          400: '#8C8C8C',
          600: '#4A4A4A',
        },
        accent: {
          DEFAULT: '#C9A227',
          400: '#E4C766',
          600: '#A6821A',
        },
        muted: '#6E6E6E',
      },
      fontFamily: {
        sans: ['"Poppins"', 'system-ui', 'sans-serif'],
        display: ['"Poppins"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      maxWidth: {
        wide: '1440px',
      },
      boxShadow: {
        // Shared soft elevation scale for the ZUR system.
        soft: '0 2px 8px -2px rgba(0, 0, 0, 0.12), 0 8px 24px -6px rgba(0, 0, 0, 0.12)',
        lift: '0 12px 40px -12px rgba(0, 0, 0, 0.28)',
        accent: '0 10px 30px -8px rgba(201, 162, 39, 0.35)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        floaty: 'floaty 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

