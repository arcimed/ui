import axios from "axios";

const state = () => ({
    usersManagement: [],
})
const getters = {
    UsersManagement: state => state.usersManagement,
}
const actions = {
    deleteUser: (store, userId) => {
        axios.put(`api/user/delete/` + userId)
            .then((response) => {
                store.commit('deleteUser', userId)
            }).catch()
    },
    suspendUser: (store, { userId, isSuspended}) => {
        let edit = {isSuspended: !isSuspended}
        axios.put(`api/user/edit/` + userId, edit)
            .then((response) => {
                store.commit('editUser', {isSuspended, userId})
            }).catch()
    },
    setUsers(store) {
        axios.get(`api/user/all`)
            .then((response) => {
                store.commit('setUsers', response.data.data)
            }).catch()
    },
}
const mutations = {
    setUsers (state, users) {
        state.usersManagement = users
    },
    deleteUser: (state, userId) => {
        state.usersManagement.splice(state.usersManagement.findIndex(user => parseInt(user.id) === userId), 1)
    },
    editUser(state, {isSuspended, userId}) {
        let stateId = state.usersManagement.findIndex(user => parseInt(user.id) === userId);
        state.usersManagement[stateId].isSuspended = !isSuspended;
    },
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}