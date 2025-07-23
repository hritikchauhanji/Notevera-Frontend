/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      sm: "350px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px"
    },
    extend: {
      boxShadow: {
        indigoShadow: "0px 0px 20px 0px rgba(102, 16, 242, 0.4)",
        indigoMediumShadow: "10px 10px 200px 150px rgba(102, 16, 242, 0.5)",
        yellowShadow: "0px 0px 20px 0px rgba(255, 221, 0, 0.5)",
        yellowMediumShadow: "10px 10px 200px 150px rgba(255, 221, 0, 0.5)",

        'dark-indigoMediumShadow': "10px 10px 200px 150px rgba(102, 16, 242, 0.5)", // darker indigo variant
        'dark-yellowMediumShadow': "10px 10px 200px 150px rgba(255, 221, 0, 0.5)", // warmer yellow
      }
    },
    fontFamily: {
      body: ['poppins']
    }
  },
  plugins: [],
}

