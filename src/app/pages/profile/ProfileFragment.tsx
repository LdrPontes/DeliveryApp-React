import React, { Component } from "react";
import { TabContext, Alert } from "@material-ui/lab";
import { StyledAppBar, StyledTabs, Container, StyledTab, ContainerForm, ContainerPanel, Horizontal, NumberInput } from "./styles";
import { observer } from "mobx-react";
import { ProfileViewModel } from "./ProfileViewModel";
import { StyledTextField, StyledPrimaryButton, StyledFormControl, StyledCircularProgress } from "../../global/globalStyles";
import { Box, InputAdornment, IconButton, InputLabel, Select, MenuItem, MuiThemeProvider, createMuiTheme, Snackbar } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import InputMask from 'react-input-mask';
import AvatarInput from "../../components/AvatarInput/AvatarInput";

@observer
class ProfileFragment extends Component {
    model = new ProfileViewModel()

    theme = createMuiTheme({
        palette: {
            primary: { 500: '#880e4f' }
        },
    });

    componentDidMount(): void {
        this.model.initProfileValues()
        this.model.readAllCategories()
    }

    render(): JSX.Element {
        return (<Container>
            <Snackbar open={this.model.successEnterpriseUpdate} autoHideDuration={4000} onClose={() => this.model.successEnterpriseUpdate = false}>
                <Alert severity="success">
                    Dados atualizados com sucesso
                </Alert>
            </Snackbar>
            <Snackbar open={this.model.successAccountUpdate} autoHideDuration={4000} onClose={() => this.model.successAccountUpdate = false}>
                <Alert severity="success">
                    Dados atualizados com sucesso
                </Alert>
            </Snackbar>
            <Snackbar open={this.model.errorApi !== ''} autoHideDuration={4000} onClose={() => this.model.errorApi = ''}>
                <Alert severity="error">
                    {this.model.errorApi}
                </Alert>
            </Snackbar>
            <ContainerForm>
                <TabContext value={this.model.selectedTab.toString()}>
                    <StyledAppBar position="static">
                        <StyledTabs variant={'fullWidth'} classes={{ indicator: 'indicator' }} value={this.model.selectedTab} onChange={(e, value) => { this.model.selectedTab = value }} aria-label="simple tabs example">
                            <StyledTab label="Minha Conta" />
                            <StyledTab label="Estabelecimento" />
                        </StyledTabs>
                    </StyledAppBar>
                    {
                        this.model.selectedTab === 0 ? this.panelMyAccount()
                            : this.model.selectedTab === 1 ? this.panelEnterprise()
                                : <></>
                    }

                </TabContext>
            </ContainerForm>
        </Container>);
    }

