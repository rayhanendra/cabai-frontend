import { Box, Stack, Typography } from '@mui/material';
import BaseHeader from 'components/Base/BaseHeader';
import CardRiwayatAkun from 'components/Page/Pdh/CardRiwayatAkun';
import React from 'react';
import { useSelector } from 'react-redux';

function RiwayatAkunPdh() {
  const { petani } = useSelector((state) => state.pdh);

  return (
    <>
      <BaseHeader label="Riwayat Akun" to={-1} />
      <Box px={2} pt={1} pb={2}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Riwayat Akun
        </Typography>
        <Stack gap={2}>
          {petani?.map((item, index) => (
            <CardRiwayatAkun key={index} item={item} />
          ))}
        </Stack>
      </Box>
    </>
  );
}

export default RiwayatAkunPdh;
