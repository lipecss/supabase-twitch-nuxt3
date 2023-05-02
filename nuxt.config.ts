// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/supabase'
  ],
  plugins: [
    { src: '~/plugins/client.js' },
  ],
  css: [
    '~/assets/css/main.css',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      twitchid: process.env.TWITCH_CLIENT_ID,
      twitchAPi: process.env.TWITCH_API,
      twitchClientSecret: process.env.TWITCH_CLIENT_SECRET,
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    }
  },
})
