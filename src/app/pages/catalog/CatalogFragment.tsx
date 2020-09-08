import React, { Component } from "react";
import { ChromePicker } from 'react-color';
import { Container, CardContainer, Horizontal } from "./styles";
import { Card, Typography, Divider, Box, IconButton, Snackbar } from "@material-ui/core";
import { observer } from "mobx-react";
import { CatalogViewModel } from "./CatalogViewModel";
import { StyledTextField, StyledPrimaryButton, StyledCircularProgress } from "../../global/globalStyles";
import { ReactComponent as CopyIcon } from '../../assets/content_copy-24px.svg';
import { Alert } from "@material-ui/lab";

@observer
class CatalogFragment extends Component {
    model = new CatalogViewModel()

    componentDidMount(): void {
        this.model.initEnterpriseSettings()
    }

    render(): JSX.Element {
        return (

            <Container>
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
                <Card style={{ padding: '16px' }}>
                    <CardContainer>
                        <Typography variant="body1" gutterBottom style={{ color: '#BDBDBD' }}>
                            COMPARTILHAR:
                        </Typography>
                        <Horizontal>
                            <Typography variant="body1" style={{ marginTop: '8px', color: '#424242' }} gutterBottom>
                                Link do catálogo
                            </Typography>
                            <Horizontal>
                                <Typography variant="body1" style={{ marginTop: '16px', marginRight: '16px', color: '#BDBDBD' }} gutterBottom>
                                    https://godelivery.com/pedido/
                                </Typography>
                                <StyledTextField label='Nome' onChange={(e) => this.handleChangeCode(e.target.value)} value={this.model.code.toLowerCase().replace(/[`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi, '').replace(' ', '-')} variant='filled' margin="dense" InputProps={{ classes: { underline: 'underline' }, disableUnderline: false }}>
                                </StyledTextField>
                                <IconButton color="inherit" onClick={() => this.handleCopyUrl()}>
                                    <CopyIcon />
                                </IconButton>
                            </Horizontal>

                        </Horizontal>
                        <Divider light />
                        <Typography variant="body1" gutterBottom style={{ marginTop: '8px', color: '#BDBDBD' }}>
                            CORES:
                        </Typography>
                        <Horizontal>
                            <Typography variant="body1" style={{ marginTop: '8px', color: '#424242' }} gutterBottom>
                                Cor Principal
                            </Typography>
                            <div style={{ marginBottom: '8px' }}>
                                <Horizontal>
                                    <div style={{ width: '40px', height: '40px', backgroundColor: this.model.selectedColor, marginTop: '16px', marginRight: '8px' }}></div>
                                    <StyledTextField label='Cor' value={this.model.selectedColor} onClick={() => this.model.colorPickerVisible = true} variant='filled' margin="dense" InputProps={{ classes: { underline: 'underline' }, disableUnderline: false }}>
                                    </StyledTextField>
                                </Horizontal>
                                {this.model.colorPickerVisible ? <div style={{
                                    position: 'absolute',
                                    zIndex: 2,
                                }}>
                                    <div style={{
                                        position: 'fixed',
                                        top: '0px',
                                        right: '0px',
                                        bottom: '0px',
                                        left: '0px',
                                    }} onClick={() => this.model.colorPickerVisible = false} />
                                    <ChromePicker color={this.model.selectedColor} onChangeComplete={(color) => this.model.selectedColor = color.hex}></ChromePicker>
                                </div> : null}
                            </div>
                        </Horizontal>
                        <Divider light />
                        <Typography variant="body1" gutterBottom style={{ marginTop: '8px', color: '#BDBDBD' }}>
                            MENSAGENS:
                        </Typography>
                        <Horizontal>
                            <Box minWidth={200} width={470} marginTop={2} marginRight={1} alignSelf='center'>
                                <StyledTextField label='Mensagem da tela inicial' value={this.model.msgStart} onChange={(e) => this.model.msgStart = e.target.value} helperText={`${this.model.lengthMsgStart} caracteres restantes`} multiline rowsMax={3} rows={3} variant='filled' inputProps={{ maxLength: 144 }} InputProps={{ classes: { underline: 'underline' }, disableUnderline: false }}>
                                </StyledTextField>
                            </Box>
                            <Box minWidth={200} width={470} marginTop={2} alignSelf='center'>
                                <StyledTextField label='Mensagem após pedido' value={this.model.msgEnd} onChange={(e) => this.model.msgEnd = e.target.value} helperText={`${this.model.lengthMsgEnd} caracteres restantes`} multiline rowsMax={3} rows={3} variant='filled' inputProps={{ maxLength: 144 }} InputProps={{ classes: { underline: 'underline' }, disableUnderline: false }}>
                                </StyledTextField>
                            </Box>
                        </Horizontal>
                        <Box minWidth={200} maxWidth={200} marginTop={2} alignSelf='center'>
                            <StyledPrimaryButton onClick={() => this.model.updateCatalog()} disabled={this.model.loading}>{!this.model.loading ? 'Salvar Alterações' : <StyledCircularProgress />}</StyledPrimaryButton>
                        </Box>
                    </CardContainer>
                </Card>
            </Container>
        );
    }

    handleCopyUrl(): void {
        navigator.clipboard.writeText('https://boring-yonath-e07499.netlify.app/pedido/' + this.model.enterprise?.code)
    }

    handleChangeCode(code: string): void {
        this.model.code = code
    }

}

export default CatalogFragment;