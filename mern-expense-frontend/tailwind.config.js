/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2f7ef6",
        },
      },
      boxShadow: {
        soft: "0 6px 18px rgba(16,24,40,0.08)",
      },
    },
  },
  plugins: [],
};
