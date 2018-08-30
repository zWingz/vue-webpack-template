var path = require('path');
const time = new Date().getTime();

module.exports = {
    entry: {
        {{#if multipage}}
        index: {
            path: './src/view/index',
            title: 'index'
        }
        {{else}}
        main: {
            path: './src/main',
            title: 'main'
        }
        {{/if}}
    },
    build: {
        env: {
            // NODE_ENV: '"development"'
            NODE_ENV: '"production"'
        },
        index: path.resolve(__dirname, `../release-${time}/`),
        // 编译输出的静态资源根路径
        assetsRoot: path.resolve(__dirname, `../release-${time}`),
        devtool: 'cheap-module-source-map',
        // 编译输出的二级目录
        assetsSubDirectory: 'assets',
        // 编译发布上线路径的根目录，可配置为资源服务器域名或 CDN 域名
        assetsPublicPath: '/',
        // 是否开启 cssSourceMap
        productionSourceMap: false,
        extract: true,
        bundleAnalyzerReport: false
    },
    dev: {
        env: {
            NODE_ENV: '"development"'
        },
        devtool: 'cheap-module-eval-source-map',
        // port: 8089,
        // 编译输出的二级目录
        assetsSubDirectory: 'assets',
        // 编译发布上线路径的根目录，可配置为资源服务器域名或 CDN 域名
        assetsPublicPath: '/',
        cssSourceMap: true,
        extract: false
    }
};
