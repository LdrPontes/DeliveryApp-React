import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import Main from './app/pages/main';
import LoginPage from './app/pages/login/LoginPage';
import RegisterPage from './app/pages/register/RegisterPage';
import history from './history';

export default function Routes() {
    return (
        <Router history={history}>
            <div>
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
            </Switch>
            </div>
        </Router>
    );
}
