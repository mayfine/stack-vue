export default {

    namespaced: true,

    state: {
        count: 6
    },

    getters: {
        count: state => state.count
    },

    mutations: {
        increment (state) {
            state.count++
        },

        decrement(state) {
            state.count--
        }
    },

    actions: {
        increment ({commit, state, dispatch}) {
            commit('increment')
        },

        decrement ({commit, state, dispatch}) {
            commit('decrement')
        }
    }
}