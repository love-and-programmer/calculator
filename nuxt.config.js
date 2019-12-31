export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['ant-design-vue/dist/antd.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/antd-ui'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/moment',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'nuxt-i18n',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  // i18n
  i18n: {
    locales: [
      {
        code: 'zh_tw',
        iso: 'zh-TW',
      },
      {
        code: 'zh_cn',
        iso: 'zh_CN',
      },
      {
        code: 'en',
        iso: 'en-us',
      },
    ],
    defaultLocale: 'zh_tw',
    vueI18n: {
      fallbackLocale: 'zh_tw',
      messages: {
        en: {
          welcome: 'Welcome',
        },
        zh_tw: {
          welcome: '歡迎',
        },
        zh_cn: {
          welcome: '欢迎',
        },
      },
    },
  },
  // moment config
  moment: {
    defaultLocale: 'zh-tw',
    locales: ['zh-tw', 'zh-hk', 'zh-cn', 'en-gb'],
  },
  /*
   ** Build configuration
   */
  build: {
    // transpile: [/^element-ui/],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }
    },
  },
}
