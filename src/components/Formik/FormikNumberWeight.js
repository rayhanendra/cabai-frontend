import { TextField } from '@mui/material';
import React from 'react';
import { forwardRef } from 'react';
import NumberFormat from 'react-number-format';

const NumberFormatCustom = forwardRef((props, ref) => {
  const { name, formikProps, ...rest } = props;

  return (
    <NumberFormat
      ref={ref}
      isNumericString={true}
      thousandSeparator={'.'}
      decimalSeparator={','}
      suffix={' kg'}
      value={formikProps.values[name]}
      onValueChange={(val) => formikProps.setFieldValue(`${name}`, val.floatValue)}
      {...rest}
    />
  );
});

NumberFormatCustom.displayName = 'NumberFormatCustom';

const FormikNumberWeight = (props) => {
  const { label, ...rest } = props;
  return (
    <TextField
      label={label}
      InputProps={{ inputComponent: NumberFormatCustom }}
      inputProps={{ inputMode: 'decimal', autoCapitalize: 'none', ...rest }}
    />
  );
};

export default FormikNumberWeight;
