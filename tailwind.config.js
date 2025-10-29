/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        nike: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
        cursive: ["Pacifico", "Sriracha", "cursive"],
        cursive2: ["Sriracha", "cursive"],
      },
      fontSize: {
        'nike-xs': ['0.75rem', { lineHeight: '1rem' }],
        'nike-sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'nike-base': ['1rem', { lineHeight: '1.5rem' }],
        'nike-lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'nike-xl': ['1.25rem', { lineHeight: '1.75rem' }],
        'nike-2xl': ['1.5rem', { lineHeight: '2rem' }],
        'nike-3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        'nike-4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        'nike-5xl': ['3rem', { lineHeight: '1' }],
        'nike-6xl': ['3.75rem', { lineHeight: '1' }],
        'nike-7xl': ['4.5rem', { lineHeight: '1' }],
        'nike-8xl': ['6rem', { lineHeight: '1' }],
        'nike-9xl': ['8rem', { lineHeight: '1' }],
      },
      colors: {
        primary: "#854d3d",
        secondary: "#006400",
        brandDark: "#270c03",
        dark: "#1e1e1e",
        light: "#f5f5f5",
        // Nike Color Palette
        nike: {
          black: '#000000',
          white: '#FFFFFF',
          gray: {
            50: '#F9FAFB',
            100: '#F3F4F6',
            200: '#E5E7EB',
            300: '#D1D5DB',
            400: '#9CA3AF',
            500: '#6B7280',
            600: '#4B5563',
            700: '#374151',
            800: '#1F2937',
            900: '#111827',
          },
          accent: '#FF6B35',
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
        }
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "3rem",
        },
      },
      animation: {
        "spin-slow": "spin 40s linear infinite",
      },
    },
  },
  plugins: [],
};
