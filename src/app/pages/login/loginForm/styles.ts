import styled from 'styled-components';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';

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
