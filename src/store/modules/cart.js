import axios from "axios";

const state = () => ({
    restaurantsCart: []
})

const getters = {
    restaurantsCart: state => state.restaurantsCart,
    totalCartPrice: state => {
        let price = 0;

        state.restaurantsCart.forEach(restaurantCart => {
            restaurantCart.articlesCart.forEach(articleCart => {
                price+= articleCart.price
            })
            restaurantCart.menusCart.forEach(menuCart => {
                price+= menuCart.price
            })
        })

        return price.toFixed(2);
    },
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

    deleteArticleToCart ({ state, commit }, {restaurantCartId , articleId}) {
        commit('removeArticleToCart', { restaurantCartId: restaurantCartId, articleId: articleId })
    },

    deleteMenuToCart ({ state, commit }, {restaurantCartId , menuId}) {
        commit('removeMenuToCart', { restaurantCartId: restaurantCartId, menuId: menuId })
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
    },
    removeArticleToCart(state, {restaurantCartId , articleId}) {
        let index = state.restaurantsCart.findIndex(restaurantsCart => restaurantsCart.restaurant.id === restaurantCartId);
        let indexArticle = state.restaurantsCart[index].articlesCart.findIndex(articleCart => articleCart.id === articleId);

        state.restaurantsCart[index].articlesCart.splice(indexArticle, 1)

        if (state.restaurantsCart[index].articlesCart.length < 1 && state.restaurantsCart[index].menusCart.length < 1) {
            state.restaurantsCart.splice(index, 1)
        }
    },
    removeMenuToCart(state, {restaurantCartId , menuId}) {
        let index = state.restaurantsCart.findIndex(restaurantsCart => restaurantsCart.restaurant.id === restaurantCartId);
        let indexMenu = state.restaurantsCart[index].menusCart.findIndex(menuCart => menuCart.id === menuId);

        state.restaurantsCart[index].menusCart.splice(indexMenu, 1)

        if (state.restaurantsCart[index].menusCart.length < 1 && state.restaurantsCart[index].menusCart.length < 1) {
            state.restaurantsCart.splice(index, 1)
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
