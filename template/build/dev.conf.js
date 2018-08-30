var config = require('./config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var baseWebpackConfig = require('./base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var path = require('path')
const devRules = utils.styleLoaders({
    sourceMap: config.dev.cssSourceMap,
    extract: config.dev.extract
});
devRules.push({
    test: /{{#if_eq frame "vue"}}\.vue|{{/if_eq}}{{#if_eq frame "react"}}\.jsx|{{/if_eq}}\.js$/,
    use: [{
        loader: 'eslint-loader',
        options: {
            formatter: require('eslint-friendly-formatter')
        }
    }],
    include: path.resolve(__dirname, '../src'),
    enforce: 'pre',
    exclude: /node_modules|vendor|dist/,
});
module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    module: {
        rules: devRules
    },
    devtool: config.dev.devtool,
    plugins: [
        new webpack.DefinePlugin({ 'process.env': config.dev.env }),
        new webpack.NoEmitOnErrorsPlugin(),
        new FriendlyErrorsPlugin(),
        {{#if multipage}}
        // 配置多页
        ...(function () {
            return Object.keys(config.entry).map(each => {
                return new HtmlWebpackPlugin({
                    template: './index.html',
                    filename: `${each}.html`,
                    inject: true,
                    chunks: ['vendors', each]
                })
            })
        })(),
        {{else}}
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            inject: true,
            chunks: ['vendors', 'main']
        }),
        {{/if}}
    ]
})
