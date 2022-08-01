import { Box, Stack, Typography } from '@mui/material';
import BaseButton from 'components/Base/BaseButton';
import BaseCard from 'components/Base/BaseCard';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTransaksi } from 'redux/slices/transaksi';
import { CabaiEnum, RoleEnum, StatusEnum } from 'utils/constants';
import { formatNumber, formatRupiah } from 'utils/Formats';
import { momentFormat } from 'utils/MomentFormat';

const CardTransaksi = (props) => {
  const { item, type } = props;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setLoading(true);
    dispatch(deleteTransaksi(item._id))
      .unwrap()
      .then(() => {})
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  return (
    <>
      <BaseCard
        title={`Status: ${StatusEnum[item.statusTransaksi]} - ${momentFormat(item.createdAt)}`}
        link={`detail-transaksi/${type}/${item._id}`}
        status={item.statusTransaksi}>
        <Stack gap={1}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography>Pembeli</Typography>
            <Typography variant="h6">
              {item.pembeli ? item.pembeli?.name : item.namaPembeli} (
              {item.pembeli ? RoleEnum[item.pembeli?.role] : RoleEnum[item.tipePembeli]})
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography>Tipe Cabai</Typography>
            <Typography variant="h6">{CabaiEnum[item.lahan?.tipeCabai]}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography>Jumlah Dijual</Typography>
            <Typography variant="h6">{formatNumber(item.jumlahDijual)} kuintal</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography>Harga Jual Per kg</Typography>
            <Typography variant="h6">{formatRupiah(item.hargaJual)}</Typography>
          </Stack>
          {item.statusTransaksi === 0 && (
            <Box mt={2}>
              <BaseButton
                shape="error"
                loading={loading}
                fullWidth
                onClick={handleDelete}
                disabled={loading}>
                Batal
              </BaseButton>
            </Box>
          )}
        </Stack>
      </BaseCard>
    </>
  );
};

export default CardTransaksi;
