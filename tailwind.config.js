/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: "#000",
        onPrimary: "#fff",
      },
      screens: {
        xShort: { raw: "(max-height: 400px)" },
      },
    },
    plugins: [],
  }
};
