import styled from 'styled-components';
import { AppBar, Drawer } from '@material-ui/core';


export const Container = styled.div`
    flex-grow: 1;
`;

export const StyledAppBar = styled(AppBar)`
    background-color: #880e4f;
`;

export const RightIconContainer = styled.div`
    margin-left: auto;
`;

export const StyledDrawer = styled(Drawer)`
    width: 240px;

    .drawerPaper {
        width: 240px;
        z-index: -1;
    };

    .drawerHeader {
        display: 'flex';
        align-items: 'center';
        justify-content: 'flex-end';
        
    };
`;