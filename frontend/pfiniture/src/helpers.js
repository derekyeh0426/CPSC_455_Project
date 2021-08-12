import client from "./API/api";

export function onAddToCart(listingId, buyerId) {
    client.user.getUserById(buyerId).then((response) => {
        const cart = response.data.cart;
        if (!cart) {
            client.cart.addCartToUser({ user: buyerId, listing: listingId })
            return true
        }
        else {
            let tempListings = JSON.parse(JSON.stringify(cart.listings));
            if (!tempListings.includes(listingId)) {
                tempListings.push(listingId)
                client.cart.updateCartById({ listing: tempListings, id: cart.id })
                return true
            } else {
                return false
            }
        }
    })
}

export function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

export function updateToCart(listingIdToDelete, listings, cartId, page) {
    let id = cartId;
    let listing = [];
    console.log(listings)
    if (page === "landing") {
        listings.forEach(listingId => {
            if (listingId !== listingIdToDelete) {
                listing.push(listingId);
            }
        })
    } 

    if (page === "cart") {
        listings.forEach(listingId => {
            if (listingId.id !== listingIdToDelete) {
                listing.push(listingId.id);
            }
        })
    }
    console.log(listing)
    client.cart.updateCartById({listing, id});
}