import { createStore } from 'redux'
import userReducer from './users/userReducer'

export const store = createStore(userReducer)

export default store