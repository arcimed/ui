import axios from "axios";

const state = () => ({
    menus: [],
})

const getters = {
    restaurantMenus: state => state.menus
}

const actions = {
    setMenus (store, restaurantId) {
        axios.get(`api/menusbyrestaurant/` + restaurantId)
            .then((response) => {
                store.commit('setMenus', response.data.data)
            }).catch()
    },
}

const mutations = {
    setMenus (state, menus) {
        state.menus = menus
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
