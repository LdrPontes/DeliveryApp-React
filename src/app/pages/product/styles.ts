import styled from 'styled-components';
import { Fab } from '@material-ui/core';
import { StyledTextField as TextField, StyledPrimaryButton as Button } from "../../global/globalStyles";


export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    background: white;
    flex-direction: column;
    flex-wrap: wrap;
`;

export const StyledFab = styled(Fab)`
    margin: 0;
    top: auto;
    right: auto;
    bottom: 50px;
    left: auto;
    position: fixed;
    background-color: #880e4f;
    color: white;

    &&:hover {
        background-color: #560027;
        color: white;
    }
`;

export const StyledTextField = styled(TextField)`
    max-width: 400px;
`;

export const StyledPrimaryButton = styled(Button)`
    max-width: 300px;
    min-width: 200px;
`;