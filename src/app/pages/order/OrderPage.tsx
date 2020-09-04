import React, { Component } from "react";
import { Container, Header, StyledAvatar, Title, SnackbarContainer, Row, ContainerSection, StyledProductAvatar, ContainerProduct, RowProduct, ProductDescription, ContainerSpaceRow, StyledImage, NumberInput, ProductDescriptionDialog, ContainerSpaceRowProduct, BackgroundImage } from "./styles";
import { Snackbar, IconButton, Typography, Divider, Dialog, DialogContent, Box, Checkbox, createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { ReactComponent as ShopIcon } from '../../assets/shopping_cart-24px.svg';
import { OrderViewModel } from "./OrderViewModel";
import { observer } from "mobx-react";
import { StyledPrimaryButton, StyledTextField } from "../../global/globalStyles";
import { RouteComponentProps } from "react-router-dom";
import { ProductSection } from "../../../domain/entities/ProductSection";
import { Product } from "../../../domain/entities/Product";
import { OptionalSection } from "../../../domain/entities/OptionalSection";
import { Optional } from "../../../domain/entities/Optional";

interface MatchParams {
    code?: string
}

type Props = RouteComponentProps<MatchParams>

@observer
class OrderPage extends Component<Props> {


    theme = createMuiTheme({
        palette: {
            primary: { 500: '#880e4f' }
        },
    });

    model = new OrderViewModel()

    componentDidMount(): void {
        const { code } = this.props.match.params

        this.model.readEnterpriseByCode(code!)

    }

    render(): JSX.Element {
        return (
            <Container>
                <Header>
                    <Title>
                        {this.model.enterprise?.name}
                    </Title>
                </Header>
                <StyledAvatar src={this.model.enterprise?.logo_url}></StyledAvatar>
                <ContainerSection style={{ marginTop: '25vh' }}>
                    {this.model.enterprise?.product_sections?.map((section) => {
                        return this.section(section)
                    })}

                </ContainerSection>
                {this.dialogProduct()}
                {this.dialogShopCart()}
                {!this.model.openDialogProduct ? this.snackbarShopCart() : <></>}
            </Container>
        );
    }

    section(section: ProductSection): JSX.Element {
        return (
            <div key={section.id}>
                <Typography variant="h5" gutterBottom style={{ marginTop: '16px', color: '#000' }}>
                    {section.name}
                </Typography>
                <Divider light />
                {section.products.map((product) => {
                    return this.cardProduct(product)
                })}
            </div>
        )
    }

    cardProduct(product: Product): JSX.Element {
        return (
            <ContainerProduct key={product.id} onClick={() => this.handleDialogProduct(product)}>
                <RowProduct>
                    {product.img_url !== '' ? <StyledProductAvatar src={product.img_url} variant="square"></StyledProductAvatar> : <></>}
                    <ContainerSpaceRowProduct>
                        <div style={{ alignSelf: 'flex-start' }}>
                            <Typography variant="h6" gutterBottom style={{ color: '#000' }}>
                                {product.title}
                            </Typography>
                            <ProductDescription>
                                {product.description}
                            </ProductDescription>
                        </div>
                        <Typography variant="subtitle1" style={{ fontSize: '20px' }}>
                            {'R$ ' + product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 }).replace('.', ',')}
                        </Typography>
                    </ContainerSpaceRowProduct>
                </RowProduct>
            </ContainerProduct>
        )
    }

    handleDialogProduct(product: Product): void {
        this.model.selectedProduct = product
        this.model.openDialogProduct = true
    }

    dialogProduct(): JSX.Element {
        return (
            <Dialog open={this.model.openDialogProduct} onClose={() => this.model.openDialogProduct = false}>
                <DialogContent>
                    {this.model.selectedProduct?.img_url !== '' ?
                        <div style={{ position: 'relative' }}>
                            <StyledImage src={this.model.selectedProduct?.img_url} />
                            <BackgroundImage src={this.model.selectedProduct?.img_url} />
                        </div>
                        : <></>}

                    <Typography variant="h6" gutterBottom style={{ color: '#000' }}>
                        {this.model.selectedProduct?.title}
                    </Typography>
                    <ProductDescriptionDialog >
                        {this.model.selectedProduct?.description}
                    </ProductDescriptionDialog>
                    {this.model.selectedProduct?.optional_sections.map((section) => {
                        return this.optionalSection(section)
                    })}
                    {this.model.settings?.enterprise.observation_enabled ?
                        <>
                            <Divider light style={{ marginTop: '16px' }} />
                            <StyledTextField label='Observação' multiline rowsMax={3} rows={3} variant='filled' InputProps={{ classes: { underline: 'underline' }, disableUnderline: false }}>
                            </StyledTextField>
                        </>
                        : <></>}

                    <Divider light style={{ marginTop: '16px' }} />
                    <ContainerSpaceRow>
                        <NumberInput
                            label="Quantidade"
                            variant="filled"
                            margin="dense"
                            type="number"
                            value={1}
                            InputProps={{ inputProps: { min: 1 }, classes: { underline: 'underline' }, disableUnderline: false }} />

                        <StyledPrimaryButton style={{ width: '200px', minWidth: '200px', marginBottom: '16px', fontSize: '14px' }}>{`Adicionar • R$ ${this.model.selectedProduct?.price}`}</StyledPrimaryButton>
                    </ContainerSpaceRow>

                </DialogContent>

            </Dialog>
        )
    }

    optionalSection(optionalSection: OptionalSection): JSX.Element {
        return (
            <div key={optionalSection.id} >
                <Box width="100%" style={{ marginTop: '8px', background: '#fafafa' }} paddingLeft={1}>
                    <Row style={{ alignItems: 'flex-end' }}>
                        <Typography variant="h6" style={{ color: '#000' }}>
                            {optionalSection.name}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom style={{ marginLeft: '8px', fontSize: '12px' }}>
                            {`Selecione de ${optionalSection.min} até ${optionalSection.max} itens`}
                        </Typography>
                    </Row>

                </Box>

                {optionalSection.products?.map((product) => {
                    return this.optionalProduct(product)
                })}
            </div>
        )
    }

    optionalProduct(optionalProduct: Optional): JSX.Element {
        return (
            <MuiThemeProvider theme={this.theme}>
                <ContainerSpaceRowProduct key={optionalProduct.id} >
                    <Row style={{ alignSelf: 'flex-start' }}>
                        <Checkbox
                            color="primary"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                        <Typography variant="subtitle1" >
                            {optionalProduct.name}
                        </Typography>
                    </Row>
                    <Typography variant="subtitle1" style={{ fontSize: '14px' }}>
                        {'R$ ' + optionalProduct.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 }).replace('.', ',')}
                    </Typography>
                </ContainerSpaceRowProduct>
            </MuiThemeProvider>
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
            <SnackbarContainer onClick={() => this.model.openDialogCart = true} style={{ cursor: 'pointer' }}>
                <Row >
                    <IconButton color="inherit"  >
                        <ShopIcon />
                    </IconButton>
                    <Typography variant="subtitle1" style={{ marginLeft: '16px', color: '#fff' }}>
                        Meu Carrinho
                </Typography>
                </Row>
                <Typography variant="subtitle1" style={{ marginRight: '16px', color: '#fff' }}>
                    0 itens
                </Typography>

            </SnackbarContainer>
        </Snackbar>)
    }

}

export default OrderPage;