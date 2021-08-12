export const initialState = {
    name: null,
    email: null,
    id: null,
    isLogIn: false,
    cartQuantity: 0
}

function UserReducer(state = initialState, action) {
    switch (action.type) {
        case "Log_In":
            return {
                ...state,
                isLogIn: true,
                name: action.payload.name,
                email: action.payload.email,
                id: action.payload.id,
                cartQuantity: action.payload.cartQuantity
            }

        case "Log_Out":
            return {
                ...state,
                isLogIn: false,
                name: null,
                email: null,
                id: null,
                cartQuantity: 0
            }

        case "Add_Item":
            return {
                ...state,
                cartQuantity: state.cartQuantity + 1
            }

        case "Remove_Item":
            return {
                ...state,
                cartQuantity: state.cartQuantity - 1
            }

        case "Checkout_Cart":
            return {
                ...state,
                cartQuantity: 0
            }

        default: return state
    }
}

export default UserReducer