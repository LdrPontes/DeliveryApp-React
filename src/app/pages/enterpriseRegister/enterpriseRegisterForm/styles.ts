import styled from 'styled-components';
import Radio from '@material-ui/core/Radio';

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

export const LeftContainer = styled.div`
    text-align: left;
`;

export const StyledRadio = styled(Radio)`
    && {
        color: #880e4f;
        .Mui-checked{
            color: #880e4f !important;
        }
    }
`;

export const Title = styled.h1`
    margin-bottom: 8px;
    margin-top: 16px;
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
`;

export const StyledSmall = styled.small`
    font-family: 'Roboto', sans-serif;
    color: #9e9e9e;
`;