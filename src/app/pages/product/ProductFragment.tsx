import { Component } from "react";
import React from "react";
import { Container, StyledFab } from "./styles";

import AddIcon from '@material-ui/icons/Add';

class ProductFragment extends Component {
    state = {}

    render(): JSX.Element {
        return (<Container>
            Teste
            <StyledFab aria-label={''} variant="extended" classes={{root: 'fab'}}><AddIcon />Adicionar</StyledFab>
        </Container>);
    }
}

export default ProductFragment;