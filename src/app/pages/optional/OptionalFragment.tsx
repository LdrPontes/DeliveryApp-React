import { Component } from "react";
import React from "react";
import { Container, StyledTextField, StyledFab, ContainerCardRight, ContainerOptionalSection, Section, ContainerTitle, ContainerSectionIcon, StyledFabSection, ContainerCardLeft, CardContainer } from "./styles";
import { InputAdornment, IconButton, Snackbar, Typography, Card } from "@material-ui/core";
import { Search, Add } from "@material-ui/icons";
import { OptionalFragmentViewModel } from "./OptionalFragmentViewModel";
import { observer } from "mobx-react";
import EmptyContent from "../../components/Empty/EmptyContent";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Alert } from "@material-ui/lab";
import OptionalSectionForm from "./optionalSectionForm/OptionalSectionForm";
import { OptionalSection } from "../../../domain/entities/OptionalSection";
import OptionalForm from "./optionalForm/OptionalForm";
import { Optional } from "../../../domain/entities/Optional";

@observer
class OptionalFragment extends Component {

    model = new OptionalFragmentViewModel()

    render(): JSX.Element {
        return (<Container>
            <Snackbar open={this.model.errorApi !== ''} autoHideDuration={4000} onClose={() => this.model.errorApi = ''}>
                <Alert severity="error">
                    {this.model.errorApi}
                </Alert>
            </Snackbar>
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
            {this.model.sections.length > 0 ? <ContainerOptionalSection>
                {this.model.sections.map(section => {
                    return (
                        <Section key={section.id}>
                            <ContainerTitle>
                                <h2>{section.name}</h2>
                                <ContainerSectionIcon>
                                    <IconButton color="inherit" onClick={() => this.handleEditOptionalSection(section)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="inherit" onClick={() => this.handleDeleteOptionalSection(section.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ContainerSectionIcon>
                            </ContainerTitle>
                            {section.products?.length === 0 ? <small>Essa seçāo ainda nāo possui produtos opcionais.</small>
                                : section.products?.map((product) => {
                                    return (<Card key={product.id} style={{ marginBottom: 8 }}>
                                        <CardContainer >
                                            <ContainerCardLeft>
                                                <Typography component="h6" variant="h6">
                                                    <li>{product.name}</li>
                                                </Typography>
                                            </ContainerCardLeft>
                                            <ContainerCardRight>
                                                <Typography color="textSecondary" variant="h6">
                                                    {('R$ ' + product.price.toFixed(2)).replace('.', ',')}
                                                </Typography>
                                            </ContainerCardRight>
                                        </CardContainer>
                                        <ContainerSectionIcon>
                                            <IconButton color="inherit" onClick={() => this.handleEditOptional(product)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton color="inherit" onClick={() => this.handleDeleteOptional(product.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </ContainerSectionIcon>
                                    </Card>)
                                })}
                            <StyledFabSection onClick={() => this.handleAddOptional(section.id)}><Add /></StyledFabSection>
                        </Section>
                    )
                })}
            </ContainerOptionalSection>
                : <EmptyContent title="Sem dados" description="Você ainda nāo possui opcionais cadastrados" ></EmptyContent>}

            <OptionalSectionForm
                errorName={this.model.sectionErrorName}
                errorMin={this.model.sectionErrorMin}
                edit={this.model.optionalSectionFormEdit}
                loading={this.model.optionalSectionFormLoading}
                name={this.model.sectionName}
                min={this.model.sectionMin}
                max={this.model.sectionMax}
                open={this.model.optionalSectionFormOpen}
                handleClose={(e) => this.model.optionalSectionFormOpen = false}
                handleSave={(e) => this.handleSaveOptionalSection()}
                handleNameChange={(e: any) => this.model.sectionName = e.target.value}
                handleMinChange={(e: any) => this.model.sectionMin = e.target.value}
                handleMaxChange={(e: any) => this.model.sectionMax = e.target.value}
            />

            <OptionalForm
                errorName={this.model.optionalErrorName}
                errorPrice={this.model.optionalErrorPrice}
                edit={this.model.optionalFormEdit}
                loading={this.model.optionalFormLoading}
                name={this.model.optionalName}
                price={this.model.optionalPrice}
                open={this.model.optionalFormOpen}
                handleClose={(e) => this.model.optionalFormOpen = false}
                handleSave={(e) => this.handleSaveOptional()}
                handleNameChange={(e: any) => this.model.optionalName = e.target.value}
                handlePriceChange={(e: any) => this.model.optionalPrice = e.target.value}

            />
            <StyledFab aria-label={''} onClick={() => { this.model.optionalSectionFormOpen = true; this.model.optionalSectionFormEdit = false }} variant="extended" classes={{ root: 'fab' }}><Add />Novo opicional</StyledFab>

        </Container>);
    }


    handleEditOptional(optional: Optional): void {
        this.model.optionalEditId = optional.id
        this.model.optionalName = optional.name
        this.model.optionalPrice = optional.price.toFixed(2)
    
        this.model.optionalFormEdit = true
        this.model.optionalFormOpen = true
    }

    async handleDeleteOptional(id: number): Promise<void> {
        await this.model.deleteOptional(id)

        this.model.readOptionalSection()
    }

    async handleSaveOptional(): Promise<void> {
        if (this.model.optionalFormEdit) {
            await this.model.updateOptional()
        } else {
            await this.model.saveOptional()
        }

        this.model.readOptionalSection()
    }

    handleAddOptional(sectionId: number): void {
        this.model.optionalSectionId = sectionId
        this.model.optionalFormEdit = false
        this.model.optionalFormOpen = true
    }


    handleEditOptionalSection(section: OptionalSection): void {
        this.model.optionalSectionFormEdit = true
        this.model.sectionName = section.name
        this.model.sectionMin = section.min.toString()
        this.model.sectionMax = section.max.toString()
        this.model.sectionEditId = section.id

        this.model.optionalSectionFormOpen = true
    }

    async handleDeleteOptionalSection(id: number): Promise<void> {
        await this.model.deleteOptionalSection(id)

        this.model.readOptionalSection()
    }

    async handleSaveOptionalSection(): Promise<void> {
        if (this.model.optionalSectionFormEdit) {
            await this.model.updateOptionalSection()
        } else {
            await this.model.saveOptionalSection()
        }

        this.model.readOptionalSection()
    }

    handleChangeSearch(): void {
        this.model.readOptionalSection()
    }


    componentDidMount(): void {
        this.model.readOptionalSection()
    }
}

export default OptionalFragment;