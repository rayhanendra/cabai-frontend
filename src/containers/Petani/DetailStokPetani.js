import BaseHeader from 'components/Base/BaseHeader';
import BaseListDetail from 'components/Base/BaseListDetail';
import React from 'react';
import { Fragment } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getStokById } from 'redux/slices/stok';
import { CabaiEnum } from 'utils/constants';
import { formatNumber, formatRupiah } from 'utils/Formats';
import { momentFormat } from 'utils/MomentFormat';

function DetailStokPetani() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { detail } = useSelector((state) => state.stok);

  useEffect(() => {
    dispatch(getStokById(id));
  }, [dispatch]);

  const data = [
    { label: 'Total Hasil Panen', value: formatNumber(detail[0]?.totalHasilPanen) },
    { label: 'Hasil Panen Sukses', value: formatNumber(detail[0]?.hasilPanenSukses) },
    { label: 'Hasil Panen Gagal', value: formatNumber(detail[0]?.hasilPanenGagal) },
    { label: 'Harga Jual Per kg (Rp/kg)', value: formatRupiah(detail[0]?.hargaJual) }
  ];

  if (!detail) return <Fragment />;
  return (
    <>
      <BaseHeader
        label={`${CabaiEnum[detail[0]?.tipeCabai]} - ${momentFormat(detail[0]?.createdAt)}`}
        to={-1}
      />
      <BaseListDetail data={data} />
    </>
  );
}

export default DetailStokPetani;
