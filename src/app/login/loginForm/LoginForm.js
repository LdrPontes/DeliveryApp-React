import React from 'react';

import {
    Title,
    Description,
    Container,
    RowContainer,
    HeaderContainer,
    StyledTextField,
    StyledButton,
    StyledDivider,
} from './styles';

import Box from '@material-ui/core/Box';

function LoginForm() {
    return (
        <Container>
            <HeaderContainer>
                <Title>Bem-vindo</Title>
                <Description>Faça o login para continuar</Description>
            </HeaderContainer>
            <div>
                <StyledTextField
                    id="outlined-basic"
                    label="E-mail"
                    variant="outlined"
                />
                <StyledTextField
                    id="outlined-basic"
                    label="Senha"
                    variant="outlined"
                    type="password"
                />
                <Box borderRadius="50%">
                    <StyledButton color="primary">ENTRAR</StyledButton>
                </Box>
                <Description> Esqueceu sua senha? </Description>
            </div>
            <RowContainer>
                <StyledDivider />
                <Description> ou cadastre-se </Description>
                <StyledDivider />
            </RowContainer>
        </Container>
    );
}

export default LoginForm;
