import React, { Component } from "react";
import { Container, Header, StyledAvatar, Title, SnackbarContainer, Row, ContainerSection, StyledProductAvatar, ContainerProduct, RowProduct, ProductDescription, ContainerSpaceRow, StyledImage, NumberInput, ProductDescriptionDialog } from "./styles";
import { Snackbar, IconButton, Typography, Divider, Dialog, DialogContent } from "@material-ui/core";
import { ReactComponent as ShopIcon } from '../../assets/shopping_cart-24px.svg';
import { ReactComponent as SendIcon } from '../../assets/send-24px.svg';
import { OrderViewModel } from "./OrderViewModel";
import { observer } from "mobx-react";
import { StyledPrimaryButton, StyledTextField } from "../../global/globalStyles";

@observer
class OrderPage extends Component {

    model = new OrderViewModel()

    render(): JSX.Element {
        return (
            <Container>
                <Header>
                    <Title>
                        Leko's House
                    </Title>
                </Header>
                <StyledAvatar></StyledAvatar>
                <ContainerSection style={{ marginTop: '25vh' }}>
                    {this.section('Hamburgueres')}
                    {this.cardProduct()}
                    {this.cardProduct()}
                    {this.cardProduct()}
                    {this.cardProduct()}
                    {this.section('Refrigeirantes')}
                    {this.section('Doces')}
                    {this.section('Batatas')}

                </ContainerSection>
                {this.dialogProduct()}
                {this.dialogShopCart()}
                {this.snackbarShopCart()}
            </Container>
        );
    }

    section(name: string): JSX.Element {
        return (
            <div>
                <Typography variant="h5" gutterBottom style={{ marginTop: '16px', color: '#000' }}>
                    {name}
                </Typography>
                <Divider light />
            </div>
        )
    }

    cardProduct(): JSX.Element {
        return (
            <ContainerProduct onClick={() => this.model.openDialogProduct = true}>
                <RowProduct>
                    <StyledProductAvatar src="https://exame.com/wp-content/uploads/2020/05/mafe-studio-LV2p9Utbkbw-unsplash.jpg?quality=70&strip=info" variant="square"></StyledProductAvatar>
                    <ContainerSpaceRow>
                        <div>
                            <Typography variant="h6" gutterBottom style={{ color: '#000' }}>
                                Hamburguer
                            </Typography>
                            <ProductDescription>
                                {"Hamburgusdfsdfsdfsdfsdfsder\nHamburguer\nHamburguer\nHamburguer"}
                            </ProductDescription>
                        </div>
                        <Typography variant="subtitle1" style={{ fontSize: '20px' }}>
                            R$ 15,00
                        </Typography>
                    </ContainerSpaceRow>

                </RowProduct>

            </ContainerProduct>
        )
    }

    dialogProduct(): JSX.Element {
        return (
            <Dialog open={this.model.openDialogProduct} onClose={() => this.model.openDialogProduct = false}>
                <DialogContent>
                    <StyledImage src="https://exame.com/wp-content/uploads/2020/05/mafe-studio-LV2p9Utbkbw-unsplash.jpg?quality=70&strip=info"></StyledImage>
                    <Typography variant="h6" gutterBottom style={{ color: '#000' }}>
                        Hamburguer
                    </Typography>
                    <ProductDescriptionDialog >
                        {"Hamburgusdfsdfsdfsdfsdfsder\nHamburguer\nHamburguer\nHamburguer\nHamburguer\nHamburguer\nHamburguer\nHamburguer"}
                    </ProductDescriptionDialog>
                    <Divider light style={{ marginTop: '16px' }} />
                    <StyledTextField label='Observação' multiline rowsMax={3} rows={3} variant='filled' InputProps={{ classes: { underline: 'underline' }, disableUnderline: false }}>
                    </StyledTextField>
                    <Divider light style={{ marginTop: '16px' }} />
                    <ContainerSpaceRow>
                        <NumberInput
                            label="Quantidade"
                            variant="filled"
                            margin="dense"
                            type="number"
                            value={1}
                            InputProps={{ inputProps: { min: 1 }, classes: { underline: 'underline' }, disableUnderline: false }} />

                        <StyledPrimaryButton style={{ width: '200px', minWidth: '200px', marginBottom: '16px', fontSize: '14px' }}>{"Adicionar • R$ 15,00"}</StyledPrimaryButton>
                    </ContainerSpaceRow>

                </DialogContent>

            </Dialog>
        )
    }

    dialogShopCart(): JSX.Element {
        return (
            <Dialog open={this.model.openDialogCart} onClose={() => this.model.openDialogCart = false}>
                <DialogContent>

                </DialogContent>
            </Dialog>
        )
    }

    dialogFinishOrder(): JSX.Element {
        return (
            <>
            </>
        )
    }

    snackbarShopCart(): JSX.Element {
        return (<Snackbar open={true}>
            <SnackbarContainer>
                <Row onClick={() => this.model.openDialogCart = true} style={{cursor: 'pointer'}}>
                    <IconButton color="inherit"  >
                        <ShopIcon />
                    </IconButton>
                    <Typography variant="subtitle1" style={{ marginLeft: '16px', color: '#fff' }}>
                        Meu Carrinho
                </Typography>
                </Row>
                <IconButton color="inherit"  >
                    <SendIcon />
                </IconButton>

            </SnackbarContainer>
        </Snackbar>)
    }

}

export default OrderPage;