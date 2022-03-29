import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomButton = styled(Button)({
  borderRadius: '8px',
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '8px 16px',
  border: 'none',
  lineHeight: 1.5,
  backgroundColor: '#2EB086',
  '&:hover': {
    backgroundColor: '#2EB086',
    boxShadow: 'none'
  },
  '&:active': {
    boxShadow: 'none',
    border: 'none'
  },
  '&:focus': {
    // boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    border: 'none'
  }
});

const BaseButton = (props) => {
  const { withIcon, children, ...rest } = props;

  if (withIcon)
    return (
      <CustomButton
        sx={{
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
        {...rest}>
        {children}
      </CustomButton>
    );
  else
    return (
      <CustomButton
        sx={{
          color: 'white',
          display: 'flex',
          alignItems: 'center'
        }}
        {...rest}>
        {children}
      </CustomButton>
    );
};

export default BaseButton;