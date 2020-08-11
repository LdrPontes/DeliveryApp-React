import { Component } from "react";
import React from "react";
import { Container, StyledTextField, StyledFab, ContainerProductSection, StyledFabSection, Section, ContainerSectionIcon, ContainerTitle } from "./styles";
import { ProductFragmentViewModel } from "./ProductFragmentViewModel";
import { InputAdornment, IconButton, Snackbar } from "@material-ui/core";
import { Search, Add } from "@material-ui/icons";
import EmptyContent from "../../components/Empty/EmptyContent";
import { observer } from "mobx-react";
import ProductSectionForm from "./productSectionForm/ProductSectionForm";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Alert } from '@material-ui/lab';
import ProductForm from "./productForm/ProductForm";

@observer
class ProductFragment extends Component {
    model = new ProductFragmentViewModel()

    state = {}

    handleNewProductClick(sectionId: number): void {
        this.model.dialogProductFormOpen = true
        this.model.openedProductSectionId = sectionId
    }

    handleSaveProductClick(): void {
        this.model.dialogProductFormOpen = false
    }

    handleCloseNewProductClick(): void {
        this.model.dialogProductFormOpen = false
        this.model.isProductFormOpenedForEdit = false
        this.model.productTitle = ''
        this.model.productDescription = ''
        this.model.productPrice = ''
        this.model.productImg = ''
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
        this.model.productPrice = valor.toLocaleString('pt-BR', { minimumFractionDigits: 2});
    }

    handleChangeMultiple = (event: any) => {
        console.log('Chamou')
        this.model.selectedOptionals = event.target.value as string[]
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
    }

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
                                {section.products.length === 0 ? <small>Essa categoria ainda nāo possui produtos.</small> : <div></div>}
                                <StyledFabSection onClick={() => this.handleNewProductClick(section.id)} ><Add /></StyledFabSection>
                            </Section>
                        )
                    })}
                </ContainerProductSection>
                : <EmptyContent title="Sem dados" description="Você ainda nāo possui categorias e produtos cadastrados" ></EmptyContent>}

            <StyledFab onClick={() => this.handleNewCategoryClick()} aria-label={''} variant="extended" classes={{ root: 'fab' }}><Add />Nova categoria</StyledFab>

            <ProductForm open={this.model.dialogProductFormOpen}
                optionals={this.model.optionals}
                selectedOptionals={this.model.selectedOptionals}
                productSections={this.model.sections}
                loading={this.model.isProductFormLoading}
                title={this.model.productTitle}
                price={this.model.productPrice}
                description={this.model.productDescription}
                handleClose={(e) => this.handleCloseNewProductClick()}
                handleSave={(e) => this.handleSaveProductClick()}
                handleAvatarChange={(e) => { console.log('Change') }}
                handleTitleChange={(e) => this.handleProductTitleChange(e)}
                handlePriceChange={(e) => this.handlePriceChange(e)}
                handleOptionalChange={(e) => this.handleChangeMultiple(e)}
                handleProductSectionChange={(e) => { console.log('Change') }}
                handleDescriptionChange={(e) => this.handleProductDescriptionChange(e)} />

            <ProductSectionForm
                isEdit={this.model.isProductSectionFormOpenedForEdit}
                error={this.model.errorProductSectionName}
                value={this.model.productSectionName}
                handleNameChange={(e) => this.handleFormCategoryNameChange(e)}
                loading={this.model.isProductSectionFormLoading}
                open={this.model.dialogProductSectionFormOpen}
                handleClose={(e) => this.handleCloseNewCategoryClick()}
                handleSave={(e) => this.handleSaveNewCategoryClick()} />
        </Container>);
    }
}

export default ProductFragment;