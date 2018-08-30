{{#if_eq frame "vue"}}
import vue from 'vue';
import Vuex from 'vuex';
// 引入两个构建文件
import createApp from 'js/createApp';
import createRouter from 'js/createRouter';
// App.vue
import App from 'App.vue';
// 引入全局state
import {rootState} from 'store';
import 'js/registerComponent';

/** route */
import {baseRoutes} from 'router';
vue.use(Vuex)
// store
const { state, mutations, actions, getters } = rootState;
// 路由
const router = createRouter(baseRoutes)
const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});

const vm = createApp(router, store, App, 'app');
export default vm;
{{/if_eq}}

{{#if_eq frame "none"}}
import '{{#sass}}sass{{else}}css{{/sass}}/markdown'
{{/if_eq}}
