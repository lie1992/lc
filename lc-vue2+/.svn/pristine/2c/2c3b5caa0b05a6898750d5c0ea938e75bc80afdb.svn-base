import Vue from 'vue'
import App from './App'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import vueResource from 'vue-resource'
Vue.use(vueResource)

// Vue.http.interceptors.push((request, next) => {
//     let timeout;
//     // 這裡改用 _timeout
//     if (request._timeout) {
//         timeout = setTimeout(() => {
// 　　　　　　　　//自定义响应体 status:408,statustext:"请求超时"，并返回给下下边的next
//             next(request.respondWith(request.body, {
//                  status: 408,
//                  statusText: '请求超时'
//             }));
//
//         }, request._timeout);
//     }
//     next((response) => {
// 　　　　console.log(response.status)//如果超时输出408
// 　　　　return response;
//     })
// })

import Vuex from 'vuex'
Vue.use(Vuex)

Vue.config.debug = true

import vuex from './vuex'
const store = new Vuex.Store({
    modules: vuex.data
})

import router from './router'
/* 路由参数 routes  千万别写错 */
const route = new VueRouter({
    // mode: 'history',
    routes: router.routes
})

if (window.localStorage.userToken) {
    Vue.http.options.root = '/root'
    Vue.http.headers.common['Authorization'] = 'Bearer ' + window.localStorage.userToken
}
new Vue({
    store: store,
    router: route,
    render: h => h(App)
}).$mount('#app')
