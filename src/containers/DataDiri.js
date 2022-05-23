import { Avatar, Box, Stack, Typography } from '@mui/material';
import BaseButton from 'components/Base/BaseButton';
import BaseHeader from 'components/Base/BaseHeader';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'redux/slices/auth';
import { getProfile } from 'redux/slices/user';
import { RoleEnum } from 'utils/constants';

function DataDiriPdh() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getProfile(user.id));
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <BaseHeader label="Data Diri" to={-1} />
      <Stack spacing={2} p={2}>
        <Avatar>P</Avatar>
        <Box>
          <Typography>Nama</Typography>
          <Typography variant="h5">{profile.name}</Typography>
        </Box>
        <Box>
          <Typography>Peran</Typography>
          <Typography variant="h5"> {RoleEnum[profile.role]}</Typography>
        </Box>
        <Box>
          <Typography>Alamat</Typography>
          <Typography variant="h5">{profile.alamat}</Typography>
        </Box>
        <Box>
          <Typography>Kecamatan</Typography>
          <Typography variant="h5">{profile.kecamatan.alt_name}</Typography>
        </Box>
        <Box>
          <Typography>Kecamatan</Typography>
          <Typography variant="h5">{profile.kabupaten.alt_name}</Typography>
        </Box>
        <Box>
          <Typography>Provinsi</Typography>
          <Typography variant="h5">{profile.provinsi.alt_name}</Typography>
        </Box>
        <BaseButton shape="exit" onClick={handleLogout}>
          Keluar
        </BaseButton>
      </Stack>
    </>
  );
}

export default DataDiriPdh;
