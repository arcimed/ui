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
    deleteOrder (store, orderId) {
        axios.delete(`api/order/delete/` + orderId)
            .then((response) => {
                if (response.data.result) {
                    store.commit('deleteOrder', orderId)
                }
            }).catch()
    }
}

const mutations = {
    setOrders (state, orders) {
        state.orders = orders;
    },
    deleteOrder (state, orderId) {
        let index = state.orders.findIndex(order => order.id === orderId);
        state.orders.splice(index, 1);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
