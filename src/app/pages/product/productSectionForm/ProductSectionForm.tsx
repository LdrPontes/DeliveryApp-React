import React, { ChangeEventHandler } from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";
import { StyledTextField } from "../../../global/globalStyles";
import { StyledDialogButton, StyledCircularProgress } from "./styles";

type ProductSectionFormProps = {
    open: boolean,
    handleClose: ChangeEventHandler,
    handleSave: ChangeEventHandler,
    handleNameChange: ChangeEventHandler,
    loading: boolean,
    value: string,
    error: string,
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
                <DialogTitle id="form-dialog-title">Nova categoria</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Informe o nome que deseja para sua nova categoria de produtos.
                    </DialogContentText>
                    <StyledTextField
                        error={props.error !== ''}
                        helperText={props.error}
                        autoFocus
                        variant="outlined"
                        id="name"
                        label="Nome"
                        type="text"
                        fullWidth
                        value={props.value}
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
