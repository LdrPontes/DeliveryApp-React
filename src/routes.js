import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './app/main';
import Login from './app/login';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" component={Login} />
            </Switch>
        </BrowserRouter>
    );
}
