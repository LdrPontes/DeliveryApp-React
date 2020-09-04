import React, { Component } from "react";
import { ChromePicker } from 'react-color';
import { Container, CardContainer, Horizontal } from "./styles";
import { Card, Typography, Divider, Box } from "@material-ui/core";
import { observer } from "mobx-react";
import { CatalogViewModel } from "./CatalogViewModel";
import { StyledTextField, StyledPrimaryButton, StyledCircularProgress } from "../../global/globalStyles";

@observer
class CatalogFragment extends Component {
    model = new CatalogViewModel()

    render(): JSX.Element {
        return (
            <Container>

                <Card style={{ padding: '16px' }}>
                    <CardContainer>
                        <Typography variant="body1" gutterBottom style={{ color: '#BDBDBD' }}>
                            COMPARTILHAR:
                        </Typography>
                        <Horizontal>
                            <Typography variant="body1" style={{ marginTop: '8px', color: '#424242' }} gutterBottom>
                                Link de Catálogo
                            </Typography>
                        </Horizontal>
                        <Horizontal>
                            <Typography variant="body1" style={{ marginTop: '8px', color: '#424242' }} gutterBottom>
                                QR Code
                            </Typography>
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
                                <StyledTextField label='Mensagem da tela inicial' onChange={(e) => this.model.msgStart = e.target.value} helperText={`${this.model.lengthMsgStart} caracteres restantes`} multiline rowsMax={3} rows={3} variant='filled'  inputProps={{ maxLength: 144 }} InputProps={{ classes: { underline: 'underline' }, disableUnderline: false }}>
                                </StyledTextField>
                            </Box>
                            <Box minWidth={200} width={470} marginTop={2} alignSelf='center'>
                                <StyledTextField label='Mensagem após pedido' onChange={(e) => this.model.msgEnd = e.target.value} helperText={`${this.model.lengthMsgEnd} caracteres restantes`} multiline rowsMax={3} rows={3} variant='filled' inputProps={{ maxLength: 144 }} InputProps={{ classes: { underline: 'underline' }, disableUnderline: false }}>
                                </StyledTextField>
                            </Box>
                        </Horizontal>
                        <Box minWidth={200} maxWidth={200} marginTop={2} alignSelf='center'>
                            <StyledPrimaryButton onClick={() => { console.log('') }} disabled={this.model.loading}>{!this.model.loading ? 'Salvar Alterações' : <StyledCircularProgress />}</StyledPrimaryButton>
                        </Box>
                    </CardContainer>
                </Card>
            </Container>
        );
    }

    handleSelectInputColor() {

    }
}

export default CatalogFragment;