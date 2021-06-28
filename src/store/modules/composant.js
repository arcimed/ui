import axios from "axios";

const state = () => ({
    composants: [],
})

const getters = {
    composants: state => state.composants
}

const actions = {
    setComposants (store) {
        axios.get(`api/component/all` )
            .then((response) => {
                store.commit('setComposants', response.data.data)
            }).catch()
    },
    addComposants (store, composant) {
        axios
            .post(`api/component/create`, composant)
            .then((response) => {
                store.commit('addComposants', response.data.data)
            })
            .catch((error) => {
                console.log(error);
            });
    },
    deleteComposants: (store, composantId) => {
        axios.put(`api/article/delete/` + composantId)
            .then((response) => {

                store.commit('deleteComposants', composantId)
            }).catch()
    },
    editComposants: (store, {composant, idComposant}) => {
        axios.put(`api/component/edit/` + idComposant, composant)
            .then(() => {
                store.commit('editComposants', {composant, idComposant})
            })
            .catch((error) => {
            });
    },
}

const mutations = {
    setComposants (state, composants) {
        state.composants = composants
    },
    addComposants (state, composant) {
        state.composants.push(composant)
    },
    deleteComposants: (state, composantId) => {
        state.composants.splice(state.composants.findIndex(composant => parseInt(composant.id) === composantId), 1)
    },
    editComposants(state, {composant, idComposant}) {
        let stateId = state.composants.findIndex(composant => parseInt(composant.id) === idComposant);
        state.composants[stateId].name = composant.name;
        state.composants[stateId].price = composant.price;
        state.composants[stateId].typesArticlesId = composant.typesArticlesId;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}