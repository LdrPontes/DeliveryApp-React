import React from 'react'
import { Container, StyledBox, Description, Title } from './styles';

type EmptyProps = {
    title: string,
    description: string
}

export default function EmptyContent(props: EmptyProps): JSX.Element {

    return (
        <Container>
            <StyledBox></StyledBox>
            <Title>{props.title}</Title>
            <Description>{props.description}</Description>
        </Container>
    )
}