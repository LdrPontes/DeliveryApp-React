import styled from 'styled-components';
import { Avatar } from '@material-ui/core';
import { StyledTextField } from '../../global/globalStyles';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 15vh;
`;

export const Header = styled.div`
    width: 100vw;
    height: 17vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed; 
    top: 0; 
    width: 100%; 
    z-index: 1;
`;

export const StyledAvatar = styled(Avatar)`
    margin-top: 12vh;
    height: 100px;
    width: 100px;
    border-style: solid;
    border-width: 5px;
    z-index: 3;
    position: fixed; 
    top: 0; 
`;

export const Title = styled.h3`
    color: #fff;
    font-family: Manrope;
    font-family: 'Manrope', sans-serif;
    font-size: 5vmin;
`;

export const SnackbarContainer = styled.div`
    width: 20vw;
    min-width: 250px;
    background: #424242;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

`;

export const ContainerSection = styled.div`
    min-width: 90vmin;
`;

export const ContainerProduct = styled.div`
    margin-top: 8px;
    background: #fafafa;
    padding: 8px;
    cursor: pointer;
`;


export const StyledProductAvatar = styled(Avatar)`
    width: 75px;
    height: 75px;
    margin-right: 16px;
    margin-top: 8px;
    z-index: 0;
`;

export const RowProduct = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
`;

export const ProductDescription = styled.h6`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    white-space: pre-wrap;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: 300;
    max-width: 30vw;
    word-break: break-word;
`;

export const ProductDescriptionDialog = styled.h6`
    white-space: pre-wrap;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: 300;
    word-break: break-word;
`;

export const ContainerSpaceRow = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    @media screen and (max-width: 600px) {
        flex-direction: column;
    }
`;

export const ContainerSpaceRowProduct = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const StyledImage = styled.img`
    height: 100%; 
    width: 100%; 
    max-height: 200px;
    object-fit: scale-down;
    position: absolute;
    z-index: 2;
`;

export const BackgroundImage = styled.img`
    height: 100%; 
    width: 100%; 
    max-height: 200px;
    object-fit: cover;
    border: inherit;
    border-color: transparent;
    background: inherit;
    background-clip: border-box;
    -webkit-clip-path: inset(0);
    clip-path: inset(0);
    filter: blur(3px);
    -webkit-filter: blur(3px);
`;

export const NumberInput = styled(StyledTextField)`
    width: 150px;
    min-width: 150px;
`;