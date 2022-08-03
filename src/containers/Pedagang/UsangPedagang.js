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
