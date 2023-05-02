// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'en-US'
      },
      title: 'Example  - how to use supabase with Twitch provider',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { property: 'og:site_name', content: 'Simple site to auth with supabase and twitch provider' },
        { property: 'og:image:width', content: '740' },
        { property: 'og:image:height', content: '300' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'twitter:site', content: '@felipecss' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ]
    }
  },
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
      baseUrl: process.env.BASEURL,
      twitchid: process.env.TWITCH_CLIENT_ID,
      twitchAPi: process.env.TWITCH_API,
      twitchClientSecret: process.env.TWITCH_CLIENT_SECRET,
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    }
  },
})
