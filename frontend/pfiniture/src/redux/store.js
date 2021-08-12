import { createStore } from 'redux'
import UserReducer from './users/userReducer'

export const store = createStore(UserReducer)

export default store
