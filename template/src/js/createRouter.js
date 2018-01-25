import Vue from 'vue';
import VueRouter from 'vue-router';

/**
 * Router构造方法
 *
 * @export
 * @param {Array} array route数组
 * @returns vue-router 实例
 */
export default function(array) {
    const routes = array || [];
    Vue.use(VueRouter);
    // 创建router
    const router = new VueRouter({
        mode: 'history',
        routes,
        scrollBehavior(to, from, savedPosition) {
            if(savedPosition) {
                return savedPosition
            }
            return { x: 0, y: 0 }
        }
    });
    /**
     * 设置beforeEach钩子
     */
    router.beforeEach((to, from, next) => {
        // doSomething
        next();
    });
    router.afterEach(() => {
        // doSomething
    })
    return router;
}
