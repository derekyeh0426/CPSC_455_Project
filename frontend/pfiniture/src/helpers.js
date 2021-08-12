import client from "./API/api";
import UserAddCartItem from "./redux/users/UserAddCartItem";
import { connect } from 'react-redux';

export function onAddToCart(listingId, buyerId, props) {
    client.user.getUserById(buyerId).then((response) => {
        const cart = response.data.cart;
        if (!cart) {
            client.cart.addCartToUser({ user: buyerId, listing: listingId })
        }
        else {
            let tempListings = JSON.parse(JSON.stringify(cart.listings));
            if (!tempListings.includes(listingId)) {
                tempListings.push(listingId)
                client.cart.updateCartById({listing: tempListings, id: cart.id })
                console.log(props)
                // props.UserAddCartItem();
            }
        }
    })
}

export function getCartQuantity(userId) {
    console.log(userId)
    client.user.getUserById(userId).then(buyerInfo => {
        const cart = buyerInfo.data.cart;
        console.log(buyerInfo.data)
        if (!cart) {
          return 0;
        } else {
          return cart.listings.length;
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
    if (!listings) {
        listings.forEach(listingId => {
            if (listingId.id !== listingIdToDelete) {
                listing.push(listingId.id)
            }
        })
    }
    client.cart.updateCartById({listing, id})
}

function mapStateToProps(state) {
    return {
        isLogIn: state.isLogIn, name: state.name, email: state.email, id: state.id
    }
}

const mapDispatchToProps = {
    UserAddCartItem
}

export default connect(
    mapDispatchToProps,
    mapStateToProps,
)(onAddToCart)