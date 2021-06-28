const statusRoles = {
    User : 1,
    Restaurateur : 2,
    Livreur : 3,
    Developpeur: 4,
    Commercial: 5,
    Technique: 6,
    Admin: 7
}

const getStatusRoles = function (idStatus) {
    let stringStatus = '';

    switch (idStatus) {
        case 1:
            stringStatus = 'User'
            break;
        case 2:
            stringStatus = 'Restaurateur'
            break;
        case 3:
            stringStatus = 'Livreur'
            break;
        case 4:
            stringStatus = 'Developpeur'
            break;
        case 5:
            stringStatus = 'Commercial'
            break;
        case 6:
            stringStatus = 'Technique'
            break;
        case 7:
            stringStatus = 'Admin'
            break;
    }

    return stringStatus;
}

module.exports = {
    statusRoles,
    getStatusRoles
}