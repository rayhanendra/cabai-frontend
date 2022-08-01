import { Stack, Typography } from '@mui/material';
import BaseCard from 'components/Base/BaseCard';
import React from 'react';
import { CabaiEnum } from 'utils/constants';
import { formatNumber, formatRupiah } from 'utils/Formats';
import { momentFormat } from 'utils/MomentFormat';

const CardStok = (props) => {
  const { item } = props;
  return (
    <BaseCard title={momentFormat(item.createdAt)} link={`detail-stok/${item._id}`}>
      <Stack gap={1}>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Tipe Cabai</Typography>
          <Typography variant="h6">{CabaiEnum[item.tipeCabai]}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Total Hasil Panen (kg)</Typography>
          <Typography variant="h6">{formatNumber(item.totalHasilPanen)}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Hasil Panen Sukses (kg)</Typography>
          <Typography variant="h6">{formatNumber(item.hasilPanenSukses)}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Hasil Panen Gagal (kg)</Typography>
          <Typography variant="h6">{formatNumber(item.hasilPanenGagal)}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Harga Jual Per kg (Rp)</Typography>
          <Typography variant="h6">{formatRupiah(item.hargaJual)}</Typography>
        </Stack>
      </Stack>
    </BaseCard>
  );
};

export default CardStok;
