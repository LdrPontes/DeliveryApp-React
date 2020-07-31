import React, { Component, ChangeEvent } from "react";
import { EnterpriseRegisterFormViewModel } from "./EnterpriseRegisterFormViewModel";
import { RadioGroup, FormControlLabel, FormControl, InputLabel, MenuItem, Select, Box } from "@material-ui/core";
import { StyledRadio, Container, LeftContainer, Title, RowContainer, NumberInput } from "./styles";
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
            this.model.setBase64Image(event.target.files[0])
        }
    }

    handleCategoryChange(event: any): void {
        this.model.category = event.target.value
        console.log('Selected: ' + event.target.value || " ")
    }

    render(): JSX.Element {
        console.log('Carregou novamente')
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
                    type="text"
                    error={this.model.errorName !== ''}
                    helperText={this.model.errorName}
                    value={this.model.name}
                    onChange={(e) => this.model.name = e.target.value} />
                {this.model.errorDocument === '' || this.model.errorDocument !== '' ? //Gambiarra para o Mobx atualizar caso tenha erro
                    <InputMask mask={this.model.typeDocument === "0" ? "999.999.999-99" : "99.999.999/9999-99"} value={this.model.document} maskChar=" " onChange={(e) => { this.model.document = e.target.value }}>
                        {() => <StyledTextField
                            label={this.model.typeDocument === "0" ? "CPF" : "CNPJ"}
                            variant="outlined"
                            error={this.model.errorDocument !== ''}
                            helperText={this.model.errorDocument}
                            type="text" ></StyledTextField>}
                    </InputMask>
                    : <></>
                }
                {this.model.errorCep === '' || this.model.errorCep !== '' ? //Gambiarra para o Mobx atualizar caso tenha erro
                    <InputMask mask='99999-999' value={this.model.cep} maskChar=" " onChange={(e) => this.model.handleAddressByCep(e)} >
                        {() => <StyledTextField
                            label="CEP"
                            error={this.model.errorCep !== ''}
                            helperText={this.model.errorCep}
                            variant="outlined"
                            type="text" />}
                    </InputMask>
                    : <></>
                }
                {
                    this.model.address !== '' ?
                        <RowContainer>
                            <StyledTextField
                                label="Endereço"
                                variant="outlined"
                                type="text"
                                disabled
                                value={this.model.address} />
                            <NumberInput
                                label="Número"
                                variant="outlined"
                                type="number"
                                InputProps={{ inputProps: { min: 0 } }}
                                value={this.model.number}
                                onChange={(e) => this.model.number = e.target.value} />
                        </RowContainer>
                        : <></>
                }
                <StyledFormControl variant="outlined" error={this.model.errorCategory !== ''}>
                    <InputLabel id="demo-simple-select-outlined-label">Seguimento</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        label="Seguimento"
                        value={this.model.category || ''}
                        onChange={(e) => this.handleCategoryChange(e)}>
                        {this.model.categories.map(category => {
                            return (<MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>);
                        })}
                    </Select>
                </StyledFormControl>
                {this.model.isLoading ?
                    <Box borderRadius="50%">

                        <StyledPrimaryButton >
                            <StyledCircularProgress />
                        </StyledPrimaryButton>


                    </Box> :
                    <Box borderRadius="50%">
                        <StyledPrimaryButton onClick={(e) => this.model.saveEnterprise()}>
                            ENTRAR
                  </StyledPrimaryButton>
                    </Box>
                }
            </Container>
        );
    }
}

export default EnterpriseRegisterForm;