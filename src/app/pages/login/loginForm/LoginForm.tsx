import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import { observer } from "mobx-react"
import {
    StyledSmall,
    Container,
    RowContainer,
    HeaderContainer,
    StyledPrimaryButton,
    StyledGreyButton,
    StyledDivider,
    ForgotPasswordText,
    StyledLink,
    StyledCircularProgress
} from './styles';

import { LoginFormViewModel } from './LoginFormViewModel';
import { InputAdornment, IconButton } from '@material-ui/core';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Redirect } from 'react-router-dom';
import history from "../../../../history";
import { StyledTextField } from '../../../global/globalStyles';
import { isAuthenticated } from '../../../utils/AuthUtil';

@observer
class LoginForm extends Component {

    model = new LoginFormViewModel()

    onClickSignUp(): void {
        history.push('/register')
    }

    render(): JSX.Element {
        if (this.model.redirect !== '') {
            history.push(this.model.redirect)
            return (<></>)
        }
        if (isAuthenticated()) {
            return <Redirect to='/'></Redirect>
        }
        return (
            <Container>
                <HeaderContainer>
                    <h1>Bem-vindo</h1>
                    <StyledSmall>Faça o login para continuar</StyledSmall>
                </HeaderContainer>
                <div>
                    <StyledTextField
                        error={this.model.errorEmail}
                        helperText={this.model.errorEmailMsg}
                        label="E-mail"
                        variant="outlined"
                        type="email"
                        value={this.model.email}
                        onChange={(e) => this.model.email = e.target.value}
                    />
                    <StyledTextField
                        error={this.model.errorPassword}
                        helperText={this.model.errorPasswordMsg}
                        label="Senha"
                        variant="outlined"
                        type={this.model.showPassword ? 'text' : 'password'}
                        value={this.model.password}
                        onChange={(e) => this.model.password = e.target.value}
                        InputProps={{ // <-- This is where the toggle button is added.
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => this.model.handlerShowPassword()}
                                        onMouseDown={() => this.model.handlerShowPassword()}
                                    >
                                        {this.model.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <Box borderRadius="50%">
                        {this.model.isLoading ?
                            <StyledPrimaryButton onClick={() => this.model.handlerSignIn()} >
                                <StyledCircularProgress />
                            </StyledPrimaryButton>
                            : <StyledPrimaryButton onClick={() => this.model.handlerSignIn()} >
                                ENTRAR
                        </StyledPrimaryButton>}

                    </Box>
                    <RowContainer>
                        <ForgotPasswordText>
                            <StyledLink to={'/main'}>
                                Esqueceu sua senha?
                           </StyledLink>
                        </ForgotPasswordText>

                    </RowContainer>
                </div>
                <RowContainer>
                    <StyledDivider />
                    <StyledSmall>Não possui conta?
                    </StyledSmall>
                    <StyledDivider />
                </RowContainer>
                <Box borderRadius="50%">
                    <StyledGreyButton onClick={this.onClickSignUp}>
                        REGISTRAR
            </StyledGreyButton>
                </Box>
            </Container>
        );
    }

}

export default LoginForm
