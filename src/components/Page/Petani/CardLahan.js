import PropTypes from 'prop-types';
import { Stack, Typography } from '@mui/material';
import BaseCard from 'components/Base/BaseCard';
import { CabaiEnum } from 'utils/constants';
import { momentFormat } from 'utils/MomentFormat';
import { formatNumber } from 'utils/Formats';

const CardLahanPetani = (props) => {
  const { item } = props;

  const data = [
    {
      label: 'Tanggal Penanaman',
      value: momentFormat(item.createdAt)
    },
    {
      label: 'Jumlah Batang yang Ditanam',
      value: formatNumber(item.jumlahBatang)
    },
    {
      label: 'Total Hasil Panen (kwintal)',
      value: formatNumber(item.jumlahPanen)
    },
    {
      label: 'Total Penjualan',
      value: formatNumber(item.jumlahPenjualan)
    }
  ];

  return (
    <>
      <BaseCard
        title={`${item.namaLahan} - ${CabaiEnum[item.tipeCabai]}`}
        link={`/petani/lahan/detail-lahan/${item._id}`}>
        <Stack gap={1}>
          {data?.map(({ label, value }, index) => (
            <Stack key={index} direction="row" justifyContent="space-between">
              <Typography variant="body1">{label}</Typography>
              <Typography variant="h6">{value}</Typography>
            </Stack>
          ))}
        </Stack>
      </BaseCard>
    </>
  );
};

CardLahanPetani.propTypes = {
  item: PropTypes.object
};

export default CardLahanPetani;
