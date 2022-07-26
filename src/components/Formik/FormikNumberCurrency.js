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
      decimalSeparator={false}
      prefix={'Rp '}
      value={formikProps.values[name]}
      onValueChange={(val) => formikProps.setFieldValue(`${name}`, val.floatValue)}
      {...rest}
    />
  );
});

NumberFormatCustom.displayName = 'NumberFormatCustom';

const FormikNumberCurrency = (props) => {
  const { label, shrink, defaultValue, ...rest } = props;
  return (
    <TextField
      label={label}
      defaultValue={defaultValue}
      InputLabelProps={{ shrink: shrink }}
      InputProps={{ inputComponent: NumberFormatCustom }}
      inputProps={{ inputMode: 'numeric', ...rest }}
    />
  );
};

export default FormikNumberCurrency;
