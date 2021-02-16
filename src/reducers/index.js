import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import auth from './auth'
import user from './user'
import recipient from './recipient'
import document from './document'

export default (history) => combineReducers({
    router: connectRouter(history),
    auth,
    user,
    recipient,
    document
})
