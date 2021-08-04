export const initialState = {
    name: null,
    email: null,
    id: null,
    isLogIn: false
}

function userReducer(state = initialState, action) {
    console.log(action)
    switch(action.type) {
        case "Log_In": return {
            ...state,
            isLogIn: true,
            name: action.payload.name,
            email:action.payload.email,
            id: action.payload.id
        }

        case "Log_Out": return{
            ...state,
            isLogIn:false,
            name:null,
            email:null,
            id: null
        }
        default: return state
    }
}

export default userReducer