import React, { Component } from "react";
import { Container, Elipse, StyledFormImg, FormContainer, LeftColumnContainer } from "./styles";
import RegisterForm from "./registerForm/RegisterForm";


 class RegisterPage extends Component {
    state = {
        isDesktop: false,
    };

    componentDidMount(): void {
        window.addEventListener('resize', this.resize.bind(this));
        this.resize();
    }

    resize(): void {
        this.setState({ isDesktop: window.innerWidth >= 760 });
    }

    componentWillUnmount(): void {
        window.removeEventListener('resize', this.resize.bind(this));
    }

    render(): JSX.Element {
        if (!this.state.isDesktop) {
            return (
                <>
                <Container>
                    <FormContainer>
                        <RegisterForm></RegisterForm>
                    </FormContainer>
                </Container>
            </>
            );
        } else {
            return (
                <>
                <Container>
                    <StyledFormImg></StyledFormImg>
                </Container>
                <Elipse></Elipse>
                <LeftColumnContainer>
                    <FormContainer>
                        <RegisterForm></RegisterForm>
                    </FormContainer>
                </LeftColumnContainer>
            </>
            );
        }
    }
}
 
export default RegisterPage;