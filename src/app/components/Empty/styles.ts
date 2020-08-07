import styled from 'styled-components';
import { ReactComponent as Box } from '../../assets/box.svg';

export const Container = styled.div`
    width: 400px;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    flex-direction: column;
    flex-wrap: wrap;
`;

export const StyledBox = styled(Box)`
    width: 150px;
    height: 150px;
`;
export const Title = styled.h1`
    margin-top: 16px;
    font-size: 20px;
`;
export const Description = styled.small`
    margin-top: 8px;
    color: #7a7a7a;
`;