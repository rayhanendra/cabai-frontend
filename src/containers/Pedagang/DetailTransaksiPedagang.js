import { Box, Divider, Stack, Typography } from '@mui/material';
import BaseHeader from 'components/Base/BaseHeader';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTransaksiById } from 'redux/slices/transaksi';

const data = {
  pembeli: {
    nama: 'Alsyad Dewanda',
    peran: 'Distributor'
  },
  jumlahTerjual: 80,
  hargaPerKilo: 48000,
  totalPendapatan: 4480000,
  tipe: 'Cabai Merah Keriting',
  tanggal: '28 Februari 2022',
  status: 'Menunggu Konfirmasi'
};

function DetailTransaksiPedagang() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { detail } = useSelector((state) => state.transaksi);
  console.log('ini detail', detail);

  useEffect(() => {
    dispatch(getTransaksiById(id));
  }, [dispatch]);

  return (
    <>
      <BaseHeader label={`${data.tipe} - ${data.tanggal}`} to={-1} />
      <Stack gap={3} px={2}>
        <Typography variant="h4">Status: {data.status}</Typography>
        <Box>
          <Typography variant="h5">Nama Pembeli</Typography>
          <Typography variant="body2">{data.pembeli.nama}</Typography>
          <Divider />
        </Box>
        <Box>
          <Typography variant="h5">Peran</Typography>
          <Typography variant="body2">{data.pembeli.peran}</Typography>
          <Divider />
        </Box>
        <Box>
          <Typography variant="h5">Jumlah yang terjual (kg)</Typography>
          <Typography variant="body2">{data.jumlahTerjual}</Typography>
          <Divider />
        </Box>
        <Box>
          <Typography variant="h5">Harga jual per kg (Rp/kg)</Typography>
          <Typography variant="body2">{data.hargaPerKilo}</Typography>
          <Divider />
        </Box>
        <Box>
          <Typography variant="h5">Total Pendapatan (Rp)</Typography>
          <Typography variant="body2">{data.totalPendapatan}</Typography>
          <Divider />
        </Box>
      </Stack>
    </>
  );
}

export default DetailTransaksiPedagang;