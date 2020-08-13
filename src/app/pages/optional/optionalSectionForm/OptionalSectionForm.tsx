import React, { ChangeEventHandler } from "react";
import { Dialog, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";
import { Title, StyledDialogButton, StyledCircularProgress, Horizontal, NumberTextField } from "./styles";
import { StyledTextField } from "../../../global/globalStyles";

interface OptionalSectionFormProps {
    open: boolean,
    handleClose: ChangeEventHandler,
    handleSave: ChangeEventHandler,
    handleNameChange: ChangeEventHandler,
    handleMinChange: ChangeEventHandler,
    handleMaxChange: ChangeEventHandler,
    loading: boolean,
    name: string,
    min: string,
    max: string,
    errorName: string,
    errorMin: string,
    edit: boolean
}

export default function OptionalSectionForm(props: OptionalSectionFormProps): JSX.Element {

    function handleCloseClick(event: any): void {
        props.handleClose(event)
    }

    function handleSaveClick(event: any): void {
        props.handleSave(event)
    }

    return (
        <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
            <Title>{props.edit ? 'Editar categoria' : 'Nova categoria'}</Title>
            <DialogContent>
                <DialogContentText>
                    Informe o nome e o mínimo e máximo de opcionais que podem ser selecionados em sua nova categoria de opcionais.
                </DialogContentText>
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
                <Horizontal>
                    <NumberTextField
                        error={props.errorMin !== ''}
                        helperText={props.errorMin}
                        variant="filled"
                        id="name"
                        label="Mínimo"
                        type="number"
                        fullWidth
                        value={props.min}
                        InputProps={{ inputProps: { min: 0, max: 50 }, classes: { underline: 'underline' }, disableUnderline: false }}
                        onChange={props.handleMinChange}
                    />
                    <NumberTextField
                        variant="filled"
                        id="name"
                        label="Máximo"
                        type="number"
                        fullWidth
                        value={props.max}
                        InputProps={{ inputProps: { min: 0, max: 50 }, classes: { underline: 'underline' }, disableUnderline: false }}
                        onChange={props.handleMaxChange}
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