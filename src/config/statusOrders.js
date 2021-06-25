const statusOrders = {
    created : 1,
    payed : 2,
    validate : 3,
    refused: 4,
    validateByDelivery: 5,
    inDelivery: 6,
    delivered: 7
}

const getStatusOrders = function (idStatus) {
    let stringStatus = '';

    switch (idStatus) {
        case 1:
            stringStatus = 'créée'
            break;
        case 2:
            stringStatus = 'payée'
            break;
        case 3:
            stringStatus = 'validée'
            break;
        case 4:
            stringStatus = 'refusée'
            break;
        case 5:
            stringStatus = 'acceptée par le livreur'
            break;
        case 6:
            stringStatus = 'en livraison'
            break;
        case 7:
            stringStatus = 'livrée'
            break;
    }

    return stringStatus;
}

module.exports = {
    statusOrders,
    getStatusOrders
}
