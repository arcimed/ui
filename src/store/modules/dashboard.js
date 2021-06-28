import axios from "axios";
import {statusOrders} from "@/config/statusOrders";

const state = () => ({
    ordersDashboard: {},
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
                    // order.Articles.forEach((article, index) => {
                    //     tempDelivered += article.price
                    // })
                    // order.Menus.forEach((menu, index) => {
                    //     tempDelivered += menu.price
                    // })
                })

                // let price = {name: 'Revenue du restaurant', janvier: '0€', fevrier: '0€', mars: '0€', avril: '0€', mai: '0€', juin: '0€', juillet: tempDelivered+'€'}
                // let donne = {name: 'Nombre de commande', cree: tempCreated, livraison: tempRefused, livrer: tempInDelivery, refuser: tempValidated, valider: tempPayed}
                // this.stats.push(donne)
                // this.priceCount.push(price)

                const ordersDashboard = {tempCreated, tempPayed, tempValidated, tempRefused, tempValidateByDelivery, tempInDelivery, tempDelivered};

                store.commit('setOrdersDashboard', ordersDashboard)
            }).catch()
    },
}

const mutations = {
    setOrdersDashboard (state, ordersDashboard) {
        state.ordersDashboard = ordersDashboard;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
