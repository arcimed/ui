import axios from "axios";
import {getStatusOrders} from "@/config/statusOrders";

const state = () => ({
    notifications: [],
    numberNotifications: []
})

const getters = {
    notifications: state => state.notifications,
    numberNotifications: state => state.numberNotifications
}

const actions = {
    setNotifications(store, userId) {
        axios.get(`api/notifications/user/` + userId)
            .then((response) => {
                store.commit('setNotifications', response.data.data)
            }).catch()
    },
    addNotification(store, notification) {
        axios.post(`api/notifications/create`, notification)
            .then((response) => {
                store.commit('addNotification', response.data.data)
            })
            .catch((error) => {
                console.log(error);
            });
    },
    addCartCreated(store, { restaurantsCart, userName }) {
        restaurantsCart.forEach(restaurantCart => {
            let notification = {
                'title' : 'Nouvelle commande client',
                'description' : 'Nouvelle commande dans votre restaurant' + restaurantCart.restaurant.name + ' par ' + userName + '.',
                'userId' : restaurantCart.restaurant.restaurateurId,
                'url' : '/my-restaurant-orders',
            }

            axios.post(`api/notifications/create`, notification)
                .then((response) => {
                    store.commit('addNotification', response.data.data)
                })
                .catch((error) => {
                    console.log(error);
                })
        })

    },
    addCartPayed(store, { order , userName }) {
        let notification = {
            'title' : 'Commande ' + order.id + ' payé par le client',
            'description' : 'Commande payée par ' + userName + '.',
            'userId' : order.Restaurant.restaurateurId,
            'url' : '/my-restaurant-orders',
        }

        axios.post(`api/notifications/create`, notification)
            .then((response) => {
                store.commit('addNotification', response.data.data)
            })
            .catch((error) => {
                console.log(error);
            });
    },
    addCartChangeStatus(store, {order, status, userId}) {
        let strStatus = getStatusOrders(status)

        let notification = {
            'title' : 'Votre commande ' + order.id + ' a été ' + strStatus,
            'description' : 'Votre commande ' + order.id + ' chez ' + order.Restaurant.name + ' a été ' + strStatus,
            'userId' : userId,
            'url' : '/my-orders',
        }

        axios.post(`api/notifications/create`, notification)
            .then((response) => {
                store.commit('addNotification', response.data.data)
            })
            .catch((error) => {
                console.log(error);
            });
    },
    addDeliveryManAccept(store, { order, username }) {
        let notification = {
            'title' : 'Un livreur a accepté votre commande ' + order.id,
            'description' : 'Votre commande ' + order.id + ' chez ' + order.Restaurant.name + ' va vous être livrée par ' + username,
            'userId' : order.userId,
            'url' : '/my-orders',
        }

        axios.post(`api/notifications/create`, notification)
            .then((response) => {
                store.commit('addNotification', response.data.data)
            })
            .catch((error) => {
                console.log(error);
            });
    },
    SeenNotification(store, userId) {
        axios.post(`api/notifications/user/seen/` + userId)
            .then((response) => {
                store.commit('seenNotification', response)
            })
            .catch((error) => {
                console.log(error);
            });
    },
}
const mutations = {
    setNotifications(state, notifications) {
        state.notifications = notifications;
    },
    addNotification(state, notification) {
        state.notifications.push(notification);
        state.numberNotifications += 1;
    },
    seenNotification(state, response) {
        state.notifications.forEach(notification => notification.hasBeenSeen = true);
    },
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
