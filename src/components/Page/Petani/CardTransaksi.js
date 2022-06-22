import { Box, Stack, Typography } from '@mui/material';
import BaseButton from 'components/Base/BaseButton';
import BaseCard from 'components/Base/BaseCard';
import { useDispatch } from 'react-redux';
import { deleteTransaksi } from 'redux/slices/transaksi';
import { CabaiEnum, RoleEnum, StatusEnum } from 'utils/constants';
import { formatNumber, formatRupiah } from 'utils/Formats';
import { momentFormat } from 'utils/MomentFormat';

const CardTransaksi = (props) => {
  const { item } = props;

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTransaksi(item._id));
  };

  return (
    <>
      <BaseCard
        title={`Status: ${StatusEnum[item.statusTransaksi]} - ${momentFormat(item.createdAt)}`}
        link={`detail-transaksi/${item._id}`}
        status={item.statusTransaksi}>
        <Stack gap={1}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography>Dijual Kepada</Typography>
            <Typography variant="h6">
              {item.pembeli ? item.pembeli?.name : item.namaPedagang} (
              {item.pembeli ? RoleEnum[item.pembeli?.role] : RoleEnum[item.tipePedagang]})
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
            <Typography>Harga jual Per kg</Typography>
            <Typography variant="h6">{formatRupiah(item.hargaJual)}</Typography>
          </Stack>
          {item.statusTransaksi === 0 && (
            <Box mt={2}>
              <BaseButton shape="error" fullWidth onClick={handleDelete}>
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
