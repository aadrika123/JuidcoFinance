import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#6366F1",
        secondary: "#4F4F55",
        primary_green: "#12743B",
        primary_bg: "#F8FFF7",
      },
      fontSize: {
        sub_head: " 1.22294rem",
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
