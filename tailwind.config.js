
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'backgroundWhite': 'rgba(250, 250, 250, 1)',
        'backgroundGray': 'rgba(9, 9, 11, 0.1)',
        'backgroundBlack': 'rgba(9, 9, 11, 1)',
        'textBlack': 'rgba(63, 63, 70, 1)',
        'textWhite':'rgba(250, 250, 250, 1)',
        'textHeading': 'rgba(39, 39, 42, 1)',
        'buttonGray': 'rgba(63, 63, 70, 1)',
        'buttonRed': 'rgba(220, 38, 38, 1)',
        'bookmarkGray': 'rgba(64, 64, 64, 1)',
      },
      fontFamily: {
        'inter': ['Inter', ...defaultTheme.fontFamily.sans],
      },
      fontSize:{
        'sm': '7px',
        'md': '12px',
        'lg': '14px',
      },
      spacing: {
        'xs': '8px',
        'sm': '16px',
        'md': '20px',
        'lg': '24px',
        'xl': '64px'
      },
      lineHeight: {
        'header': '16.94px', 
      },
    },
  },
  plugins: [],
}