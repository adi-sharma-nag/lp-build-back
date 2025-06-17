/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#D1F5EA',  // Mint Green - Lightest
          100: '#A3EBD5', // Mint Green - Lighter
          200: '#75E1C1', // Mint Green - Light
          300: '#47D7AC', // Mint Green - Base
          400: '#3AAB94', // Mint Green - Dark
          500: '#2D807B', // Mint Green - Darker
          600: '#205463', // Mint Green - Darkest
        },
        secondary: {
          50: '#8993A5',  // Nightfall Blue - Lightest
          100: '#4F5E78', // Nightfall Blue - Light
          200: '#13294B', // Nightfall Blue
          300: '#06041F', // Petrol Blue - Base
          400: '#040316', // Petrol Blue - Dark
          500: '#02010E', // Petrol Blue - Darker
          600: '#000005', // Petrol Blue - Darkest
        },
        gray: {
          50: '#EFF1F4',  // Limestone Gray - Lightest
          100: '#E0E3E8', // Limestone Gray - Lighter
          200: '#D2D6DD', // Limestone Gray - Light
          300: '#C4C9D2', // Limestone Gray - Base
          400: '#9BA3B0', // Limestone Gray - Dark
          500: '#737D8E', // Limestone Gray - Darker
          600: '#4B576C', // Limestone Gray - Darkest
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
