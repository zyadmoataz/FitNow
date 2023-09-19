import colors from 'vuetify/es5/util/colors'
import en from './lang/en.js'
import ar from './lang/ar.js'


export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        titleTemplate: '%s - FitNow Your Fitness Solution',
        title: 'FitNow Your Fitness Solution',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '~assets/css/scss/main.scss',

    ],
    // router: {
    //     middleware: ['FitNowAuth']
    // },
    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '~plugins/countries/arabic.js',
        '~plugins/countries/english.js',
        '~plugins/globalComp.js',
        '~plugins/vuesax.js',
        { src: '~plugins/axios.js', mode: 'client' },
        { src: '~plugins/vueMobileNumber.js', mode: 'client' },
        { src: '~plugins/wow.js' },
        { src: '~/plugins/vue-apexchart.js', ssr: false }

    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/vuetify
        '@nuxtjs/vuetify',
        '@nuxtjs/auth-next',

        '@nuxtjs/axios',
    ],
    axios: {
       // baseURL: 'http://127.0.0.1:8000/api', // Used as fallback if no runtime config is provided
       baseURL: 'https://api.fitsnow.xyz/api',
    },
    // auth: {
    //     redirect: false,
    //     rewriteRedirects: false,
    //     fullPathRedirect: true,
    //     cookie: true,
    //     localStorage: false,
    //     tokenRequired: true,
    //     tokenType: 'bearer',
    //     strategies: {
    //         local: {
    //             user: {
    //                 property: false,
    //                 autoFetch: false
    //             },
    //             endpoints: {
    //                 login: { url: '/login', method: 'post', propertyName: false },
    //                 user: { url: '/user', method: 'get', propertyName: false },
    //             }
    //         }
    //     }


    // },
    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        'dropzone-nuxt', [


            "@nuxtjs/i18n",
            {
                // seo: true,
                vueI18nLoader: true,
                langDir: 'lang/',

                locales: [{
                        code: "en",
                        name: "English",
                        iso: "en-US",
                        dir: "ltr",
                        file: 'en.js'
                    },
                    {
                        code: "ar",
                        name: "العربيه",
                        iso: "ar-EG",
                        dir: "rtl",
                        file: 'ar.js'
                    }
                ],
                defaultLocale: "en",
                vueI18n: {
                    locale: 'en',
                    fallbackLocale: 'en',
                    messages: { en, ar }
                }
            },
        ],
        [
            '@nuxtjs/firebase',
            {
                config: {
                    apiKey: "AIzaSyAonp_nqDBiZeprHR5-Mq-7O3Or0FEE7U4",
                    authDomain: "fitnow-98fed.firebaseapp.com",
                    projectId: "fitnow-98fed",
                    storageBucket: "fitnow-98fed.appspot.com",
                    messagingSenderId: "305593364772",
                    appId: "1:305593364772:web:fd7d13ba6a04839fcc83b1",
                    measurementId: "G-LWZ5CGN44P"
                },
                services: {
                    auth: true // Just as example. Can be any other service.
                }
            }
        ]
    ],

    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
        customVariables: ['~/assets/css/scss/_vars.scss'],
        rtl: false,
        theme: {
            dark: false,
            themes: {
                light: {
                    primary: "#34BE82",
                    accent: "#5E5873",
                    secondary: "#353535",
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3
                }
            }
        }
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build

}