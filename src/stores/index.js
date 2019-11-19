import Vue from 'vue'
import Vuex from 'vuex'

import Authenticates from './Users/Authenticates'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        toast: {
            status: false,
            color: null,
            icon: null,
            text: null,
            timeout: 6000
        },
        loading: {
            status: false,
            timer: null
        },
        locales: [
            {
                value: 'en-us',
                flag: 'us',
                text: 'English'
            },
            {
                value: 'zh-tw',
                flag: 'tw',
                text: '繁體中文'
            },
            {
                value: 'zh-cn',
                flag: 'cn',
                text: '简体中文'
            }
        ]
    },
    actions: {

    },
    mutations: {
        startLoading(state) {
            state.loading.status = true
        },
        stopLoading(state) {
            if (state.loading.status) {
                state.loading.status = false
            }
        },
        showError(state, options) {
            if (typeof options === 'string') {
                options = {
                    text: options || '',
                    color: 'error',
                    dark: true,
                    icon: 'error_outline',
                    time: 6000
                }
            } else {
                options = {
                    text: options.text || '',
                    color: 'error',
                    icon: 'error_outline',
                    time: 6000
                }
            }
            state.toast = {
                ...state.toast,
                ...options,
                status: true
            }
        },
        showSuccess(state, { text = '', color = 'success', icon = 'check_circle_outline', time = 6000 }) {
            state.toast = {
                ...state.toast,
                status: true,
                text,
                color,
                icon,
                time
            }
        },
        showPermissionDenied(state) {
            state.toast = {
                ...state.toast,
                status: true,
                text: 'You do not have permission to access.',
                color: 'error',
                icon: 'sl-cancel2',
                time: 6000
            }
        }
    },
    getters: {

    },
    modules: {
        Authenticates
    }
})
