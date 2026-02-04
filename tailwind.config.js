/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        ripple: {
          "0%": { transform: "scaleY(0.2)", opacity: "0.3" },
          "50%": { transform: "scaleY(1)", opacity: "1" },
          "100%": { transform: "scaleY(0.2)", opacity: "0.3" },
        },
      },
      animation: {
        ripple: "ripple 2.5s linear infinite",
      },
    },
  },
  plugins: [],
};
