/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          neutral: {
            50: '#f7f7f1',
            300: '#a7a7a3',
            700: '#5e5e5c',
            900: '#3d3d3b',
            950: '#1e1e1d',
          },
          blue: {
            500: '#605cff',
          },
          yellow: {
            50: '#fbff5c',
          },
        },
        base: {
          card: '#232421',
          tag: 'rgba(63,63,58,0.3)',
        },
      },
      fontFamily: {
        'dm-serif': ['"DM Serif Display"', 'serif'],
        'jakarta': ['"Plus Jakarta Sans"', 'sans-serif'],
        'sf-pro': ['"SF Pro"', 'sans-serif'],
      },
      backdropBlur: {
        'custom': '6.9px',
      },
    },
  },
  plugins: [],
}

