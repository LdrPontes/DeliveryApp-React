import styled from 'styled-components';
import { Fab, Button, Avatar, Typography } from '@material-ui/core';
import { StyledTextField as TextField } from "../../global/globalStyles";

export const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    background: white;
    flex-direction: column;
    padding-bottom: 50px;
`;

export const StyledFab = styled(Fab)`
    margin: 0;
    top: auto;
    right: 20px;
    bottom: 20px;
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
    margin-bottom: 75px;
`;

export const StyledFabSection = styled(Fab)`
    width: 40px;
    height: 40px;
    top: 8px;
    right: auto;
    background-color: #880e4f;
    color: white;
    align-self: flex-end;

    &&:hover {
        background-color: #560027;
        color: white;
    }
`;

export const StyledPrimaryButton = styled(Button)`
    max-width: 300px;
    min-width: 200px;
`;

export const ContainerOptionalSection = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
`;


export const Section = styled.div`
    background: #eeeeee;
    padding: 32px;
    margin-top: 16px;
    width: 55%;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
`;

export const ContainerSectionIcon = styled.div`
    margin-left: auto;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
`;

export const ContainerTitle = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 16px;
`;

export const CardContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 8px;
`;

export const ContainerCardLeft = styled.div`
    width: 100%;
    margin-top: 8px;
    margin-left: 8px;
`;

export const StyledAvatar = styled(Avatar)`
    width: 70px;
    height: 70px;
    margin-right: 16px;
    margin-top: auto;
`;

export const StyledDescription = styled(Typography)`
    white-space: pre-wrap;
    margin-top: 16px;
`;

export const ContainerCardRight = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
    margin-top: 8px;
    margin-right: 8px;
    width: 15vw;
`;
