import { Stack, Typography } from '@mui/material';
import BaseCard from 'components/Base/BaseCard';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatNumber, formatRupiah } from 'utils/Formats';
import { momentFormat } from 'utils/MomentFormat';

function CardRiwayatLahan(props) {
  const { item } = props;

  const navigate = useNavigate();

  const data = [
    {
      label: 'Tanggal Penanaman',
      value: momentFormat(item.tanggalTanam)
    },
    {
      label: 'Jumlah Batang yang Ditanam',
      value: item.jumlahBatang
    },
    {
      label: 'Total Hasil Panen (kuintal)',
      value: `${formatNumber(item.jumlahPanen)} kuintal` ?? '-'
    },
    {
      label: 'Total Penjualan',
      value: formatRupiah(item.jumlahPenjualan) ?? '-'
    }
  ];

  return (
    <BaseCard onClick={() => navigate(`/petani/lahan/detail-lahan/${item._id}`)}>
      <Stack gap={1}>
        {data.map(({ label, value }, index) => (
          <Stack key={index} direction="row" justifyContent="space-between">
            <Typography>{label}</Typography>
            <Typography variant="h6">{value}</Typography>
          </Stack>
        ))}
      </Stack>
    </BaseCard>
  );
}

export default CardRiwayatLahan;
