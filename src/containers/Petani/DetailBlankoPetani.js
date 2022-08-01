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
    { label: 'Tipe Cabai', value: CabaiEnum[detail[0]?.tipeCabai] },
    {
      label: 'Luas tanaman akhir bulan lalu (ha)',
      value: detail[0]?.luasTanamanAkhirBulanLalu ?? '-'
    },
    { label: 'Luas panen habis / dibongkar (ha)', value: detail[0]?.luasPanenHabis ?? '-' },
    { label: 'Luas panen belum habis (ha)', value: detail[0]?.luasPanenBelumHabis ?? '-' },
    { label: 'Luas rusak/tidak berhasil/puso (ha)', value: detail[0]?.luasRusak ?? '-' },
    { label: 'Luas penanaman baru/tambah tanam (ha)', value: detail[0]?.luasPenanamanBaru ?? '-' },
    {
      label: 'Luas tanaman akhir bulan laporan (ha)',
      value: detail[0]?.luasTanamanAkhirBulanLaporan ?? '-'
    },
    {
      label: 'Produksi dipanen habis/dibongkar (kuintal)',
      value: detail[0]?.prodPanenHabis ?? '-'
    },
    { label: 'Produksi belum habis (kuintal)', value: detail[0]?.prodBelumHabis ?? '-' },
    {
      label: 'Rata-rata harga jual petani per kilogram (Rupiah)',
      value: detail[0]?.rataHargaJual ?? '-'
    }
  ];

  if (!detail) return <Fragment />;
  return (
    <>
      <BaseHeader label={`Blanko - ${momentFormat(detail[0]?.tanggalPencatatan)}`} to={-1} />
      <BaseListDetail data={data} p={2} />
    </>
  );
}

export default DetailBlankoPetani;
