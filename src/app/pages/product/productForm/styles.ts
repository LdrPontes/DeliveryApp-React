import styled from 'styled-components';
import { StyledTextField } from '../../../global/globalStyles';

export const Title = styled.h1`
    margin: 16px;
    font-size: 20px;
`;

export const RowContainer = styled.div`
    flex-direction: row;
    display: flex;
    align-items: center;
    text-align: center !important;
`;

export const NumberInput = styled(StyledTextField)`
    width: 200px;
    margin-left: 16px;
`;