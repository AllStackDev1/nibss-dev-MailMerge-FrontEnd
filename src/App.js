import React from 'react';

import './App.css';
import './styles/auth.css';
import 'styles/poppins/poppins.css'
import 'styles/material-icons.css'
import 'styles/toggle.css'
import 'styles/input.css'
import 'styles/loader.css'

import { Route } from 'react-router-dom'
import Login from './components/auth/login'
import Signup from './components/auth/signup'
import About from './components/about'
import Onboarding from './components/onboarding/onboarding';
import DashboardLayout from 'components/common/Layout/DashboardLayout';
import ProtectedAuth from 'components/common/ProtectedAuth';
import ProtectedRoute from 'components/common/ProtectedRoute';

const App = () => (
    <main>
        <ProtectedAuth exact path="/" component={Login} />
        <ProtectedAuth exact path="/signup" component={Signup} />
        <Route exact path="/about-us" component={About} />
        <Route exact path="/onboarding" component={Onboarding} />
        <ProtectedRoute path="/dashboard" component={DashboardLayout} />
    </main>
)

export default App;