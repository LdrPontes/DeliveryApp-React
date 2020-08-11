import React from 'react';
import NumberFormat from 'react-number-format';


interface CurrencyInputProps {
    inputRef: (instance: NumberFormat | null) => void;
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
  }


function CurrencyInput(props: CurrencyInputProps): JSX.Element{
    const { inputRef, onChange, ...other } = props;
    return (
        <NumberFormat
          {...other}
          decimalScale={2}
          getInputRef={inputRef}
          allowNegative={false}
          allowedDecimalSeparators={[',']}
          decimalSeparator={','}
          prefix="R$ "
          onValueChange={(values) => {
            onChange({
              target: {
                name: props.name,
                value: values.value,
              },
            });
          }}
          isNumericString
        />
      );
}

export default CurrencyInput;