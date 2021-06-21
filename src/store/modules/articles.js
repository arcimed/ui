import axios from "axios";

const state = () => ({
    articles: [],
})

const getters = {
    restaurantArticles: state => state.articles
}

const actions = {
    setArticles (store, restaurantId) {
        axios.get(`api/articlesbyrestaurant/` + restaurantId)
            .then((response) => {
                store.commit('setArticles', response.data.data)
            }).catch()
    },
}

const mutations = {
    setArticles (state, articles) {
        state.articles = articles
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
