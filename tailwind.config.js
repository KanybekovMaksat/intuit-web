/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  important: "#root",
  theme: {
    fontFamily: {
      sans: ["Jost", "sans-serif"],
      serif: ["Jost", "serif"],
    },
    colors: {
      primary: "#2A2172",
      blue: "#2A2172", // Consolidated with primary
      green: "#00956F",
      white: "#FFFFFF",
      black: "#000000",
      gray: "#CFD1DF",
      "gray-light": "#F9FAFB",
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
