import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import { Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import BaseButton from 'components/Base/BaseButton';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { relog } from 'redux/slices/auth';

const CardRiwayatAkun = (props) => {
  const { item } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [visibility, setVisibility] = useState(false);

  const handleRelog = () => {
    const formData = new URLSearchParams();
    formData.append('email', item.email);
    formData.append('password', item.password);

    dispatch(relog(formData));
  };

  return (
    <Stack gap={2} p={2} bgcolor="dark.light" borderRadius={2}>
      <Typography variant="h5">{item?.date}</Typography>
      <Stack gap={2}>
        <Grid container direction="row">
          <Grid item xs={4}>
            <Typography variant="body2">Nama</Typography>
          </Grid>
          <Grid item display="flex" justifyContent="space-around">
            <Divider light orientation="vertical" sx={{ mr: 4 }} />
            <Typography variant="h5">{item?.name}</Typography>
          </Grid>
        </Grid>
        <Grid container direction="row">
          <Grid item xs={4}>
            <Typography variant="body2">Email</Typography>
          </Grid>
          <Grid item display="flex" justifyContent="space-around">
            <Divider light orientation="vertical" sx={{ mr: 4 }} />
            <Typography variant="h5">{item?.email}</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={4} display="flex" alignItems="center">
            <Typography variant="body2">Password</Typography>
          </Grid>
          <Grid item display="flex" alignItems="center">
            <Divider light orientation="vertical" sx={{ mr: 4 }} />
            <Typography variant="h5" noWrap sx={{ width: '100px' }}>
              {visibility ? item?.password : '● ● ● ● ● ● ● ●'}
            </Typography>
            <IconButton size="small" onClick={() => setVisibility(!visibility)}>
              {visibility ? (
                <VisibilityOutlined sx={{ height: '16px' }} />
              ) : (
                <VisibilityOffOutlined sx={{ height: '16px' }} />
              )}{' '}
            </IconButton>
          </Grid>
        </Grid>
        <Divider light />
        <Stack direction="row" justifyContent="space-between">
          <BaseButton shape="outlined">
            <Typography variant="h5" onClick={() => navigate(`detail/${item?._id}`)}>
              Detail
            </Typography>
          </BaseButton>
          <BaseButton onClick={handleRelog}>
            <Typography variant="h5">Akuisisi Kembali</Typography>
          </BaseButton>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CardRiwayatAkun;
