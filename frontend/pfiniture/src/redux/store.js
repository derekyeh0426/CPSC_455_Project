import { createStore } from 'redux'
import UserReducer from './users/userReducer'

export const store = createStore(userReducer)

export default store
