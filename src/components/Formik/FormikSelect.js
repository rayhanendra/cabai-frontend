import { MenuItem } from '@mui/material';

import FormikTextField from './FormikTextField';

const FormikSelect = (props) => {
  const { options, name, defaultValue, disabled, formikProps, ...rest } = props;
  // Notes warning from MUI Controlled and Uncontrolled Input

  return (
    <FormikTextField
      as="select"
      select
      name={name}
      defaultValue={defaultValue}
      onChange={(event, values) => {
        formikProps.setFieldValue(name, values.props.value);
        console.log('in values', values);
      }}
      disabled={disabled}
      {...rest}
      formikProps={formikProps}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value} sx={{ fontSize: 14 }}>
          {option.label}
        </MenuItem>
      ))}
    </FormikTextField>
  );
};

export default FormikSelect;
