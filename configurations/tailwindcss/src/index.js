const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
  content: [
    "../../components/common/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        "bg-light": "var(--bg-light)",
        "bg-lighter": "var(--bg-lighter)",
        bg: "var(--bg)",
        "bg-dark": "var(--bg-dark)",
        "bg-darker": "var(--bg-darker)",
        "bg-loading": "var(--bg-loading)",
        "contrast-lower": "var(--contrast-lower)",
        "contrast-low": "var(--contrast-low)",
        "contrast-medium": "var(--contrast-medium)",
        "contrast-high": "var(--contrast-high)",
        "contrast-higher": "var(--contrast-higher)",
        "primary-lighter": "var(--primary-lighter)",
        "primary-light": "var(--primary-light)",
        primary: "var(--primary)",
        "primary-dark": "var(--primary-dark)",
        "primary-darker": "var(--primary-darker)",
        "accent-lighter": "var(--accent-lighter)",
        "accent-light": "var(--accent-light)",
        accent: "var(--accent)",
        "accent-dark": "var(--accent-dark)",
        "accent-darker": "var(--accent-darker)",
        "success-lighter": "var(--success-lighter)",
        "success-light": "var(--success-light)",
        success: "var(--success)",
        "success-dark": "var(--success-dark)",
        "success-darker": "var(--success-darker)",
        "warning-lighter": "var(--warning-lighter)",
        "warning-light": "var(--warning-light)",
        warning: "var(--warning)",
        "warning-dark": "var(--warning-dark)",
        "warning-darker": "var(--warning-darker)",
        "error-lighter": "var(--error-lighter)",
        "error-light": "var(--error-light)",
        error: "var(--error)",
        "error-dark": "var(--error-dark)",
        "error-darker": "var(--error-darker)",
        "emphasis-low": "var(--emphasis-low)",
        "emphasis-medium": "var(--emphasis-medium)",
        "emphasis-high": "var(--emphasis-high)",
      },
      maxWidth: {
        container: "80rem",
      },
      fontFamily: {
        clash: ["ClashGrotesk-Semibold", ...defaultTheme.fontFamily.sans],
      },
    },
  },
};
