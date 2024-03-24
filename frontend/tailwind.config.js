/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
   
    extend: {
      colors: {
        primary: '#CADCFC',
        secodary: '#8AB6F9',
        tertiary: '#00246B'
  
      },
    },
  },
  plugins: [],
};
