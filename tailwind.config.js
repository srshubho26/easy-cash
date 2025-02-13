import { content, plugin } from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    content()
  ],
  theme: {
    extend: {
      colors: {
        "prime": "#e81d2d",
        "lite": "#fef4f5",
        "stroke": "#565656"
      }
    },
  },
  plugins: [plugin()],
}