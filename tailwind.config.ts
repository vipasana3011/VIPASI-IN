import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        vipasi: {
          // Exact colors extracted from user's official VIPASI logo
          wine: "#3E0B10",         // Deep royal wine maroon (2nd logo background)
          "wine-dark": "#2E070B",    // Ultra deep wine
          "wine-light": "#581219",   // Rich berry wine accent
          champagne: "#DFC19B",    // Warm champagne gold (2nd logo text color)
          "champagne-light": "#EED8BC",
          sand: "#F5EAD4",         // 1st logo background tone
          cream: "#FAF4E8",        // Light warm ivory background
          border: "#EADBCC",       // Elegant soft border
          charcoal: "#261315",     // Deep readable text with warm wine undertone
          muted: "#7A685D",        // Subtle descriptive text
          terracotta: "#C86D51",
          sage: "#7E8F7A",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-outfit)", "Inter", "sans-serif"],
      },
      boxShadow: {
        luxury: "0 10px 30px -5px rgba(62, 11, 16, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.02)",
        "luxury-hover": "0 20px 45px -10px rgba(62, 11, 16, 0.16)",
      },
      letterSpacing: {
        luxury: "0.22em",
        brand: "0.18em",
      },
    },
  },
  plugins: [],
};
export default config;
