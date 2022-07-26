import { Box, Stack, Typography } from '@mui/material';
import BaseButton from 'components/Base/BaseButton';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { Form, Formik } from 'formik';
import FormikController from 'components/Formik/FormikController';
import { addSupervisi } from 'redux/slices/auth';

function MasukPdh() {
  const [loading, setLoading] = useState(false);

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    password: ''
  };
  const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(6, 'Password should be of minimum 6 characters length')
      .required('Password is required')
  });
  const onSubmit = (formValue) => {
    const { email, password } = formValue;
    const formData = new URLSearchParams();
    formData.append('email', email);
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
