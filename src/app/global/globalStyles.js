import styled, { createGlobalStyle } from 'styled-components';
import TextField from '@material-ui/core/TextField';


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

    h1 {
        font-family: 'Roboto', sans-serif;
    }
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
