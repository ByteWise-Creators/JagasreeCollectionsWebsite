/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f5f5fd",
          100: "#eeecfb",
          200: "#dedbf9",
          300: "#c6bff3",
          400: "#a89aeb",
          500: "#8a71e1",
          600: "#7852d5",
          700: "#6a42c2", // Primary
          800: "#5735a2",
          900: "#482d85",
          950: "#2c1b5a",
        },
        bg: "#f2f9ff",
        text: "#4b4b4b",
      },

      fontFamily: {
        heading: "Afacad",
        body: "Lato",
        madeInIndia: "Saira Condensed",
      },
      screens: {
        sx: "450px",
      },
      keyframes: {
        shine: {
          '0%': { backgroundPosition: '-500%' },
          '100%': { backgroundPosition: '500%' },
        },
      },
      animation: {
        shine: 'shine 5s linear infinite',
      },
    },
  },
  plugins: [],
};
