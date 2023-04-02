import { type Config } from "tailwindcss";

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        textC: "#444746",
        textC2: "#4285F4",
        bgc: "#F7F9FC",
        darkC2: "#EDF2FC",
        darkC: "#E1E5EA",
      },
    },
    screens: {
      tablet: "840px",
    },
  },
  plugins: [require('@tailwindcss/forms'),],
} satisfies Config;
