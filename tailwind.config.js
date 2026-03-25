/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  important: "#root",
  theme: {
    fontFamily: {
      serif: ["Jost", "serif"],
      sans: ["Jost", "sans"],
    },
    colors: {
      primary: "#2A2172",
      green: "#00956F",
      blue: "#2A2173",
      white: "white",
      black: "black",
      gray: "#CFD1DF",
    },
    screens: {
      "xl-max": "1340px",
      xl: { max: "1439px" },
      xll: { max: "1200px" },
      lg: { max: "1023px" },
      md: { max: "767px" },
      sm: { max: "479px" },
      xs: { max: "359px" },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "20px",
        sm: "2rem",
        lg: "100px",
        xl: "100px",
        "2xl": "100px",
      },
    },
    extend: {
      keyframes: {
        "rotate-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "rotate-slow": "rotate-slow 12s linear infinite",
      },
    },
  },
  plugins: [],
};
