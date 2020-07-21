import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

export const Container = styled.div`
    margin: auto;
    width: 40%;
    padding: 16px;
    min-width: 270px;
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

export const Title = styled.h1`
    font-family: 'Roboto', sans-serif;
`;

export const Description = styled.small`
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

export const StyledButton = styled(Button)`
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

export const StyledDivider = styled(Divider)`
    width: 28%;
    margin-left: 16px;
    margin-right: 16px;
    text-align: center;
`;
