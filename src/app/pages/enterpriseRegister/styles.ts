import styled from 'styled-components';
import Radio from '@material-ui/core/Radio';


export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;           
    flex-direction: column; 
    justify-content: center; 
    align-items: center;
    margin: 0 auto;
    top: 50%;
    -ms-transform: translateY(100%);
    transform: translateY(100%);
`;

export const CenterContainer = styled.div`
    width: 400px;
    min-width: 400px;

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
