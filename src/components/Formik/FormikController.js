import FormikAutocomplete from './FormikAutocomplete';
import FormikDatePicker from './FormikDatePicker';
import FormikNumber from './FormikNumber';
import FormikNumberCurrency from './FormikNumberCurrency';
import FormikNumberWeight from './FormikNumberWeight';
import FormikRadioButton from './FormikRadioButton';
import FormikSelect from './FormikSelect';
import FormikTextField from './FormikTextField';

const FormikController = (props) => {
  const { control, label, options, shrink, disabled, defaultValue, month, ...rest } = props;

  switch (control) {
    case 'textfield':
      return <FormikTextField label={label} disabled={disabled} {...rest} />;
    case 'multiline':
      return <FormikTextField label={label} multiline rows={5} {...rest} />;
    case 'select':
      return (
        <FormikSelect
          label={label}
          options={options}
          disabled={disabled}
          defaultValue={defaultValue}
          {...rest}
        />
      );
    case 'datepicker':
      return <FormikDatePicker label={label} month={month} {...rest} />;
    case 'autocomplete':
      return <FormikAutocomplete label={label} options={options} disabled={disabled} {...rest} />;
    case 'number':
      return <FormikNumber label={label} defaultValue={defaultValue} shrink={shrink} {...rest} />;
    case 'numbercurrency':
      return (
        <FormikNumberCurrency label={label} defaultValue={defaultValue} shrink={shrink} {...rest} />
      );
    case 'numberweight':
      return <FormikNumberWeight label={label} {...rest} />;
    case 'radio':
      return <FormikRadioButton label={label} options={options} {...rest} />;
    default:
      return null;
  }
};

export default FormikController;
