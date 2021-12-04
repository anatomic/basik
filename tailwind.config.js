const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.html"],
  theme: {
    extend: {
      colors: {
        orange: colors.orange,
        "basik-yellow": "#f0df21",
      },
    },
  },
  variants: {},
  plugins: [],
};