    panelMyAccount(): JSX.Element {
        return (
            <ContainerPanel>
                <StyledTextField
                    error={this.model.errorName !== ''}
                    helperText={this.model.errorName}
                    variant="filled"
                    label="Nome"
                    type="text"
                    value={this.model.name}
                    onChange={(e) => this.model.name = e.target.value}
                    InputProps={{ classes: { underline: 'underline' }, disableUnderline: false }} />
                <StyledTextField
                    error={this.model.errorEmail !== ''}
                    helperText={this.model.errorEmail}
                    variant="filled"
                    label="E-mail"
                    type="email"
                    onChange={(e) => this.model.email = e.target.value}
                    value={this.model.email}
                    InputProps={{ classes: { underline: 'underline' }, disableUnderline: false }} />
                <InputMask mask="(99) 9999-99999" value={this.model.telephone} maskChar=" " onChange={(e) => this.model.telephone = e.target.value}>
                    {() => <StyledTextField
                        error={this.model.errorTelephone !== ''}
                        helperText={this.model.errorTelephone}
                        variant="filled"
                        label="Telefone"
                        InputProps={{ classes: { underline: 'underline' }, disableUnderline: false }}
                        type="tel" />}
                </InputMask>
                <Horizontal>
                    <StyledTextField
                        variant="filled"
                        label="Nova senha"
                        error={this.model.errorPassword !== ''}
                        helperText={this.model.errorPassword}
                        onChange={(e) => this.model.password = e.target.value}
                        type={this.model.showPassword ? 'text' : 'password'}
                        InputProps={{
                            classes: { underline: 'underline' }, disableUnderline: false, endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => this.model.showPassword = !this.model.showPassword}
                                        onMouseDown={() => this.model.showPassword = !this.model.showPassword}
                                    >
                                        {this.model.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }} />

                    <Box marginLeft={1}></Box>

                    <StyledTextField
                        variant="filled"
                        label="Confirmar senha"
                        error={this.model.errorConfirmPassword !== ''}
                        helperText={this.model.errorConfirmPassword}
                        onChange={(e) => this.model.confirmPassword = e.target.value}
                        type={this.model.showPassword ? 'text' : 'password'}
                        InputProps={{ classes: { underline: 'underline' }, disableUnderline: false }} />
                </Horizontal>

                <StyledPrimaryButton onClick={() => this.model.updateAccount()} disabled={this.model.updatingAccount}>{!this.model.updatingAccount ? 'Salvar Alterações' : <StyledCircularProgress />}</StyledPrimaryButton>
            </ContainerPanel>
        )
    }

    panelEnterprise(): JSX.Element {
        return (
            <ContainerPanel>
                <AvatarInput preview={this.model.preview} handlerImageChange={(e) => this.handleImageChange(e)}></AvatarInput>
                <StyledTextField
                    error={this.model.errorEnterpriseName !== ''}
                    helperText={this.model.errorEnterpriseName}
                    variant="filled"
                    label="Nome"
                    type="text"
                    value={this.model.enterpriseName}
                    onChange={(e) => this.model.enterpriseName = e.target.value}
                    InputProps={{ classes: { underline: 'underline' }, disableUnderline: false }} />


                {this.model.errorCep === '' || this.model.errorCep !== '' ? //Gambiarra para o Mobx atualizar caso tenha erro
                    <><InputMask mask='99999-999' value={this.model.cep} maskChar=" " onChange={(e) => this.model.handleAddressByCep(e)} >
                        {() => <StyledTextField
                            label="CEP"
                            error={this.model.errorCep !== ''}
                            helperText={this.model.errorCep}
                            variant="filled"
                            InputProps={{ classes: { underline: 'underline' }, disableUnderline: false }}
                            type="text" />}
                    </InputMask>
                        <Horizontal>
                            <StyledTextField
                                value={this.model.address}
                                disabled
                                label="Endereço"
                                variant="filled"
                                type="text"
                                InputProps={{ classes: { underline: 'underline' }, disableUnderline: false }}
                            />
                            <NumberInput
                                label="Número"
                                variant="filled"
                                type="number"
                                InputProps={{ inputProps: { min: 0 }, classes: { underline: 'underline' }, disableUnderline: false }}
                                value={this.model.number}
                                onChange={(e) => this.model.number = e.target.value} />
                        </Horizontal></>

                    : <></>
                }

                <MuiThemeProvider theme={this.theme}>
                    <StyledFormControl variant="filled" error={this.model.errorCategory !== ''} >
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
                </MuiThemeProvider >
                <StyledPrimaryButton onClick={() => this.model.updateEnterprise()} disabled={this.model.updatingEnterprise}>{!this.model.updatingEnterprise ? 'Salvar Alterações' : <StyledCircularProgress />}</StyledPrimaryButton>
            </ContainerPanel>
        )
    }

    handleImageChange(event: any): void {
        if (event.target.files && event.target.files[0]) {
            this.model.preview = URL.createObjectURL(event.target.files[0])
            this.model.setBase64Image(event.target.files[0])
        }
    }

    handleCategoryChange(event: any): void {
        this.model.category = event.target.value
    }


}

export default ProfileFragment;