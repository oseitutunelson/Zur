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
        // ZUR Construction brand system — deep navy-charcoal + vermilion.
        ink: {
          DEFAULT: '#111A24',
          900: '#0C131B',
          800: '#16212E',
          700: '#1F2C3B',
          600: '#2A3947',
        },
        bone: {
          DEFAULT: '#F4F5F7',
          200: '#ECEEF2',
          300: '#DEE2E8',
        },
        // Cool steel secondary — borders, muted surfaces, dividers.
        steel: {
          DEFAULT: '#5B6B7E',
          100: '#E5E9EF',
          200: '#CBD3DD',
          400: '#7C8A9C',
          600: '#41505F',
        },
        accent: {
          DEFAULT: '#E8512A',
          400: '#F26A3F',
          600: '#C8401D',
        },
        muted: '#66717E',
      },
      fontFamily: {
        sans: ['"Sora"', 'system-ui', 'sans-serif'],
        display: ['"Sora"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      maxWidth: {
        wide: '1440px',
      },
      boxShadow: {
        // Shared soft elevation scale for the ZUR system.
        soft: '0 2px 8px -2px rgba(17, 26, 36, 0.10), 0 8px 24px -6px rgba(17, 26, 36, 0.10)',
        lift: '0 12px 40px -12px rgba(17, 26, 36, 0.22)',
        accent: '0 10px 30px -8px rgba(232, 81, 42, 0.35)',
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

