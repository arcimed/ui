const statusOrders = {
    created : 1,
    payed : 2,
    validate : 3,
    refused: 4,
    inDelivery: 5,
    delivered: 6
}

const getStatusOrders = function (idStatus) {
    let stringStatus = '';

    switch (idStatus) {
        case 1:
            stringStatus = 'Créée'
            break;
        case 2:
            stringStatus = 'Payée'
            break;
        case 3:
            stringStatus = 'Validée'
            break;
        case 4:
            stringStatus = 'Refusée'
            break;
        case 5:
            stringStatus = 'En livraison'
            break;
        case 6:
            stringStatus = 'Livrée'
            break;
    }

    return stringStatus;
}

module.exports = {
    statusOrders,
    getStatusOrders
}
