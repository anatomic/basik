const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.html"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      orange: colors.orange,
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
