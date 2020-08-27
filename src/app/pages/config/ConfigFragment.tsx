import React, { Component } from "react";
import { Container, ContainerForm, StyledAppBar, StyledTabs, StyledTab, ContainerPanel, Horizontal, CustomSwitch, NumberInput, NumberInputMinutes } from "./styles";
import { TabContext } from "@material-ui/lab";
import { ConfigViewModel } from "./ConfigViewModel";
import { observer } from "mobx-react";
import { Card, Typography, Divider, FormControlLabel, Box, MuiThemeProvider, InputLabel, Select, MenuItem, createMuiTheme } from "@material-ui/core";
import { StyledPrimaryButton, StyledFormControl } from "../../global/globalStyles";
import CurrencyInput from "../../components/CurrencyInput/CurrencyInput";

@observer
class ConfigFragment extends Component {

    model = new ConfigViewModel()

    theme = createMuiTheme({
        palette: {
            primary: { 500: '#880e4f' }
        },
    });

    componentDidMount(): void {
        this.model.initEnterpriseSettings()
    }

    render(): JSX.Element {
        console.log('Render')
        return (<Container>
            <ContainerForm>
                <TabContext value={this.model.selectedTab.toString()}>
                    <StyledAppBar position="static">
                        <StyledTabs variant={'fullWidth'} classes={{ indicator: 'indicator' }} value={this.model.selectedTab} onChange={(e, value) => { this.model.selectedTab = value }} aria-label="simple tabs example">
                            <StyledTab label="Estabelecimento" />
                            <StyledTab label="Delivery" />
                        </StyledTabs>
                    </StyledAppBar>
                    {
                        this.model.selectedTab === 0 && this.model.enterpriseSettings !== undefined ? this.panelEnterpriseConfig()
                            : this.model.selectedTab === 1 && this.model.enterpriseSettings !== undefined ? this.panelDeliveryConfig()
                                : <></>
                    }

                </TabContext>
            </ContainerForm>
        </Container>);
    }

    panelEnterpriseConfig(): JSX.Element {
        return (
            <Card style={{ marginTop: '5%', padding: '16px' }}>
                <ContainerPanel>
                    <Typography variant="body1" gutterBottom style={{ color: '#BDBDBD' }}>
                        DIAS E HORÁRIOS:
                    </Typography>
                    <Divider light />
                    <Typography variant="body1" gutterBottom style={{ marginTop: '8px', color: '#BDBDBD' }}>
                        PEDIDOS:
                    </Typography>
                    <Horizontal>
                        <Typography variant="body1" style={{ marginTop: '8px', color: '#424242' }} gutterBottom>
                            Perguntar sobre CPF na nota?
                        </Typography>
                        <FormControlLabel
                            value="start"
                            control={<CustomSwitch checked={this.model.enterpriseSettings?.enterprise_settings?.ask_cpf} color="primary" />}
                            label={
                                <Typography variant="body2" style={{ color: '#BDBDBD' }}>
                                    {this.model.enterpriseSettings?.enterprise_settings?.ask_cpf ? 'Habilitado' : 'Desabilitado'}
                                </Typography>
                            }
                            labelPlacement="start"
                        />
                    </Horizontal>
                    <Horizontal>
                        <Typography variant="body1" style={{ marginTop: '8px', color: '#424242' }} gutterBottom>
                            Habilitar observações nos pedidos?
                        </Typography>
                        <FormControlLabel
                            value="start"
                            control={<CustomSwitch color="primary" />}
                            label={
                                <Typography variant="body2" style={{ color: '#BDBDBD' }}>
                                    Habilitado
                                </Typography>
                            }
                            labelPlacement="start"
                        />
                    </Horizontal>

                    <Divider light style={{ marginTop: '8px', marginBottom: '8px' }} />
                    <Typography variant="body1" gutterBottom style={{ marginTop: '8px', color: '#BDBDBD' }}>
                        FORMAS DE PAGAMENTO:
                    </Typography>
                    <Horizontal>
                        <Typography variant="body1" style={{ marginTop: '8px', color: '#424242' }} gutterBottom>
                            Dinheiro
                    </Typography>
                        <FormControlLabel
                            value="start"
                            control={<CustomSwitch color="primary" />}
                            label={
                                <Typography variant="body2" style={{ color: '#BDBDBD' }}>
                                    Habilitado
                                </Typography>
                            }
                            labelPlacement="start"
                        />
                    </Horizontal>

                    <Horizontal>
                        <Typography variant="body1" style={{ marginTop: '8px', color: '#424242' }} gutterBottom>
                            Crédito
                    </Typography>
                        <FormControlLabel
                            value="start"
                            control={<CustomSwitch color="primary" />}
                            label={
                                <Typography variant="body2" style={{ color: '#BDBDBD' }}>
                                    Habilitado
                                </Typography>
                            }
                            labelPlacement="start"
                        />
                    </Horizontal>
                    <Horizontal>
                        <Typography variant="body1" style={{ marginTop: '8px', color: '#424242' }} gutterBottom>
                            Débito
                    </Typography>
                        <FormControlLabel
                            value="start"
                            control={<CustomSwitch color="primary" />}
                            label={
                                <Typography variant="body2" style={{ color: '#BDBDBD' }}>
                                    Habilitado
                                </Typography>
                            }
                            labelPlacement="start"
                            style={{ fontSize: '12px' }}
                        />
                    </Horizontal>
                    <Box minWidth={200} maxWidth={200} marginTop={2} alignSelf='center'>
                        <StyledPrimaryButton>Salvar</StyledPrimaryButton>
                    </Box>

                </ContainerPanel>
            </Card >
        )
    }

