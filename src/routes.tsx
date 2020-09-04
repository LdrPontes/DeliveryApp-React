import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import MainPage from './app/pages/main/MainPage';
import LoginPage from './app/pages/login/LoginPage';
import RegisterPage from './app/pages/register/RegisterPage';
import history from './history';
import EnterpriseRegisterPage from './app/pages/enterpriseRegister/EnterpriseRegisterPage';
import OrderPage from './app/pages/order/OrderPage';

export default function Routes() {
    return (
        <Router history={history}>
            <div>
                <Switch>
                    <Route path="/" exact component={MainPage} />
                    <Route path="/login" exact component={LoginPage} />
                    <Route path="/register" exact component={RegisterPage} />
                    <Route path="/enterprise-register" exact component={EnterpriseRegisterPage} />
                    <Route path="/pedido/:code" exact component={OrderPage} />
                </Switch>
            </div>
        </Router>
    );
}
