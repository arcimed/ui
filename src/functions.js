exports.roundPrice = (price) => {
    const tmp = Math.pow(10, 2);
    return Math.round( price*tmp )/tmp;
}
