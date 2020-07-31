import React, { Component, ChangeEvent } from "react";
import { EnterpriseRegisterFormViewModel } from "./EnterpriseRegisterFormViewModel";
import { RadioGroup, FormControlLabel, FormControl, InputLabel, MenuItem, Select, Box } from "@material-ui/core";
import { StyledRadio, Container, LeftContainer, Title } from "./styles";
import { observer } from "mobx-react";
import { StyledTextField, StyledFormControl } from "../../../global/globalStyles";
import InputMask from 'react-input-mask';
import { StyledPrimaryButton, StyledCircularProgress } from "../../login/loginForm/styles";
import AvatarInput from "../../../components/AvatarInput/AvatarInput";

@observer
class EnterpriseRegisterForm extends Component {

    model = new EnterpriseRegisterFormViewModel()

    state = {}

    async componentDidMount(): Promise<void> {
        await this.model.readAllCategories()
    }

    handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        this.model.typeDocument = event.target.value;
    };

    handleImageChange(event: any): void {
        if (event.target.files && event.target.files[0]) {
            this.model.preview = URL.createObjectURL(event.target.files[0])
        }
    }

    handleKeyPress = async (event: any) => {
        if (event.key === 'Tab') {
            await this.model.getAddressByCep()
        }
    }
    render(): JSX.Element {
        return (
            <Container>
                <AvatarInput preview={this.model.preview} handlerImageChange={(e) => this.handleImageChange(e)}></AvatarInput>
                <LeftContainer>
                    <Title>Tipo de documento:</Title>
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
                <Title>Dados da empresa:</Title>
                <StyledTextField
                    label="Nome do estabelecimento"
                    variant="outlined"
                    type="text" />
                <InputMask mask={this.model.typeDocument === "0" ? "999.999.999-99" : "99.999.999/9999-99"} value={this.model.document} maskChar=" " onChange={(e) => this.model.document = e.target.value}>
                    {() => <StyledTextField
                        label={this.model.typeDocument === "0" ? "CPF" : "CNPJ"}
                        variant="outlined"
                        type="text" />}
                </InputMask>
                <InputMask mask='99999-999' value={this.model.cep} maskChar=" " onChange={(e) => this.model.cep = e.target.value} >
                    {() => <StyledTextField
                        label="CEP"
                        variant="outlined"
                        type="text"
                        onKeyDown={(e) => this.handleKeyPress(e)} />}
                </InputMask>
                {
                    this.model.address !== '' ?
                        <>
                            <StyledTextField
                                label="Endereço"
                                variant="outlined"
                                type="text"
                                disabled
                                value={this.model.address} />
                            <StyledTextField
                                label="Número"
                                variant="outlined"
                                type="text"
                                value={this.model.number} />
                        </>
                        : <></>
                }
                <StyledFormControl variant="outlined" >
                    <InputLabel id="demo-simple-select-outlined-label">Seguimento</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        label="Seguimento">
                        {this.model.categories.map(category => {
                            return (<MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>);
                        })}
                    </Select>
                </StyledFormControl>
                <Box borderRadius="50%">
                    {this.model.isLoading ?
                        <StyledPrimaryButton >
                            <StyledCircularProgress />
                        </StyledPrimaryButton>
                        : <StyledPrimaryButton >
                            ENTRAR
                        </StyledPrimaryButton>}

                </Box>
            </Container>
        );
    }
}

export default EnterpriseRegisterForm;