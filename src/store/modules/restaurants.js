import axios from "axios";

const state = () => ({
    restaurants: [],
    restaurantMenuArticle: []
})

const getters = {
    restaurants: state => state.restaurants,
    restaurantMenuArticle: state => state.restaurantMenuArticle
}

const actions = {
    addRestaurant: (store, restaurant) => {
        axios.post(`api/restaurant/create`, restaurant)
            .then((response) => {
                store.commit('addRestaurant', response.data.data)
            })
            .catch((error) => {
            });
    },
    editRestaurant: (store, {restaurant, idRestaurant}) => {
        axios.put(`api/restaurant/edit/` + idRestaurant, restaurant)
            .then(() => {
                store.commit('editRestaurant', {restaurant, idRestaurant})
            })
            .catch((error) => {
            });
    },
    deleteRestaurant: (store, restaurantId) => {
        axios.put(`api/restaurant/delete/` + restaurantId)
            .then((response) => {
                store.commit('deleteRestaurant', restaurantId)
            }).catch()
    },
    setRestaurants(store) {
        axios.get(`api/restaurant/all`)
            .then((response) => {
                store.commit('setRestaurants', response.data.data)
            }).catch()
    },
    setRestaurantMenuArticle(store, restaurantId) {
        axios.get(`api/restaurant/` + restaurantId)
            .then((response) => {
                store.commit('setRestaurantMenuArticle', response.data.data)
            }).catch()
    },
}

const mutations = {
    setRestaurants (state, restaurants) {
        state.restaurants = restaurants
    },
    setRestaurantMenuArticle (state, restaurant) {
        state.restaurantMenuArticle = restaurant
    },
    addRestaurant(state, restaurant) {
        state.restaurants.push(restaurant)
    },
    editRestaurant(state, {restaurant, idRestaurant}) {
        let stateId = state.restaurants.findIndex(restaurant => parseInt(restaurant.id) === idRestaurant);
        state.restaurants[stateId].name = restaurant.name;
        state.restaurants[stateId].city = restaurant.city;
        state.restaurants[stateId].address = restaurant.address;
        state.restaurants[stateId].restaurateurId = restaurant.restaurateurId;
    },
    deleteRestaurant: (state, restaurantId) => {
        state.restaurants.splice(state.restaurants.findIndex(restaurant => parseInt(restaurant.id) === restaurantId), 1)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
