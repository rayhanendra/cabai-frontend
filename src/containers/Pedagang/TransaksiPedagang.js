import { Box, Stack, Typography } from '@mui/material';
import BaseButton from 'components/Base/BaseButton';
import BaseTabs from 'components/Base/BaseTabs';
import TheBottomNavigation from 'components/Base/TheBottomNavigation';
import TheProfileHeader from 'components/Base/TheProfileHeader';
import CardTransaksi from 'components/Page/Pedagang/CardTransaksi';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllTransaksi } from 'redux/slices/transaksi';

function TransaksiPedagang() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { diajukan, konfirmasi, riwayat } = useSelector((state) => state.transaksi);

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
          labels={['Cabai Merah Besar', 'Cabai Merah Keriting', 'Cabai Rawit Merah']}> */}
        {/* CMB */}
        {/* <Box display="flex" flexDirection="column" gap={1}>
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
          </Box> */}
        {/* CMK */}
        {/* <Box display="flex" flexDirection="column" gap={1}>
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
          </Box> */}
        {/* CRM */}
        {/* <Box display="flex" flexDirection="column" gap={1}>
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
          </Box> */}
        {/* </BaseTabs> */}
        <BaseTabs labels={['Transaksi Diajukan', 'Konfirmasi Transaksi']}>
          <Stack gap={2}>
            <Stack gap={1}>
              <Stack direction="row" justifyContent="space-between">
                <Typography>Menunggu pembeli menerima transaksi anda</Typography>
                <Typography variant="h6" onClick={() => navigate('/pedagang/riwayat')}>
                  Lihat Semua
                </Typography>
              </Stack>
            </Stack>
            {diajukan?.map((item, index) => (
              <CardTransaksi key={index} item={item} type="diajukan" button="diajukan" />
            ))}
          </Stack>
          <Stack gap={2}>
            <Stack gap={1}>
              <Stack direction="row" justifyContent="space-between">
                <Typography>Konfirmasi transaksi dari pembelian anda</Typography>
                <Typography variant="h6" onClick={() => navigate('/pedagang/riwayat')}>
                  Lihat Semua
                </Typography>
              </Stack>
            </Stack>
            {konfirmasi?.map((item, index) => (
              <CardTransaksi key={index} item={item} type="konfirmasi" button="konfirmasi" />
            ))}
          </Stack>
        </BaseTabs>
        <Stack gap={2}>
          <Stack gap={1}>
            <Typography variant="h5">Daftar Transaksi</Typography>
            <Stack direction="row" justifyContent="space-between">
              <Typography>Daftar transaksi yang anda sudah lakukan</Typography>
              <Typography variant="h6" onClick={() => navigate('/pedagang/riwayat')}>
                Lihat Semua
              </Typography>
            </Stack>
          </Stack>
          {riwayat?.map((item, index) => (
            <CardTransaksi key={index} item={item} type="diajukan" />
          ))}
        </Stack>
      </Box>
      <TheBottomNavigation role="pedagang" />
    </>
  );
}

export default TransaksiPedagang;
