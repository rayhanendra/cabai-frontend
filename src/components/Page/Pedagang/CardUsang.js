import { Stack, Typography } from '@mui/material';
import BaseCard from 'components/Base/BaseCard';
import React from 'react';
import { CabaiEnum } from 'utils/constants';
import { formatNumber, formatRupiah } from 'utils/Formats';
import { momentFormat } from 'utils/MomentFormat';

const CardUsang = (props) => {
  const { item } = props;

  return (
    <BaseCard title={momentFormat(item.tanggalPencatatan)} link={`detail-usang/${item._id}`}>
      <Stack gap={1}>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Tipe Cabai</Typography>
          <Typography variant="h6">{CabaiEnum[item.tipeCabai]}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Jumlah Cabai Usang</Typography>
          <Typography variant="h6">{formatNumber(item.jumlahUsang)} kuintal</Typography>
        </Stack>
        {/* <Stack direction="row" justifyContent="space-between">
          <Typography>Total Cabai Sebelumnya</Typography>
          <Typography variant="h6">{item.totalSebelum}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Total Cabai Setelahnya</Typography>
          <Typography variant="h6">{item.totalSetelah}</Typography>
        </Stack> */}
        <Stack direction="row" justifyContent="space-between">
          <Typography>Harga per kg</Typography>
          <Typography variant="h6">{formatRupiah(item.hargaJual)}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Pemanfaatan Cabai</Typography>
          <Typography variant="h6">{item.pemanfaatan}</Typography>
        </Stack>
      </Stack>
    </BaseCard>
  );
};

export default CardUsang;
