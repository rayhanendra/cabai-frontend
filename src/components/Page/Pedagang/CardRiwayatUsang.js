import { Stack, Typography } from '@mui/material';
import BaseCard from 'components/Base/BaseCard';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CardRiwayatUsang = (props) => {
  const { item } = props;
  const navigate = useNavigate();

  const handleDetail = () => {
    navigate(`detail-usang/${item._id}`);
  };

  return (
    <BaseCard onClick={handleDetail}>
      <Stack gap={1}>
        <Typography variant="h6">{item.tanggalPencatatan}</Typography>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Tipe Cabai</Typography>
          <Typography variant="h6">{item.tipeCabai}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Jumlah Cabai Usang</Typography>
          <Typography variant="h6">{item.jumlahUsang}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Total Cabai Sebelumnya</Typography>
          <Typography variant="h6">{item.totalSebelum}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Total Cabai Setelahnya</Typography>
          <Typography variant="h6">{item.totalSetelah}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Harga Jual Per kg</Typography>
          <Typography variant="h6">{item.hargaJual}</Typography>
        </Stack>
      </Stack>
    </BaseCard>
  );
};

export default CardRiwayatUsang;
