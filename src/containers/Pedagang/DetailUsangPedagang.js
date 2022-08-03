import { Divider, Stack, Typography } from '@mui/material';
import BaseButton from 'components/Base/BaseButton';
import BaseHeader from 'components/Base/BaseHeader';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteUsang, getUsangById } from 'redux/slices/usang';
import { CabaiEnum } from 'utils/constants';
import { formatNumber } from 'utils/Formats';
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
        <Stack gap={3}>
          <Stack gap={1}>
            <Typography variant="body2">Jumlah Cabai Usang</Typography>
            <Typography variant="h5">{formatNumber(detail?.jumlahUsang)} kuintal</Typography>
            <Divider />
          </Stack>
          <Stack gap={1}>
            <Typography variant="body2">Pemanfaatan Cabai</Typography>
            <Typography variant="h5" textTransform="capitalize">
              {detail?.pemanfaatan}
            </Typography>
            <Divider />
          </Stack>
        </Stack>
        <BaseButton type="submit" shape="error" onClick={handleDelete} disabled={loading}>
          Hapus
        </BaseButton>
      </Stack>
    </>
  );
}

export default DetailUsangPedagang;
