import { TextField } from '@mui/material';
import { forwardRef } from 'react';
import NumberFormat from 'react-number-format';

// const BaseTextField = (props) => {
//   const { form, field, ...rest } = props;

//   return (
//     <TextField
//       {...field}
//       {...rest}
//       type="number"
//       inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
//       onInput={(e) => {
//         e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 12);
//       }}
//       // focused={!form.isSubmitting && !form.errors[field.name] && form.touched[field.name]}
//       error={!!form.errors[field.name] && form.touched[field.name]}
//       helperText={
//         form.errors[field.name] && form.touched[field.name] ? form.errors[field.name] : null
//       }
//       // Note: temporary solution to fontsize
//       InputProps={{ style: { fontSize: 14 } }}
//       InputLabelProps={{ style: { fontSize: 14 } }}
//       sx={{ backgroundColor: 'white', borderRadius: 1 }}
//     />
//   );
// };

const NumberFormatCustom = forwardRef((props, ref) => {
  const { name, formikProps, ...rest } = props;

  return (
    <NumberFormat
      ref={ref}
      isNumericString={true}
      thousandSeparator={'.'}
      decimalSeparator={','}
      value={formikProps.values[name]}
      onValueChange={(val) => formikProps.setFieldValue(`${name}`, val.floatValue)}
      {...rest}
    />
  );
});

NumberFormatCustom.displayName = 'NumberFormatCustom';

const FormikNumber = (props) => {
  const { label, shrink, defaultValue, ...rest } = props;

  return (
    <TextField
      label={label}
      defaultValue={defaultValue}
      InputLabelProps={{ shrink: shrink }}
      InputProps={{ inputComponent: NumberFormatCustom }}
      inputProps={{ inputMode: 'decimal', autoCapitalize: 'none', ...rest }}
    />
  );
};

export default FormikNumber;
