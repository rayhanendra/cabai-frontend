import { Box, Divider, Stack, Typography } from '@mui/material';
import BaseButton from 'components/Base/BaseButton';
import BaseHeader from 'components/Base/BaseHeader';
import FormikController from 'components/Formik/FormikController';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { optionsTipeCabai } from 'utils/constants';
import { useEffect } from 'react';
import { useState } from 'react';
import { editTransaksi, getTransaksiById, reset } from 'redux/slices/transaksi';

function UlangTransaksiPetani() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const { detail } = useSelector((state) => state.notification);

  useEffect(() => {
    dispatch(reset());
    dispatch(getTransaksiById(id));
  }, [dispatch]);

  const initialValues = {
    tipeCabai: detail[0]?.tipeCabai ?? '',
    tanggalPencatatan: detail[0]?.tanggalPencatatan ?? '',
    jumlahDijual: detail[0]?.jumlahDijual ?? '',
    hargaJual: detail[0]?.hargaJual ?? ''
  };

  const validationSchema = yup.object({
    tipeCabai: yup.string('Masukkan tipe cabai').required('Tipe cabai diperlukan'),
    tanggalPencatatan: yup
      .date('Masukkan tanggal transaksi')
      .required('Tanggal transaksi diperlukan'),
    jumlahDijual: yup.number('Masukkan jumlah dijual').required('Jumlah dijual diperlukan'),
    hargaJual: yup.number('Masukkan harga per kg').required('Harga per kg diperlukan')
  });
  const onSubmit = (formValue) => {
    const { tipeCabai, tanggalPencatatan, jumlahDijual, hargaJual } = formValue;
    const formData = new URLSearchParams();
    formData.append('tipeCabai', tipeCabai);
    formData.append('tanggalPencatatan', tanggalPencatatan);
    formData.append('jumlahDijual', jumlahDijual);
    formData.append('hargaJual', hargaJual);

    setLoading(true);
    dispatch(editTransaksi({ id, formData }))
      .unwrap()
      .then(() => {
        navigate(-1);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <BaseHeader label={'Ajukan Kembali Transaksi Cabai'} to={-1} />
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {(formikProps) => {
          return (
            <Form>
              <Stack gap={2} p={2}>
                <Typography variant="h5">Pilih Tipe Cabai</Typography>
                <FormikController
                  control="select"
                  label="Tipe Cabai"
                  name="tipeCabai"
                  options={optionsTipeCabai}
                  formikProps={formikProps}
                />
                <Typography variant="h5">Transaksi</Typography>
                <FormikController
                  control="datepicker"
                  label="Tanggal Transaksi"
                  name="tanggalPencatatan"
                  formikProps={formikProps}
                />
                <FormikController
                  control="number"
                  label="Jumlah Dijual (kg)"
                  name="jumlahDijual"
                  formikProps={formikProps}
                />
                <FormikController
                  control="number"
                  label="Harga Per kg (Rp)"
                  name="hargaJual"
                  formikProps={formikProps}
                />
                <Typography variant="h5">Pembeli</Typography>
                <Stack gap={1}>
                  <Typography variant="h5">Nama Penjual</Typography>
                  <Typography variant="body2">{detail[0]?.pembeli.name}</Typography>
                  <Divider />
                </Stack>
                <Stack gap={1}>
                  <Typography variant="h5">Peran</Typography>
                  <Typography variant="body2">{detail[0]?.pembeli.role}</Typography>
                  <Divider />
                </Stack>
                <Box mt={5}>
                  <BaseButton
                    fullWidth
                    type="submit"
                    disabled={!(formikProps.isValid && formikProps.dirty)}>
                    {loading ? 'Memuat...' : 'Kirim'}
                  </BaseButton>
                </Box>
              </Stack>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default UlangTransaksiPetani;
