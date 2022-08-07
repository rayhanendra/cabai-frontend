import { Box, LinearProgress } from '@mui/material';
import { useSelector } from 'react-redux';

const BaseLoader = () => {
  const { status: user } = useSelector((state) => state.user);
  const { status: blanko } = useSelector((state) => state.blanko);
  const { status: transaksi } = useSelector((state) => state.transaksi);
  const { status: usang } = useSelector((state) => state.usang);
  const { status: lahan } = useSelector((state) => state.lahan);

  const isLoading = [user, blanko, transaksi, usang, lahan].includes('loading');

  return (
    <Box display={isLoading ? '' : 'hidden'}>
      <LinearProgress />
    </Box>
  );
};

export default BaseLoader;
