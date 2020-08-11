import { Component } from "react";
import React from "react";
import { Container, StyledTextField, StyledFab, ContainerProductSection, StyledFabSection, Section, ContainerSectionIcon, ContainerTitle, CardContainer, StyledAvatar, StyledDescription, ContainerCardRight, ContainerCardLeft } from "./styles";
import { ProductFragmentViewModel } from "./ProductFragmentViewModel";
import { InputAdornment, IconButton, Snackbar, Card, Typography } from "@material-ui/core";
import { Search, Add } from "@material-ui/icons";
import EmptyContent from "../../components/Empty/EmptyContent";
import { observer } from "mobx-react";
import ProductSectionForm from "./productSectionForm/ProductSectionForm";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Alert } from '@material-ui/lab';
import ProductForm from "./productForm/ProductForm";
import { ReactComponent as CopyIcon } from '../../assets/content_copy-24px.svg';
import { Product } from "../../../domain/entities/Product";

@observer
class ProductFragment extends Component {
    model = new ProductFragmentViewModel()

    state = {}

    render(): JSX.Element {
        return (<Container>
            {<Snackbar open={this.model.errorApi !== ''} autoHideDuration={4000} onClose={() => this.model.errorApi = ''}>
                <Alert severity="error">
                    {this.model.errorApi}
                </Alert>
            </Snackbar>}
            <StyledTextField
                label="Pesquisar"
                variant="outlined"
                type="text"
                value={this.model.search}
                onChange={(e) => {
                    this.model.search = e.target.value
                    this.handleChangeSearch()
                }
                }
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="search"
                                onClick={() => this.handleChangeSearch()}>
                                <Search />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
            {this.model.sections.length > 0 ?
                <ContainerProductSection>
                    {this.model.sections.map(section => {
                        return (
                            <Section key={section.id}>
                                <ContainerTitle>
                                    <h2>{section.name}</h2>
                                    <ContainerSectionIcon>
                                        <IconButton color="inherit" onClick={() => this.handleEditCategoryClick(section.id, section.name)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton color="inherit" onClick={() => this.model.deleteProductSection(section.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ContainerSectionIcon>
                                </ContainerTitle>
                                {section.products.length === 0 ? <small>Essa categoria ainda nāo possui produtos.</small>
                                    : section.products.map((product) => {
                                        return (<Card key={product.id} style={{ marginBottom: 16 }}>
                                            <CardContainer>
                                                <StyledAvatar src={product.img_url} />
                                                <ContainerCardLeft>
                                                    <Typography component="h5" variant="h5">
                                                        {product.title}
                                                    </Typography>
                                                    <StyledDescription variant="subtitle1" color="textSecondary">
                                                        {product.description}
                                                    </StyledDescription>
                                                </ContainerCardLeft>
                                                <ContainerCardRight>
                                                    <Typography color="textSecondary" variant="h5">
                                                        {('R$ ' + product.price).replace('.', ',')}
                                                    </Typography>
                                                </ContainerCardRight>
                                            </CardContainer>
                                            <ContainerSectionIcon>
                                                <IconButton color="inherit" onClick={() => this.handleCopyProduct(product)}>
                                                    <CopyIcon />
                                                </IconButton>
                                                <IconButton color="inherit" onClick={() => this.handleEditProduct(product)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton color="inherit" onClick={() => this.model.deleteProduct(product.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </ContainerSectionIcon>

                                        </Card>)
                                    })
                                }
                                <StyledFabSection onClick={() => this.handleNewProductClick(section.id)} ><Add /></StyledFabSection>
                            </Section>
                        )
                    })}
                </ContainerProductSection>
                : <EmptyContent title="Sem dados" description="Você ainda nāo possui categorias e produtos cadastrados" ></EmptyContent>}

            <StyledFab onClick={() => this.handleNewCategoryClick()} aria-label={''} variant="extended" classes={{ root: 'fab' }}><Add />Nova categoria</StyledFab>

            <ProductForm
                edit={this.model.isProductFormOpenedForEdit}
                open={this.model.dialogProductFormOpen}
                optionals={this.model.optionals}
                selectedOptionals={this.model.selectedOptionals}
                selectedProductSection={this.model.selectedProductSectionId}
                productSections={this.model.sections}
                loading={this.model.isProductFormLoading}
                image={this.model.productPreviewImg}
                title={this.model.productTitle}
                price={this.model.productPrice}
                description={this.model.productDescription}
                errorTitle={this.model.errorProductTitle}
                errorDescription={this.model.errorProductDescription}
                errorPrice={this.model.errorProductPrice}
                errorProductSection={this.model.errorProductSection}
                handleClose={(e) => this.handleCloseNewProductClick()}
                handleSave={(e) => this.handleSaveProductClick()}
                handleAvatarChange={(e) => this.handleProductAvatarChange(e)}
                handleTitleChange={(e) => this.handleProductTitleChange(e)}
                handlePriceChange={(e) => this.handlePriceChange(e)}
                handleOptionalChange={(e) => this.handleChangeMultiple(e)}
                handleProductSectionChange={(e) => this.handleChangeProductSection(e)}
                handleDescriptionChange={(e) => this.handleProductDescriptionChange(e)} />

            <ProductSectionForm
                edit={this.model.isProductSectionFormOpenedForEdit}
                error={this.model.errorProductSectionName}
                value={this.model.productSectionName}
                handleNameChange={(e) => this.handleFormCategoryNameChange(e)}
                loading={this.model.isProductSectionFormLoading}
                open={this.model.dialogProductSectionFormOpen}
                handleClose={(e) => this.handleCloseNewCategoryClick()}
                handleSave={(e) => this.handleSaveNewCategoryClick()} />
        </Container>);
    }

    handleEditProduct(product: Product): void {
        this.model.productEditId = product.id
        this.model.productTitle = product.title
        this.model.productDescription = product.description
        this.model.productPrice = product.price.toString()
        this.model.selectedProductSectionId = product.product_section_id
        this.model.productPreviewImg = product.img_url

        const productOptionalSections = []
        for(const i of product.optional_sections){
            productOptionalSections.push(i.id)
        }

        this.model.selectedOptionals = productOptionalSections

        this.model.isProductFormOpenedForEdit = true
        this.model.dialogProductFormOpen = true
    }

    async handleCopyProduct(product: Product): Promise<void> {
        this.model.productTitle = product.title
        this.model.productDescription = product.description
        this.model.productPrice = product.price.toString()
        this.model.selectedProductSectionId = product.product_section_id
        this.model.productPreviewImg = ''

        const productOptionalSections = []
        for(const i of product.optional_sections){
            productOptionalSections.push(i.id)
        }

        this.model.selectedOptionals = productOptionalSections

        this.model.dialogProductFormOpen = true
    }

    handleProductAvatarChange(event: any): void {
        if (event.target.files && event.target.files[0]) {
            this.model.productPreviewImg = URL.createObjectURL(event.target.files[0])
            this.model.setBase64Image(event.target.files[0])
        }
    }

    handleChangeProductSection(e: any): void {
        this.model.selectedProductSectionId = Number(e.target.value)
    }

    handleNewProductClick(sectionId: number): void {
        this.model.selectedProductSectionId = sectionId
        this.model.isProductFormOpenedForEdit = false
        this.model.dialogProductFormOpen = true
    }

    async handleSaveProductClick(): Promise<void> {
        if (this.model.isProductFormOpenedForEdit) {
            await this.model.updateProduct()
        } else {
            await this.model.saveProduct()
        }

        this.model.readProductSection()
    }

    handleCloseNewProductClick(): void {
        this.model.dialogProductFormOpen = false
        this.model.isProductFormOpenedForEdit = false
        this.model.productTitle = ''
        this.model.productDescription = ''
        this.model.productPrice = ''
        this.model.productImg = ''
        this.model.selectedOptionals = []
    }

    handleProductTitleChange(event: any): void {
        this.model.productTitle = event.target.value
    }

    handleProductDescriptionChange(event: any): void {
        this.model.productDescription = event.target.value
    }

    handlePriceChange(event: any): void {

        const valor = event.target.value;
        console.log(valor)
        this.model.productPrice = valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    }

    handleChangeMultiple = (event: any) => {
        this.model.selectedOptionals = event.target.value as number[]
    };

    handleNewCategoryClick(): void {
        this.model.isProductSectionFormOpenedForEdit = false
        this.model.dialogProductSectionFormOpen = true

    }

    handleEditCategoryClick(editCategoryId: number, oldName: string): void {
        this.model.productSectionName = oldName
        this.model.editProductSectionId = editCategoryId
        this.model.isProductSectionFormOpenedForEdit = true
        this.model.dialogProductSectionFormOpen = true
    }

    handleCloseNewCategoryClick(): void {
        this.model.dialogProductSectionFormOpen = false
        this.model.isProductSectionFormOpenedForEdit = false
        this.model.productSectionName = ''
    }

    async handleSaveNewCategoryClick(): Promise<void> {
        if (this.model.isProductSectionFormOpenedForEdit) {
            await this.model.updateProductSection()
        } else {
            await this.model.saveProductSection()
        }

        this.model.readProductSection()
    }

    handleFormCategoryNameChange(event: any): void {
        this.model.productSectionName = event.target.value
    }

    handleChangeSearch(): void {
        this.model.readProductSection()
    }

    componentDidMount(): void {
        this.model.readProductSection()
        this.model.readOptionalSection()
    }
}

export default ProductFragment;