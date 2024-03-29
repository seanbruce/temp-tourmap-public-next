const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-gold": "#fbda3b",
        "brand-gold-dark": "#daad33",
        "brand-gold-darkest": "#86650d",
        "brand-gold-light": "#fce058",
        "brand-green": "#76b532",
        "brand-green-light": "#8bcc45",
        "brand-green-dark": "#649a2b",
        skeleton: colors.gray["800"],
      },
      screens: {
        laptop: "980px",
      },
      keyframes: {
        hammering: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(-30deg)" },
        },
      },
    },
  },
  plugins: [],
};
