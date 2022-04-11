let add = (cart, req) => {
    cart.push(req.body);
    return [JSON.stringify(cart, null, 4), req.body];
};
let change = (cart, req) => {
    let find = cart.find(el => el.id_product === +req.params.id);
    find.quantity = req.body.quantity;
    return [JSON.stringify(cart, null, 4), find];
};
let remove = (cart, req) => {
    let find = cart.find(el => el.id_product === +req.params.id);
    if (find) {
        cart.splice(cart.indexOf(find), 1);
    }
    return [JSON.stringify(cart, null, 4), find];
};

module.exports = {
    add,
    change,
    remove
};