const webpack = require('webpack');
var config = require('./config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
var utils = require('./utils')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

var path = require('path');
// 需要打包的dll入口
const dll = [
  'axios',
  {{#if_eq frame "vue"}}
  'vue',
  {{/if_eq}}
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
                    fallback: 'style-loader'
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
        new OptimizeCSSPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true }, safe: true }, // 删除注释
            canPrint: true
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
            path: path.resolve(__dirname, '../dll/bundel.manifest.json'), // 务必与prod.conf.js中一致
            name: '[name]_[chunkhash]', // 和output.library 一样
            context: __dirname, // 和DllReferencePlugin中context一致
        }),
  ],
};
