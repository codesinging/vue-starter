"use strict";

import Vue from 'vue';
import axios from "axios";

import store from '../store'

// Show error message
const showError = Vue.prototype.$error

// Show success message
const showSuccess = Vue.prototype.$success

// The console label
const TAG = '===axios==='

// Default loading label
const LOADING_LABEL = 'loading'

// Request label key
const KEY_LABEL = 'label'

// Key whether success messages are hidden
const KEY_HIDE_SUCCESS = 'hideSuccess'

// Key whether error message are hidden
const KEY_HIDE_ERROR = 'hideError'

let config = {
    baseURL: process.env.baseURL || process.env.apiUrl || process.env.VUE_APP_API_URL || "",
    timeout: 60 * 1000,
    withCredentials: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    }
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
    function (config) {
        // Add token to the request headers
        if (store.state.token) {
            config.headers['Authorization'] = 'Bearer ' + store.state.token
        }

        // Set default request loading label
        store.commit('status', {[LOADING_LABEL]: true})

        // If the request label specified, set it as true
        if (config[KEY_LABEL]) {
            store.commit('status', {[config[KEY_LABEL]]: true})
        }

        return config;
    },
    function (error) {
        showError('创建网络请求错误[90001]')
        console.error(TAG, 'Create http request error[90001]', error)
    }
);

// Add a response interceptor
_axios.interceptors.response.use(
    function (response) {

        // Reset default loading label as false
        store.commit('status', {[LOADING_LABEL]: false})

        // Reset specified request label as false
        if (response.config[KEY_LABEL]) {
            store.commit('status', {[response.config[KEY_LABEL]]: false})
        }

        if (response.status === 200) {
            if (response.data.code === 0) {
                if (!response.config[KEY_HIDE_SUCCESS]) {
                    showSuccess(response.data.message || '网络请求成功')
                }
                return response.data
            } else {
                if (!response.config[KEY_HIDE_ERROR]) {
                    showError((response.data.message || '响应数据错误') + '[90002]')
                }
                console.error(TAG, 'Http response data error', response.data.code, response.data.message)
            }
        } else {
            if (response.status === 401){
                store.commit('token', null)
                store.commit('user', null)
                if (!response.config[KEY_HIDE_ERROR]) {
                    showError(('Token 验证失败') + '[90003]')
                }
            } else {
                if (!response.config[KEY_HIDE_ERROR]) {
                    showError(('网络响应错误') + '[90004]')
                }
            }
            console.error(TAG, 'Http response error', response.status, response.statusText)
        }

        return response;
    },
    function (error) {
        store.commit('status', {[LOADING_LABEL]: false})
        showError('网络请求错误[90005]')
        console.error(TAG, 'Http request error', error)
    }
);

Plugin.install = function (Vue) {
    Vue.axios = _axios;
    window.axios = _axios;
    Object.defineProperties(Vue.prototype, {
        $http: {
            get() {
                return _axios;
            }
        }
    });
};

Vue.use(Plugin)

export default Plugin;
