import React, { ChangeEventHandler } from 'react';
import { Dialog, DialogContent, DialogActions, Select, InputLabel, createMuiTheme, MuiThemeProvider, MenuItem, Checkbox, ListItemText } from '@material-ui/core';
import { StyledTextField, StyledFormControl, StyledCircularProgressPrimary } from '../../../global/globalStyles';
import { StyledDialogButton } from '../productSectionForm/styles';
import { Title, RowContainer, NumberInput } from './styles';
import { ProductSection } from '../../../../domain/entities/ProductSection';
import CurrencyInput from '../../../components/CurrencyInput/CurrencyInput';
import { OptionalSection } from '../../../../domain/entities/OptionalSection';
import AvatarInput from '../../../components/AvatarInput/AvatarInput';

type ProductFormProps = {
    open: boolean,
    edit: boolean,
    handleClose: ChangeEventHandler,
    handleSave: ChangeEventHandler,
    handleTitleChange: ChangeEventHandler,
    handleDescriptionChange: ChangeEventHandler,
    handleAvatarChange: ChangeEventHandler,
    handlePriceChange: ChangeEventHandler,
    handleOptionalChange: ChangeEventHandler,
    handleProductSectionChange: ChangeEventHandler,
    image: string,
    title: string,
    description: string,
    price: string,
    optionals: OptionalSection[],
    selectedOptionals: number[],
    selectedProductSection: number,
    productSections: ProductSection[],
    loading: boolean,
    errorTitle?: string,
    errorDescription?: string,
    errorProductSection?: string,
    errorPrice?: string,
}


export default function ProductForm(props: ProductFormProps): JSX.Element {
    const theme = createMuiTheme({
        palette: {
            primary: { 500: '#880e4f' }
        },
    });


    function handleCloseClick(event: any): void {
        props.handleClose(event)
    }

    function handleSaveClick(event: any): void {
        props.handleSave(event)
    }

    function handleChangeOptional(event: any): void {
        props.handleOptionalChange(event)
    }

    function handlePriceChange(event: any): void {
        props.handlePriceChange(event)
    }

    function handleProductSectionChange(event: any): void {
        props.handleProductSectionChange(event)
    }

    function handleAvatarChange(event: any): void {
        props.handleAvatarChange(event)
    }

    function renderValueOptionalsSelected(ids: number[]): string[] {
        const result: string[] = []
        for (const i of ids) {
            for (const j of props.optionals) {
                if (i === j.id) {
                    result.push(j.name)
                }
            }
        }

        return result
    }

    return (<div>
        <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
            <Title>Novo produto</Title>
            <DialogContent>
                <AvatarInput variant="square" preview={props.image} handlerImageChange={handleAvatarChange}></AvatarInput>
                <StyledTextField
                    error={props.errorTitle !== undefined && props.errorTitle !== ''}
                    helperText={props.errorTitle}
                    autoFocus
                    variant="filled"
                    id="name"
                    label="Nome"
                    type="text"
                    fullWidth
                    InputProps={{ classes: { underline: 'underline' }, disableUnderline: false }}
                    value={props.title}
                    onChange={props.handleTitleChange}
                />
                <StyledTextField
                    error={props.errorDescription !== undefined && props.errorDescription !== ''}
                    helperText={props.errorDescription}
                    variant="filled"
                    id="name"
                    label="Descrição"
                    multiline
                    rowsMax={4}
                    type="text"
                    fullWidth
                    InputProps={{ classes: { underline: 'underline' }, disableUnderline: false }}
                    value={props.description}
                    onChange={props.handleDescriptionChange}
                />
                <MuiThemeProvider theme={theme}>
                    <StyledFormControl variant="filled"
                        error={props.errorProductSection !== undefined && props.errorProductSection !== ''}>
                        <InputLabel>Categoria</InputLabel>
                        <Select
                            label="Categoria"
                            value={props.selectedProductSection || ''}
                            onChange={handleProductSectionChange}>
                            {props.productSections.map(section => {
                                return (<MenuItem key={section.id} value={section.id}>{section.name}</MenuItem>);
                            })}
                        </Select>
                    </StyledFormControl>
                </MuiThemeProvider>
                <RowContainer>
                    <StyledFormControl variant="filled" >
                        <InputLabel>Opcionais</InputLabel>
                        <Select
                            multiple
                            label="Opcionais"
                            value={props.selectedOptionals}
                            onChange={handleChangeOptional}
                            renderValue={(selected) => (renderValueOptionalsSelected(selected as number[])).join(', ')}>
                            {props.optionals.map((optionalSection: OptionalSection) => (
                                <MenuItem key={optionalSection.id} value={optionalSection.id}>
                                    <Checkbox checked={props.selectedOptionals.findIndex(i => i === optionalSection.id) > -1} />
                                    <ListItemText primary={optionalSection.name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </StyledFormControl>
                    <NumberInput
                        error={props.errorPrice !== undefined && props.errorPrice !== ''}
                        helperText={props.errorPrice}
                        label="Preço"
                        variant="filled"
                        onChange={(e) => handlePriceChange(e)}
                        value={props.price}
                        InputProps={{ inputComponent: CurrencyInput as any }}
                    />
                </RowContainer>
            </DialogContent>
            <DialogActions>
                <StyledDialogButton onClick={handleCloseClick} color="primary">
                    Cancelar
                </StyledDialogButton>
                <StyledDialogButton disabled={props.loading} onClick={handleSaveClick} color="primary">
                    {props.loading ? <StyledCircularProgressPrimary /> : <>Salvar</>}
                </StyledDialogButton>
            </DialogActions>
        </Dialog>
    </div>);
}
