import React, { Component } from 'react';

import {
    Title,
    Description,
    Container,
    RowContainer,
    HeaderContainer,
    StyledTextField,
    StyledPrimaryButton,
    StyledGreyButton,
    StyledDivider,
    ForgotPasswordText,
} from './styles';

import Box from '@material-ui/core/Box';

class LoginForm extends Component {
    state = {};

    render() {
        return (
            <Container>
                <HeaderContainer>
                    <Title>Bem-vindo</Title>
                    <Description>Faça o login para continuar</Description>
                </HeaderContainer>
                <div>
                    <StyledTextField
                        label="E-mail"
                        variant="outlined"
                        type="email"
                    />
                    <StyledTextField
                        label="Senha"
                        variant="outlined"
                        type="password"
                    />
                    <Box borderRadius="50%">
                        <StyledPrimaryButton color="primary">
                            ENTRAR
                        </StyledPrimaryButton>
                    </Box>
                    <RowContainer>
                        <ForgotPasswordText>
                            Esqueceu sua senha?
                        </ForgotPasswordText>
                    </RowContainer>
                </div>
                <RowContainer>
                    <StyledDivider />
                    <Description> ou cadastre-se </Description>
                    <StyledDivider />
                </RowContainer>
                <Box borderRadius="50%">
                    <StyledGreyButton color="primary">
                        REGISTRAR
                    </StyledGreyButton>
                </Box>
            </Container>
        );
    }
}

export default LoginForm;
