import { Box, Stack, Typography } from '@mui/material';
import BaseButton from 'components/Base/BaseButton';
import BaseCard from 'components/Base/BaseCard';
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { acceptTransaksi, declineTransaksi, deleteTransaksi } from 'redux/slices/transaksi';
import { CabaiEnum, RoleEnum, StatusEnum } from 'utils/constants';
import { formatNumber, formatRupiah } from 'utils/Formats';
import { momentFormat } from 'utils/MomentFormat';

const CardTransaksi = (props) => {
  const { item, type, button } = props;

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTransaksi(item._id));
  };

  const handleDecline = () => {
    dispatch(declineTransaksi(item._id));
  };

  const handleAccept = () => {
    dispatch(acceptTransaksi(item._id));
  };

  if (!item) return <Fragment />;
  return (
    <>
      <BaseCard
        title={`Status: ${StatusEnum[item.statusTransaksi]} - ${momentFormat(item.createdAt)}`}
        link={`detail-transaksi/${type}/${item._id}`}
        status={item.statusTransaksi}>
        <Stack gap={1}>
          {type === 'diajukan' && (
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography>Dijual Kepada</Typography>
              <Typography variant="h6">
                {item.pembeli?.name} ({RoleEnum[item.pembeli?.role]})
              </Typography>
            </Stack>
          )}
          {type === 'konfirmasi' && (
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography>Dibeli Dari</Typography>
              <Typography variant="h6">
                {item.penjual?.name} ({RoleEnum[item.penjual?.role]})
              </Typography>
            </Stack>
          )}
          <Stack direction="row" justifyContent="space-between">
            <Typography>Tipe Cabai</Typography>
            <Typography variant="h6">{CabaiEnum[item.tipeCabai]}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography>Jumlah Dijual</Typography>
            <Typography variant="h6">{formatNumber(item.jumlahDijual)}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography>Harga jual Per kg</Typography>
            <Typography variant="h6">{formatRupiah(item.hargaJual)}</Typography>
          </Stack>
          {button && (
            <Box display="flex" flexDirection="row" alignItems="center" gap={2} mt={1}>
              {button === 'diajukan' && (
                <>
                  <BaseButton shape="error" variant="outlined" fullWidth onClick={handleDelete}>
                    Batal
                  </BaseButton>
                </>
              )}
              {button === 'konfirmasi' && (
                <>
                  <BaseButton shape="error" variant="outlined" fullWidth onClick={handleDecline}>
                    Tolak
                  </BaseButton>
                  <BaseButton fullWidth onClick={handleAccept}>
                    Terima
                  </BaseButton>
                </>
              )}
            </Box>
          )}
        </Stack>
      </BaseCard>
    </>
  );
};

export default CardTransaksi;
