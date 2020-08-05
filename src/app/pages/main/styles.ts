import styled from 'styled-components';
import { AppBar, Drawer, ListItemText } from '@material-ui/core';
import { ReactComponent as BarCodeIcon } from '../../assets/scan.svg';

export const Container = styled.div`
    flex-grow: 1;
`;

export const StyledAppBar = styled(AppBar)`
    background-color: #880e4f;
`;

export const RightIconContainer = styled.div`
    margin-left: auto;
`;

export const ContentContainer = styled.div`
    height: 90vh;
    margin-left: 250px !important;
    margin-right: 10px !important;
    margin-top: 75px;
    z-index: -1;

`;

export const StyledDrawer = styled(Drawer)`
    width: 240px;

    .drawerPaper {
        width: 240px;
        z-index: 0;
    };

    .drawerHeader {
        display: 'flex';
        align-items: 'center';
        justify-content: 'flex-end';
        
    };
`;


export const StyledBarCodeIcon = styled(BarCodeIcon)`
    width: 24px;
    height: 24px;
`;

export const StyledListItemText = styled(ListItemText)`
    .listItemText {
        font-size: 15px
    }
`;



