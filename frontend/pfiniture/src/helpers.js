import client from "./API/api";

export function onAddToCart(listingId, buyerId) {
    client.user.getUserById(buyerId).then((response) => {
        const cart = response.data.cart;
        if (!cart) {
            client.cart.addCartToUser({ user: buyerId, listing: listingId })
        }
        else {
            console.log("user already has cart");
            let tempListings = JSON.parse(JSON.stringify(cart.listings));
            if (!tempListings.includes(listingId)) {
                tempListings.push(listingId)
                client.cart.updateCartById({listing: tempListings, id: cart.id })
            }
        }
    })
}

export function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

export function updateToCart(listingIdToDelete, listings, cartId) {
    let id = cartId;
    console.log(id)
    console.log(listingIdToDelete)
    let listing = []
    if (listings.length !== 0) {
        listings.forEach(listingId => {
            if (listingId.id !== listingIdToDelete) {
                listing.push(listingId.id)
            }
        })
    }
    client.cart.updateCartById({listing, id})
}