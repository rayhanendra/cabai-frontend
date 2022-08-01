import { CircularProgress } from '@mui/material';
import React from 'react';

function BaseLoading() {
  return (
    <CircularProgress
      variant="indeterminate"
      color="inherit"
      disableShrink
      size={25}
      thickness={4}
    />
  );
}

export default BaseLoading;
