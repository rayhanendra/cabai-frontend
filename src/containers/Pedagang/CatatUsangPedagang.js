import { Box, Stack, Typography } from '@mui/material';
import BaseButton from 'components/Base/BaseButton';
import BaseHeader from 'components/Base/BaseHeader';
import FormikController from 'components/Formik/FormikController';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUsang } from 'redux/slices/usang';
import { optionsTipeCabai } from 'utils/constants';
import * as yup from 'yup';

function CatatUsangPedagang() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    tipeCabai: '',
    jumlahUsang: '',
    hargaJual: '',
    tanggalPencatatan: new Date(),
    pemanfaatan: ''
  };
  const validationSchema = yup.object({
    tipeCabai: yup.string('Masukkan tipe cabai').required('Tipe cabai diperlukan'),
    jumlahUsang: yup.number('Masukkan jumlah dijual').required('Jumlah dijual diperlukan'),
    hargaJual: yup.number('Masukkan harga per kg').required('Harga per kg diperlukan'),
    tanggalPencatatan: yup
      .date('Masukkan tanggal transaksi')
      .required('Tanggal transaksi diperlukan'),
    pemanfaatan: yup.string('Masukkan pemanfaatan').required('Pemanfaatan diperlukan')
  });
  const onSubmit = (formValue) => {
    const { tipeCabai, jumlahUsang, hargaJual, tanggalPencatatan, pemanfaatan } = formValue;
    const formData = new URLSearchParams();
    formData.append('tipeCabai', tipeCabai);
    formData.append('jumlahUsang', jumlahUsang);
    formData.append('hargaJual', hargaJual);
    formData.append('tanggalPencatatan', tanggalPencatatan);
    formData.append('pemanfaatan', pemanfaatan);
    setLoading(true);
    dispatch(addUsang(formData))
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
      <BaseHeader label="Catat Cabai Usang" to="/pedagang/usang" />
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {(formikProps) => (
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
              <FormikController
                control="numberweight"
                label="Jumlah Cabai Usang (kg)"
                name="jumlahUsang"
                formikProps={formikProps}
              />
              <FormikController
                control="numbercurrency"
                label="Harga Jual Per kg (Rp)"
                name="hargaJual"
                formikProps={formikProps}
              />
              <FormikController
                control="datepicker"
                label="Tanggal"
                name="tanggalPencatatan"
                formikProps={formikProps}
              />
              <FormikController
                control="textfield"
                label="Akan dimanfaatkan kemana cabai yang usang?"
                name="pemanfaatan"
                formikProps={formikProps}
              />
              <Box mt={5}>
                <BaseButton
                  fullWidth
                  type="submit"
                  disabled={!(formikProps.isValid && formikProps.dirty) || loading}>
                  {loading ? 'Memuat...' : 'Kirim'}
                </BaseButton>
              </Box>
            </Stack>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default CatatUsangPedagang;
