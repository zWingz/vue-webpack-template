const path = require('path')
const config = require('./config')
const utils = require('./utils')
const projectRoot = path.resolve(__dirname, '../')
const isProduction = process.env.NODE_ENV !== 'development';
{{#if_eq frame "vue"}}
const VueLoaderPlugin = require('vue-loader/lib/plugin')
{{/if_eq}}
// console.log('base conf', process.env.NODE_ENV, 'isProduction :', isProduction)
const entries = {};
Object.keys(config.entry).forEach(each => {
    const opt = config.entry[each]
    entries[each] = opt.path;
})
module.exports = {
    entry: entries,
    output: {
        path: isProduction ? config.build.assetsRoot : config.test.assetsRoot,
        publicPath: isProduction ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
        filename: '[name].js',
        chunkFilename: '[name].js', // so that import('module') creates module.js
        sourceMapFilename: '[file].map'
    },
    // require 解析
    resolve: {
        extensions: ['.js',{{#if_eq frame "vue"}}'.vue',{{/if_eq}}{{#if_eq frame "react"}}'.jsx',{{/if_eq}}
                    {{#sass}}'.scss',{{/sass}}'.css'
                    ], // 当require找不到模块添加后缀
        modules: [
            path.join(__dirname, '../src'),
            'node_modules'
        ],
        alias: {
            '@': path.resolve(__dirname, '../src'),
            assets: '@/assets',
            components: '@/components',
            js: '@/js',
            {{#sass}}
            sass: '@/sass',
            {{/sass}}
            {{#if_eq frame "vue"}}
            vue: 'vue/dist/vue.esm.js',
            'vue-router': 'vue-router/dist/vue-router.esm.js',
            vuex: 'vuex/dist/vuex.esm.js',
            store: '@/store',
            {{/if_eq}}
            router: '@/router',
            view: '@/view',
            http: '@/http'

        }
    },
    module: {
        rules: [
            {{#if_eq frame "vue"}}
            {
              test: /\.vue$/,
              loader: 'vue-loader'
            },
            {{/if_eq}}
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                }],
                include: projectRoot,
                exclude: /node_modules/,
            },
            {
                test: /\.html$/,
                use: [ "html-loader" ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: utils.assetsPath('img/[name].[hash:7].[ext]')
                    }
                }]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                    }
                }]
            }
        ]
    },
    node: {
        {{#if_eq frame "vue"}}
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
        {{/if_eq}}
        Buffer: false
    },
    {{#if_eq frame "vue"}}
    plugins: [new VueLoaderPlugin()]
    {{/if_eq}}
}
