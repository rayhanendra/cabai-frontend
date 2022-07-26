import { Box, Stack, Typography } from '@mui/material';
import BaseButton from 'components/Base/BaseButton';
// import BaseTabs from 'components/Base/BaseTabs';
import TheBottomNavigation from 'components/Base/TheBottomNavigation';
import TheProfileHeader from 'components/Base/TheProfileHeader';
import CardTransaksi from 'components/Page/Petani/CardTransaksi';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllTransaksi } from 'redux/slices/transaksi';

function TransaksiPetani() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { riwayat, diajukan } = useSelector((state) => state.transaksi);
  useEffect(() => {
    dispatch(getAllTransaksi());
  }, [dispatch]);

  return (
    <>
      <TheProfileHeader />
      <Box display="flex" flexDirection="column" gap={3} p={2} mb="56px">
        <BaseButton
          shape="withicon"
          link="catat-transaksi"
          size="large"
          variant="outlined"
          fullWidth>
          <Typography variant="h5">Catat Transaksi</Typography>
        </BaseButton>

        {/* <BaseTabs
          variant="contained"
          labels={['Cabai Merah Besar', 'Cabai Merah Keriting', 'Cabai Rawit Merah']}>
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography>Total transaksi Cabai Merah Besar</Typography>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h6">Harga Jual Per kg:</Typography>
              <Typography variant="h6">Rp 40.150</Typography>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h6">Total Terjual:</Typography>
              <Typography variant="h6">1200 kg</Typography>
            </Box>
            <Box p={2} mt={1} borderRadius={1} bgcolor="white">
              <Typography>Hasil Transaksi Cabai Merah Besar (kg)</Typography>
            </Box>
          </Box>

          <Box display="flex" flexDirection="column" gap={1}>
            <Typography>Total transaksi Cabai Merah Besar</Typography>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h6">Harga Jual Per kg:</Typography>
              <Typography variant="h6">Rp 40.150</Typography>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h6">Total Terjual:</Typography>
              <Typography variant="h6">1200 kg</Typography>
            </Box>
            <Box p={2} mt={1} borderRadius={1} bgcolor="white">
              <Typography>Hasil Transaksi Cabai Merah Keriting (kg)</Typography>
            </Box>
          </Box>

          <Box display="flex" flexDirection="column" gap={1}>
            <Typography>Total transaksi Cabai Merah Besar</Typography>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h6">Harga Jual Per kg:</Typography>
              <Typography variant="h6">Rp 40.150</Typography>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h6">Total Terjual:</Typography>
              <Typography variant="h6">1200 kg</Typography>
            </Box>
            <Box p={2} mt={1} borderRadius={1} bgcolor="white">
              <Typography>Hasil Transaksi Cabai Rawit Merah (kg)</Typography>
            </Box>
          </Box>
        </BaseTabs> */}

        <Box display="flex" flexDirection="column" gap={1}>
          <Typography variant="h5">Transaksi Diajukan</Typography>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography maxWidth="70%">Menunggu pembeli menerima transaksi anda</Typography>
            <Typography variant="h6" onClick={() => navigate('/petani/riwayat')}>
              Lihat Semua
            </Typography>
          </Box>
        </Box>
        <Stack gap={2}>
          {diajukan?.map((item, index) => (
            <CardTransaksi key={index} item={item} />
          ))}
        </Stack>

        <Stack gap={2}>
          <Stack gap={1}>
            <Typography variant="h5">Daftar Transaksi</Typography>
            <Stack direction="row" justifyContent="space-between">
              <Typography maxWidth="70%">Daftar transaksi yang anda sudah lakukan</Typography>
              <Typography variant="h6" onClick={() => navigate('/petani/riwayat')}>
                Lihat Semua
              </Typography>
            </Stack>
          </Stack>
          {riwayat?.map((item, index) => (
            <CardTransaksi key={index} item={item} />
          ))}
        </Stack>
      </Box>

      <TheBottomNavigation role="petani" />
    </>
  );
}

export default TransaksiPetani;
