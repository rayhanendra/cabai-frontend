import { Box, Divider, Stack, Typography } from '@mui/material';
import BaseTabs from 'components/Base/BaseTabs';
import TheBottomNavigation from 'components/Base/TheBottomNavigation';
import TheProfileHeader from 'components/Base/TheProfileHeader';
import FormikController from 'components/Formik/FormikController';
import { Form, Formik, useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStokByMonth, getSyncStok } from 'redux/slices/stok';
import { formatRupiah } from 'utils/Formats';
import { getYearMonthFormat, today } from 'utils/MomentFormat';

const FormObserver = () => {
  const dispatch = useDispatch();
  const { values } = useFormikContext();
  const time = getYearMonthFormat(values.bulanTahun);
  useEffect(() => {
    console.log('FormObserver::values', values);
    console.log('ini time', time);
    dispatch(getStokByMonth(time));
  }, [time]);
  return null;
};

function BerandaPedagang() {
  const dispatch = useDispatch();

  const { dashboard, transaksi } = useSelector((state) => state.stok);
  console.log(dashboard, transaksi);

  useEffect(() => {
    dispatch(getSyncStok());
  }, [dispatch]);

  const initialValues = {
    bulanTahun: today
  };

  return (
    <>
      <TheProfileHeader />
      <Stack gap={3} p={2} mb={2} pb="56px">
        <BaseTabs
          variant="contained"
          labels={['Cabai Merah Besar', 'Cabai Merah Keriting', 'Cabai Rawit Merah']}>
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography>
              Stok terkini yang anda miliki didapatkan dari pembelian transaksi
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              p={2}
              mt={1}
              borderRadius={1}
              bgcolor="white">
              <Typography>Total Stok:</Typography>
              <Typography variant="h6">{dashboard.stokCMB ?? '-'} kuintal</Typography>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography>
              Stok terkini yang anda miliki didapatkan dari pembelian transaksi
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              p={2}
              mt={1}
              borderRadius={1}
              bgcolor="white">
              <Typography>Total Stok:</Typography>
              <Typography variant="h6">{dashboard.stokCMK ?? '-'} kuintal</Typography>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography>
              Stok terkini yang anda miliki didapatkan dari pembelian transaksi
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              p={2}
              mt={1}
              borderRadius={1}
              bgcolor="white">
              <Typography>Total Stok:</Typography>
              <Typography variant="h6">{dashboard.stokCRM ?? '-'} kuintal</Typography>
            </Box>
          </Box>
        </BaseTabs>
        <Formik initialValues={initialValues}>
          {(formikProps) => (
            <Form>
              <FormObserver />
              <FormikController
                control="datepicker"
                name="bulanTahun"
                label="Pilih Bulan"
                month
                formikProps={formikProps}
              />
            </Form>
          )}
        </Formik>
        <Divider />
        <Stack direction="row" justifyContent="space-between">
          <Box>
            <Typography>Total Transaksi</Typography>
            <Typography variant="h5">{transaksi.totalTransaksi}</Typography>
          </Box>
          <Box>
            <Typography>Transaksi Sukses</Typography>
            <Typography variant="h5" color="primary.main">
              {transaksi.transaksiSukses}
            </Typography>
          </Box>
        </Stack>
        <Box>
          <Typography>Total Pengeluaran</Typography>
          <Typography variant="h5">{formatRupiah(transaksi.totalPengeluaran) ?? 0}</Typography>
        </Box>
        <Box>
          <Typography>Pendapatan Cabai Merah Besar</Typography>
          <Typography variant="h5" color="primary.main">
            {formatRupiah(transaksi.pendapatanCMB) ?? 0}
          </Typography>
        </Box>
        <Box>
          <Typography>Pendapatan Cabai Merah Keriting</Typography>
          <Typography variant="h5" color="primary.main">
            {formatRupiah(transaksi.pendapatanCMK) ?? 0}
          </Typography>
        </Box>
        <Box>
          <Typography>Pendapatan Cabai Rawit Merah</Typography>
          <Typography variant="h5" color="primary.main">
            {formatRupiah(transaksi.pendapatanCRM) ?? 0}
          </Typography>
        </Box>
        <Box>
          <Typography>Total Pendapatan</Typography>
          <Typography variant="h5" color="primary.main">
            {formatRupiah(transaksi.totalPendapatan) ?? 0}
          </Typography>
        </Box>
      </Stack>
      <TheBottomNavigation role="pedagang" />
    </>
  );
}

export default BerandaPedagang;
