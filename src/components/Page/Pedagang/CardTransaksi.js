import { Box, Stack, Typography } from '@mui/material';
import BaseButton from 'components/Base/BaseButton';
import BaseCard from 'components/Base/BaseCard';
import React from 'react';
import { CabaiEnum, RoleEnum, StatusEnum } from 'utils/constants';
import { formatNumber, formatRupiah } from 'utils/Formats';
import { momentFormat } from 'utils/MomentFormat';

const CardTransaksi = (props) => {
  const { item, confirm, wait } = props;

  return (
    <BaseCard
      title={`Status: ${StatusEnum[item.statusPenjualan]} - ${momentFormat(item.createdAt)}`}
      status={item.statusPenjualan}
      link={`detail-transaksi/${item._id}`}>
      <Stack gap={1}>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Dijual Kepada</Typography>
          <Typography variant="h6">
            {item.pembeli.name} ({RoleEnum[item.pembeli.role]})
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Tipe Cabai</Typography>
          <Typography variant="h6">{CabaiEnum[item.tipeCabai]}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Jumlah Dijual</Typography>
          <Typography variant="h6">{formatNumber(item.jumlahDijual)}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Harga Jual Per kg</Typography>
          <Typography variant="h6">{formatRupiah(item.hargaJual)}</Typography>
        </Stack>
        {confirm && wait && (
          <Box display="flex" flexDirection="row" alignItems="center" gap={2} mt={1}>
            {confirm && (
              <>
                <BaseButton shape="error" variant="outlined" fullWidth>
                  Batal
                </BaseButton>
                <BaseButton fullWidth>Terima</BaseButton>
              </>
            )}
            {wait && (
              <>
                <BaseButton shape="error" variant="outlined" fullWidth>
                  Batal
                </BaseButton>
              </>
            )}
          </Box>
        )}
      </Stack>
    </BaseCard>
  );
};

export default CardTransaksi;