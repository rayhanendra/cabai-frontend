import { Box, Typography } from '@mui/material';
import BaseButton from 'components/Base/BaseButton';
// import BaseTabs from 'components/Base/BaseTabs';
import TheBottomNavigation from 'components/Base/TheBottomNavigation';
import TheProfileHeader from 'components/Base/TheProfileHeader';
import CardUsang from 'components/Page/Pedagang/CardUsang';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllUsang } from 'redux/slices/usang';

function UsangPedagang() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { usang } = useSelector((state) => state.usang);

  useEffect(() => {
    dispatch(getAllUsang());
  }, [dispatch]);

  return (
    <>
      <TheProfileHeader />
      <Box display="flex" flexDirection="column" gap={3} p={2} mb="56px">
        <BaseButton shape="withicon" link="catat-usang" size="large" variant="outlined" fullWidth>
          <Typography variant="h5">Catat Cabai Usang</Typography>
        </BaseButton>
        {/* <BaseTabs
          variant="contained"
          labels={['Cabai Merah Besar', 'Cabai Merah Keriting', 'Cabai Rawit Merah']}> */}
        {/* CMB */}
        {/* <Box display="flex" flexDirection="column" gap={1}>
            <Typography>Total Cabai Merah Besar yang usang</Typography>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h6">Harga Jual Per kg:</Typography>
              <Typography variant="h6">Rp 40.150</Typography>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h6">Total Cabai Usang</Typography>
              <Typography variant="h6">1200 kg</Typography>
            </Box>
            <Box p={2} mt={1} borderRadius={1} bgcolor="white">
              <Typography>Hasil Penjualan Cabai Merah Besar (kg)</Typography>
            </Box>
          </Box> */}
        {/* CMK */}
        {/* <Box display="flex" flexDirection="column" gap={1}>
            <Typography>Total Cabai Merah Keriting yang usang</Typography>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h6">Harga Jual Per kg:</Typography>
              <Typography variant="h6">Rp 40.150</Typography>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h6">Total Cabai Usang</Typography>
              <Typography variant="h6">1200 kg</Typography>
            </Box>
            <Box p={2} mt={1} borderRadius={1} bgcolor="white">
              <Typography>Hasil Penjualan Cabai Merah Keriting (kg)</Typography>
            </Box>
          </Box> */}
        {/* CRM */}
        {/* <Box display="flex" flexDirection="column" gap={1}>
            <Typography>Total Cabai Rawit Merah yang usang</Typography>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h6">Harga Jual Per kg:</Typography>
              <Typography variant="h6">Rp 40.150</Typography>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h6">Total Cabai Usang</Typography>
              <Typography variant="h6">1200 kg</Typography>
            </Box>
            <Box p={2} mt={1} borderRadius={1} bgcolor="white">
              <Typography>Hasil Penjualan Cabai Rawit Merah (kg)</Typography>
            </Box>
          </Box> */}
        {/* </BaseTabs> */}
        <Box display="flex" flexDirection="column" gap={2}>
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography variant="h5">Riwayat Cabai Usang</Typography>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography>Kumpulan cabai yang sudah usang</Typography>
              <Typography variant="h6" onClick={() => navigate('/pedagang/riwayat')}>
                Lihat Semua
              </Typography>
            </Box>
          </Box>
          {usang.map((item, index) => (
            <CardUsang key={index} item={item} type="selling" />
          ))}
        </Box>
      </Box>
      <TheBottomNavigation role="pedagang" />
    </>
  );
}

export default UsangPedagang;
