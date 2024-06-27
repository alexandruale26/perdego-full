/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        hero: "url('banners/banner_orange.svg')",
        authenticate: "url('banners/banner_green.svg')",
      },
      fontFamily: {
        sans: ["Fira Sans", "sans-serif"],
      },
      fontSize: {
        md: "1.125rem", // 18px
        lg: "1.25rem", // 20px,
        "3xl": "2rem", // 32px
      },
      height: {
        18: "4.5rem", // 72px
      },
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        cta: "#e88e38",
        "btn-primary-hover": "#1d2028",
        "cta-hover": "#e5c07b",
        accessibility: "#31ccec",
        success: "#21ba45",
        warning: "#f2c037",
        error: "#ff001c",

        black: "var(--black)",
        "black-medium": "#1d1d1d",
        "black-light": "#282828",

        grey: "var(--grey)",
        "grey-2": "var(--grey2)",
        "grey-3": "#828282",
        "grey-4": "#bdbdbd",
        "grey-5": "#d9d9da",
        "grey-6": "#f5f5f5",

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },

        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        sm: "0.25rem", // 4px
      },
      padding: {
        22: "5.5rem", // 88px
      },
      boxShadow: {
        lg: "6px 10px 15px rgba(0, 0, 0, 0.3)",
      },
      backgroundOpacity: {
        98: "0.98",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
