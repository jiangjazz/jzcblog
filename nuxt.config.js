const bodyParser = require('body-parser')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const redisOptions = {
  host: '127.0.0.1',
  port: '6379',
  pass: ''
}

module.exports = {
  srcDir: 'client',
  /*
   ** Headers of the page
   */
  head: {
    title: 'jblog',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'New blog with nuxt mongdb element-ui'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },
  /**
   * 页面切换的加载进度条
   */
  loading: {
    color: '#094',
    height: '3px'
  },
  /*
   ** Global CSS
   */
  css: [
    {
      src: '~/assets/scss/index.scss',
      lang: 'scss'
    },
    'element-ui/lib/theme-chalk/reset.css',
    'element-ui/lib/theme-chalk/index.css'
  ],
  /**
   *  Vue.js 插件
   */
  plugins: [
    // axios
    {
      src: '@/plugins/axios',
      ssr: false
    },
    {
      src: '~plugins/wangeditor',
      ssr: false
    },
    '@/plugins/element-ui'
  ],
  /*
   ** Build configuration
   */
  build: {
    /**
     * 打包进 vendor bundle的第三方模块
     */
    vendor: ['axios', 'element-ui'],
    /*
     ** Run ESLint on save
     */
    extend(config, {
      isDev,
      isClient
    }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  /*
   ** Add server middleware
   ** Nuxt.js uses `connect` module as server
   ** So most of express middleware works with nuxt.js server middleware
   */
  serverMiddleware: [
    // body-parser middleware
    bodyParser.json(),
    // for parsing application/x-www-form-urlencoded
    bodyParser.urlencoded({
      extended: false
    }),
    // for parsing multipart/form-data
    // multer(),
    // session middleware
    session({
      store: new RedisStore(redisOptions),
      secret: 'super-secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 7 * 365 * 24 * 60 * 60 * 1000,
        secure: false
      }
    }),
    // Api middleware
    '~/exapi'
  ]
}
