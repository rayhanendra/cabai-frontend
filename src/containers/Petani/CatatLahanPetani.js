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
import urlFormData from 'utils/urlFormData';
import { addLahan } from 'redux/slices/lahan';

function CatatLahan() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    namaLahan: '',
    tipeCabai: '',
    tanggalTanam: today,
    jumlahBatang: '',
    luasLahan: '',
    modalBenih: '',
    modalPupuk: '',
    modalPestisida: '',
    modalPekerja: ''
  };
  const validationSchema = yup.object({
    namaLahan: yup.string('Masukkan nama lahan').required('Nama lahan wajib diisi'),
    tipeCabai: yup.string('Masukkan Tipe Cabai').required('Tipe Cabai Wajib diisi'),
    tanggalTanam: yup.date('Masukkan tanggal pencatatan').required('Tanggal pencatatan diperlukan'),
    jumlahBatang: yup
      .number('Masukkan Total Hasil Panen')
      .required('Total Hasil Panen Wajib diisi'),
    luasLahan: yup.number('Masukkan Total Hasil Panen').required('Total Hasil Panen Wajib diisi')
  });
  const onSubmit = (formValue) => {
    const {
      tipeCabai,
      namaLahan,
      tanggalTanam,
      jumlahBatang,
      luasLahan,
      modalBenih,
      modalPupuk,
      modalPestisida,
      modalPekerja
    } = formValue;

    const formData = urlFormData({
      tipeCabai,
      namaLahan,
      tanggalTanam,
      jumlahBatang,
      luasLahan,
      modalBenih,
      modalPupuk,
      modalPestisida,
      modalPekerja
    });

    setLoading(true);
    dispatch(addLahan(formData))
      .unwrap()
      .then(() => {
        navigate(-1);
        setLoading(false);
      })
      .catch(() => {});
  };

  return (
    <>
      <BaseHeader label="Penanaman Baru Cabai" to={-1} />
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {(formikProps) => {
          return (
            <Form>
              <Stack gap={2} p={2}>
                <FormikController
                  control="textfield"
                  id="namaLahan"
                  name="namaLahan"
                  label="Nama Lahan"
                  options={optionsTipeCabai}
                  formikProps={formikProps}
                />
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
                  id="tanggalTanam"
                  name="tanggalTanam"
                  label="Tanggal Penanaman"
                  formikProps={formikProps}
                />
                <FormikController
                  control="number"
                  id="jumlahBatang"
                  name="jumlahBatang"
                  label="Jumlah Batang yang Ditanam"
                  formikProps={formikProps}
                />
                <FormikController
                  control="number"
                  id="luasLahan"
                  name="luasLahan"
                  label="Luas Lahan (ha)"
                  formikProps={formikProps}
                />
                <Typography variant="h5">Modal Penanaman</Typography>
                <FormikController
                  control="numbercurrency"
                  id="modalBenih"
                  name="modalBenih"
                  label="Benih (Rp)"
                  formikProps={formikProps}
                />
                <FormikController
                  control="numbercurrency"
                  id="modalPupuk"
                  name="modalPupuk"
                  label="Pupuk (Rp)"
                  formikProps={formikProps}
                />
                <FormikController
                  control="numbercurrency"
                  id="modalPestisida"
                  name="modalPestisida"
                  label="Pestisida (Rp)"
                  formikProps={formikProps}
                />
                <FormikController
                  control="numbercurrency"
                  id="modalPekerja"
                  name="modalPekerja"
                  label="Tenaga Kerja (Rp)"
                  formikProps={formikProps}
                />
                <Box mt={2}>
                  <BaseButton
                    fullWidth
                    type="submit"
                    disabled={!(formikProps.isValid && formikProps.dirty) || loading}>
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

export default CatatLahan;
