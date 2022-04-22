export default {
  dev: process.env.NODE_ENV !== 'production',
  ssr: true,
  mode: 'universal',
  target: 'static',
  generate: {
    exclude: [/^\/admin/, /^\/pt\/admin/, /^\/de\/admin/, /^\/admin/],
  },

  hooks: {
    generate: {
      async done(builder) {
        const appModule = await import('./.nuxt/firebase/app.js');
        const { session } = await appModule.default(
          builder.options.firebase.config,
          {
            res: null,
          }
        );
        try {
          session.database().goOffline();
        } catch (e) {}
        try {
          session.firestore().terminate();
        } catch (e) {}
      },
    },
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head() {
    const i18nHead = this.$nuxtI18nHead
      ? this.$nuxtI18nHead({ addSeoAttributes: true })
      : { htmlAttrs: { lang: 'en-US' }, meta: [], link: [] };

    return {
      title: this.$t ? this.$t('seo.global.title') : 'João Aroeira - Developer',
      htmlAttrs: {
        ...i18nHead.htmlAttrs,
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
        ...i18nHead.meta,
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: true,
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap',
        },
        ...i18nHead.link,
      ],
    };
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/main.css',
    '@splidejs/splide/dist/css/themes/splide-default.min.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/splide.client.js',
    '~/plugins/formulate.js',
    '~/plugins/services.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: [
      '~/components',
      '~/components/Navigation',
      '~/components/UI',
      '~/components/Forms',
    ],
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://github.com/nuxt-community/svg-module
    '@nuxtjs/svg',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/firebase',
    '@nuxtjs/cloudinary',
    '@nuxtjs/i18n',
  ],

  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.json',
      },
      {
        code: 'de',
        iso: 'de-DE',
        name: 'Deutsch',
        file: 'de.json',
      },
      {
        code: 'pt',
        iso: 'pt-BR',
        name: 'Português',
        file: 'pt.json',
      },
    ],
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    vueI18nLoader: true,
    defaultLocale: 'en',
    langDir: '~/locales/',
    lazy: true,
    vueI18n: {
      fallbackLocale: 'en',
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },

  firebase: {
    config: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      appId: process.env.FIREBASE_APP_ID,
    },
    services: {
      auth: {
        ssr: true,
        persistence: 'local',
        initialize: {
          onAuthStateChangedAction: 'auth/onAuthStateChangedAction',
          subscribeManually: false,
        },
      },
      firestore: true,
      functions: true,
    },
  },

  pwa: {
    meta: false,
    icon: false,
    workbox: {
      importScripts: ['/firebase-auth-sw.js'],
      dev: process.env.NODE_ENV === 'development',
    },
  },

  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, { isDev, isClient, isServer }) {
      if (isServer) {
        config.externals = {
          '@firebase/app': 'commonjs @firebase/app',
          '@firebase/firestore': 'commonjs @firebase/firestore',
        };
      }
    },
  },

  pageTransition: {
    name: 'fade',
    mode: 'out-in',
  },
  publicRuntimeConfig: {
    baseUrl: process.env.BASE_URL,
    twitterCardImageUrl:
      process.env.TWITTER_CARD_IMAGE_URL,
    cloudinary: {
      apiKey: process.env.CLOUDINARY_API_KEY,
      apiUrl:
        process.env.CLOUDINARY_API_URL,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      folder: process.env.CLOUDINARY_FOLDER,
    },
  },
};
