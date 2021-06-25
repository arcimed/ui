import axios from "axios";
import {statusOrders} from "@/config/statusOrders";

const state = () => ({
    orders: [],
    restaurateurRestaurantsOrders: [],
    deliveryManOrders: [],
    deliveryManOrdersToDeliver: []
})

const getters = {
    orders: state => state.orders,
    restaurateurRestaurantsOrders:  state => state.restaurateurRestaurantsOrders,
    deliveryManOrders:  state => state.deliveryManOrders,
    deliveryManOrdersToDeliver:  state => state.deliveryManOrdersToDeliver
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
    setDeliveryManOrders (store) {
        axios.get(`api/deliveryman/orders`)
            .then((response) => {
                store.commit('setDeliveryManOrders', response.data.data)
            }).catch()
    },
    setDeliveryManOrdersToDeliver (store, deliveryManId) {
        axios.get(`api/deliveryman/orders/` + deliveryManId)
            .then((response) => {
                store.commit('deliveryManOrdersToDeliver', response.data.data)
            }).catch()
    },
    changeStatusOrder (store, { restaurantId, orderId, status }) {
        axios.put(`api/order/edit/` + orderId, {
            ordersStatusId: status
        }).then((response) => {
            if (response.data.result) {
                store.commit('changeStatusOrder', { restaurantId, orderId, status })
            }
        }).catch()
    },
    setDeliveryManForOrder (store, { orderId, userId }) {
        axios.put(`api/order/edit/` + orderId, {
            ordersStatusId: 5,
            deliveryUserId: userId
        }).then((response) => {
            if (response.data.result) {
                store.commit('setDeliveryManForOrder', orderId)
            }
        }).catch()
    },
    setOrderDelivered (store, orderId) {
        axios.put(`api/order/edit/` + orderId, {
            ordersStatusId: 6
        }).then((response) => {
            if (response.data.result) {
                store.commit('setOrderDelivered', orderId)
            }
        }).catch()
    },
    setPaidOrder (store, orderId) {
        axios.put(`api/order/edit/` + parseInt(orderId), {
            ordersStatusId: statusOrders.payed
        }).then((response) => {
            if (response.data.result) {
                store.commit('setPaidOrder', parseInt(orderId))
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
    setDeliveryManForOrder (state, orderId) {
        let order = state.deliveryManOrders.find(order => order.id === parseInt(orderId));
        order.ordersStatusId = statusOrders.inDelivery;
        state.deliveryManOrdersToDeliver.push(order)
        state.deliveryManOrders.splice(state.deliveryManOrders.findIndex(order => order.id === parseInt(orderId)), 1);
    },
    setOrderDelivered (state, orderId) {
        state.deliveryManOrdersToDeliver.splice(state.deliveryManOrders.findIndex(order => order.id === parseInt(orderId)), 1);
    },
    setRestaurateurRestaurantsOrders (state, dataRestaurantsOrders) {
        state.restaurateurRestaurantsOrders = dataRestaurantsOrders;
    },
    setDeliveryManOrders (state, deliveryManOrders) {
        state.deliveryManOrders = deliveryManOrders;
    },
    deliveryManOrdersToDeliver (state, deliveryManOrdersToDeliver) {
        state.deliveryManOrdersToDeliver = deliveryManOrdersToDeliver;
    },
    setPaidOrder (state, orderId) {
        state.orders.find(order => order.id === parseInt(orderId)).ordersStatusId = statusOrders.payed;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
