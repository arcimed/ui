import axios from "axios";

const state = () => ({
    restaurantsCart: []
})

const getters = {
    restaurantsCart: state => state.restaurantsCart,
}

const actions = {
    addArticleToCart ({ state, commit, rootState }, article) {
        let restaurant = rootState.restaurants.restaurants.find(restaurant => restaurant.id === article.Restaurant.id)
        commit('pushArticleToCart', { restaurant: restaurant, article: article })
    },

    addMenuToCart ({ state, commit, rootState }, menu) {
        let restaurant = rootState.restaurants.restaurants.find(restaurant => restaurant.id === menu.Restaurant.id)
        commit('pushMenuToCart', { restaurant: restaurant, menu: menu })
    },

    checkout ({ state, commit }, {restaurantsCart, userId}) {
        restaurantsCart.forEach(restaurantCart => {
            let articlesCartIds = [];
            let menusCartIds = [];

            restaurantCart.articlesCart.forEach(articleCart => {
                articlesCartIds.push(articleCart.id)
            })

            restaurantCart.menusCart.forEach(menuCart => {
                menusCartIds.push(menuCart.id)
            })

            axios.post(`api/order/create`,
                {
                    userId: userId,
                    restaurantsId: restaurantCart.restaurant.id,
                    articlesIds: articlesCartIds,
                    menusIds: menusCartIds
                })
                .then(response =>{
                    commit('removeRestaurantCart', { idRestaurant: restaurantCart.restaurant.id })
                }).catch()
        })
    },
}

const mutations = {
    pushArticleToCart (state, { restaurant, article}) {
        let restaurantCart = state.restaurantsCart.find(restaurantsCart => restaurantsCart.restaurant.id === restaurant.id);

        if (restaurantCart) {
            if (!restaurantCart.articlesCart.find(item => item.id === article.id)) {
                restaurantCart.articlesCart.push(article)
            }
        } else {
            state.restaurantsCart.push({restaurant, menusCart: [], articlesCart: [article]})
        }
    },
    pushMenuToCart (state, { restaurant, menu}) {
        let restaurantCart = state.restaurantsCart.find(restaurantsCart => restaurantsCart.restaurant.id === restaurant.id);

        if (restaurantCart) {
            if (!restaurantCart.menusCart.find(item => item.id === menu.id)) {
                restaurantCart.menusCart.push(menu)
            }
        } else {
            state.restaurantsCart.push({restaurant, menusCart: [menu], articlesCart: []})
        }
    },
    removeRestaurantCart(state, { idRestaurant }) {
        let index = state.restaurantsCart.findIndex(restaurantsCart => restaurantsCart.restaurant.id === idRestaurant);
        state.restaurantsCart.splice(index, 1)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
