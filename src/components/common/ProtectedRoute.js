import React from 'react'
import { Route } from 'react-router-dom'
import { authService } from 'services'
import { authActions } from 'actions'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(authActions.logout());
        dispatch(push(`/`));
    }

    return (
        <Route {...rest} render={props => authService.loggedIn() ? <Component {...props} /> : logout()} />
    )
}

export default ProtectedRoute;