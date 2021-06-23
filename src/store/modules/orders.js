import axios from "axios";

const state = () => ({
    orders: [],
    restaurateurRestaurantsOrders: [],
})

const getters = {
    orders: state => state.orders,
    restaurateurRestaurantsOrders:  state => state.restaurateurRestaurantsOrders
}

const actions = {
    setOrders (store, userId) {
        axios.get(`api/ordersbyuser/` + userId)
            .then((response) => {
                store.commit('setOrders', response.data.data)
            }).catch()
    },
    setRestaurateurOrders (store, userId) {
        axios.get(`api/orders/restaurateur/` + userId)
            .then((response) => {
                store.commit('setRestaurateurRestaurantsOrders', response.data.data)
            }).catch()
    },
    changeStatusOrder (store, { restaurantId, orderId, status }) {
        axios.put(`api/order/changestatus/` + orderId, {
            ordersStatusId: status
        }).then((response) => {
            if (response.data.result) {
                store.commit('changeStatusOrder', { restaurantId, orderId, status })
            }
        }).catch()
    }
}

const mutations = {
    setOrders (state, orders) {
        state.orders = orders;
    },
    changeStatusOrder (state, { restaurantId, orderId, status }) {
        let restaurant = state.restaurateurRestaurantsOrders.find(restaurant => restaurant.restaurant.id === restaurantId)
        restaurant.orders.find(orders => orders.id === orderId).ordersStatusId = status;
    },
    setRestaurateurRestaurantsOrders (state, dataRestaurantsOrders) {
        state.restaurateurRestaurantsOrders = dataRestaurantsOrders;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
