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
import DeleteIcon from '@material-ui/icons/Delete';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputMask from 'react-input-mask';

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
                {!this.model.openDialogProduct && !this.model.openDialogCart ? this.snackbarShopCart() : <></>}
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
                        <Typography variant="subtitle1" style={{ fontSize: '18px', width: '150' }}>
                            {"R$ " + product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </Typography>
                    </ContainerSpaceRowProduct>
                </RowProduct>
            </ContainerProduct>
        )
    }

    handleDialogProduct(product: Product): void {
        this.model.selectedProduct = product
        this.model.setDefaultProductValues()
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

                            <StyledTextField
                                value={this.model.observation}
                                onChange={(e) => this.model.observation = e.target.value}
                                helperText={`${this.model.lengthObservation} caracteres restantes`}
                                inputProps={{ maxLength: 144 }}
                                label='Observação'
                                multiline
                                rowsMax={3}
                                rows={3}
                                variant='filled'
                                InputProps={{ classes: { underline: 'underline' }, disableUnderline: false }}>

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
                            error={this.model.errorQuantity !== ''}
                            helperText={this.model.errorQuantity}
                            value={this.model.quantity}
                            onChange={(e) => this.handleChangeQuantity(e)}
                            InputProps={{ inputProps: { min: 1 }, classes: { underline: 'underline' }, disableUnderline: false }} />

                        <StyledPrimaryButton onClick={() => this.model.addProductToCart()} style={{ width: '200px', minWidth: '200px', marginBottom: '16px', fontSize: '14px' }}>
                            {`Adicionar • R$ ${(this.model.productPrice + this.model.totalPrice).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                        </StyledPrimaryButton>
                    </ContainerSpaceRow>

                </DialogContent>

            </Dialog>
        )
    }

    handleChangeQuantity(e: any): void {
        this.model.quantity = e.target.value
    }


    handleDialogCart(): void {
        this.model.openDialogCart = true
        this.model.setDefaultCartErrorValues()
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
                {this.model.errorOptional !== undefined && this.model.errorOptional.id === optionalSection.id ?
                    <Typography variant="subtitle1" gutterBottom style={{ marginLeft: '8px', fontSize: '12px', color: "#d50000" }}>
                        {this.model.errorOptional.msg}
                    </Typography>
                    : <></>
                }

                {optionalSection.products?.map((product) => {
                    return this.optionalProduct(optionalSection, product)
                })}
            </div>
        )
    }

    optionalProduct(section: OptionalSection, optionalProduct: Optional): JSX.Element {
        return (
            <MuiThemeProvider theme={this.theme} key={optionalProduct.id} >
                <ContainerSpaceRowProduct >
                    <Row style={{ alignSelf: 'flex-start' }}>
                        <Checkbox
                            checked={this.model.isOptionalSelected(optionalProduct.id)}
                            onChange={(e) => this.model.handleSelectOptional(section.max, section.min, section.id, optionalProduct)}
                            color="primary"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                        <Typography variant="subtitle1" >
                            {optionalProduct.name}
                        </Typography>
                    </Row>
                    <Typography variant="subtitle1" style={{ fontSize: '14px' }}>
                        {'R$ ' + optionalProduct.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </Typography>
                </ContainerSpaceRowProduct>
            </MuiThemeProvider>
        )
    }

    dialogShopCart(): JSX.Element {
        return (
            <Dialog fullWidth open={this.model.openDialogCart} onClose={() => this.model.openDialogCart = false}>
                <DialogContent>
                    <Box style={{ marginTop: '8px', background: '#fafafa' }} paddingLeft={1}>
                        <Typography variant="h6" style={{ color: '#000' }}>
                            Itens
                        </Typography>
                    </Box>
                    {this.model.errorProducts !== '' ?
                        <Typography variant="subtitle1" gutterBottom style={{ marginLeft: '8px', fontSize: '12px', color: "#d50000" }}>
                            {this.model.errorProducts}
                        </Typography>
                        : <></>
                    }
                    {this.model.cart.products.length > 0 ? this.model.cart.products.map((product, idx) => {
                        return (
                            <Row key={idx}>

                                <div style={{ width: '100%', marginLeft: '16px', marginBottom: '8px' }}>
                                    <ContainerSpaceRowProduct  >
                                        <Typography variant="h6" style={{ fontSize: '15px' }}>
                                            {product.quantity + "x " + product.name}
                                        </Typography>
                                        <div style={{ minWidth: '90px', paddingLeft: '16px' }}>
                                            <Typography variant="subtitle1" style={{ fontSize: '14px' }}>
                                                {'R$ ' + product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                            </Typography>
                                        </div>

                                    </ContainerSpaceRowProduct>
                                    {product.optionals.map((optional, idx) => {
                                        return (
                                            <ContainerSpaceRowProduct key={idx} >
                                                <Typography variant="subtitle2" style={{ fontSize: '14px' }}>
                                                    {'• ' + optional.name}
                                                </Typography>
                                                <div style={{ minWidth: '90px', paddingLeft: '16px' }}>
                                                    <Typography variant="subtitle2" style={{ fontSize: '14px' }}>
                                                        {'R$ ' + optional.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                                    </Typography>
                                                </div>

                                            </ContainerSpaceRowProduct>)
                                    })}
                                    {product.observation !== undefined && product.observation !== ''
                                        ?
                                        <Typography variant="subtitle1" style={{ wordBreak: 'break-word', fontSize: '14px', color: '#757575' }}>
                                            {'- ' + product.observation}
                                        </Typography>
                                        :
                                        <></>
                                    }

                                </div>
                                <IconButton style={{ alignSelf: 'flex-start', marginTop: '16px', height: '24px', width: '24px' }} onClick={() => this.model.deleteProductCart(idx)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Row>

                        )
                    }) :
                        <Typography variant="subtitle1" style={{ marginLeft: '8px', fontSize: '14px', color: '#757575' }}>
                            O carrinho está vazio
                        </Typography>
                    }

                    <ContainerSpaceRowProduct style={{ marginTop: '8px' }}>
                        <Typography variant="h6" style={{ marginLeft: '8px', color: '#000' }}>
                            TOTAL
                        </Typography>
                        <Typography variant="subtitle2" style={{ fontSize: '16px' }}>
                            {"R$ " + this.model.cart.totalCartPrice().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </Typography>
                    </ContainerSpaceRowProduct>

                    <Box style={{ marginTop: '16px', background: '#fafafa' }} paddingLeft={1}>
                        <Typography variant="h6" style={{ color: '#000' }}>
                            Pedido
                        </Typography>
                    </Box>
                    <StyledTextField
                        variant="filled"
                        label="Nome *"
                        value={this.model.clientName}
                        onChange={(e) => this.model.clientName = e.target.value}
                        error={this.model.errorClientName !== ''}
                        helperText={this.model.errorClientName}
                        margin="dense"
                        type="text"
                        fullWidth
                        InputProps={{ classes: { underline: 'underline' }, disableUnderline: false }}>

                    </StyledTextField>
                    {this.model.errorTelephone !== '' || this.model.errorTelephone === '' ?
                        <InputMask mask="(99) 9999-99999" value={this.model.telephone} maskChar=" " onChange={(e) => this.model.telephone = e.target.value}>
                            {() => <StyledTextField
                                error={this.model.errorTelephone !== ''}
                                helperText={this.model.errorTelephone}
                                variant="filled"
                                label="Telefone *"
                                margin="dense"
                                InputProps={{ classes: { underline: 'underline' }, disableUnderline: false }}
                                type="tel" />}
                        </InputMask> : <></>}

                    {this.model.errorCpf !== '' || this.model.errorCpf === '' ?
                        this.model.settings?.enterprise.ask_cpf ?
                            <InputMask mask={"999.999.999-99"} value={this.model.cpf} maskChar=" " onChange={(e) => { this.model.cpf = e.target.value }}>
                                {() => <StyledTextField
                                    label={'CPF na nota?'}
                                    variant="filled"
                                    margin="dense"
                                    error={this.model.errorCpf !== ''}
                                    helperText={this.model.errorCpf}
                                    InputProps={{ classes: { underline: 'underline' }, disableUnderline: false }}
                                    type="text" ></StyledTextField>}
                            </InputMask>
                            : <></>
                        : <></>
                    }
                    {
                    }


                    <Box style={{ marginTop: '16px', background: '#fafafa' }} paddingLeft={1}>
                        <Typography variant="h6" style={{ color: '#000' }}>
                            Entrega
                        </Typography>
                    </Box>
                    {this.model.errorDelivery !== '' ?
                        <Typography variant="subtitle1" gutterBottom style={{ marginLeft: '8px', fontSize: '12px', color: "#d50000" }}>
                            {this.model.errorDelivery}
                        </Typography>
                        : <></>
                    }
                    <MuiThemeProvider theme={this.theme}>
                        <FormControl component="fieldset" style={{ marginLeft: '8px' }} >
                            <RadioGroup
                                value={this.model.selectedDeliveryType.toString()}
                                onChange={(e) => { this.model.selectedDeliveryType = Number(e.target.value) }}
                            >
                                {this.model.settings?.delivery.pickup_on_site ? <FormControlLabel value="0" control={<Radio color="primary" />} label="Retirar no local" /> : <></>}
                                <FormControlLabel value="1" control={<Radio color="primary" />} label="Delivery" />
                            </RadioGroup>
                        </FormControl>
                    </MuiThemeProvider>

                    {(this.model.errorCep === '' || this.model.errorCep !== '') && this.model.selectedDeliveryType === 1 ? //Gambiarra para o Mobx atualizar caso tenha erro
                        <>
                            <Typography variant="subtitle1" gutterBottom style={{ marginLeft: '8px', fontSize: '18px', color: "#000" }}>
                                {this.model.settings?.delivery.delivery_fee_type === 0 ? 'Taxa de entrega à combinar': 'Taxa de entrega: R$ ' + this.model.settings?.delivery.delivery_fee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </Typography>
                            <ContainerSpaceRow>
                                <InputMask mask='99999-999' value={this.model.cep} maskChar=" " onChange={(e) => this.model.handleAddressByCep(e)} >
                                    {() => <StyledTextField
                                        label="CEP"
                                        error={this.model.errorCep !== ''}
                                        helperText={this.model.errorCep}
                                        variant="filled"
                                        margin="dense"
                                        style={{ marginRight: '16px' }}
                                        InputProps={{ classes: { underline: 'underline' }, disableUnderline: false }}
                                        type="text" />}
                                </InputMask>
                                <NumberInput
                                    label="Número"
                                    variant="filled"
                                    type="number"
                                    margin="dense"
                                    error={this.model.errorNumber !== ''}
                                    helperText={this.model.errorNumber}
                                    InputProps={{ inputProps: { min: 0 }, classes: { underline: 'underline' }, disableUnderline: false }}
                                    value={this.model.number}
                                    onChange={(e) => this.model.number = e.target.value} />
                            </ContainerSpaceRow>

                            <ContainerSpaceRow>
                                <StyledTextField
                                    value={this.model.address}
                                    disabled
                                    label="Endereço"
                                    variant="filled"
                                    type="text"
                                    margin="dense"
                                    style={{ maxWidth: '268px' }}
                                    InputProps={{ classes: { underline: 'underline' }, disableUnderline: false }}
                                />

                                <StyledTextField
                                    value={this.model.complement}
                                    label="Complemento"
                                    variant="filled"
                                    type="text"
                                    margin="dense"
                                    onChange={(e) => this.model.complement = e.target.value}
                                    style={{ maxWidth: '268px' }}
                                    InputProps={{ classes: { underline: 'underline' }, disableUnderline: false }}
                                />

                            </ContainerSpaceRow></>

                        : <></>
                    }
                    <Box style={{ marginTop: '16px', background: '#fafafa' }} paddingLeft={1}>
                        <Typography variant="h6" style={{ color: '#000' }}>
                            Pagamento
                        </Typography>
                    </Box>
                    {this.model.errorPayment !== '' ?
                        <Typography variant="subtitle1" gutterBottom style={{ marginLeft: '8px', fontSize: '12px', color: "#d50000" }}>
                            {this.model.errorPayment}
                        </Typography>
                        : <></>
                    }
                    <MuiThemeProvider theme={this.theme}>
                        <FormControl component="fieldset" style={{ marginLeft: '8px' }}>
                            <RadioGroup value={this.model.selectedPaymentType.toString()} onChange={(e) => this.model.selectedPaymentType = Number(e.target.value)}>
                                {this.model.settings?.enterprise.accept_money ? <FormControlLabel value="0" control={<Radio color="primary" />} label="Dinheiro" /> : <></>}
                                {this.model.settings?.enterprise.accept_debit_card ? <FormControlLabel value="1" control={<Radio color="primary" />} label="Débito" /> : <></>}
                                {this.model.settings?.enterprise.accept_credit_card ? <FormControlLabel value="2" control={<Radio color="primary" />} label="Crédito" /> : <></>}
                            </RadioGroup>
                        </FormControl>
                    </MuiThemeProvider>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <StyledPrimaryButton onClick={() => this.handleSendOrder()} style={{ maxWidth: '400px' }}>Enviar Pedido</StyledPrimaryButton>
                    </div>

                </DialogContent>
            </Dialog>
        )
    }

    snackbarShopCart(): JSX.Element {
        return (
            <Snackbar open={true}>
                <SnackbarContainer onClick={() => this.handleDialogCart()} style={{ cursor: 'pointer' }}>
                    <Row >
                        <IconButton color="inherit"  >
                            <ShopIcon />
                        </IconButton>
                        <Typography variant="subtitle1" style={{ marginLeft: '16px', color: '#fff' }}>
                            Meu Carrinho
                </Typography>
                    </Row>
                    <Typography variant="subtitle1" style={{ marginRight: '16px', color: '#fff' }}>
                        {this.model.cart.products.length + (this.model.cart.products.length === 1 ? ' item' : ' itens')}
                    </Typography>

                </SnackbarContainer>
            </Snackbar>
        )
    }

    handleSendOrder(): void {
        const url = this.model.sendOrderToEnterpriseByWhatsapp()
        if(url !== '') {
            window.open(url, '_blank');
        }
    }

}

export default OrderPage;