import Vue from 'vue'
import Vuex from 'vuex'

import pageA from './modules/a'

Vue.use(Vuex)

const store = new Vuex.Store({

    // 公共数据管理 -- start
    state: {
        count: 0
    },

    getters: {
        count: state => state.count
    },

    mutations: {
        increment(state) {
            state.count++
        },

        decrement(state) {
            state.count--
        }
    },
    // 公共数据管理 -- end

    // 模块 store
    modules: {
        pageA
    }
})

export default store
