import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material';
import React from 'react';

// On going error handling

function FormikRadioButton(props) {
  const { label, name, options = [], formikProps, ...rest } = props;
  return (
    <FormControl error={!!formikProps.errors[name] && formikProps.touched[name]}>
      <FormLabel id={name}>{label}</FormLabel>
      <RadioGroup
        row
        aria-labelledby={name}
        name={name}
        onChange={(event) => {
          formikProps.setFieldValue(name, event.target.value);
        }}
        {...rest}>
        {options?.map(({ value, label }, index) => (
          <FormControlLabel
            key={index}
            value={value}
            control={<Radio />}
            label={
              <Typography fontSize="14px" fontWeight="bold">
                {label}
              </Typography>
            }
          />
        ))}
      </RadioGroup>
      <FormHelperText>{formikProps.errors[name]}</FormHelperText>
    </FormControl>
  );
}

export default FormikRadioButton;
