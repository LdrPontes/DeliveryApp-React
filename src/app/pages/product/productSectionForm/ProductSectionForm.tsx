import React, { ChangeEventHandler } from "react";
import { Dialog, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";
import { StyledDialogButton, StyledCircularProgress, Title } from "./styles";
import { StyledTextField } from "../../../global/globalStyles";

interface ProductSectionFormProps {
    open: boolean,
    handleClose: ChangeEventHandler,
    handleSave: ChangeEventHandler,
    handleNameChange: ChangeEventHandler,
    loading: boolean,
    value: string,
    error: string,
    edit: boolean
}

export default function ProductSectionForm(props: ProductSectionFormProps): JSX.Element {

    function handleCloseClick(event: any): void {
        props.handleClose(event)
    }

    function handleSaveClick(event: any): void {
        props.handleSave(event)
    }

    return (
        <div>
            <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
                <Title>{props.edit ? 'Editar categoria' : 'Nova categoria'}</Title>
                <DialogContent>
                    <DialogContentText>
                        Informe o nome que deseja para sua nova categoria de produtos.
                    </DialogContentText>
                    <StyledTextField
                        error={props.error !== ''}
                        helperText={props.error}
                        autoFocus
                        variant="filled"
                        id="name"
                        label="Nome"
                        type="text"
                        fullWidth
                        value={props.value}
                        InputProps={{classes: {underline: 'underline'}, disableUnderline: false }}
                        onChange={props.handleNameChange}
                    />
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
