module.exports = {
  mode: 'universal',
  server: {
    port: 3001,
    host: 'localhost'
  },
  router: {
    prefetchLinks: false
  },
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=0' },
      { name: 'theme-color', content: '#fff' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  loading: {
    color: '#3eab35',
    height: '3px'
  },
  css: [
    '~/static/css/fonts.css',
    { src: '~/assets/sass/main.sass', lang: 'sass' },
    { src: '~/assets/sass/icon.sass', lang: 'sass' },
    { src: '~/assets/sass/smt-form.sass', lang: 'sass' }
  ],
  plugins: [
    '~/plugins/global-components.js',
    '~/plugins/moment.js',
    '~/plugins/api.js',
    '~/plugins/vuelidate.js',
    { src: '~/plugins/oidc.js', mode: 'client' }
  ],
  buildModules: [
    '@nuxtjs/eslint-module'
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'nuxt-i18n',
    'cookie-universal-nuxt'
  ],
  axios: {},
  render: {
    resourceHints: false
  },
  build: {
    splitChunks: {
      layouts: true,
      pages: true,
      commons: true
    },
    transpile: ['vue-lazy-hydration', 'intersection-observer'],
  },
  pwa: {
    manifest: {
      name: 'Smarttender.biz-v2',
      short_name: 'Smarttender',
      description: 'Smarttender.biz – електронний майданчик комерційних та державних тендерів Prozorro',
      lang: ['ua', 'ru', 'en'],
      display: 'standalone',
      theme_color: '#fff'
    }
  },
  i18n: {
    seo: true,
    locales: [
      {
        code: 'uk',
        iso: 'uk',
        file: 'uk.js'
      },
      {
        code: 'ru',
        iso: 'ru',
        file: 'ru.js'
      },
      {
        code: 'en',
        iso: 'en',
        file: 'en.js'
      }
    ],
    defaultLocale: 'uk',
    lazy: true,
    langDir: 'lang/'
  }
}
