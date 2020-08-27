import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import auth from './authReducer'
import user from './userReducer'

export default (history) => combineReducers({
    router: connectRouter(history),
    auth,
    user
})