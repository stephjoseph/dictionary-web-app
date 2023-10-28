/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        '050505': '#050505',
        '1F1F1F': '#1F1F1F',
        '2D2D2D': '#2D2D2D',
        '3A3A3A': '#3A3A3A',
        757575: '#757575',
        E9E9E9: '#E9E9E9',
        F4F4F4: '#F4F4F4',
        FFFFFF: '#FFFFFF',
        A445ED: '#A445ED',
        FF5252: 'FF5252',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        serif: ['Lora', ...defaultTheme.fontFamily.serif],
        mono: ['Inconsolata', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
};
