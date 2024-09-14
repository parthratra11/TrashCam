import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },

      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        lobster: ["Lobster", "cursive"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        "temporary theme": {
          primary: "#40634a",
          "primary-focus": "#60806a",
          "primary-content": "#ffffff",

          secondary: "#4d8f62",
          "secondary-focus": "#cde2c1",
          "secondary-content": "#dfece0",

          accent: "#526b7a",
          "accent-focus": "#bedaf4",
          "accent-content": "#ffffff",

          neutral: "#787373",
          "neutral-focus": "#272525",
          "neutral-content": "#e9e7e7",

          "base-100": "#e7eee7",
          "base-200": "#86a286",
          "base-300": "#b9b1b1",
          "base-content": "#100f0f",

          info: "#1c92f2",
          success: "#009485",
          warning: "#ff9900",
          error: "#ff5724",

          "--rounded-box": "1rem",
          "--rounded-btn": ".5rem",
          "--rounded-badge": "1.9rem",

          "--animation-btn": ".25s",
          "--animation-input": ".2s",

          "--btn-text-case": "uppercase",
          "--navbar-padding": ".5rem",
          "--border-btn": "1px",
        },
      },
    ],
  },
};
export default config;
