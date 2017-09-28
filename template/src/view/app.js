// 构建路由
import createApp from 'js/createApp';
import createRouter from 'js/createRouter'
// App.vue
import App from 'src/App.vue';
import Vuex from 'vuex';
import rootState from 'store';
const { state, mutations, actions, getters } = rootState;
import vue from 'vue';
const router = createRouter([])
const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})
export default createApp(router, store, App, 'app');