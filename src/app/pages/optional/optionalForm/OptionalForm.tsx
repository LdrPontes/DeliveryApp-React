import { ChangeEventHandler } from "react"
import { Dialog, DialogContent, DialogContentText, DialogActions } from "@material-ui/core"
import { StyledTextField, StyledCircularProgress } from "../../../global/globalStyles"
import React from "react"
import { Title, NumberInput, Horizontal, StyledDialogButton } from "./styles"
import CurrencyInput from "../../../components/CurrencyInput/CurrencyInput"

interface OptionalFormProps {
    open: boolean,
    handleClose: ChangeEventHandler,
    handleSave: ChangeEventHandler,
    handleNameChange: ChangeEventHandler,
    handlePriceChange: ChangeEventHandler,
    loading: boolean,
    name: string,
    price: string,
    errorName: string,
    errorPrice: string,
    edit: boolean
}

export default function OptionalForm(props: OptionalFormProps): JSX.Element {
    
    function handleCloseClick(event: any): void {
        props.handleClose(event)
    }

    function handleSaveClick(event: any): void {
        props.handleSave(event)
    }

    return (
        <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
            <Title>{props.edit ? 'Editar opcional' : 'Nova opcional'}</Title>
            <DialogContent>
                <DialogContentText>
                    Informe o nome e o preço do opcional.
                </DialogContentText>

                <Horizontal>
                    <StyledTextField
                        error={props.errorName !== ''}
                        helperText={props.errorName}
                        autoFocus
                        variant="filled"
                        id="name"
                        label="Nome"
                        type="text"
                        fullWidth
                        value={props.name}
                        InputProps={{ classes: { underline: 'underline' }, disableUnderline: false }}
                        onChange={props.handleNameChange} />

                    <NumberInput
                        error={props.errorPrice !== undefined && props.errorPrice !== ''}
                        helperText={props.errorPrice}
                        label="Preço"
                        variant="filled"
                        onChange={props.handlePriceChange}
                        value={props.price}
                        InputProps={{ inputComponent: CurrencyInput as any }}
                    />
                </Horizontal>

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
    )
}