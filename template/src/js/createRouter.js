import Vue from 'vue';
// VueRouter
import VueRouter from 'vue-router';

// import { isProduction } from 'js/ConstValue';

export default function(routes = []) {
    Vue.use(VueRouter);
    const router = new VueRouter({
        mode: 'history',
        routes,
        history: true
    });
    router.beforeEach((to, from, next) => {
        let hasPer = true;
        const vm = router.app,
            cb = () => {
                // doSomething
                next()
            };
        if (!vm._isMounted) {
            ch();
        } else {
            cb();
        }
    });
    return router;
}