/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}","./index.html"],
  theme: {
    container: {
      center: true,
      screens: {
        'sm': '600px',
  
        'md': '728px',
  
        'lg': '960px',
  
        'xl': '1240px',
  
        '2xl': '1380px',
      }
    },
    extend: {
      colors: {
        primary: "#0aad0a"
      },
      fontFamily:{
        cairo:'"cairo", "sans-serif"'
      }
    },
  },
  plugins: [],
}

