import BaseHeader from 'components/Base/BaseHeader';
import BaseListDetail from 'components/Base/BaseListDetail';
import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getBlankoById } from 'redux/slices/blanko';
import { CabaiEnum } from 'utils/constants';
import { momentFormat } from 'utils/MomentFormat';

function DetailBlankoPetani() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detail } = useSelector((state) => state.blanko);

  useEffect(() => {
    dispatch(getBlankoById(id));
  }, [dispatch]);

  const data = [
    { label: 'Tipe Cabai', value: CabaiEnum[detail?.tipeCabai] },
    {
      label: 'Luas tanaman akhir bulan lalu (ha)',
      value: detail?.luasTanamanAkhirBulanLalu ?? '-'
    },
    { label: 'Luas panen habis / dibongkar (ha)', value: detail?.luasPanenHabis ?? '-' },
    { label: 'Luas panen belum habis (ha)', value: detail?.luasPanenBelumHabis ?? '-' },
    { label: 'Luas rusak/tidak berhasil/puso (ha)', value: detail?.luasRusak ?? '-' },
    { label: 'Luas penanaman baru/tambah tanam (ha)', value: detail?.luasPenanamanBaru ?? '-' },
    {
      label: 'Luas tanaman akhir bulan laporan (ha)',
      value: detail?.luasTanamanAkhirBulanLaporan ?? '-'
    },
    {
      label: 'Produksi dipanen habis/dibongkar (kuintal)',
      value: detail?.prodPanenHabis ?? '-'
    },
    { label: 'Produksi belum habis (kuintal)', value: detail?.prodBelumHabis ?? '-' },
    {
      label: 'Rata-rata harga jual petani per kilogram (Rupiah)',
      value: detail?.rataHargaJual ?? '-'
    }
  ];

  if (!detail) return <Fragment />;
  return (
    <>
      <BaseHeader label={`Blanko - ${momentFormat(detail?.tanggalPencatatan)}`} to={-1} />
      <BaseListDetail data={data} p={2} />
    </>
  );
}

export default DetailBlankoPetani;
