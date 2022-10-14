import { Box, CircularProgress } from '@mui/material';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';

export function FacebookCircularProgress() {
  return (
    <Box position="relative">
      <CircularProgress
        color="primary"
        variant="indeterminate"
        disableShrink
        size={40}
        thickness={4}
      />
    </Box>
  );
}

function BaseLoadingRedux(props) {
  const { loading = false } = props;
  const { status } = useSelector((state) => state.auth);

  if (status === 'loading' || loading)
    return (
      <Box
        maxWidth="xs"
        sx={{
          position: 'fixed',
          p: 0,
          m: 0,
          height: '100vh',
          width: '100vw',
          bgcolor: 'white',
          zIndex: 999
        }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100vh"
          color="primary">
          <FacebookCircularProgress />
        </Box>
      </Box>
    );
  return <Fragment />;
}

export default BaseLoadingRedux;
