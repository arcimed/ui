import axios from "axios";
import {statusOrders} from "@/config/statusOrders";

const state = () => ({
    orders: [],
    restaurateurRestaurantsOrders: [],
    deliveryManOrders: [],
    deliveryManOrdersToDeliver: [],
    deliveryOrder: {},
})

const getters = {
    orders: state => state.orders,
    restaurateurRestaurantsOrders:  state => state.restaurateurRestaurantsOrders,
    deliveryManOrders:  state => state.deliveryManOrders,
    deliveryManOrdersToDeliver:  state => state.deliveryManOrdersToDeliver,
    deliveryOrder: state => state.deliveryOrder
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
    setDeliveryOrder (store, orderId) {
        axios.get(`api/order/` + orderId)
            .then((response) => {
                store.commit('setDeliveryOrder', response.data.data)
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
            ordersStatusId: statusOrders.validateByDelivery,
            deliveryUserId: userId
        }).then((response) => {
            if (response.data.result) {
                store.commit('setDeliveryManForOrder', orderId)
            }
        }).catch()
    },
    setRecoverByDeliveryMan (store, orderId) {
        axios.put(`api/order/edit/` + orderId, {
            ordersStatusId: statusOrders.inDelivery
        }).then((response) => {
            if (response.data.result) {
                store.commit('setOrderInDelivery', orderId)
            }
        }).catch()
    },
    setrderDelivered (store, orderId) {
        axios.put(`api/order/edit/` + orderId, {
            ordersStatusId: statusOrders.delivered
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
        order.ordersStatusId = statusOrders.validateByDelivery;
        state.deliveryManOrdersToDeliver.push(order)
        state.deliveryManOrders.splice(state.deliveryManOrders.findIndex(order => order.id === parseInt(orderId)), 1);
    },
    setOrderInDelivery (state, orderId) {
        let order = state.deliveryManOrdersToDeliver.find(order => order.id === parseInt(orderId));
        order.ordersStatusId = statusOrders.inDelivery;
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
    setDeliveryOrder (state, deliveryOrder) {
        state.deliveryOrder = deliveryOrder;
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
