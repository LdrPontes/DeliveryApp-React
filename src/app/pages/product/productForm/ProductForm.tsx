import React, { ChangeEventHandler } from 'react';

// import { Container } from './styles';

type ProductFormProps = {
    open: boolean,
    handleClose: ChangeEventHandler,
    handleSave: ChangeEventHandler,
    handleNameChange: ChangeEventHandler,
    loading: boolean,
    value: string,
    error: string,
}


export default function ProductForm(props: ProductFormProps): JSX.Element {
  return <div />;
}
