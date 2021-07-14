import { createStore } from 'redux'
import userReducer from './users/userReducer'

const store = createStore(userReducer)

export default store