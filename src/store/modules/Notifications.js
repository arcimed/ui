import axios from "axios";

const state = () => ({
    notifications: [],
})

const getters = {
    notifications: state => state.notifications
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
    SeenNotification(store, userId) {
        axios.post(`api/notifications/user/seen/` + userId)
            .then((response) => {
                store.commit('seenNotification')
            })
            .catch((error) => {
                console.log(error);
            });
    },
}
const mutations = {
    setNotifications(state, notifications) {
        state.notifications = notifications
    },
    addNotification(state, notification) {
        state.notifications.push(notification)
    },
    seenNotification(state) {
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