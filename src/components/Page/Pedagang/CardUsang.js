import { Stack, Typography } from '@mui/material';
import BaseCard from 'components/Base/BaseCard';
import React from 'react';
import { CabaiEnum } from 'utils/constants';
import { formatNumber } from 'utils/Formats';
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
        <Stack direction="row" justifyContent="space-between">
          <Typography>Pemanfaatan Cabai</Typography>
          <Typography variant="h6" textTransform="capitalize">
            {item.pemanfaatan}
          </Typography>
        </Stack>
      </Stack>
    </BaseCard>
  );
};

export default CardUsang;
