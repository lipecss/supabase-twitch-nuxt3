module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        'grey-1': '#0e0e10',
        'grey-2': '#1f1f23',
        'grey-3': '#18181b'
      },
    },
  },
  plugins: [],
}
