import { Box, Stack, Typography } from '@mui/material';
import BaseTabs from 'components/Base/BaseTabs';
import TheBottomNavigation from 'components/Base/TheBottomNavigation';
import TheProfileHeader from 'components/Base/TheProfileHeader';
import FormikController from 'components/Formik/FormikController';
import { Form, Formik, useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSummaryPedagang, getSummaryPedagangByMonth } from 'redux/slices/transaksi';
import { formatRupiah } from 'utils/Formats';
import { getYearMonthFormat, today } from 'utils/MomentFormat';

const FormObserver = () => {
  const dispatch = useDispatch();
  const { values } = useFormikContext();
  const time = getYearMonthFormat(values.bulanTahun);
  useEffect(() => {
    dispatch(getSummaryPedagangByMonth(time));
  }, [time]);
  return null;
};

function BerandaPedagang() {
  const dispatch = useDispatch();

  const { summary, summaryByMonth } = useSelector((state) => state.transaksi);
  // console.log(summary, summaryByMonth);

  useEffect(() => {
    dispatch(getSummaryPedagang());
  }, [dispatch]);

  const initialValues = {
    bulanTahun: today
  };

  return (
    <>
      <TheProfileHeader />
      <Box p={2} mb={2} pb="56px">
        <BaseTabs labels={['Total Pendapatan', 'Bulanan']}>
          {/* Total Pendapatan */}
          <Stack gap={2}>
            <Stack bgcolor="primary.main" color="white" p={2} gap={1} borderRadius={2}>
              <Typography>Total Pendapatan</Typography>
              <Typography variant="h5">{formatRupiah(summary?.totalPendapatan)}</Typography>
            </Stack>
            <Box gap={2} py={2} bgcolor="dark.light" borderRadius={2}>
              <Box
                color="white"
                bgcolor="primary.main"
                px={2}
                py={1}
                paddingRight={6}
                display="inline-flex"
                borderRadius={'0px 8px 8px 0px'}>
                <Typography variant="h5">Transaksi</Typography>
              </Box>
              <Stack gap={2} p={2}>
                <Stack direction="row" gap={5}>
                  <Box>
                    <Typography>Total Transaksi</Typography>
                    <Typography variant="h5">{summary?.countTransaksiAll}</Typography>
                  </Box>
                  <Box>
                    <Typography>Transaksi Sukses</Typography>
                    <Typography variant="h5" color="primary.main">
                      {summary?.countTransaksiSuksesAll}
                    </Typography>
                  </Box>
                </Stack>
                <Box>
                  <Typography>Total Cabai Dibeli</Typography>
                  <Typography variant="h5">{summary?.countTransaksiSuksesBeli}</Typography>
                </Box>
                <Box>
                  <Typography>Total Cabai Dijual</Typography>
                  <Typography variant="h5">{summary?.countTransaksiSuksesJual}</Typography>
                </Box>
              </Stack>
            </Box>
            <Box gap={2} py={2} bgcolor="dark.light" borderRadius={2}>
              <Box
                color="white"
                bgcolor="primary.main"
                px={2}
                py={1}
                paddingRight={6}
                display="inline-flex"
                borderRadius={'0px 8px 8px 0px'}>
                <Typography variant="h5">Pendapatan</Typography>
              </Box>
              <Stack gap={2} p={2}>
                <Box>
                  <Typography>Pendapatan Cabai Merah Besar</Typography>
                  <Typography variant="h5" color="primary.main">
                    {formatRupiah(summary?.pendapatanCMB)}
                  </Typography>
                </Box>
                <Box>
                  <Typography>Pendapatan Cabai Merah Keriting</Typography>
                  <Typography variant="h5" color="primary.main">
                    {formatRupiah(summary?.pendapatanCMK)}
                  </Typography>
                </Box>
                <Box>
                  <Typography>Pendapatan Cabai Rawit Merah</Typography>
                  <Typography variant="h5" color="primary.main">
                    {formatRupiah(summary?.pendapatanCRM)}
                  </Typography>
                </Box>
                <Typography variant="h5">Total Pendapatan</Typography>
                <Stack direction="row" gap={1}>
                  <Typography>Pembelian</Typography>
                  <Typography variant="h5" color="primary.main">
                    {formatRupiah(summary?.totalPendapatan)}
                  </Typography>
                </Stack>
                <Stack direction="row" gap={1}>
                  <Typography>Penjualan</Typography>
                  <Typography variant="h5" color="primary.main">
                    {formatRupiah(summary?.totalPendapatan)}
                  </Typography>
                </Stack>
                <Stack direction="row" gap={1}>
                  <Typography>Pendapatan</Typography>
                  <Typography variant="h5" color="primary.main">
                    {formatRupiah(summary?.totalPendapatan)}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Stack>
          {/* Bulanan */}
          <Stack gap={2}>
            <Formik initialValues={initialValues}>
              {(formikProps) => (
                <Form>
                  <FormObserver />
                  <Stack>
                    <FormikController
                      control="datepicker"
                      name="bulanTahun"
                      label="Pilih Bulan"
                      month
                      formikProps={formikProps}
                    />
                  </Stack>
                </Form>
              )}
            </Formik>
            <Stack bgcolor="primary.main" color="white" p={2} gap={1} borderRadius={2}>
              <Typography>Pendapatan Bulan Ini</Typography>
              <Typography variant="h5">{formatRupiah(summaryByMonth?.totalPendapatan)}</Typography>
            </Stack>
            <Box gap={2} py={2} bgcolor="dark.light" borderRadius={2}>
              <Box
                color="white"
                bgcolor="primary.main"
                px={2}
                py={1}
                paddingRight={6}
                display="inline-flex"
                borderRadius={'0px 8px 8px 0px'}>
                <Typography variant="h5">Transaksi</Typography>
              </Box>
              <Stack gap={2} p={2}>
                <Stack direction="row" gap={5}>
                  <Box>
                    <Typography>Total Transaksi</Typography>
                    <Typography variant="h5">{summaryByMonth?.countTransaksiAll}</Typography>
                  </Box>
                  <Box>
                    <Typography>Transaksi Sukses</Typography>
                    <Typography variant="h5" color="primary.main">
                      {summaryByMonth?.countTransaksiSuksesAll}
                    </Typography>
                  </Box>
                </Stack>
                <Box>
                  <Typography>Total Cabai Dibeli</Typography>
                  <Typography variant="h5" color="primary.main">
                    {summaryByMonth?.countTransaksiSuksesBeli}
                  </Typography>
                </Box>
                <Box>
                  <Typography>Total Cabai Dijual</Typography>
                  <Typography variant="h5" color="primary.main">
                    {summaryByMonth?.countTransaksiSuksesJual}
                  </Typography>
                </Box>
              </Stack>
            </Box>
            <Box gap={2} py={2} bgcolor="dark.light" borderRadius={2}>
              <Box
                color="white"
                bgcolor="primary.main"
                px={2}
                py={1}
                paddingRight={6}
                display="inline-flex"
                borderRadius={'0px 8px 8px 0px'}>
                <Typography variant="h5">Pendapatan</Typography>
              </Box>
              <Stack gap={2} p={2}>
                <Box>
                  <Typography>Pendapatan Cabai Merah Besar</Typography>
                  <Typography variant="h5" color="primary.main">
                    {formatRupiah(summaryByMonth?.pendapatanCMB)}
                  </Typography>
                </Box>
                <Box>
                  <Typography>Pendapatan Cabai Merah Keriting</Typography>
                  <Typography variant="h5" color="primary.main">
                    {formatRupiah(summaryByMonth?.pendapatanCMK)}
                  </Typography>
                </Box>
                <Box>
                  <Typography>Pendapatan Cabai Rawit Merah</Typography>
                  <Typography variant="h5" color="primary.main">
                    {formatRupiah(summaryByMonth?.pendapatanCRM)}
                  </Typography>
                </Box>
                <Typography variant="h5">Total Pendapatan</Typography>
                <Stack direction="row" gap={1}>
                  <Typography>Pembelian</Typography>
                  <Typography variant="h5">
                    {formatRupiah(summaryByMonth?.totalPembelian)}
                  </Typography>
                </Stack>
                <Stack direction="row" gap={1}>
                  <Typography>Penjualan</Typography>
                  <Typography variant="h5">
                    {formatRupiah(summaryByMonth?.totalPenjualan)}
                  </Typography>
                </Stack>
                <Stack direction="row" gap={1}>
                  <Typography>Pendapatan</Typography>
                  <Typography variant="h5" color="primary.main">
                    {formatRupiah(summaryByMonth?.totalPendapatan)}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </BaseTabs>
      </Box>
      <TheBottomNavigation role="pedagang" />
    </>
  );
}

export default BerandaPedagang;
