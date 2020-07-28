import React, { Component } from "react";
import EnterpriseRegisterForm from "./enterpriseRegisterForm/EnterpriseRegisterForm";
import { StyledFormImg, Container, Elipse, FormContainer, LeftColumnContainer } from "./styles";

class EnterpriseRegisterPage extends Component{
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
                            <EnterpriseRegisterForm></EnterpriseRegisterForm>
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
                            <EnterpriseRegisterForm></EnterpriseRegisterForm>
                        </FormContainer>
                    </LeftColumnContainer>
                </>
            );
        }
    }
}
 
export default EnterpriseRegisterPage;