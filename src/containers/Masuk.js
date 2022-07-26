import { Box, Link, Stack, Typography } from '@mui/material';
import BaseButton from 'components/Base/BaseButton';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { Form, Formik } from 'formik';
import { signin } from 'redux/slices/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import FormikController from 'components/Formik/FormikController';

function Masuk() {
  const [loading, setLoading] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: ''
  };
  const validationSchema = yup.object({
    email: yup
      .string('Masukkan email')
      .email('Masukkan email dengan benar')
      .required('Email diperlukan'),
    password: yup
      .string('Masukkan password')
      .min(6, 'Panjang password minimal 6 karakter')
      .required('Password dibutuhkan')
  });
  const onSubmit = (formValue) => {
    const { email, password } = formValue;
    setLoading(true);
    dispatch(signin({ email, password }))
      .unwrap()
      .then(() => {})
      .catch(() => {
        setLoading(false);
      });
  };

  if (isLoggedIn) {
    return <Navigate to={`/${currentUser.access}`} />;
  }

  return (
    <>
      <Box p={2} variant="h4">
        Sistem Cabai
      </Box>
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
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                />
                <FormikController
                  control="textfield"
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                />
                <BaseButton type="submit" disabled={!(formikProps.isValid && formikProps.dirty)}>
                  {loading ? 'Memuat...' : 'Masuk'}
                </BaseButton>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" gap={1} p={2}>
        <Typography display="inline-block" variant="body2">
          Belum punya akun?
          <Link onClick={() => navigate('/daftar')}> Daftar!</Link>
        </Typography>
        <Link color="black">
          <Typography variant="body2">Lupa password?</Typography>
        </Link>
        <Link underline="none">
          <Typography variant="body2">Masuk sebagai Guest</Typography>
        </Link>
      </Box>
    </>
  );
}

export default Masuk;
