import { Box, Typography } from '@mui/material';
import BaseCard from 'components/Base/BaseCard';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CabaiEnum, RoleEnum, StatusEnum } from 'utils/constants';
import { formatNumber, formatRupiah } from 'utils/Formats';
import { momentFormat } from 'utils/MomentFormat';

const CardRiwayatTransaksi = (props) => {
  const { item } = props;

  const navigate = useNavigate();

  return (
    <BaseCard
      display="flex"
      flexDirection="column"
      gap={1}
      onClick={() => navigate(`detail-transaksi/${item._id}`)}>
      <Typography variant="h6">{momentFormat(item.tanggalPencatatan)}</Typography>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography>Status</Typography>
        <Typography variant="h6">{StatusEnum[item.statusTransaksi]}</Typography>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography>Pembeli</Typography>
        <Typography variant="h6">
          {item.pembeli?.name ?? item.namaPembeli} (
          {RoleEnum[item.pembeli?.role] ?? item.tipePembeli})
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography>Tipe Cabai</Typography>
        <Typography variant="h6">{CabaiEnum[item.tipeCabai]}</Typography>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography>Jumlah Dijual</Typography>
        <Typography variant="h6">{formatNumber(item.jumlahDijual)} kuintal</Typography>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography>Harga Per kg</Typography>
        <Typography variant="h6">{formatRupiah(item.hargaJual)}</Typography>
      </Box>
    </BaseCard>
  );
};

export default CardRiwayatTransaksi;
