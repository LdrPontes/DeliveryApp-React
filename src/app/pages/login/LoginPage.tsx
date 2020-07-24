import React, { Component } from 'react';

import {
    Elipse,
    Container,
    StyledLoginImg,
    RightColumnContainer,
    FormContainer,
} from './styles';

import LoginForm from './loginForm/LoginForm';

class LoginPage extends Component {
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
                            <LoginForm></LoginForm>
                        </FormContainer>
                    </Container>
                </>
            );
        } else {
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
    }
    
}

export default LoginPage;
