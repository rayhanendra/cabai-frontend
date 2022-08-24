import { Box, Stack } from '@mui/material';
import BaseTabs from 'components/Base/BaseTabs';
import TheBottomNavigation from 'components/Base/TheBottomNavigation';
import TheProfileHeader from 'components/Base/TheProfileHeader';
import CardRiwayatUsang from 'components/Page/Pedagang/CardRiwayatUsang';
import CardRiwayatTransaksi from 'components/Page/Pedagang/CardRiwayatTransaksi';
import IconNotFound from 'public/images/icons/IconNotFound';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTransaksi } from 'redux/slices/transaksi';
import { getAllUsang } from 'redux/slices/usang';

// import iconNotFound from 'public/images/icons/icon_riwayat_notfound.svg';

function RiwayatPedagang() {
  const dispatch = useDispatch();

  const { riwayatPenjualan } = useSelector((state) => state.transaksi);
  const { riwayatPembelian } = useSelector((state) => state.transaksi);
  // const { riwayat: riwayatTransaksi } = useSelector((state) => state.transaksi);
  const { usang: riwayatUsang } = useSelector((state) => state.usang);

  useEffect(() => {
    dispatch(getAllTransaksi());
    dispatch(getAllUsang());
  }, [dispatch]);

  return (
    <>
      <TheProfileHeader />
      <Box p={2} mb="56px">
        <BaseTabs labels={['Riwayat Transaksi', 'Riwayat Usang']}>
          <Box>
            <BaseTabs labels={['Penjualan', 'Pembelian']}>
              <Stack gap={1.5}>
                {riwayatPenjualan?.map((item, index) => (
                  <CardRiwayatTransaksi key={index} item={item} type="penjualan" />
                ))}
              </Stack>
              <Stack gap={1.5}>
                {riwayatPembelian?.map((item, index) => (
                  <CardRiwayatTransaksi key={index} item={item} type="pembelian" />
                ))}
              </Stack>
            </BaseTabs>
            {/* {riwayatTransaksi ? (
              riwayatTransaksi?.map((item, index) => (
                <CardRiwayatTransaksi key={index} item={item} />
              ))
            ) : (
              <Box>
                <IconNotFound />
                <img src="/images/icons/icon_riwayat_notfound.svg" alt="not found" />
              </Box>
            )} */}
          </Box>
          <Stack gap={1.5}>
            {riwayatUsang ? (
              riwayatUsang.map((item, index) => <CardRiwayatUsang key={index} item={item} />)
            ) : (
              <Box>
                <IconNotFound />
                {/* <img src="/images/icons/icon_riwayat_notfound.svg" alt="not found" /> */}
              </Box>
            )}
          </Stack>
        </BaseTabs>
      </Box>
      <TheBottomNavigation role="pedagang" />
    </>
  );
}

export default RiwayatPedagang;
