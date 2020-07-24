import React, { Component } from "react";
import { observer } from "mobx-react";
import {
    Title,
    StyledSmall,
    Container,
    RowContainer,
    HeaderContainer,
    StyledTextField,
    StyledPrimaryButton,
    StyledGreyButton,
    StyledDivider,
    StyledCircularProgress
} from './styles';
import { Box, InputAdornment, IconButton } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { RegisterFormViewModel } from "./RegisterFormViewModel";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import history from "../../../../history";
import InputMask from 'react-input-mask';

@observer
class RegisterForm extends Component {

    model = new RegisterFormViewModel()

    onClickSignIn(): void {
        history.push('/login')
    }

    render(): JSX.Element {
        return (
            this.model.isSuccess ? <Redirect to="/"></Redirect> :
                <Container>
                    <HeaderContainer>
                        <Title>Bem-vindo</Title>
                        <StyledSmall>Faça o cadastro para continuar</StyledSmall>
                    </HeaderContainer>
                    <div>
                        <StyledTextField
                            error={this.model.errorName}
                            helperText={this.model.errorNameMsg}
                            label="Nome Completo"
                            variant="outlined"
                            type="text"
                            value={this.model.name}
                            onChange={(e) => this.model.name = e.target.value}
                        />

                        <InputMask mask="(99) 9999-99999" value={this.model.telephone} maskChar=" " onChange={(e) => this.model.telephone = e.target.value}>
                            {() => <StyledTextField
                                error={this.model.errorTelephone}
                                helperText={this.model.errorTelephoneMsg}
                                label="Telefone"
                                variant="outlined"
                                type="tel" />}
                        </InputMask>
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
                                <StyledPrimaryButton onClick={() => this.model.handlerSignUp()} >
                                    <StyledCircularProgress />
                                </StyledPrimaryButton>
                                : <StyledPrimaryButton onClick={() => this.model.handlerSignUp()} >
                                    CONTINUAR
                        </StyledPrimaryButton>}

                        </Box>
                    </div>
                    <RowContainer>
                        <StyledDivider />
                        <StyledSmall>Já possui conta?</StyledSmall>
                        <StyledDivider />
                    </RowContainer>
                    <Box borderRadius="50%">
                        <StyledGreyButton onClick={this.onClickSignIn} >
                            ENTRAR
            </StyledGreyButton>
                    </Box>
                </Container>
        );
    }
}

export default RegisterForm;