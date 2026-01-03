/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Custom colors if needed, but Tailwind default palette is great.
        // Let's add a custom "ChatGPT" like dark gray if we want specific branding.
        "gpt-dark": "#343541",
        "gpt-sidebar": "#202123",
        "gpt-user": "#343541", // or similar
        "gpt-ai": "#444654",
      },
    },
  },
  plugins: [],
};
