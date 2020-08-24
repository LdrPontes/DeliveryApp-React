import styled from 'styled-components';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { StyledTextField } from '../../global/globalStyles';

export const StyledAppBar = styled(AppBar)`
    background-color: #ffffff;
    color: #000;
`;

export const StyledTabs = styled(Tabs)`
    .indicator {
        background-color: #880e4f;
        height: 3px;
    }
`;

export const StyledTab = styled(Tab)`
    height: 70px;
    
`;

export const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

export const ContainerForm = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    background: white;
    flex-direction: column;
`;


export const ContainerPanel = styled.div`
    width: 50vh;
    height: 70vh;
    display: flex;
    flex-direction: column;
    padding-top: 5%;
`;

export const Horizontal = styled.div`
    display: flex;
    flex-direction: row;
`;

export const NumberInput = styled(StyledTextField)`
    width: 200px;
    margin-left: 16px;
`;