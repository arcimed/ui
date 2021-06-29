import axios from "axios";

const state = () => ({
    restaurantsCart: [],
    orderRegistered: null
})

const getters = {
    restaurantsCart: state => state.restaurantsCart,
    orderRegistered: state => state.orderRegistered,
    totalCartPrice: state => {
        let price = 0;

        state.restaurantsCart.forEach(restaurantCart => {
            restaurantCart.articlesCart.forEach(articleCart => {
                price+= (articleCart.article.price * articleCart.quantity)
            })
            restaurantCart.menusCart.forEach(menuCart => {
                price+= (menuCart.menu.price * menuCart.quantity)
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

    removeOneArticleFromCart ({ state, commit }, {restaurantCartId, articleId}) {
        commit('changeQuantityArticleFromCart', { restaurantCartId: restaurantCartId, articleId: articleId, remove: true })
    },

    addOneArticleFromCart ({ state, commit }, {restaurantCartId, articleId}) {
        commit('changeQuantityArticleFromCart', { restaurantCartId: restaurantCartId, articleId: articleId, remove: false })
    },

    removeOneMenuFromCart ({ state, commit }, {restaurantCartId, menuId}) {
        commit('changeQuantityMenuFromCart', { restaurantCartId: restaurantCartId, menuId: menuId, remove: true })
    },

    addOneMenuFromCart ({ state, commit }, {restaurantCartId, menuId}) {
        commit('changeQuantityMenuFromCart', { restaurantCartId: restaurantCartId, menuId: menuId, remove: false })
    },

    checkout ({ state, commit }, {restaurantsCart, userId}) {
        let ordersIds = '';
        let len = restaurantsCart.length

        restaurantsCart.forEach(function(restaurant, idx) {
            let articlesCart = [];
            let menusCart = [];

            restaurant.articlesCart.forEach(articleCart => {
                articlesCart.push({id: articleCart.article.id, quantity: articleCart.quantity})
            })

            restaurant.menusCart.forEach(menuCart => {
                menusCart.push({id: menuCart.menu.id, quantity: menuCart.quantity})
            })

            axios.post(`api/order/create`,
                {
                    userId: userId,
                    restaurantsId: restaurant.restaurant.id,
                    articles: articlesCart,
                    menus: menusCart
                })
                .then(response => {
                    commit('removeRestaurantCart', {idRestaurant: restaurant.restaurant.id})
                    ordersIds += String(response.data.data.id) + ',';

                    if (idx === (len-1)){
                        commit('setOrderRegistered', { ordersIds: ordersIds.substring(0,ordersIds.length-1)})
                    }
                }).catch()
        })

    },
}

const mutations = {
    pushArticleToCart (state, { restaurant, article}) {
        let restaurantCart = state.restaurantsCart.find(restaurantsCart => restaurantsCart.restaurant.id === restaurant.id);

        if (restaurantCart) {
            if (!restaurantCart.articlesCart.find(item => item.article.id === article.id)) {
                restaurantCart.articlesCart.push({article: article, quantity: 1})
            } else {
                restaurantCart.articlesCart.find(item => item.article.id === article.id).quantity += 1;
            }
        } else {
            state.restaurantsCart.push({restaurant, menusCart: [], articlesCart: [{article: article, quantity: 1}]})
        }
    },
    pushMenuToCart (state, { restaurant, menu}) {
        let restaurantCart = state.restaurantsCart.find(restaurantsCart => restaurantsCart.restaurant.id === restaurant.id);

        if (restaurantCart) {
            if (!restaurantCart.menusCart.find(item => item.menu.id === menu.id)) {
                restaurantCart.menusCart.push({menu: menu, quantity: 1})
            } else {
                restaurantCart.menusCart.find(item => item.menu.id === menu.id).quantity += 1;
            }
        } else {
            state.restaurantsCart.push({restaurant, menusCart: [{menu: menu, quantity: 1}], articlesCart: []})
        }
    },
    removeRestaurantCart(state, { idRestaurant }) {
        let index = state.restaurantsCart.findIndex(restaurantsCart => restaurantsCart.restaurant.id === idRestaurant);
        state.restaurantsCart.splice(index, 1)
    },
    removeArticleToCart(state, {restaurantCartId , articleId}) {
        let index = state.restaurantsCart.findIndex(restaurantsCart => restaurantsCart.restaurant.id === restaurantCartId);
        let indexArticle = state.restaurantsCart[index].articlesCart.findIndex(articleCart => articleCart.article.id === articleId);

        state.restaurantsCart[index].articlesCart.splice(indexArticle, 1)

        if (state.restaurantsCart[index].articlesCart.length < 1 && state.restaurantsCart[index].menusCart.length < 1) {
            state.restaurantsCart.splice(index, 1)
        }
    },
    removeMenuToCart(state, {restaurantCartId , menuId}) {
        let index = state.restaurantsCart.findIndex(restaurantsCart => restaurantsCart.restaurant.id === restaurantCartId);
        let indexMenu = state.restaurantsCart[index].menusCart.findIndex(menuCart => menuCart.menu.id === menuId);

        state.restaurantsCart[index].menusCart.splice(indexMenu, 1)

        if (state.restaurantsCart[index].articlesCart.length < 1 && state.restaurantsCart[index].menusCart.length < 1) {
            state.restaurantsCart.splice(index, 1)
        }
    },
    setOrderRegistered(state, ordersIds) {
        state.orderRegistered = ordersIds;
    },
    changeQuantityArticleFromCart(state, {restaurantCartId , articleId, remove}) {
        let index = state.restaurantsCart.findIndex(restaurantsCart => restaurantsCart.restaurant.id === restaurantCartId);
        let indexArticle = state.restaurantsCart[index].articlesCart.findIndex(articleCart => articleCart.article.id === articleId);

        if (remove) {
            state.restaurantsCart[index].articlesCart[indexArticle].quantity -= 1;
        } else {
            state.restaurantsCart[index].articlesCart[indexArticle].quantity += 1;
        }

        if (state.restaurantsCart[index].articlesCart[indexArticle].quantity <= 0) {
            state.restaurantsCart[index].articlesCart.splice(indexArticle, 1)
        }

        if (state.restaurantsCart[index].articlesCart.length < 1 && state.restaurantsCart[index].menusCart.length < 1) {
            state.restaurantsCart.splice(index, 1)
        }
    },
    changeQuantityMenuFromCart(state, {restaurantCartId , menuId, remove}) {
        let index = state.restaurantsCart.findIndex(restaurantsCart => restaurantsCart.restaurant.id === restaurantCartId);
        let indexMenu = state.restaurantsCart[index].menusCart.findIndex(menuCart => menuCart.menu.id === menuId);

        if (remove) {
            state.restaurantsCart[index].menusCart[indexMenu].quantity -= 1;
        } else {
            state.restaurantsCart[index].menusCart[indexMenu].quantity += 1;
        }

        if (state.restaurantsCart[index].menusCart[indexMenu].quantity <= 0) {
            state.restaurantsCart[index].menusCart.splice(indexMenu, 1)
        }

        if (state.restaurantsCart[index].articlesCart.length < 1 && state.restaurantsCart[index].menusCart.length < 1) {
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
