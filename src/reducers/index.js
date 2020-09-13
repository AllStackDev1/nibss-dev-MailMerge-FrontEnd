import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import auth from './authReducer'
import user from './userReducer'
import recipient from './recipientReducer'
import document from './documentReducer'

export default (history) => combineReducers({
    router: connectRouter(history),
    auth,
    user,
    recipient,
    document
})