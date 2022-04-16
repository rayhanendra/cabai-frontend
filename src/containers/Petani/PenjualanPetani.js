import { Box, Stack, Typography } from '@mui/material';
import BaseButton from 'components/Base/BaseButton';
import BaseTabs from 'components/Base/BaseTabs';
import TheBottomNavigation from 'components/Base/TheBottomNavigation';
import TheProfileHeader from 'components/Base/TheProfileHeader';
import CardPenjualan from 'components/Page/Petani/CardPenjualan';
import { useNavigate } from 'react-router-dom';

const penjualan = [
  {
    id: 0,
    jumlahDijual: 450,
    hargaJual: 40150,
    dijualKepada: { name: 'Rian Sunandar', type: 'Pengumpul' },
    jenisCabai: 'Cabai Merah Besar',
    tanggal: '13 Maret 2022'
  },
  {
    id: 1,
    jumlahDijual: 450,
    hargaJual: 40150,
    dijualKepada: { name: 'Rian Sunandar', type: 'Pengumpul' },
    jenisCabai: 'Cabai Merah Besar',
    tanggal: '13 Maret 2022'
  },
  {
    id: 2,
    jumlahDijual: 450,
    hargaJual: 40150,
    dijualKepada: { name: 'Rian Sunandar', type: 'Pengumpul' },
    jenisCabai: 'Cabai Merah Besar',
    tanggal: '13 Maret 2022'
  }
];

function PenjualanPetani() {
  const navigate = useNavigate();

  return (
    <>
      <TheProfileHeader name="Ahmad" role="petani" />
      <Box display="flex" flexDirection="column" gap={3} p={2} mb="56px">
        <BaseButton
          shape="withicon"
          link="catat-penjualan"
          size="large"
          variant="outlined"
          fullWidth>
          <Typography variant="h5">Catat Penjualan</Typography>
        </BaseButton>
        <BaseTabs
          variant="contained"
          labels={['Cabai Merah Besar', 'Cabai Merah Keriting', 'Cabai Rawit Merah']}>
          {/* CMB */}
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography>Total penjualan Cabai Merah Besar</Typography>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h6">Harga Jual Per kg:</Typography>
              <Typography variant="h6">Rp 40.150</Typography>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h6">Total Terjual:</Typography>
              <Typography variant="h6">1200 kg</Typography>
            </Box>
            <Box p={2} mt={1} borderRadius={1} bgcolor="white">
              <Typography>Hasil Penjualan Cabai Merah Besar (kg)</Typography>
            </Box>
          </Box>
          {/* CMK */}
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography>Total penjualan Cabai Merah Besar</Typography>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h6">Harga Jual Per kg:</Typography>
              <Typography variant="h6">Rp 40.150</Typography>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h6">Total Terjual:</Typography>
              <Typography variant="h6">1200 kg</Typography>
            </Box>
            <Box p={2} mt={1} borderRadius={1} bgcolor="white">
              <Typography>Hasil Penjualan Cabai Merah Keriting (kg)</Typography>
            </Box>
          </Box>
          {/* CRM */}
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography>Total penjualan Cabai Merah Besar</Typography>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h6">Harga Jual Per kg:</Typography>
              <Typography variant="h6">Rp 40.150</Typography>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h6">Total Terjual:</Typography>
              <Typography variant="h6">1200 kg</Typography>
            </Box>
            <Box p={2} mt={1} borderRadius={1} bgcolor="white">
              <Typography>Hasil Penjualan Cabai Rawit Merah (kg)</Typography>
            </Box>
          </Box>
        </BaseTabs>

        <Box display="flex" flexDirection="column" gap={1}>
          <Typography variant="h5">Penjualan Ditunggu</Typography>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography>Menunggu pembeli menerima penjualan anda</Typography>
            <Typography variant="h6" onClick={() => navigate('/petani/riwayat')}>
              Lihat Semua
            </Typography>
          </Box>
        </Box>
        <Stack gap={2}>
          {penjualan.map((item, index) => (
            <CardPenjualan key={index} item={item} />
          ))}
        </Stack>
      </Box>

      <TheBottomNavigation role="petani" />
    </>
  );
}

export default PenjualanPetani;
