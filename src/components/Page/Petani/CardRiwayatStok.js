import { Stack, Typography } from '@mui/material';
import BaseCard from 'components/Base/BaseCard';
import React from 'react';
import { momentFormat } from 'utils/MomentFormat';

const CardRiwayatStok = (props) => {
  const { item } = props;

  return (
    <BaseCard>
      <Stack gap={1}>
        <Typography variant="h6">{momentFormat(item.createdAt)}</Typography>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Tipe Cabai</Typography>
          <Typography variant="h6">{item.tipeCabai}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Total Hasil Panen (kg)</Typography>
          <Typography variant="h6">{item.totalHasilPanen}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Harga Panen Sukses (kg)</Typography>
          <Typography variant="h6">{item.panenSukses}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Harga Panen Gagal (kg)</Typography>
          <Typography variant="h6">{item.hasilPanenGagal}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Harga Jual Per kg (Rp)</Typography>
          <Typography variant="h6">{item.hargaJual}</Typography>
        </Stack>
      </Stack>
    </BaseCard>
  );
};

export default CardRiwayatStok;