    panelDeliveryConfig(): JSX.Element {
        return (
            <Card style={{ marginTop: '5%', padding: '16px' }}>
                <ContainerPanel>
                    <Typography variant="body1" gutterBottom style={{ color: '#BDBDBD' }}>
                        DELIVERY:
                    </Typography>
                    <Horizontal>
                        <Typography variant="body1" style={{ marginTop: '8px', color: '#424242' }} gutterBottom>
                            Pedido mínimo:
                        </Typography>
                        <NumberInput
                            margin='dense'
                            label="Preço"
                            variant="filled"
                            InputProps={{ inputComponent: CurrencyInput as any, classes: { underline: 'underline' }, disableUnderline: false }}
                        />
                    </Horizontal>
                    <Horizontal>
                        <Typography variant="body1" style={{ marginTop: '8px', color: '#424242' }}>
                            Entrega grátis acima de:
                        </Typography>
                        <Horizontal>
                            <Box mr={2}>
                                <FormControlLabel
                                    value="start"
                                    control={<CustomSwitch color="primary" />}
                                    label={
                                        <Typography variant="body2" style={{ color: '#BDBDBD' }}>
                                            Habilitado
                                </Typography>
                                    }
                                    labelPlacement="start"
                                />
                            </Box>
                            <NumberInput
                                margin='dense'
                                label="Preço"
                                variant="filled"
                                InputProps={{ inputComponent: CurrencyInput as any, classes: { underline: 'underline' }, disableUnderline: false }}
                            />
                        </Horizontal>
                    </Horizontal>
                    <Divider light style={{ marginTop: '8px', marginBottom: '8px' }} />
                    <Typography variant="body1" gutterBottom style={{ color: '#BDBDBD' }}>
                        ENTREGA:
                    </Typography>
                    <Horizontal>
                        <Typography variant="body1" style={{ marginTop: '8px', color: '#424242' }}>
                            Taxa de entrega:
                        </Typography>
                        <Horizontal>
                            <Box minWidth={150} mr={1}>
                                <MuiThemeProvider theme={this.theme}>
                                    <StyledFormControl margin='dense' variant="filled" >
                                        <InputLabel id="demo-simple-select-outlined-label">Tipo</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            label="Tipo"
                                            value={''}>
                                            {['A combinar', 'Valor'].map(fee => {
                                                return (<MenuItem key={fee} value={fee}>{fee}</MenuItem>);
                                            })}
                                        </Select>
                                    </StyledFormControl>
                                </MuiThemeProvider>
                            </Box>

                            <NumberInput
                                margin='dense'
                                label="Taxa"
                                variant="filled"
                                InputProps={{ inputComponent: CurrencyInput as any, classes: { underline: 'underline' }, disableUnderline: false }}
                            />
                        </Horizontal>

                    </Horizontal>
                    <Horizontal>
                        <Typography variant="body1" style={{ marginTop: '8px', color: '#424242' }}>
                            Tempo de entrega:
                        </Typography>
                        <Horizontal>
                            <Typography variant="body1" style={{ marginTop: '8px', color: '#424242' }}>
                                De:
                            </Typography>
                            <NumberInputMinutes
                                margin='dense'
                                label="Minutos"
                                variant="filled"
                                InputProps={{ classes: { underline: 'underline' }, disableUnderline: false }}
                            />

                            <Box ml={1}>
                                <Typography variant="body1" style={{ marginTop: '8px', color: '#424242' }}>
                                    Até:
                                </Typography>
                            </Box>
                            <NumberInputMinutes
                                margin='dense'
                                label="Minutos"
                                variant="filled"
                                InputProps={{ classes: { underline: 'underline' }, disableUnderline: false }}
                            />
                        </Horizontal>
                    </Horizontal>

                    <Box minWidth={200} maxWidth={200} marginTop={2} alignSelf='center'>
                        <StyledPrimaryButton>Salvar</StyledPrimaryButton>
                    </Box>
                </ContainerPanel>
            </Card>
        )
    }
}

export default ConfigFragment;