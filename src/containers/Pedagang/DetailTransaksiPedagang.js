import { Stack, Typography } from '@mui/material';
import BaseHeader from 'components/Base/BaseHeader';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getTransaksiById } from 'redux/slices/transaksi';
import { CabaiEnum, GradeEnum, RoleEnum, StatusEnum } from 'utils/constants';
import { momentFormat } from 'utils/MomentFormat';
import theme from 'themes/theme';
import BaseButton from 'components/Base/BaseButton';
import BaseListDetail from 'components/Base/BaseListDetail';
import { Fragment } from 'react';
import { formatNumber, formatRupiah } from 'utils/Formats';

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
      {
        label: 'Nama Pembeli',
        value: detail.pembeli ? detail?.pembeli?.name : detail.namaPembeli
      },
      {
        label: 'Peran',
        value: detail.pembeli ? RoleEnum[detail?.pembeli?.role] : RoleEnum[detail.tipePembeli]
      }
    ],
    konfirmasi: [
      { label: 'Nama Penjual', value: detail?.penjual?.name },
      {
        label: 'Peran',
        value: detail.penjual ? RoleEnum[detail?.penjual?.role] : RoleEnum[detail.tipePembeli]
      }
    ],
    diterima: [
      {
        label: 'Nama Pembeli',
        value: detail.pembeli ? detail?.pembeli?.name : detail.namaPembeli
      },
      {
        label: 'Peran',
        value: detail.pembeli ? RoleEnum[detail?.pembeli?.role] : RoleEnum[detail.tipePembeli]
      }
    ],
    other: [
      {
        label: 'Grade',
        value: GradeEnum[detail?.grade] ?? '-'
      },
      {
        label: 'Jumlah yang terjual (kuintal)',
        value: `${formatNumber(detail?.jumlahDijual)} kuintal`
      },
      { label: 'Harga Jual Per kg (Rp/kg)', value: formatRupiah(detail?.hargaJual) }
    ]
  };

  if (!detail) return <Fragment />;

  return (
    <>
      <BaseHeader
        label={`${CabaiEnum[detail?.tipeCabai]} - ${momentFormat(detail?.tanggalPencatatan)}`}
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
        {type === 'diterima' && <BaseListDetail data={data.diterima} />}
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
