import React, { Component, ChangeEvent } from "react";
import { EnterpriseRegisterViewModel } from "./EnterpriseRegisterViewModel";
import { RadioGroup, FormControlLabel, FormControl } from "@material-ui/core";
import { Container, StyledRadio, CenterContainer, LeftContainer } from "./styles";
import { observer } from "mobx-react";
import { StyledTextField } from "../../global/globalStyles";

@observer
class EnterpriseRegisterPage extends Component {

    model = new EnterpriseRegisterViewModel()

    state = {}

    handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        this.model.typeDocument = event.target.value;
    };

    render(): JSX.Element {
        return (<Container>
            <CenterContainer>
                <LeftContainer>
                    <h1>Tipo de documento:</h1>
                    <FormControl>
                        <RadioGroup row value={this.model.typeDocument} onChange={this.handleChange}>
                            <FormControlLabel
                                control={<StyledRadio />}
                                value="0"
                                name="radio-button-demo"
                                label="CPF"
                            />
                            <FormControlLabel
                                control={<StyledRadio />}
                                value="1"
                                name="radio-button-demo"
                                label="CNPJ"
                            />
                        </RadioGroup>
                    </FormControl>
                </LeftContainer>
                <StyledTextField
                    label="Nome da empresa"
                    variant="outlined"
                    type="text" />
                <StyledTextField
                    label={this.model.typeDocument === "0" ? "CPF" : "CNPJ"}
                    variant="outlined"
                    type="text" />
                <StyledTextField
                    label="CEP"
                    variant="outlined"
                    type="text" />
            </CenterContainer>
        </Container>);
    }
}

export default EnterpriseRegisterPage;