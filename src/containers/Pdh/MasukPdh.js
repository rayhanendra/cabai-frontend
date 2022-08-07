import { Box, Stack, Typography } from '@mui/material';
import BaseButton from 'components/Base/BaseButton';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { Form, Formik } from 'formik';
import FormikController from 'components/Formik/FormikController';
import { addSupervisi } from 'redux/slices/auth';
import BaseHeader from 'components/Base/BaseHeader';

function MasukPdh() {
  const [loading, setLoading] = useState(false);

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const initialValues = {
    account: '',
    password: ''
  };
  const validationSchema = yup.object({
    account: yup.string('Masukkan email/no.telp').required('Email/no.telp diperlukan'),
    password: yup
      .string('Masukkan password')
      .min(6, 'Passord minimum 6 karakter')
      .required('Password diperlukan')
  });
  const onSubmit = (formValue) => {
    const { account, password } = formValue;
    const formData = new URLSearchParams();
    formData.append('account', account);
    formData.append('password', password);
    setLoading(true);
    dispatch(addSupervisi(formData))
      .unwrap()
      .then(() => {})
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <BaseHeader label="Sistem Cabai" to={-1} />
      <Box display="flex" flexDirection="column" gap={2} p={2}>
        <Typography variant="h4">Masuk</Typography>
        <Typography>
          Masuk kedalam akunmu untuk akses stok cabai cabai kamu dan jualkan ke orang sekitarmu !
        </Typography>
        {message && (
          <div>
            <div role="alert">{message}</div>
          </div>
        )}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}>
          {(formikProps) => (
            <Form>
              <Stack gap={3}>
                <FormikController
                  control="textfield"
                  fullWidth
                  id="account"
                  name="account"
                  label="Email / No.Telp"
                  formikProps={formikProps}
                />
                <FormikController
                  control="textfield"
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  formikProps={formikProps}
                />
                <BaseButton type="submit" disabled={!(formikProps.isValid && formikProps.dirty)}>
                  {loading ? 'Memuat...' : 'Masuk'}
                </BaseButton>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
}

export default MasukPdh;
