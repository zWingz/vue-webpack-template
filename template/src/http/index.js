import Axios from 'axios';
import { HttpRoot } from 'js/ConstValue';
{{#if_eq frame "vue"}}
import Vue from 'vue';
{{/if_eq}}
const axios = Axios.create({
    baseURL: HttpRoot,
    withCredentials: true
});
const mock = Axios.create({
    baseURL: '/mock'
});
mock.interceptors.response.use((response) => response.data, (error) => Promise.reject(error));
axios.interceptors.response.use((response) => response.data, (error) => Promise.reject(error));

{{#if_eq frame "vue"}}
/**
 * 创建用于挂靠在vue上得post请求方法
 *
 * @param {Stirng} url 请求地址
 * @param {Object} [postData={}]
 * @param {Object} [options={}]
 * @returns {Function} axios.post
 */
function createPost(url, postData = {}, options = {}) {
    return axios.post(url, postData, options)
}
/**
 * 创建用于挂靠在vue上得get请求方法
 *
 * @param {Stirng} url 请求地址
 * @param {Object} [postData={}]
 * @returns {Function} axios.get
 */
function createGet(url, postData) {
    let http;
    if(postData) {
        http = axios.get(url, { params: postData })
    } else {
        http = axios.get(url);
    }
    return http
}
/**
 * 将post,get挂在vue原型上
 * 将axios实例以及mock实例直接挂在vue上
 */
Object.defineProperties(Vue.prototype, {
    $post: {
        get() {
            return createPost.bind(this)
        }
    },
    $get: {
        get() {
            return createGet.bind(this);
        }
    },
    $http: {
        get() {
            return axios
        }
    },
    $mock: {
        get() {
            return mock.post
        }
    }
});
{{/if_eq}}
/**
 * export 出post.用于某些不能调用vue实例的地方
 */
export const $post = axios.post;
export const $mock = mock.post;

/**
 * 发起同步请求
 *
 * @param {String} url
 * @param {Object} postData
 */
export const SyncPost = (url, postData) => {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open('POST', HttpRoot + url, false)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    xhr.send(postData)
}
