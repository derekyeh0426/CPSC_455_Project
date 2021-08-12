import client from "./API/api";

export function onAddToCart(listingId, buyerId) {
    client.user.getUserById(buyerId).then((response) => {
        const cart = response.data.cart;
        if (!cart) {
            client.cart.addCartToUser({ user: buyerId, listing: listingId })
        }
        else {
            let tempListings = JSON.parse(JSON.stringify(cart.listings));
            if (!tempListings.includes(listingId)) {
                tempListings.push(listingId)
                client.cart.updateCartById({ listing: tempListings, id: cart.id })
            }
        }
    })
}

export function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

export function updateToCart(listingIdToDelete, listings, cartId) {
    let id = cartId;
    let listing = [];
    listings.forEach(listingId => {
        if (listingId.id !== listingIdToDelete) {
            listing.push(listingId.id);
        }
    })
    client.cart.updateCartById({listing, id});
}