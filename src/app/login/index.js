import React from 'react';

import {
    Elipse,
    Container,
    StyledLoginImg,
    RightColumnContainer,
    FormContainer,
} from './styles';

import LoginForm from './loginForm/LoginForm';

function Login() {
    return (
        <>
            <Container>
                <StyledLoginImg></StyledLoginImg>
            </Container>
            <Elipse></Elipse>
            <RightColumnContainer>
                <FormContainer>
                    <LoginForm></LoginForm>
                </FormContainer>
            </RightColumnContainer>
        </>
    );
}

export default Login;
