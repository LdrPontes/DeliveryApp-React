import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './app/pages/main';
import LoginPage from './app/pages/login/LoginPage';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" component={LoginPage} />
            </Switch>
        </BrowserRouter>
    );
}
