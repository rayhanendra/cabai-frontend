import { Box, Typography } from '@mui/material';
import BaseButton from 'components/Base/BaseButton';
import TheBottomNavigation from 'components/Base/TheBottomNavigation';
import TheProfileHeader from 'components/Base/TheProfileHeader';
import CardBlanko from 'components/Page/Petani/CardBlanko';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllBlanko } from 'redux/slices/blanko';
// import theme from 'themes/theme';

function BerandaPetani() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { riwayat } = useSelector((state) => state.blanko);

  useEffect(() => {
    dispatch(getAllBlanko());
  }, [dispatch]);

  return (
    <>
      <TheProfileHeader />
      <Box display="flex" flexDirection="column" gap={3} p={2} mb="56px">
        {/* <Box>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lacus, felis netus neque,
            sapien lobortis quisque. Mi id amet sed elit, ultrices. Dapibus vestibulum viverra est
            habitasse ultrices pretium nisi, dis. Magna.
          </Typography>
        </Box> */}
        <BaseButton shape="withicon" link="catat-blanko" size="large" variant="outlined" fullWidth>
          <Typography variant="h5">Catat Blanko</Typography>
        </BaseButton>
        {/* <Box
          display={'flex'}
          flexDirection={'column'}
          gap={3}
          p={2}
          bgcolor={theme.palette.dark.light}
          borderRadius={2}>
          <Typography variant="h4">Harga Cabai Terkini</Typography>
        </Box>
        <Box
          display={'flex'}
          flexDirection={'column'}
          gap={3}
          p={2}
          bgcolor={theme.palette.dark.light}
          borderRadius={2}>
          <Typography variant="h4">Total Penjualan</Typography>
        </Box> */}
        <Box display="flex" flexDirection="column" gap={2}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h5">Riwayat Blanko</Typography>
            <Typography variant="h6" onClick={() => navigate('/petani/riwayat')}>
              Lihat Semua
            </Typography>
          </Box>
          {riwayat?.map((item, index) => (
            <CardBlanko key={index} item={item} />
          ))}
        </Box>
        <TheBottomNavigation role="petani" />
      </Box>
    </>
  );
}

export default BerandaPetani;
