import styled from 'styled-components';
import { Fab } from '@material-ui/core';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: green;
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
