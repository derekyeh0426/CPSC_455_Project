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

export function updateToCart(listingIdToDelete, listings, buyerId, cartId) {
    // TODO REMOVE LISTINGIDTODELETE FROM LISTINGIDS THEN MAKE API CALL
    let listingsIds = []
    if (listings.length !== 0) {
        listings.forEach(listing => {
            console.log(listing.id)
            listingsIds.push(listing.id)
        })
    }
    console.log(listingsIds)
    console.log(listings)
    // client.user.updateCartById({user: buyerId, listing: listings, id: cartId})
}