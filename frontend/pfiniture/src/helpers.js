import client from "./API/api";

export function onAddToCart(listingId, buyerId) {
    client.user.getUserById(buyerId).then((response) => {
        const cart = response.data.cart;
        if (!cart) {
            client.cart.addCartToUser({ user: buyerId, listing: listingId })
        }
        else {
            console.log("user already has cart");
            client.cart.updateCartById({ user: buyerId, listing: listingId, id: cart.id })
        }
    })
}

export function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}