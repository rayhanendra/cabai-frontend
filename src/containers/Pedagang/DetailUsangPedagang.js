import { Stack } from '@mui/material';
import BaseButton from 'components/Base/BaseButton';
import BaseHeader from 'components/Base/BaseHeader';
import BaseListDetail from 'components/Base/BaseListDetail';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteUsang, getUsangById } from 'redux/slices/usang';
import { CabaiEnum } from 'utils/constants';
import { formatNumber, formatRupiah } from 'utils/Formats';
import { momentFormat } from 'utils/MomentFormat';

function DetailUsangPedagang() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const { detail } = useSelector((state) => state.usang);

  useEffect(() => {
    dispatch(getUsangById(id));
  }, [dispatch]);

  const data = [
    { label: 'Jumlah Cabai Usang', value: `${formatNumber(detail?.jumlahUsang)} kuintal` },
    // { label: 'Total Cabai Sebelumnya', value: detail?.totalSebelum },
    // { label: 'Total Cabai Setelahnya', value: detail?.totalSetelah },
    { label: 'Harga per kg', value: formatRupiah(detail?.hargaJual) },
    { label: 'Pemanfaatan Cabai', value: detail?.pemanfaatan }
  ];

  const handleDelete = () => {
    setLoading(true);
    dispatch(deleteUsang(id))
      .unwrap()
      .then(() => {
        navigate(-1);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <BaseHeader
        label={`${CabaiEnum[detail?.tipeCabai]} - ${momentFormat(detail?.tanggalPencatatan)}`}
        to={-1}
      />
      <Stack gap={3} pt={2} px={2}>
        <BaseListDetail data={data} />
        <BaseButton type="submit" shape="error" onClick={handleDelete} disabled={loading}>
          Hapus
        </BaseButton>
      </Stack>
    </>
  );
}

export default DetailUsangPedagang;
