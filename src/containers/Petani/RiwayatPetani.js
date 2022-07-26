import { Box, Stack, Typography } from '@mui/material';
import BaseTabs from 'components/Base/BaseTabs';
import TheBottomNavigation from 'components/Base/TheBottomNavigation';
import TheProfileHeader from 'components/Base/TheProfileHeader';
import CardRiwayatBlanko from 'components/Page/Petani/CardRiwayatBlanko';
import CardRiwayatTransaksi from 'components/Page/Petani/CardRiwayatTransaksi';
import IconNotFound from 'public/images/icons/IconNotFound';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTransaksi } from 'redux/slices/transaksi';
import { getAllBlanko } from 'redux/slices/blanko';
import { getAllLahan } from 'redux/slices/lahan';
import CardRiwayatLahan from 'components/Page/Petani/CardRiwayatLahan';

// import iconNotFound from 'public/images/icons/icon_riwayat_notfound.svg';

function RiwayatPetani() {
  const dispatch = useDispatch();

  const { riwayat: riwayatBlanko } = useSelector((state) => state.blanko);
  const { riwayat: riwayatLahan } = useSelector((state) => state.lahan);
  const { riwayat: riwayatTransaksi } = useSelector((state) => state.transaksi);

  console.log(riwayatTransaksi);

  useEffect(() => {
    dispatch(getAllTransaksi());
    dispatch(getAllBlanko());
    dispatch(getAllLahan());
  }, [dispatch]);

  return (
    <>
      <TheProfileHeader />
      <Box p={2} mb="56px">
        <Box mb={2}>
          <Typography variant="h4">Riwayat</Typography>
        </Box>
        <BaseTabs labels={['Blanko', 'Lahan', 'Transaksi']}>
          <Stack gap={1.5}>
            {riwayatBlanko ? (
              riwayatBlanko.map((item, index) => <CardRiwayatBlanko key={index} item={item} />)
            ) : (
              <Box>
                <IconNotFound />
                {/* <img src="/images/icons/icon_riwayat_notfound.svg" alt="not found" /> */}
              </Box>
            )}
          </Stack>

          <Stack gap={1.5}>
            {riwayatLahan ? (
              riwayatLahan.map((item, index) => <CardRiwayatLahan key={index} item={item} />)
            ) : (
              <Box>
                <IconNotFound />
                {/* <img src="/images/icons/icon_riwayat_notfound.svg" alt="not found" /> */}
              </Box>
            )}
          </Stack>

          <Stack gap={1.5}>
            {riwayatTransaksi ? (
              riwayatTransaksi.map((item, index) => (
                <CardRiwayatTransaksi key={index} item={item} />
              ))
            ) : (
              <Box>
                <IconNotFound />
                {/* <img src="/images/icons/icon_riwayat_notfound.svg" alt="not found" /> */}
              </Box>
            )}
          </Stack>
        </BaseTabs>
      </Box>
      <TheBottomNavigation role="petani" />
    </>
  );
}

export default RiwayatPetani;
