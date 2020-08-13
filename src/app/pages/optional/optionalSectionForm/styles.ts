import styled from 'styled-components';
import { Button, CircularProgress } from '@material-ui/core';
import { StyledTextField as TextField } from '../../../global/globalStyles'

export const Title = styled.h1`
    margin: 16px;
    font-size: 20px;
`;
export const StyledDialogButton = styled(Button)`
    color: #880e4f;
`;

export const StyledCircularProgress = styled(CircularProgress)`
    color: #880e4f;
    width: 32px;
    height: 32px;
`;

export const Horizontal = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-left: -4px;
    margin-right: -4px;
`;

export const NumberTextField = styled(TextField)`
    margin-left: 4px;
    margin-right: 4px;
`;