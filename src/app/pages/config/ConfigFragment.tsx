import React, { Component } from "react";
import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Container, ContainerForm, StyledAppBar, StyledTabs, StyledTab, ContainerPanel, Horizontal, CustomSwitch, NumberInput, NumberInputMinutes, RowContainer } from "./styles";
import { TabContext, Alert } from "@material-ui/lab";
import { ConfigViewModel } from "./ConfigViewModel";
import { observer } from "mobx-react";
import { Card, Typography, Divider, FormControlLabel, Box, MuiThemeProvider, InputLabel, Select, MenuItem, createMuiTheme, Snackbar, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@material-ui/core";
import { StyledPrimaryButton, StyledFormControl, StyledCircularProgress, StyledGreyButton } from "../../global/globalStyles";
import CurrencyInput from "../../components/CurrencyInput/CurrencyInput";
import DateFnsUtils from '@date-io/date-fns';
import DeleteIcon from '@material-ui/icons/Delete';


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
        return (<Container>
            {this.dialogAddTime()}
            <Snackbar open={this.model.successUpdate} autoHideDuration={4000} onClose={() => this.model.successUpdate = false}>
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
            <MuiThemeProvider theme={this.theme}>
                <Card style={{ marginTop: '5%', padding: '16px' }}>
                    <ContainerPanel>
                        <Typography variant="body1" gutterBottom style={{ color: '#BDBDBD' }}>
                            DIAS E HORÁRIOS:
                    </Typography>
                        {this.model.enterpriseSettings?.enterprise_settings.daily_works.map((dailyWork, idx) => {
                            return (
                                <RowContainer key={idx}>
                                    <Box mr={1}>
                                        <Typography variant="body1" style={{ marginTop: '8px', color: '#424242' }}>
                                            De:
                                </Typography>
                                    </Box>
                                    <Box minWidth={150} maxWidth={150} mr={1}>
                                        <StyledFormControl margin='dense' variant="filled" >
                                            <InputLabel>Dia</InputLabel>
                                            <Select
                                                onChange={(e) => dailyWork.start_week_day = Number(e.target.value)}
                                                value={dailyWork.start_week_day}>
                                                {this.model.getWeekDays().map(day => {
                                                    return (<MenuItem key={day.id} value={day.id}>{day.name}</MenuItem>);
                                                })}
                                            </Select>
                                        </StyledFormControl>
                                    </Box>
                                    <Box mr={1}>
                                        <Typography variant="body1" style={{ marginTop: '8px', color: '#424242' }}>
                                            à:
                                </Typography>
                                    </Box>
                                    <Box minWidth={150} maxWidth={150} mr={1}>
                                        <StyledFormControl margin='dense' variant="filled" >
                                            <InputLabel>Dia</InputLabel>
                                            <Select
                                                value={dailyWork.end_week_day}
                                                onChange={(e) => dailyWork.end_week_day = Number(e.target.value)}>
                                                {this.model.getWeekDays().map(day => {
                                                    return (<MenuItem key={day.id} value={day.id}>{day.name}</MenuItem>);
                                                })}
                                            </Select>
                                        </StyledFormControl>
                                    </Box>

                                    <Box mr={1}>
                                        <Typography variant="body1" style={{ marginTop: '8px', color: '#424242' }}>
                                            Das:
                                </Typography>
                                    </Box>
                                    <Box minWidth={150} maxWidth={150} mr={1} mt={1} >
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <TimePicker margin="dense"
                                                inputVariant="filled"
                                                ampm={false}
                                                label="Horário Inicial"
                                                value={this.model.convertDate(dailyWork.start_time)}
                                                onChange={(e) => this.handleChangeStartTime(e, idx)} />
                                        </MuiPickersUtilsProvider>

                                    </Box>
                                    <Box mr={1}>
                                        <Typography variant="body1" style={{ marginTop: '8px', color: '#424242' }}>
                                            até:
                                        </Typography>
                                    </Box>
                                    <Box minWidth={150} maxWidth={150} mr={1} mt={1}>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <TimePicker margin="dense"
                                                inputVariant="filled"
                                                ampm={false}
                                                label="Horário Final"
                                                error={this.model.convertDate(dailyWork.start_time) > this.model.convertDate(dailyWork.end_time)}
                                                value={this.model.convertDate(dailyWork.end_time)}
                                                onChange={(e) => this.handleChangeEndTime(e, idx)} />
                                        </MuiPickersUtilsProvider>
                                    </Box>
                                    <IconButton color="inherit" onClick={() => this.handleDeleteTime(idx)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </RowContainer>)
                        })}
                        <Box minWidth={200} maxWidth={200} marginTop={2} mb={1}>
                            <StyledGreyButton onClick={() => this.handleOpenAddTime()}>Novo horário</StyledGreyButton>
                        </Box>
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
                                control={<CustomSwitch checked={this.model.enterpriseSettings?.enterprise_settings?.ask_cpf} onChange={(e) => this.handleCheckAskCPF(e)} color="primary" />}
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
                                control={<CustomSwitch checked={this.model.enterpriseSettings?.enterprise_settings?.observation_enabled} onChange={(e) => this.handleCheckObservations(e)} color="primary" />}
                                label={
                                    <Typography variant="body2" style={{ color: '#BDBDBD' }}>
                                        {this.model.enterpriseSettings?.enterprise_settings?.observation_enabled ? 'Habilitado' : 'Desabilitado'}
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
                                control={<CustomSwitch checked={this.model.enterpriseSettings?.enterprise_settings?.accept_money} onChange={(e) => this.handleCheckMoney(e)} color="primary" />}
                                label={
                                    <Typography variant="body2" style={{ color: '#BDBDBD' }}>
                                        {this.model.enterpriseSettings?.enterprise_settings?.accept_money ? 'Habilitado' : 'Desabilitado'}
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
                                control={<CustomSwitch checked={this.model.enterpriseSettings?.enterprise_settings?.accept_credit_card} color="primary" onChange={(e) => this.handleCheckCreditCard(e)} />}
                                label={
                                    <Typography variant="body2" style={{ color: '#BDBDBD' }}>
                                        {this.model.enterpriseSettings?.enterprise_settings?.accept_credit_card ? 'Habilitado' : 'Desabilitado'}
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
                                control={<CustomSwitch
                                    checked={this.model.enterpriseSettings?.enterprise_settings?.accept_debit_card}
                                    color="primary"
                                    onChange={(e) => this.handleCheckDebitCard(e)} />}
                                label={
                                    <Typography variant="body2" style={{ color: '#BDBDBD' }}>
                                        {this.model.enterpriseSettings?.enterprise_settings?.accept_debit_card ? 'Habilitado' : 'Desabilitado'}
                                    </Typography>
                                }
                                labelPlacement="start"
                                style={{ fontSize: '12px' }}
                            />
                        </Horizontal>
                        <Box minWidth={200} maxWidth={200} marginTop={2} alignSelf='center'>
                            <StyledPrimaryButton onClick={() => this.model.updateSettings()} disabled={this.model.loading}>{!this.model.loading ? 'Salvar Alterações' : <StyledCircularProgress />}</StyledPrimaryButton>
                        </Box>

                    </ContainerPanel>
                </Card >
            </MuiThemeProvider>
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
                            value={this.model.enterpriseSettings?.delivery_settings.min_price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            onChange={(e) => this.handleMinPrice(e)}
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
                                    control={<CustomSwitch checked={this.model.enterpriseSettings?.delivery_settings.free_delivery_above_enabled}
                                        onChange={(e) => this.handleCheckFreeDeliveryAbove(e)}
                                        color="primary" />}
                                    label={
                                        <Typography variant="body2" style={{ color: '#BDBDBD' }}>
                                            {this.model.enterpriseSettings?.delivery_settings.free_delivery_above_enabled ? 'Habilitado' : 'Desabilitado'}
                                        </Typography>
                                    }
                                    labelPlacement="start"
                                />
                            </Box>
                            <NumberInput
                                disabled={!this.model.enterpriseSettings?.delivery_settings.free_delivery_above_enabled}
                                margin='dense'
                                label="Preço"
                                variant="filled"
                                value={this.model.enterpriseSettings?.delivery_settings.free_delivery_above.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                onChange={(e) => this.handlePriceFreeDeliveryAbove(e)}
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
                            <Box minWidth={150} mr={1} >
                                <MuiThemeProvider theme={this.theme}>
                                    <StyledFormControl margin='dense' variant="filled" >
                                        <InputLabel id="demo-simple-select-outlined-label">Tipo</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            label="Tipo"
                                            onChange={(e) => this.handleDeliveryFeeType(e)}
                                            value={this.model.enterpriseSettings?.delivery_settings.delivery_fee_type}>
                                            {[{ id: 0, name: 'A combinar' }, { id: 1, name: 'Valor' }].map(fee => {
                                                return (<MenuItem key={fee.id} value={fee.id}>{fee.name}</MenuItem>);
                                            })}
                                        </Select>
                                    </StyledFormControl>
                                </MuiThemeProvider>
                            </Box>

                            <NumberInput
                                disabled={this.model.enterpriseSettings?.delivery_settings.delivery_fee_type === 0}
                                margin='dense'
                                label="Taxa"
                                variant="filled"
                                value={this.model.enterpriseSettings?.delivery_settings.delivery_fee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                onChange={(e) => this.handleDeliveryFee(e)}
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
                                value={this.model.enterpriseSettings?.delivery_settings.delivery_time_start}
                                onChange={(e) => this.handleDeliveryTimeStart(e)}
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
                                value={this.model.enterpriseSettings?.delivery_settings.delivery_time_end}
                                onChange={(e) => this.handleDeliveryTimeEnd(e)}
                                InputProps={{ classes: { underline: 'underline' }, disableUnderline: false }}
                            />
                        </Horizontal>
                    </Horizontal>

                    <Box minWidth={200} maxWidth={200} marginTop={2} alignSelf='center'>
                        <StyledPrimaryButton onClick={() => this.model.updateSettings()} disabled={this.model.loading}>{!this.model.loading ? 'Salvar Alterações' : <StyledCircularProgress />}</StyledPrimaryButton>
                    </Box>
                </ContainerPanel>
            </Card>
        )
    }

    dialogAddTime(): JSX.Element {
        return (
            <MuiThemeProvider theme={this.theme}>
                <Dialog open={this.model.openAddTimeDialog} onClose={() => this.handleCancelAddTime()}>
                    <DialogTitle>Novo horário</DialogTitle>
                    <DialogContent>
                        <RowContainer >
                            <Box mr={1}>
                                <Typography variant="body1" style={{ marginTop: '8px', color: '#424242' }}>
                                    De:
                                </Typography>
                            </Box>
                            <Box minWidth={150} maxWidth={150} mr={1}>
                                <StyledFormControl margin='dense' variant="filled" error={this.model.errorNewStartDay !== ''}>
                                    <InputLabel>Dia</InputLabel>
                                    <Select
                                        onChange={(e) => this.model.newStartDay = Number(e.target.value)}
                                        value={this.model.newStartDay !== -1 ? this.model.newStartDay : ''}>
                                        {this.model.getWeekDays().map(day => {
                                            return (<MenuItem key={day.id} value={day.id}>{day.name}</MenuItem>);
                                        })}
                                    </Select>
                                </StyledFormControl>
                            </Box>
                            <Box mr={1}>
                                <Typography variant="body1" style={{ marginTop: '8px', color: '#424242' }}>
                                    à:
                                </Typography>
                            </Box>
                            <Box minWidth={150} maxWidth={150} mr={1}>
                                <StyledFormControl margin='dense' variant="filled" error={this.model.errorNewEndDay !== ''} >
                                    <InputLabel>Dia</InputLabel>
                                    <Select
                                        onChange={(e) => this.model.newEndDay = Number(e.target.value)}
                                        value={this.model.newEndDay !== -1 ? this.model.newEndDay : ''}>
                                        {this.model.getWeekDays().map(day => {
                                            return (<MenuItem key={day.id} value={day.id}>{day.name}</MenuItem>);
                                        })}
                                    </Select>
                                </StyledFormControl>
                            </Box>
                        </RowContainer>
                        <RowContainer>
                            <Box mr={1}>
                                <Typography variant="body1" style={{ marginTop: '8px', color: '#424242' }}>
                                    Das:
                                </Typography>
                            </Box>
                            <Box minWidth={150} maxWidth={150} mr={1} mt={1} >
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <TimePicker margin="dense"
                                        inputVariant="filled"
                                        ampm={false}
                                        label="Horário Inicial"
                                        error={this.model.errorNewStartTime !== ''}
                                        helperText={this.model.errorNewStartTime}
                                        value={this.model.newStartTime !== '' ? this.model.convertDate(this.model.newStartTime) : null}
                                        onChange={(e) => { this.model.newStartTime = `${e?.getHours()}:${e?.getMinutes()}` }} />
                                </MuiPickersUtilsProvider>

                            </Box>
                            <Box mr={1}>
                                <Typography variant="body1" style={{ marginTop: '8px', color: '#424242' }}>
                                    até:
                                        </Typography>
                            </Box>
                            <Box minWidth={150} maxWidth={150} mr={1} mt={1}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <TimePicker margin="dense"
                                        inputVariant="filled"
                                        ampm={false}
                                        label="Horário Final"
                                        error={this.model.errorNewEndTime !== ''}
                                        helperText={this.model.errorNewEndTime}
                                        value={this.model.newEndTime !== '' ? this.model.convertDate(this.model.newEndTime) : null}
                                        onChange={(e) => { this.model.newEndTime = `${e?.getHours()}:${e?.getMinutes()}` }} />
                                </MuiPickersUtilsProvider>
                            </Box>
                        </RowContainer>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleCancelAddTime()} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={() => this.handleAddTime()} color="primary">
                            Adicionar
                        </Button>
                    </DialogActions>
                </Dialog>
            </MuiThemeProvider>)
    }
    handleAddTime(): void {
        this.model.handleAddTime()
    }

    handleCheckDebitCard(e: React.ChangeEvent<HTMLInputElement>): void {
        if (this.model.enterpriseSettings?.enterprise_settings?.accept_debit_card !== undefined) {
            this.model.enterpriseSettings.enterprise_settings.accept_debit_card = e.target.checked
        }
    }

    handleCheckCreditCard(e: React.ChangeEvent<HTMLInputElement>): void {
        if (this.model.enterpriseSettings?.enterprise_settings?.accept_credit_card !== undefined) {
            this.model.enterpriseSettings.enterprise_settings.accept_credit_card = e.target.checked
        }
    }

    handleCheckMoney(e: React.ChangeEvent<HTMLInputElement>): void {
        if (this.model.enterpriseSettings?.enterprise_settings?.accept_money !== undefined) {
            this.model.enterpriseSettings.enterprise_settings.accept_money = e.target.checked
        }
    }

    handleCheckObservations(e: React.ChangeEvent<HTMLInputElement>): void {
        if (this.model.enterpriseSettings?.enterprise_settings?.observation_enabled !== undefined) {
            this.model.enterpriseSettings.enterprise_settings.observation_enabled = e.target.checked
        }
    }

    handleCheckAskCPF(e: React.ChangeEvent<HTMLInputElement>): void {
        if (this.model.enterpriseSettings?.enterprise_settings?.ask_cpf !== undefined) {
            this.model.enterpriseSettings.enterprise_settings.ask_cpf = e.target.checked
        }
    }

    handleMinPrice(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        if (this.model.enterpriseSettings?.delivery_settings?.min_price !== undefined) {
            this.model.enterpriseSettings.delivery_settings.min_price = Number(e.target.value)
        }
    }

    handleCheckFreeDeliveryAbove(e: React.ChangeEvent<HTMLInputElement>): void {
        if (this.model.enterpriseSettings?.delivery_settings?.free_delivery_above_enabled !== undefined) {
            this.model.enterpriseSettings.delivery_settings.free_delivery_above_enabled = e.target.checked
        }
    }

    handlePriceFreeDeliveryAbove(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        if (this.model.enterpriseSettings?.delivery_settings?.free_delivery_above !== undefined) {
            this.model.enterpriseSettings.delivery_settings.free_delivery_above = Number(e.target.value)
        }
    }

    handleDeliveryFee(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        if (this.model.enterpriseSettings?.delivery_settings?.delivery_fee !== undefined) {
            this.model.enterpriseSettings.delivery_settings.delivery_fee = Number(e.target.value)
        }
    }

    handleDeliveryFeeType(e: React.ChangeEvent<any>): void {
        if (this.model.enterpriseSettings?.delivery_settings?.delivery_fee_type !== undefined) {
            this.model.enterpriseSettings.delivery_settings.delivery_fee_type = Number(e.target.value)
        }
    }

    handleDeliveryTimeStart(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        if (this.model.enterpriseSettings?.delivery_settings?.delivery_time_start !== undefined) {
            this.model.enterpriseSettings.delivery_settings.delivery_time_start = Number(e.target.value)
        }
    }

    handleDeliveryTimeEnd(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        if (this.model.enterpriseSettings?.delivery_settings?.delivery_time_end !== undefined) {
            this.model.enterpriseSettings.delivery_settings.delivery_time_end = Number(e.target.value)
        }
    }

    handleChangeStartTime(date: Date | null, idx: number): void {
        if (this.model.enterpriseSettings?.enterprise_settings.daily_works !== undefined) {
            this.model.enterpriseSettings.enterprise_settings.daily_works[idx].start_time = `${date?.getHours()}:${date?.getMinutes()}`
        }
    }

    handleChangeEndTime(date: Date | null, idx: number): void {
        if (this.model.enterpriseSettings?.enterprise_settings.daily_works !== undefined) {
            this.model.enterpriseSettings.enterprise_settings.daily_works[idx].end_time = `${date?.getHours()}:${date?.getMinutes()}`
        }
    }

    handleDeleteTime(idx: number): void {
        if (this.model.enterpriseSettings?.enterprise_settings.daily_works !== undefined) {
            this.model.enterpriseSettings.enterprise_settings.daily_works.splice(idx, 1)
        }
    }

    handleOpenAddTime(): void {
        this.model.openAddTimeDialog = true
    }

    handleCancelAddTime(): void {
        this.model.openAddTimeDialog = false
    }



}

export default ConfigFragment;