import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

export const Container = styled.div`
    margin: auto;
    width: 40%;
    padding: 16px;
    min-width: 300px;
`;

export const RowContainer = styled.div`
    flex-direction: row;
    display: flex;
    align-items: center;
    text-align: center !important;
`;

export const HeaderContainer = styled.div`
    text-align: left;
    margin-bottom: 16px;
`;

export const StyledSmall = styled.small`
    font-family: 'Roboto', sans-serif;
    color: #9e9e9e;
`;

export const StyledTextField = styled(TextField)`
    margin-top: 16px;
    width: 100%;

    label.Mui-focused {
        color: #880e4f;
    }
    .MuiOutlinedInput-root {
        fieldset {
            border-color: #000000;
        }
        &.Mui-focused fieldset {
            border-color: #880e4f;
        }
    }
`;

export const StyledPrimaryButton = styled(Button)`
    width: 100%;
    height: 50px;
    margin-top: 32px;
    margin-bottom: 32px;
    background-color: #880e4f;
    border-radius: 30px;
    &:hover {
        background-color: #560027;
    }

    & .MuiTouchRipple-child {
        background-color: white;
    }

    & .MuiButton-label {
        color: #fff;
    }
`;

export const StyledGreyButton = styled(Button)`
    width: 100%;
    height: 50px;
    margin-top: 32px;
    background-color: #e0e0e0;
    border-radius: 30px;
    &:hover {
        background-color: #aeaeae;
    }

    & .MuiTouchRipple-child {
        background-color: white;
    }

    & .MuiButton-label {
        color: #fff;
    }
`;

export const StyledDivider = styled(Divider)`
    width: 25%;
    margin-left: 16px;
    margin-right: 16px;
    text-align: center;
`;

export const ForgotPasswordText = styled.small`
    font-family: 'Roboto', sans-serif;
    color: #9e9e9e;
    width: 100%;
    margin-bottom: 32px;
    margin-top: 8px;
    font-size: 12px;
`;

export const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
        color: #9e9e9e
    }
`;

export const StyledCircularProgress = styled(CircularProgress)`
    color: #fff
`;
