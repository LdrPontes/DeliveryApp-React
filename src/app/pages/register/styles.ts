import styled from 'styled-components';
import { ReactComponent as FormImg } from '../../assets/forms.svg';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
`;

export const Elipse = styled.div`
    width: 2000px;
    height: 2000px;
    left: 50%;
    border-radius: 50%;
    position: fixed;
    background: #880e4f;
    -ms-transform: translateY(-25%);
    transform: translateY(-25%);
    z-index: -1;
`;

export const StyledFormImg = styled(FormImg)`
    width: 30%;
    height: 150;
    margin: 0;
    position: fixed;
    right: 7%;
    -ms-transform: translateY(25%);
    transform: translateY(25%);
    z-index: 0;
`;

export const LeftColumnContainer = styled.div`
    background-color: #ffffff;
    width: 50%;
    height: 100%;
    right: 50%;
    position: fixed;
`;

export const FormContainer = styled.div`
    height: 100%;
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
`;
