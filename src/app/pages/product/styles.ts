import styled from 'styled-components';
import { Fab, Avatar, Typography } from '@material-ui/core';
import { StyledTextField as TextField, StyledPrimaryButton as Button } from "../../global/globalStyles";


export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    background: white;
    flex-direction: column;
`;

export const StyledFab = styled(Fab)`
    margin: 0;
    top: auto;
    right: 16px;
    bottom: 50px;
    left: auto;
    position: fixed;
    background-color: #880e4f;
    color: white;
    font-size: 12px;
    &&:hover {
        background-color: #560027;
        color: white;
    }
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

export const StyledTextField = styled(TextField)`
    max-width: 400px;
`;

export const StyledPrimaryButton = styled(Button)`
    max-width: 300px;
    min-width: 200px;
`;

export const ContainerProductSection = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
`;


export const Section = styled.div`
    background: #eeeeee;
    padding: 32px;
    margin-top: 16px;
    width: 65%;
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
    padding: 24px;
`;

export const ContainerCardLeft = styled.div`
    width: 100%;
    margin-left: 16px;
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
    justify-content: center;
    align-items: flex-end;;
    flex-direction: column;
    width: 15vw;
`;