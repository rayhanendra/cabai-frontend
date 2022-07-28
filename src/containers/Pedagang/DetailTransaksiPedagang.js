import { Stack, Typography } from '@mui/material';
import BaseHeader from 'components/Base/BaseHeader';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getTransaksiById } from 'redux/slices/transaksi';
import { CabaiEnum, StatusEnum } from 'utils/constants';
import { momentFormat } from 'utils/MomentFormat';
import theme from 'themes/theme';
import BaseButton from 'components/Base/BaseButton';
import BaseListDetail from 'components/Base/BaseListDetail';

function DetailTransaksiPedagang() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { type, id } = useParams();
  const { detail } = useSelector((state) => state.transaksi);

  useEffect(() => {
    dispatch(getTransaksiById(id));
  }, [dispatch]);

  const data = {
    diajukan: [
      { label: 'Nama Pembeli', value: detail?.pembeli?.name },
      { label: 'Peran', value: detail?.pembeli?.role }
    ],
    konfirmasi: [
      { label: 'Nama Penjual', value: detail?.penjual?.name },
      { label: 'Peran', value: detail?.penjual?.role }
    ],
    other: [
      { label: 'Jumlah yang terjual (kg)', value: detail?.jumlahDijual },
      { label: 'Harga jual per kg (Rp/kg)', value: detail?.hargaJual }
      // { label: 'Total Pendapatan (Rp)', value: detail?.totalPendapatan }
    ]
  };

  return (
    <>
      <BaseHeader
        label={`${CabaiEnum[detail?.tipeCabai]} - ${momentFormat(detail?.createdAt)}`}
        to={-1}
      />
      <Stack gap={3} pt={2} px={2}>
        <Typography
          variant="h4"
          color={
            detail?.statusTransaksi === 2
              ? 'primary'
              : detail?.statusTransaksi === 1
              ? theme.palette.red.main
              : ''
          }>
          Status: {StatusEnum[detail?.statusTransaksi]}
        </Typography>
        {type === 'diajukan' && <BaseListDetail data={data.diajukan} />}
        {type === 'konfirmasi' && <BaseListDetail data={data.konfirmasi} />}
        {!type && <BaseListDetail data={data.diajukan} />}
        <BaseListDetail data={data.other} />
        {detail?.statusTransaksi === 1 && (
          <BaseButton
            shape="outlined"
            onClick={() => navigate('/pedagang/transaksi/ulang-transaksi/' + detail?._id)}>
            Ajukan Kembali
          </BaseButton>
        )}
      </Stack>
    </>
  );
}

export default DetailTransaksiPedagang;
