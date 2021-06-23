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
            .then((response) => {
                store.commit('addArticles', response.data.data)
            })
            .catch((error) => {
                console.log(error);
            });
    },
    deleteArticle: (store, articleId) => {
        axios.put(`api/article/delete/` + articleId)
            .then((response) => {

                store.commit('deleteArticle', articleId)
            }).catch()
    },
    editArticles: (store, {article, idArticle}) => {
        axios.put(`api/article/edit/` + idArticle, article)
            .then(() => {
                store.commit('editArticles', {article, idArticle})
            })
            .catch((error) => {
            });
    },
}

const mutations = {
    setArticles (state, articles) {
        state.articles = articles
    },
    addArticles (state, article) {
        state.articles.push(article)
    },
    deleteArticle: (state, articleId) => {
        state.articles.splice(state.articles.findIndex(article => parseInt(article.id) === articleId), 1)
    },
    editArticles(state, {article, idArticle}) {
        let stateId = state.articles.findIndex(article => parseInt(article.id) === idArticle);
        state.articles[stateId].name = article.name;
        state.articles[stateId].price = article.price;
        state.articles[stateId].typesArticlesId = article.typesArticlesId;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
