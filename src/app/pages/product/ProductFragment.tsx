import { Component } from "react";
import React from "react";
import { Container, StyledTextField, StyledFab, ContainerProductSection, StyledFabSection, Section, ContainerSectionIcon, ContainerTitle } from "./styles";
import { ProductFragmentViewModel } from "./ProductFragmentViewModel";
import { InputAdornment, IconButton, Fab } from "@material-ui/core";
import { Search, Add } from "@material-ui/icons";
import EmptyContent from "../../components/Empty/EmptyContent";
import { observer } from "mobx-react";
import ProductSectionForm from "./productSectionForm/ProductSectionForm";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

@observer
class ProductFragment extends Component {
    model = new ProductFragmentViewModel()

    state = {}

    handleNewCategoryClick(): void {
        this.model.dialogCategoryOpen = true
    }

    handleCloseNewCategoryClick(): void {
        this.model.dialogCategoryOpen = false
    }

    async handleSaveNewCategoryClick(): Promise<void> {
        await this.model.saveProductSection()
        this.model.readProductSection()
    }

    handleFormCategoryNameChange(event: any): void {
        this.model.newCategoryName = event.target.value
    }

    handleChangeSearch(): void {
        this.model.readProductSection()
    }

    componentDidMount(): void {
        this.model.readProductSection()
    }

    render(): JSX.Element {
        return (<Container>
            <StyledTextField
                label="Pesquisar"
                variant="outlined"
                type="text"
                value={this.model.search}
                onChange={(e) => this.model.search = e.target.value}
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
                                        <IconButton color="inherit">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton color="inherit">
                                            <DeleteIcon />
                                        </IconButton>
                                    </ContainerSectionIcon>
                                </ContainerTitle>
                                {section.products.length == 0 ? <small>Essa categoria ainda nāo possui produtos.</small> : <div></div>}
                                <StyledFabSection onClick={() => this.handleNewCategoryClick()} ><Add /></StyledFabSection>
                            </Section>
                        )
                    })}
                </ContainerProductSection>
                : <EmptyContent title="Sem dados" description="Você ainda nāo possui categorias e produtos cadastrados" ></EmptyContent>}

            <StyledFab onClick={() => this.handleNewCategoryClick()} aria-label={''} variant="extended" classes={{ root: 'fab' }}><Add />Nova categoria</StyledFab>
            <ProductSectionForm error={this.model.errorProductSectionName} value={this.model.newCategoryName} handleNameChange={(e) => this.handleFormCategoryNameChange(e)} loading={this.model.isFormProductSectionLoading} open={this.model.dialogCategoryOpen} handleClose={(e) => this.handleCloseNewCategoryClick()} handleSave={(e) => this.handleSaveNewCategoryClick()}></ProductSectionForm>
        </Container>);
    }
}

export default ProductFragment;