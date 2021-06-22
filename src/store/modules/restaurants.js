import axios from "axios";

const state = () => ({
    restaurants: []
})

const getters = {
    restaurants: state => state.restaurants
}

const actions = {
    addRestaurant: (store, restaurant) => {
        store.commit('addRestaurant', restaurant)
    },

    setRestaurants(store) {
        axios.get(`api/restaurant/all`)
            .then((response) => {
                store.commit('setRestaurants', response.data.data)
            }).catch()
    },
}

const mutations = {
    setRestaurants (state, restaurants) {
        state.restaurants = restaurants
    },

    addRestaurant(state, name) {
        state.restaurants.push({name: name})
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
