/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Blue
        primary: {
          DEFAULT: '#2563eb',
          hover: '#1d4ed8',
          active: '#1e40af',
          subtle: 'rgba(37, 99, 235, 0.15)',
          text: '#60a5fa',
          border: '#3b82f6',
        },
        // Accent Yellow
        accent: {
          DEFAULT: '#eab308',
          hover: '#ca8a04',
          active: '#a16207',
          subtle: 'rgba(234, 179, 8, 0.15)',
          text: '#facc15',
          border: '#eab308',
        },
        // Background colors
        bg: {
          base: 'hwb(231 4% 89%)',
          elevated: '#0d1117',
          surface: '#161b22',
          overlay: '#1c2433',
          hover: '#21303d',
          active: '#263545',
          input: '#0d1117',
        },
        // Border colors
        border: {
          default: '#21262d',
          muted: '#30363d',
          emphasis: '#3d444d',
        },
        // Text colors
        text: {
          primary: '#e6edf3',
          secondary: '#8b949e',
          muted: '#6e7681',
          onEmphasis: '#ffffff',
        },
        // Semantic colors
        success: {
          DEFAULT: '#2563eb',
          subtle: 'rgba(37, 99, 235, 0.15)',
          text: '#60a5fa',
        },
        error: {
          DEFAULT: '#dc2626',
          hover: '#b91c1c',
          subtle: 'rgba(220, 38, 38, 0.15)',
          text: '#f87171',
        },
        warning: {
          DEFAULT: '#eab308',
          subtle: 'rgba(234, 179, 8, 0.15)',
          text: '#facc15',
        },
        info: {
          DEFAULT: '#2563eb',
          subtle: 'rgba(37, 99, 235, 0.15)',
          text: '#60a5fa',
        },
      },
      borderRadius: {
        'none': '0px',
        'sm': '2px',
        'DEFAULT': '4px',
        'md': '6px',
        'lg': '8px',
        'full': '9999px',
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'lg': '18px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '30px',
        '4xl': '36px',
      },
      transitionDuration: {
        'fast': '150ms',
        'base': '200ms',
        'slow': '300ms',
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.3)',
        'md': '0 4px 6px rgba(0, 0, 0, 0.4)',
        'lg': '0 10px 15px rgba(0, 0, 0, 0.5)',
        'xl': '0 20px 25px rgba(0, 0, 0, 0.6)',
        'focus': '0 0 0 3px rgba(37, 99, 235, 0.4)',
      },
    },
  },
  plugins: [],
}
