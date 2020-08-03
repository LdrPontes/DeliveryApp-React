import React from 'react';
import { isAuthenticated } from '../../utils/AuthUtil'
import { Redirect } from 'react-router-dom';
// import { Container } from './styles';

function Main(): JSX.Element {
    console.log(isAuthenticated())
    if (isAuthenticated())
        return <h1>Main</h1>
    else 
        return (<Redirect to='/login'></Redirect>)
}

export default Main;
