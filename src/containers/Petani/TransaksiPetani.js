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
            <CardTransaksi key={index} item={item} type="diajukan" />
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
            <CardTransaksi
              key={index}
              item={item}
              type={
                item.statusTransaksi === 2
                  ? 'diterima'
                  : item.statusTransaksi === 1
                  ? 'ditolak'
                  : ''
              }
            />
          ))}
        </Stack>
      </Box>

      <TheBottomNavigation role="petani" />
    </>
  );
}

export default TransaksiPetani;
