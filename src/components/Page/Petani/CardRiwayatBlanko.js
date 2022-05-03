import { Stack, Typography } from '@mui/material';
import BaseCard from 'components/Base/BaseCard';
import React from 'react';
import { CabaiEnum } from 'utils/constants';
import { momentFormat } from 'utils/MomentFormat';

const CardRiwayatBlanko = (props) => {
  const { item } = props;

  return (
    <BaseCard>
      <Stack gap={1}>
        <Typography variant="h6">{momentFormat(item.createdAt)}</Typography>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Tipe Cabai</Typography>
          <Typography variant="h6">{CabaiEnum[item.tipeCabai]}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Total Panen</Typography>
          <Typography variant="h6">{item.luasPanenHabis}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Harga Per kg</Typography>
          <Typography variant="h6">{item.rataHargaJual}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Luas tanaman akhir bulan lalu (Ha)</Typography>
          <Typography variant="h6">{item.luasTanamanAkhirBulanLalu}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Luas panen habis / dibongkar (Ha)</Typography>
          <Typography variant="h6">{item.luasPanenHabis}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Luas panen belum habis (Ha)</Typography>
          <Typography variant="h6">{item.luasPanenBelumHabis}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Luas rusak/tidak berhasil/puso (Ha)</Typography>
          <Typography variant="h6">{item.luasRusak}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Luas penanaman baru/tambah tanam (Ha)</Typography>
          <Typography variant="h6">{item.luasPenanamanBaru}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Luas tanaman akhir bulan laporan (Ha)</Typography>
          <Typography variant="h6">{item.luasTanamanAkhirBulanLaporan}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Produksi dipanen habis/dibongkar (Kwintal)</Typography>
          <Typography variant="h6">{item.prodPanenHabis}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Produksi belum habis (Kwintal)</Typography>
          <Typography variant="h6">{item.prodBelumHabis}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Rata-rata harga jual petani per kilogram (Rupiah)</Typography>
          <Typography variant="h6">{item.rataHargaJual}</Typography>
        </Stack>
      </Stack>
    </BaseCard>
  );
};

export default CardRiwayatBlanko;
