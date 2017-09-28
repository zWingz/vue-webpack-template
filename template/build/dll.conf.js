const webpack = require('webpack');
var config = require('./config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
var utils = require('./utils')
var path = require('path')

const dll = [
  'vue/dist/vue.runtime.esm.js',
  'vue-router/dist/vue-router.esm.js',
  'vuex/dist/vuex.esm.js',
  'axios',
  'qs'
];

module.exports = {
    output: {
        path: path.resolve(__dirname, '../dll'),
        filename: '[name].[chunkhash].js',
        library: '[name]_[chunkhash]',
    },
    entry: {
        dll: dll,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader']
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
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        }
                    ],
                    fallback: 'vue-style-loader'
                })
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
    plugins: [
        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].[contenthash].css'),
            allChunks: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                // 在UglifyJs删除没有用到的代码时不输出警告  
                warnings: false,
                // 删除所有的 `console` 语句
                // 还可以兼容ie浏览器
                drop_console: true,
                // 内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true,
            }
        }),
        new webpack.DllPlugin({
            path: path.resolve(__dirname, '../dll/bundel.manifest.json'),
            name: '[name]_[chunkhash]',
            context: __dirname,
        }),
  ],
};
