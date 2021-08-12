import { createStore } from 'redux'
import UserReducer from './users/UserReducer'

export const store = createStore(UserReducer)

export default store