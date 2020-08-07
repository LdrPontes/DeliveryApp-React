import { Component } from "react";
import React from "react";
import { Container, StyledTextField, StyledPrimaryButton, StyledFab } from "./styles";
import { ProductFragmentViewModel } from "./ProductFragmentViewModel";
import { InputAdornment, IconButton } from "@material-ui/core";
import { Search, Add } from "@material-ui/icons";
import EmptyContent from "../../components/Empty/EmptyContent";
import { observer } from "mobx-react";
import ProductSectionForm from "./productSectionForm/ProductSectionForm";

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
                                aria-label="search">
                                <Search />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
            {this.model.sections.length > 0 ?
                <>
                    {this.model.sections.map(section => {
                        return (
                            <div key={section.id}>
                                <h1>{section.name}</h1>
                            </div>
                        )
                    })}
                </>
                : <EmptyContent title="Sem dados" description="Você ainda nāo possui categorias e produtos cadastrados" ></EmptyContent>}

            <StyledFab onClick={() => this.handleNewCategoryClick()} aria-label={''} variant="extended" classes={{root: 'fab'}}><Add />Nova categoria</StyledFab>
            <ProductSectionForm error={this.model.errorProductSectionName} value={this.model.newCategoryName} handleNameChange={(e) => this.handleFormCategoryNameChange(e)} loading={this.model.isFormProductSectionLoading} open={this.model.dialogCategoryOpen} handleClose={(e) => this.handleCloseNewCategoryClick()} handleSave={(e) => this.handleSaveNewCategoryClick()}></ProductSectionForm>
        </Container>);
    }
}

export default ProductFragment;