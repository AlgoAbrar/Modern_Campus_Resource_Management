/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        blueTheme: "#3B82F6",
        purpleTheme: "#8B5CF6",
      },
    },
  },
  plugins: [],
};
