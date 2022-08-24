import { Box, Stack, Typography } from '@mui/material';
import BaseButton from 'components/Base/BaseButton';
import BaseCard from 'components/Base/BaseCard';
import BaseLoading from 'components/Base/BaseLoading';
import { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { acceptTransaksi, declineTransaksi, deleteTransaksi } from 'redux/slices/transaksi';
import { CabaiEnum, RoleEnum, StatusEnum } from 'utils/constants';
import { formatNumber, formatRupiah } from 'utils/Formats';
import { momentFormat } from 'utils/MomentFormat';

const CardTransaksi = (props) => {
  const { item, type, button } = props;

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

  const handleDecline = () => {
    setLoading(true);
    dispatch(declineTransaksi(item._id))
      .unwrap()
      .then(() => {})
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const handleAccept = () => {
    setLoading(true);
    dispatch(acceptTransaksi(item._id))
      .unwrap()
      .then(() => {})
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  if (!item) return <Fragment />;
  return (
    <>
      <BaseCard
        title={`Status: ${StatusEnum[item.statusTransaksi]} - ${momentFormat(
          item.tanggalPencatatan
        )}`}
        link={`detail-transaksi/${type}/${item._id}`}
        status={item.statusTransaksi}>
        <Stack gap={1}>
          {(type === 'diajukan' || type === 'diterima') && (
            <>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography>Pembeli</Typography>
                <Typography variant="h6">
                  {item.pembeli ? item.pembeli?.name : item.namaPembeli}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography>Peran</Typography>
                <Typography variant="h6">
                  {item.pembeli ? RoleEnum[item.pembeli?.role] : RoleEnum[item.tipePembeli]}
                </Typography>
              </Stack>
            </>
          )}
          {type === 'konfirmasi' && (
            <>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography>Penjual</Typography>
                <Typography variant="h6">{item.penjual?.name}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography>Peran</Typography>
                <Typography variant="h6">{RoleEnum[item.penjual?.role]}</Typography>
              </Stack>
            </>
          )}
          <Stack direction="row" justifyContent="space-between">
            <Typography>Tipe Cabai</Typography>
            <Typography variant="h6">{CabaiEnum[item.tipeCabai]}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography>Jumlah Dijual</Typography>
            <Typography variant="h6">{formatNumber(item.jumlahDijual)} kuintal</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography>Harga Jual Per kg</Typography>
            <Typography variant="h6">{formatRupiah(item.hargaJual)}</Typography>
          </Stack>
          {loading ? (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              border="1px solid gray"
              borderRadius={2}
              p={1}
              mt={1}
              color="gray">
              <BaseLoading />
            </Box>
          ) : (
            button && (
              <Box display="flex" flexDirection="row" alignItems="center" gap={2} mt={1}>
                {button === 'diajukan' && (
                  <>
                    <BaseButton
                      shape="error"
                      variant="outlined"
                      fullWidth
                      onClick={handleDelete}
                      loading={loading}
                      disabled={loading}>
                      Batal
                    </BaseButton>
                  </>
                )}
                {button === 'konfirmasi' && (
                  <>
                    <BaseButton
                      shape="error"
                      variant="outlined"
                      fullWidth
                      onClick={handleDecline}
                      loading={loading}
                      disabled={loading}>
                      Tolak
                    </BaseButton>
                    <BaseButton
                      fullWidth
                      onClick={handleAccept}
                      loading={loading}
                      disabled={loading}>
                      Terima
                    </BaseButton>
                  </>
                )}
              </Box>
            )
          )}
        </Stack>
      </BaseCard>
    </>
  );
};

export default CardTransaksi;
