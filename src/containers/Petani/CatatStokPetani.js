import { Box, Stack, Typography } from '@mui/material';
import BaseButton from 'components/Base/BaseButton';
import BaseHeader from 'components/Base/BaseHeader';
import FormikController from 'components/Formik/FormikController';
import { Form, Formik } from 'formik';
import { optionsTipeCabai } from 'utils/constants';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { today } from 'utils/MomentFormat';
import { addStok } from 'redux/slices/stok';

function CatatStokPetani() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    tipeCabai: '',
    tanggalPencatatan: today,
    totalHasilPanen: '',
    hasilPanenSukses: '',
    hasilPanenGagal: '',
    hargaJual: ''
  };
  const validationSchema = yup.object({
    tipeCabai: yup.string('Masukkan Tipe Cabai').required('Tipe Cabai Wajib diisi'),
    tanggalPencatatan: yup
      .date('Masukkan tanggal pencatatan')
      .required('Tanggal pencatatan diperlukan'),
    totalHasilPanen: yup
      .number('Masukkan Total Hasil Panen')
      .required('Total Hasil Panen Wajib diisi'),
    hasilPanenSukses: yup
      .number('Masukkan Hasil Panen Sukses')
      .required('Hasil Panen Sukses Wajib diisi'),
    hasilPanenGagal: yup
      .number('Masukkan Hasil Panen Gagal')
      .required('Hasil Panen Gagal Wajib diisi'),
    hargaJual: yup.number('Masukkan Harga Jual').required('Harga Jual Wajib diisi')
  });
  const onSubmit = (formValue) => {
    const { tipeCabai, totalHasilPanen, hasilPanenSukses, hasilPanenGagal, hargaJual } = formValue;
    const formData = new URLSearchParams();
    formData.append('tipeCabai', tipeCabai);
    formData.append('totalHasilPanen', totalHasilPanen);
    formData.append('hasilPanenSukses', hasilPanenSukses);
    formData.append('hasilPanenGagal', hasilPanenGagal);
    formData.append('hargaJual', hargaJual);
    setLoading(true);
    dispatch(addStok(formData))
      .unwrap()
      .then(() => {
        navigate(-1);
        setLoading(false);
      })
      .catch(() => {});
  };

  return (
    <>
      <BaseHeader label="Catat Stok Cabai" to={-1} />
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {(formikProps) => {
          return (
            <Form>
              <Stack gap={2} p={2}>
                <Typography variant="h5">Pilih TIpe Cabai</Typography>
                <FormikController
                  control="select"
                  id="tipeCabai"
                  name="tipeCabai"
                  label="Tipe Cabai"
                  options={optionsTipeCabai}
                  formikProps={formikProps}
                />
                <FormikController
                  control="datepicker"
                  label="Tanggal Pencatatan"
                  name="tanggalPencatatan"
                  formikProps={formikProps}
                />
                <FormikController
                  control="number"
                  id="totalHasilPanen"
                  name="totalHasilPanen"
                  label="Total Hasil Panen (kg)"
                  formikProps={formikProps}
                />
                <FormikController
                  control="number"
                  fullWidth
                  id="hasilPanenSukses"
                  name="hasilPanenSukses"
                  label="Hasil Panen Sukses (kg)"
                  formikProps={formikProps}
                />
                <FormikController
                  control="number"
                  fullWidth
                  id="hasilPanenGagal"
                  name="hasilPanenGagal"
                  label="Hasil Panen Gagal (kg)"
                  formikProps={formikProps}
                />
                <FormikController
                  control="number"
                  fullWidth
                  id="hargaJual"
                  name="hargaJual"
                  label="Hasil jual per kg (Rp)"
                  formikProps={formikProps}
                />
                <Box mt={2}>
                  <BaseButton
                    fullWidth
                    type="submit"
                    disabled={
                      !(formikProps.isValid && formikProps.dirty) || formikProps.isSubmitting
                    }>
                    {loading ? 'Memuat..' : 'Kirim'}
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

export default CatatStokPetani;
