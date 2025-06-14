import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Primary brand colors
        primary: {
          DEFAULT: "#2563EB", // Royal Blue - Main brand color
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#10B981", // Emerald Green - Secondary brand color
          foreground: "#FFFFFF",
        },
        // Accent colors
        accent: {
          DEFAULT: "#F59E0B", // Amber - Accent color
          foreground: "#FFFFFF",
        },
        // Neutral colors
        neutral: {
          DEFAULT: "#1F2937", // Dark Gray
          foreground: "#FFFFFF",
        },
        // Background colors
        background: {
          DEFAULT: "#FFFFFF",
          dark: "#111827",
        },
        // Success, Warning, Error states
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [animate],
};

export default config;
