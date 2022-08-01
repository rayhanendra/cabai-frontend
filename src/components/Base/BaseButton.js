import {
  AddCircleRounded,
  DeleteOutlined,
  ExitToAppRounded,
  PeopleOutlined
} from '@mui/icons-material';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import BaseLoading from './BaseLoading';

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
    boxShadow: 'none',
    border: 'none'
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

const ButtonChild = (props) => {
  const { loading = false, children } = props;

  return <>{loading ? <BaseLoading /> : children}</>;
};

const BaseButton = (props) => {
  const { shape, children, link, removeIcon, loading = false, ...rest } = props;

  const navigate = useNavigate();

  return (
    <>
      {shape === 'withicon' ? (
        <CustomButton
          sx={{
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
          onClick={() => navigate(link)}
          {...rest}>
          <ButtonChild loading={loading}>{children}</ButtonChild>
          {!removeIcon && <AddCircleRounded />}
        </CustomButton>
      ) : shape === 'supervise' ? (
        <CustomButton
          sx={{
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
          startIcon={<PeopleOutlined />}
          onClick={() => navigate(link)}
          {...rest}>
          <ButtonChild loading={loading}>{children}</ButtonChild>
        </CustomButton>
      ) : shape === 'error' ? (
        <Button
          sx={{
            borderRadius: '8px',
            boxShadow: 'none',
            textTransform: 'none',
            fontSize: 16,
            padding: '8px 16px',
            lineHeight: 1.5
          }}
          color="error"
          variant="outlined"
          onClick={() => navigate(link)}
          {...rest}>
          <ButtonChild loading={loading}>{children}</ButtonChild>
        </Button>
      ) : shape === 'exit' ? (
        <Button
          sx={{
            borderRadius: '8px',
            boxShadow: 'none',
            textTransform: 'none',
            fontSize: 16,
            padding: '8px 16px',
            lineHeight: 1.5
          }}
          color="error"
          variant="outlined"
          startIcon={<ExitToAppRounded />}
          onClick={() => navigate(link)}
          {...rest}>
          <ButtonChild loading={loading}>{children}</ButtonChild>
        </Button>
      ) : shape === 'delete' ? (
        <Button
          sx={{
            borderRadius: '8px',
            boxShadow: 'none',
            textTransform: 'none',
            fontSize: 16,
            padding: '8px 16px',
            lineHeight: 1.5
          }}
          color="error"
          variant="outlined"
          startIcon={<DeleteOutlined />}
          onClick={() => navigate(link)}
          {...rest}>
          <ButtonChild loading={loading}>{children}</ButtonChild>
        </Button>
      ) : shape === 'outlined' ? (
        <Button
          sx={{
            borderRadius: '8px',
            boxShadow: 'none',
            textTransform: 'none',
            fontSize: 16,
            padding: '8px 16px',
            lineHeight: 1.5
          }}
          variant="outlined"
          onClick={() => navigate(link)}
          {...rest}>
          <ButtonChild loading={loading}>{children}</ButtonChild>
        </Button>
      ) : (
        <CustomButton
          sx={{
            color: 'white',
            display: 'flex',
            alignItems: 'center'
          }}
          onClick={() => navigate(link)}
          {...rest}>
          <ButtonChild loading={loading}>{children}</ButtonChild>
        </CustomButton>
      )}
    </>
  );
};

export default BaseButton;
