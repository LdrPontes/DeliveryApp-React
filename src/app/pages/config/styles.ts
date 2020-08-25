import styled from 'styled-components';
import { AppBar, Tabs, Tab, Switch, withStyles } from '@material-ui/core';
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
    height: 93vh;
    display: flex;
    align-items: center;
    background: #F5F5F5;
    flex-direction: column;
`;


export const ContainerPanel = styled.div`
    width: 50vw;
    display: flex;
    flex-direction: column;
`;

export const Horizontal = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const NumberInput = styled(StyledTextField)`
    width: 200px;

`;

export const NumberInputMinutes = styled(StyledTextField)`
    width: 100px;
    margin-left: 8px;
`;

export const CustomSwitch = withStyles({
    switchBase: {
      color: '#880e4f',
      '&$checked': {
        color: '#880e4f',
      },
      '&$checked + $track': {
        backgroundColor: '#bc477b',
      },
    },
    checked: {},
    track: {},
  })(Switch);