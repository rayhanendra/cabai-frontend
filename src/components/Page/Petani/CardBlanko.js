import PropTypes from 'prop-types';
import { Stack, Typography } from '@mui/material';
import BaseCard from 'components/Base/BaseCard';
import { momentFormat } from 'utils/MomentFormat';
import { CabaiEnum } from 'utils/constants';

const CardBlanko = (props) => {
  const { item } = props;

  return (
    <>
      <BaseCard
        title={`${CabaiEnum[item.tipeCabai]} - ${momentFormat(item.tanggalPencatatan)}`}
        link={`/petani/beranda/detail-blanko/${item._id}`}>
        <Stack gap={1}>
          <Stack direction="row" justifyContent="space-between">
            <Typography>Luas tanaman akhir bulan lalu (Ha)</Typography>
            <Typography variant="body2">{item.luasTanamanAkhirBulanLalu ?? '-'}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography>Luas panen habis / dibongkar (Ha)</Typography>
            <Typography variant="body2">{item.luasPanenHabis ?? '-'}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography>Luas panen belum habis (Ha)</Typography>
            <Typography variant="body2">{item.luasPanenBelumHabis ?? '-'}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography>Luas rusak/tidak berhasil/puso (Ha)</Typography>
            <Typography variant="body2">{item.luasRusak ?? '-'}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography>Luas penanaman baru/tambah tanam (Ha)</Typography>
            <Typography variant="body2">{item.luasPenanamanBaru ?? '-'}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography>Luas tanaman akhir bulan laporan (Ha)</Typography>
            <Typography variant="body2">{item.luasTanamanAkhirBulanLaporan ?? '-'}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography>Produksi dipanen habis/dibongkar (Kuintal)</Typography>
            <Typography variant="body2">{item.prodPanenHabis ?? '-'}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography>Produksi belum habis (Kuintal)</Typography>
            <Typography variant="body2">{item.prodBelumHabis ?? '-'}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography>Rata-rata harga jual petani per kilogram (Rupiah)</Typography>
            <Typography variant="body2">{item.rataHargaJual ?? '-'}</Typography>
          </Stack>
        </Stack>
      </BaseCard>
    </>
  );
};

CardBlanko.propTypes = {
  item: PropTypes.object
};

export default CardBlanko;
