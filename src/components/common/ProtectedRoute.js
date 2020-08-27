import React from 'react'
import { Route } from 'react-router-dom'
import { userService } from 'services'
import { userActions } from 'actions'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(userActions.logout());
        dispatch(push(`/`));
    }

    return (
        <Route {...rest} render={props => userService.loggedIn() ? <Component {...props} /> : logout()} />
    )
}

export default ProtectedRoute;