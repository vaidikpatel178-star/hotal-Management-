/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "#E5E7EB",
        input: "#E5E7EB",
        ring: "#C9A227",
        background: "#F7F8FA",
        foreground: "#111827",
        luxnavy: {
          950: '#070C15',
          900: '#0B1220', // Primary Dark
          800: '#111827', // Secondary Dark
          700: '#0F1B2D', // Deep Navy
          600: '#172033', // Card Dark
          500: '#273449', // Border Dark
        },
        gold: {
          50: '#F3E7C3', // Warm Champagne
          100: '#E9D6A0',
          400: '#E4C766', // Soft Gold
          500: '#C9A227', // Luxury Gold
          600: '#A6841B',
          700: '#846713',
        },
        saas: {
          bg: '#F7F8FA',
          card: '#FFFFFF',
          darkCard: '#172033',
          darkPanel: '#0B1220',
          darkBorder: '#273449',
          darkSubtext: '#CBD5E1',
          text: '#111827',
          muted: '#64748B',
          border: '#E5E7EB',
          navy: '#0B1220',
          secNavy: '#111827',
          softNavy: '#0F1B2D',
          gold: '#C9A227',
          softGold: '#E4C766',
          champagne: '#F3E7C3',
          success: '#168A63',
          warning: '#C58A12',
          danger: '#C24141',
          info: '#3B6EA8',
        },
        primary: {
          DEFAULT: "#0B1220",
          foreground: "#FFFFFF",
        },
        sidebar: {
          bg: '#0B1220',
          hover: 'rgba(15, 27, 45, 0.6)',
          active: '#0F1B2D',
          text: '#FFFFFF',
          textMuted: '#94A3B8',
          border: '#172033'
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}
