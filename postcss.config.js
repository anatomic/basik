module.exports = {
  plugins: [
    require("postcss-import"),
    require("precss"),
    require("tailwindcss"),
    require("autoprefixer"),
    require("postcss-color-mix"),
    require("cssnano")
  ]
}
