import { Box } from '@mui/material';
import React from 'react';
import { FacebookCircularProgress } from './BaseLoadingRedux';

function BasePageLoader() {
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
      <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
        <FacebookCircularProgress />
      </Box>
    </Box>
  );
}

export default BasePageLoader;
