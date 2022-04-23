import { ArrowBackIosNewRounded } from '@mui/icons-material';
import { Box, IconButton, LinearProgress, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const BaseHeader = (props) => {
  const { label, to } = props;

  const { status: stok } = useSelector((state) => state.stok);
  const { status: transaksi } = useSelector((state) => state.transaksi);

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
        <Link to={to}>
          <IconButton>
            <ArrowBackIosNewRounded />
          </IconButton>
        </Link>
        <Typography variant="h4">{label}</Typography>
      </Box>

      <Box display={stok === 'loading' || transaksi === 'loading' ? '' : 'hidden'}>
        <LinearProgress />
      </Box>
    </>
  );
};

export default BaseHeader;
