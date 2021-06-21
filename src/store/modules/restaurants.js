import axios from "axios";

const state = () => ({
    restaurants: [],
    restaurant: {}
})

const getters = {
    allRestaurants: state => state.restaurants,
    restaurant: state => state.restaurant
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

    setRestaurant(store, id) {
        axios.get(`api/restaurant/` + id)
            .then((response) => {
                store.commit('setRestaurant', response.data.data)
            }).catch(error => console.log(error))
    }
}

const mutations = {
    setRestaurants (state, restaurants) {
        state.restaurants = restaurants
    },

    addRestaurant(state, name) {
        state.restaurants.push({name: name})
    },

    setRestaurant (state, restaurant) {
        state.restaurant = restaurant
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
