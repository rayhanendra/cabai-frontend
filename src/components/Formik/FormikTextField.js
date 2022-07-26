import { TextField } from '@mui/material';
import { Field } from 'formik';

const BaseTextField = (props) => {
  const { form, field, disabled, ...rest } = props;
  return (
    <TextField
      {...field}
      {...rest}
      disabled={disabled}
      // focused={!form.isSubmitting && !form.errors[field.name] && form.touched[field.name]}
      error={!!form.errors[field.name] && form.touched[field.name]}
      helperText={
        form.errors[field.name] && form.touched[field.name] ? form.errors[field.name] : null
      }
      // Note: temporary solution to fontsize
      InputProps={{ style: { fontSize: 14 } }}
      InputLabelProps={{ style: { fontSize: 14 } }}
      sx={{ backgroundColor: 'white', borderRadius: 1 }}
    />
  );
};

const FormikTextField = (props) => {
  const { disabled, ...rest } = props;
  return <Field component={BaseTextField} disabled={disabled} {...rest} />;
};

export default FormikTextField;
