import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material';
import BaseButton from 'components/Base/BaseButton';
import BaseHeader from 'components/Base/BaseHeader';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { relogById } from 'redux/slices/auth';
import { deleteSupervisi } from 'redux/slices/supervisi';
import { getProfile } from 'redux/slices/user';
import { RoleEnum } from 'utils/constants';

function DetailRiwayatAkunPdh() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [visibility, setVisibility] = useState(false);
  const [loading, setLoading] = useState(false);

  const { profile } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getProfile(id));
  }, [dispatch]);

  const handleRelog = () => {
    setLoading(true);
    dispatch(relogById(id))
      .unwrap()
      .then(() => {})
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const handleDelete = () => {
    setLoading(true);
    dispatch(deleteSupervisi(id))
      .unwrap()
      .then(() => {})
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  return (
    <>
      <BaseHeader label="Data Diri Petani" to={-1} />
      <Stack spacing={2} p={2}>
        <Avatar>P</Avatar>
        <Box>
          <Typography>Nama</Typography>
          <Typography variant="h5">{profile?.name}</Typography>
        </Box>
        <Box>
          <Typography>Peran</Typography>
          <Typography variant="h5">{RoleEnum[profile?.role]}</Typography>
        </Box>
        <Box>
          <Typography>Password</Typography>
          <Stack direction="row" alignItems="center">
            <Typography variant="h5" noWrap sx={{ width: '100px' }}>
              {visibility ? '' : '● ● ● ● ● ● ● ●'}
            </Typography>
            <IconButton size="small" onClick={() => setVisibility(!visibility)}>
              {visibility ? (
                <VisibilityOutlined sx={{ height: '16px' }} />
              ) : (
                <VisibilityOffOutlined sx={{ height: '16px' }} />
              )}
            </IconButton>
          </Stack>
        </Box>
        <Box>
          <Typography>Alamat</Typography>
          <Typography variant="h5">{profile?.alamat}</Typography>
        </Box>
        <Box>
          <Typography>Kecamatan</Typography>
          <Typography variant="h5">{profile?.kecamatan.name}</Typography>
        </Box>
        <Box>
          <Typography>Kabupaten</Typography>
          <Typography variant="h5">{profile?.kabupaten.name}</Typography>
        </Box>
        <Box>
          <Typography>Provinsi</Typography>
          <Typography variant="h5">{profile?.provinsi.name}</Typography>
        </Box>
        <Stack direction="row" justifyContent="space-between" spacing={2}>
          <BaseButton shape="supervise" onClick={handleRelog} loading={loading} disabled={loading}>
            <Typography variant="h5">Akuisisi Kembali</Typography>
          </BaseButton>
          <BaseButton shape="delete" onClick={handleDelete} loading={loading} disabled={loading}>
            <Typography variant="h5">Hapus Akun</Typography>
          </BaseButton>
        </Stack>
      </Stack>
    </>
  );
}
export default DetailRiwayatAkunPdh;
