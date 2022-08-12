import { Stack, Typography } from '@mui/material';
import BaseCard from 'components/Base/BaseCard';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CabaiEnum, RoleEnum, StatusEnum, StatusEnumSmall } from 'utils/constants';
import { formatNumber, formatRupiah } from 'utils/Formats';
import { momentFormat } from 'utils/MomentFormat';

const CardRiwayatTransaksi = (props) => {
  const { item } = props;

  const navigate = useNavigate();

  const data = [
    { label: 'Status', value: StatusEnum[item.statusTransaksi] },
    {
      label: 'Pembeli',
      value: item.pembeli?.name ?? item.namaPembeli
    },
    {
      label: 'Tipe Pembeli',
      value: RoleEnum[item.pembeli?.role] ?? item.tipePembeli
    },
    { label: 'Tipe Cabai', value: CabaiEnum[item.lahan.tipeCabai] },
    { label: 'Jumlah Dijual', value: `${formatNumber(item.jumlahDijual)} kuintal` },
    { label: 'Harga Per kg', value: formatRupiah(item.hargaJual) }
  ];

  return (
    <BaseCard
      onClick={() =>
        navigate(
          `/petani/transaksi/detail-transaksi/${StatusEnumSmall[item.statusTransaksi]}/${item._id}`
        )
      }>
      <Stack gap={1}>
        <Typography variant="h6">{momentFormat(item.tanggalPencatatan)}</Typography>
        {data.map(({ label, value }, index) => (
          <Stack key={index} direction="row" justifyContent="space-between">
            <Typography>{label}</Typography>
            <Typography variant="h6">{value}</Typography>
          </Stack>
        ))}
      </Stack>
    </BaseCard>
  );
};

export default CardRiwayatTransaksi;
