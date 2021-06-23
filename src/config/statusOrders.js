const statusOrders = {
    created : 1,
    validate : 2,
    refused: 3,
    inDelivery: 4,
    delivered: 5
}

const getStatusOrders = function (idStatus) {
    let stringStatus = '';

    switch (idStatus) {
        case 1:
            stringStatus = 'Créée'
            break;
        case 2:
            stringStatus = 'Validée'
            break;
        case 3:
            stringStatus = 'Refusée'
            break;
        case 4:
            stringStatus = 'En livraison'
            break;
        case 5:
            stringStatus = 'Livrée'
            break;
    }

    return stringStatus;
}

module.exports = {
    statusOrders,
    getStatusOrders
}
