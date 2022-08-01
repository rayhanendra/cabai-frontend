import { Stack, Typography } from '@mui/material';
import BaseCard from 'components/Base/BaseCard';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CabaiEnum } from 'utils/constants';
import { momentFormat } from 'utils/MomentFormat';

const CardRiwayatBlanko = (props) => {
  const { item } = props;

  const navigate = useNavigate();

  return (
    <BaseCard onClick={() => navigate(`/petani/beranda/detail-blanko/${item._id}`)}>
      <Stack gap={1}>
        <Typography variant="h6">{momentFormat(item.createdAt)}</Typography>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Tipe Cabai</Typography>
          <Typography variant="h6">{CabaiEnum[item.tipeCabai]}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Total Panen</Typography>
          <Typography variant="h6">{item.luasPanenHabis ?? '-'} </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Harga Per kg</Typography>
          <Typography variant="h6">{item.rataHargaJual ?? '-'}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Luas tanaman akhir bulan lalu (ha)</Typography>
          <Typography variant="h6">{item.luasTanamanAkhirBulanLalu ?? '-'}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Luas panen habis / dibongkar (ha)</Typography>
          <Typography variant="h6">{item.luasPanenHabis ?? '-'}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Luas panen belum habis (ha)</Typography>
          <Typography variant="h6">{item.luasPanenBelumHabis ?? '-'}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Luas rusak/tidak berhasil/puso (ha)</Typography>
          <Typography variant="h6">{item.luasRusak ?? '-'}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Luas penanaman baru/tambah tanam (ha)</Typography>
          <Typography variant="h6">{item.luasPenanamanBaru ?? '-'}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Luas tanaman akhir bulan laporan (ha)</Typography>
          <Typography variant="h6">{item.luasTanamanAkhirBulanLaporan ?? '-'}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Produksi dipanen habis/dibongkar (kuintal)</Typography>
          <Typography variant="h6">{item.prodPanenHabis ?? '-'}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Produksi belum habis (kuintal)</Typography>
          <Typography variant="h6">{item.prodBelumHabis ?? '-'}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Rata-rata harga jual petani per kilogram (Rupiah)</Typography>
          <Typography variant="h6">{item.rataHargaJual ?? '-'}</Typography>
        </Stack>
      </Stack>
    </BaseCard>
  );
};

export default CardRiwayatBlanko;
