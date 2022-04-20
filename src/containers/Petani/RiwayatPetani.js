import { Box, Stack, Typography } from '@mui/material';
import BaseTabs from 'components/Base/BaseTabs';
import TheBottomNavigation from 'components/Base/TheBottomNavigation';
import TheProfileHeader from 'components/Base/TheProfileHeader';
import CardRiwayatBlanko from 'components/Page/Petani/CardRiwayatBlanko';
import CardRiwayatPenjualan from 'components/Page/Petani/CardRiwayatPenjualan';
import CardRiwayatStok from 'components/Page/Petani/CardRiwayatStok';
import IconNotFound from 'public/images/icons/IconNotFound';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStok } from 'redux/slices/user';

// import iconNotFound from 'public/images/icons/icon_riwayat_notfound.svg';

const riwayatPenjualan = [
  {
    id: 0,
    date: '28 Februari 2022',
    jenisCabai: 'Cabai Merah Besar',
    jumlahDijual: 540,
    hargaPerKg: 40150,
    dijualKepada: { name: 'Rian Sunandar', jenis: 'Pengumpul' }
  },
  {
    id: 1,
    date: '28 Februari 2022',
    jenisCabai: 'Cabai Merah Besar',
    jumlahDijual: 540,
    hargaPerKg: 40150,
    dijualKepada: { name: 'Rian Sunandar', jenis: 'Pengumpul' }
  },
  {
    id: 2,
    date: '28 Februari 2022',
    jenisCabai: 'Cabai Merah Besar',
    jumlahDijual: 540,
    hargaPerKg: 40150,
    dijualKepada: { name: 'Rian Sunandar', jenis: 'Pengumpul' }
  },
  {
    id: 3,
    date: '28 Februari 2022',
    jenisCabai: 'Cabai Merah Besar',
    jumlahDijual: 540,
    hargaPerKg: 40150,
    dijualKepada: { name: 'Rian Sunandar', jenis: 'Pengumpul' }
  }
];

const riwayatBlanko = [
  {
    id: 0,
    date: '28 Februari 2022',
    jenisCabai: 'Cabai Merah Besar',
    totalPanen: 540,
    hargaPerKg: 40150
  },
  {
    id: 1,
    date: '28 Februari 2022',
    jenisCabai: 'Cabai Merah Besar',
    totalPanen: 540,
    hargaPerKg: 40150
  },
  {
    id: 2,
    date: '28 Februari 2022',
    jenisCabai: 'Cabai Merah Besar',
    totalPanen: 540,
    hargaPerKg: 40150
  },
  {
    id: 3,
    date: '28 Februari 2022',
    jenisCabai: 'Cabai Merah Besar',
    totalPanen: 540,
    hargaPerKg: 40150
  }
];

function RiwayatPetani() {
  const dispatch = useDispatch();

  const { stoks } = useSelector((state) => state.user);
  console.log('ini stoks', stoks);

  useEffect(() => {
    dispatch(getAllStok());
  }, [dispatch]);

  return (
    <>
      <TheProfileHeader name="Ahmad" role="petani" />
      <Box p={2} mb="56px">
        <Box mb={2}>
          <Typography variant="h4">Riwayat</Typography>
        </Box>
        <BaseTabs labels={['Blanko', 'Penjualan', 'Stok']}>
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
            {riwayatPenjualan ? (
              riwayatPenjualan.map((item, index) => (
                <CardRiwayatPenjualan key={index} item={item} />
              ))
            ) : (
              <Box>
                <IconNotFound />
                {/* <img src="/images/icons/icon_riwayat_notfound.svg" alt="not found" /> */}
              </Box>
            )}
          </Stack>

          <Stack gap={1.5}>
            {stoks ? (
              stoks.map((item, index) => <CardRiwayatStok key={index} item={item} />)
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
