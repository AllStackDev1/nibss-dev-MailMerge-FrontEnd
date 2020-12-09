import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './store'
import App from './App'
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'

import './index.css'

const target = document.querySelector('#root')

const FontAwesomeCloseButton = ({ closeToast }) => (
    <i
        className="material-icons"
        onClick={closeToast}
    >
        close
    </i>
);

render(
    <Provider store={store}>
        {console.log("MAINAIN::>>", store.getState())}
        <ConnectedRouter history={history}>
            <div>
                <ToastContainer
                    closeButton={<FontAwesomeCloseButton />}
                    position={toast.POSITION.TOP_RIGHT}
                    draggable={false}
                    transition={Slide}
                    toastClassName="notification-toast" />
                <App />
            </div>
        </ConnectedRouter>
    </Provider>,
    target
)
