import Vue from 'vue';
import Axios from 'axios';
import { HttpRoot } from 'js/ConstValue';
import qs from 'qs';
import $vm from 'view/app';
const axios = Axios.create({
    baseURL: HttpRoot,
    withCredentials: true
})
Axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
const mock = Axios.create({
    baseURL: '/mock',
    withCredentials: true
});
mock.interceptors.response.use((response) => response.data, (error) => Promise.reject(error));

function interceptors(response) {
    return response.data;
}

function createPost(url, postData = {}, options = {}) {
    return axios.post(url, postData, options).then(interceptors.bind(this)).catch(error => Promise.reject(error));
}

function createGet(url, postData) {
    let http;
    if (postData) {
        http = axios.get(url, { params: postData })
    } else {
        http = axios.get(url);
    }
    return http.then(interceptors.bind(this)).catch(error => Promise.reject(error));
}
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

export const $post = axios.post;
export const $mock = mock.post;
export const SyncPost = (url, postData) => {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open('POST', HttpRoot + url, false)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    xhr.send(postData)
}