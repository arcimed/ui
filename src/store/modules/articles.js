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
    addArticles (store, article) {
        axios
            .post(`api/article/create`, article)
            .then(() => {
                store.commit('addArticles', article)
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

const mutations = {
    setArticles (state, articles) {
        state.articles = articles
    },
    addArticles (state, article) {
        state.articles.push(article)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
