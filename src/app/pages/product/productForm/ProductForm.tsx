import React, { ChangeEventHandler } from 'react';
import { Dialog, DialogContent, DialogActions, Select, InputLabel, createMuiTheme, MuiThemeProvider, MenuItem, Checkbox, ListItemText, InputAdornment } from '@material-ui/core';
import { StyledTextField, StyledCircularProgress, StyledFormControl } from '../../../global/globalStyles';
import { StyledDialogButton } from '../productSectionForm/styles';
import { Title, RowContainer, NumberInput } from './styles';
import { ProductSection } from '../../../../domain/entities/ProductSection';

type ProductFormProps = {
    open: boolean,
    handleClose: ChangeEventHandler,
    handleSave: ChangeEventHandler,
    handleTitleChange: ChangeEventHandler,
    handleDescriptionChange: ChangeEventHandler,
    handleAvatarChange: ChangeEventHandler,
    handlePriceChange: ChangeEventHandler,
    handleOptionalChange: ChangeEventHandler,
    handleProductSectionChange: ChangeEventHandler,
    title: string,
    description: string,
    price: string,
    optionals: string[],
    selectedOptionals: string[],
    productSections: ProductSection[],
    loading: boolean
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




    return (<div>
        <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
            <Title>Novo produto</Title>
            <DialogContent>
                <StyledTextField
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
                    <StyledFormControl variant="filled" >
                        <InputLabel>Categoria</InputLabel>
                        <Select
                            label="Categoria"
                            value={''}>
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
                            renderValue={(selected) => (selected as string[]).join(', ')}>
                            {props.optionals.map((name: string) => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox checked={props.selectedOptionals.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </StyledFormControl>
                    <NumberInput
                        label="Preço"
                        variant="filled"
                        type="number"
                        onChange={(e) => handlePriceChange(e)}
                        value={props.price}
                        InputProps={{ inputProps: { min: 0 }, startAdornment: <InputAdornment position="start">R$</InputAdornment>, }}

                    />
                </RowContainer>
            </DialogContent>
            <DialogActions>
                <StyledDialogButton onClick={handleCloseClick} color="primary">
                    Cancelar
                </StyledDialogButton>
                <StyledDialogButton disabled={props.loading} onClick={handleSaveClick} color="primary">
                    {props.loading ? <StyledCircularProgress /> : <>Salvar</>}
                </StyledDialogButton>
            </DialogActions>
        </Dialog>
    </div>);
}
