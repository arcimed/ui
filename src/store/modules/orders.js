import axios from "axios";

const state = () => ({
    orders: [],
})

const getters = {
    orders: state => state.orders
}

const actions = {
    setOrders (store, userId) {
        axios.get(`api/ordersbyuser/` + userId)
            .then((response) => {
                store.commit('setOrders', response.data.data)
            }).catch()
    },
}

const mutations = {
    setOrders (state, orders) {
        state.orders = orders
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
