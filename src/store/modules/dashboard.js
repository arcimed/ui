import axios from "axios";
import {statusOrders} from "@/config/statusOrders";

const state = () => ({
    ordersDashboard: [],
    ca: 0
})

const getters = {
    ordersDashboard: state => state.ordersDashboard,
    ca: state => state.ca,
}

const actions = {
    setOrdersDashboard (store) {
        axios.get(`api/order/all` )
            .then((response) => {
                let tempCreated = 0
                let tempPayed = 0
                let tempValidated = 0
                let tempRefused = 0
                let tempValidateByDelivery = 0
                let tempInDelivery = 0
                let tempDelivered = 0
                let tempCa = 0

                response.data.data.forEach((order, index) => {
                    switch (order.ordersStatusId) {
                        case statusOrders.created:
                            tempCreated++
                            break
                        case statusOrders.payed:
                            tempPayed++
                            break
                        case statusOrders.validate:
                            tempValidated++
                            break
                        case statusOrders.refused:
                            tempRefused++
                            break
                        case statusOrders.validateByDelivery:
                            tempValidateByDelivery++
                            break
                        case statusOrders.inDelivery:
                            tempInDelivery++
                            break
                        case statusOrders.delivered:
                            tempDelivered++
                            break
                    }
                    order.Articles.forEach((article, index) => {
                        if (order.ordersStatusId !==  statusOrders.created && order.ordersStatusId !==  statusOrders.delivered) {
                            tempCa += (article.price * article.OrdersArticles.quantity)
                        }
                    })
                    order.Menus.forEach((menu, index) => {
                        if (order.ordersStatusId !==  statusOrders.created && order.ordersStatusId !==  statusOrders.delivered) {
                            tempCa += (menu.price * menu.OrdersMenus.quantity)
                        }
                    })
                })

                const ordersDashboard = [{name: 'cr????e(s)', data: tempCreated}, {name: 'pay??e(s)', data:tempPayed}, {name: 'valid??e(s)', data:tempValidated}, {name: 'refus??e(s)', data:tempRefused}, {name: 'valid??e(s) par le livreur', data:tempValidateByDelivery}, {name: 'en livraison', data:tempInDelivery}, {name: 'livr??e(s)', data:tempDelivered}, {name: "Chiffre d'affaire actuel", data:tempCa.toFixed(2) + ' ???'}];

                store.commit('setOrdersDashboard', {ordersDashboard})
            }).catch()
    },
}

const mutations = {
    setOrdersDashboard (state, {ordersDashboard, tempCa}) {
        state.ordersDashboard = ordersDashboard;
        state.ca = tempCa;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
