import React from 'react';

import './App.css';
import './styles/auth.css';
import 'styles/poppins/poppins.css'
import 'styles/material-icons.css'
import 'styles/toggle.css'

import { Route } from 'react-router-dom'
import Login from './components/auth/login'
import Signup from './components/auth/signup'
import About from './components/about'
import Onboarding from './components/onboarding/onboarding';
import DashboardLayout from 'components/common/Layout/DashboardLayout';

const App = () => (
    <main>
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/about-us" component={About} />
        <Route exact path="/onboarding" component={Onboarding} />
        <Route path="/dashboard" component={DashboardLayout} />
    </main>
)

export default App;