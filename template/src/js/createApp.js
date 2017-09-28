import Vue from 'vue';
import 'src/http';
import { HttpRoot, isProduction } from 'js/ConstValue.js';
import 'sass/global.scss';
// window.onerror = function (errorMessage, scriptURI, lineNumber, columnNumber, errorObj) {
//     console.log('错误信息：', errorMessage);
//     console.log('出错文件：', scriptURI);
//     console.log('出错行号：', lineNumber);
//     console.log('出错列号：', columnNumber);
//     console.log('错误详情：', errorObj);
// }
window.getScrollTop = function() {
    return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
}
export default function(router, store, app, element) {
    // 配置Vue调试工具
    Vue.config.devtools = !isProduction;
    Vue.prototype.$httpRoot = HttpRoot;



    // Vue.config.errorHandler = function (err, vm, info) {
    //     console.log('err:', err)
    //     console.log('vm:', vm)
    //     console.log('info:', info)
    // }
    return new Vue({
        router,
        store,
        render: h => h(app)
    }).$mount('#' + element);
}