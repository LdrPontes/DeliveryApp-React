import styled, { createGlobalStyle } from 'styled-components';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'

export default createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

    * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    }

    html, body, #root {
        min-height: 100%;
    }

    button {
        cursor: pointer;
    }

    h1, small, h3 {
        font-family: 'Roboto', sans-serif;
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

export const StyledCircularProgress = styled(CircularProgress)`
    color: #fff
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


export const StyledFormControl = styled(FormControl)`
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
