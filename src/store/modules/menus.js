import axios from "axios";

const state = () => ({
    menus: [],
})

const getters = {
    restaurantMenus: state => state.menus
}

const actions = {
    setMenus (store, restaurantId) {
        axios.get(`api/menusbyrestaurant/` + restaurantId)
            .then((response) => {
                store.commit('setMenus', response.data.data)
            }).catch()
    },
    addMenus (store, menu) {
        axios
            .post(`api/menu/create`, menu)
            .then(() => {
                store.commit('addMenus', menu)
            })
            .catch((error) => {
                console.log(error);
            });
    },
    deleteMenu: (store, menuId) => {
        axios.put(`api/menu/delete/` + menuId)
            .then((response) => {
                store.commit('deleteMenu', menuId)
            }).catch()
    },
    editMenu: (store, {menu, idMenu}) => {
        axios.put(`/api/menu/edit/` + idMenu, menu)
            .then(() => {
                store.commit('editMenu', {menu, idMenu})
            })
            .catch((error) => {
            });
    },
}

const mutations = {
    setMenus (state, menus) {
        state.menus = menus
    },
    addMenus (state, menu) {
        state.menus.push(menu)
    },
    deleteMenu: (state, menuId) => {
        state.menus.splice(state.menus.findIndex(menu => parseInt(menu.id) === menuId), 1)
    },
    editMenu(state, {menu, idMenu}) {
        let stateId = state.menus.findIndex(menu => parseInt(menu.id) === idMenu);
        state.menus[stateId].name = menu.name;
        state.menus[stateId].price = menu.price;
        state.menus[stateId].articlesIds = menu.articlesIds;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
