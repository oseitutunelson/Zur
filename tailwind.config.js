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
        // ZUR Construction brand system — deep blue-navy + blue accent.
        ink: {
          DEFAULT: '#0F1B30',
          900: '#0A1324',
          800: '#13233D',
          700: '#1B2F4D',
          600: '#26405F',
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
          DEFAULT: '#3B82F6',
          400: '#60A5FA',
          600: '#2563EB',
        },
        muted: '#66717E',
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
        soft: '0 2px 8px -2px rgba(17, 26, 36, 0.10), 0 8px 24px -6px rgba(17, 26, 36, 0.10)',
        lift: '0 12px 40px -12px rgba(17, 26, 36, 0.22)',
        accent: '0 10px 30px -8px rgba(59, 130, 246, 0.35)',
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

