import { Box, Link, Stack, Typography } from '@mui/material';
import BaseButton from 'components/Base/BaseButton';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { signup } from 'redux/slices/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import FormikController from 'components/Formik/FormikController';
import { optionsRole } from 'utils/constants';
import UserService from 'services/user.service';
// import BaseLoadingRedux from 'components/Base/BaseLoadingRedux';

function Daftar() {
  const { message } = useSelector((state) => state.message);
  const { isLoggedIn, user: currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [provinsi, setProvinsi] = useState('');
  const [kabupaten, setKabupaten] = useState('');
  const [kecamatan, setKecamatan] = useState('');
  const [selectedProvinsi, setSelectedProvinsi] = useState('');
  const [selectedKabupaten, setSelectedKabupaten] = useState('');

  useEffect(() => {
    getAllProvinsi();
    getAllKabupaten(selectedProvinsi);
    getAllKecamatan(selectedKabupaten);
  }, [selectedProvinsi, selectedKabupaten]);

  const getAllProvinsi = () => {
    UserService.getAllProvinsi().then((response) => {
      const data = response.data.provinsi.map(({ id, nama }) => ({ id, label: nama }));
      setProvinsi(data);
    });
  };
  const getAllKabupaten = (id_provinsi) => {
    UserService.getAllKabupaten(id_provinsi).then((response) => {
      const data = response.data.kota_kabupaten.map(({ id, nama }) => ({ id, label: nama }));
      setKabupaten(data);
    });
  };
  const getAllKecamatan = (id_kabupaten) => {
    UserService.getAllKecamatan(id_kabupaten).then((response) => {
      const data = response.data.kecamatan.map(({ id, nama }) => ({ id, label: nama }));
      setKecamatan(data);
    });
  };

  // const validateKabupaten = () => {};

  // const handleClearLocation = (formikProps) => {
  //   console.log('test', formikProps);
  //   setField
  // };

  // Notes: perlu diroute berdasarkan role

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const initialValues = {};
  const validationSchema = yup.object({
    name: yup
      .string('Masukkan nama')
      .min(3, 'Panjang nama minimal 3 karakter')
      .max(55, 'Panjang nama maksimal 55 karakter')
      .required('Nama diperlukan'),
    phone: yup
      .string('Masukkan no.telp')
      .matches(phoneRegExp, 'Harap masukkan angka no.telp')
      // .min(7, 'Panjang no.telp minimal 7 angka')
      // .max(14, 'Panjang no.telp maksimal 14 angka')
      .required('No.telp diperlukan'),
    email: yup.string('Masukkan email').email('Masukkan email dengan benar'),
    password: yup
      .string('Masukkan password')
      .min(6, 'Panjang password minimal 6 karakter')
      .required('Password diperlukan'),
    repassword: yup.string().oneOf([yup.ref('password'), null], 'Password harus sama'),
    provinsi: yup.number('Masukkan provinsi').required('Provinsi diperlukan'),
    kabupaten: yup.number('Masukkan kabupaten').required('Kabupaten diperlukan'),
    // .test(
    //   'kecamatan-included-in-provinsi',
    //   'Kecamatan harus berasal dari provinsi yang tepat',
    //   (value) => {
    //     return provinsi.filter((e) => e.id == value).length > 0;
    //   }
    // ),
    kecamatan: yup.number('Masukkan kecamatan').required('Kecamatan diperlukan'),
    alamat: yup.string('Masukkan alamat').required('alamat diperlukan'),
    role: yup.string('Masukkan peran').required('Peran diperlukan')
  });
  const onSubmit = (formValue) => {
    const { name, phone, email, password, provinsi, kecamatan, kabupaten, alamat, role } =
      formValue;
    setLoading(true);
    dispatch(
      signup({
        data: {
          name,
          phone,
          email,
          password,
          provinsi,
          kecamatan,
          kabupaten,
          alamat,
          role
        }
      })
    )
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
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {(formikProps) => {
          setSelectedProvinsi(formikProps.values.provinsi);
          setSelectedKabupaten(formikProps.values.kabupaten);
          return (
            <Form>
              <Stack gap={2} p={2}>
                <Typography variant="h4">Daftar</Typography>
                <Typography>
                  Menjadi bagian dalam proses distribusi didaerahmu dan tawarkan cabai terbaikmu !{' '}
                </Typography>
                {message && (
                  <div>
                    <div role="alert">{message}</div>
                  </div>
                )}
                <FormikController
                  control="textfield"
                  fullWidth
                  id="name"
                  name="name"
                  label="Nama"
                  formikProps={formikProps}
                />
                <FormikController
                  control="textfield"
                  fullWidth
                  id="phone"
                  name="phone"
                  label="Nomor Telpon"
                  formikProps={formikProps}
                />
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
                <FormikController
                  control="textfield"
                  fullWidth
                  id="repassword"
                  name="repassword"
                  label="Ketik Ulang Password"
                  type="password"
                  formikProps={formikProps}
                />
                <FormikController
                  control="autocomplete"
                  fullWidth
                  id="provinsi"
                  name="provinsi"
                  label="Provinsi"
                  options={provinsi}
                  formikProps={formikProps}
                />
                {/* <Box> */}
                <FormikController
                  control="autocomplete"
                  fullWidth
                  id="kabupaten"
                  name="kabupaten"
                  label="Kabupaten"
                  formikProps={formikProps}
                  options={kabupaten}
                  // disabled={!formikProps.values.provinsi || formikProps.values.kabupaten}
                  disabled={!formikProps.values.provinsi}
                />
                <FormikController
                  control="autocomplete"
                  fullWidth
                  id="kecamatan"
                  name="kecamatan"
                  label="Kecamatan"
                  formikProps={formikProps}
                  options={kecamatan}
                  // disabled={!formikProps.values.kabupaten || formikProps.values.kecamatan}
                  disabled={!formikProps.values.kabupaten}
                />
                {/* <Button
                  variant="text"
                  sx={{ textTransform: 'none' }}
                  // onClick={() => handleClearLocation(formikProps)}
                >
                  Ulang Daerah
                </Button> */}
                {/* </Box> */}
                <FormikController
                  control="multiline"
                  fullWidth
                  id="alamat"
                  name="alamat"
                  label="Alamat"
                  formikProps={formikProps}
                />
                <FormikController
                  control="select"
                  fullWidth
                  id="peran"
                  name="role"
                  label="Peran"
                  options={optionsRole}
                  formikProps={formikProps}
                />
                <Box mt={2}>
                  <BaseButton
                    fullWidth
                    type="submit"
                    disabled={!(formikProps.isValid && formikProps.dirty) || loading}>
                    {loading ? 'Memuat...' : 'Daftar'}
                  </BaseButton>
                </Box>
              </Stack>
            </Form>
          );
        }}
      </Formik>
      <Box display="flex" flexDirection="column" alignItems="center" gap={1} p={2}>
        <Typography display="inline-block" variant="body2">
          Sudah punya akun?
          <Link onClick={() => navigate('/masuk')}> Masuk!</Link>
        </Typography>
        <Link color="black">
          <Typography variant="body2">Lupa password?</Typography>
        </Link>
      </Box>
    </>
  );
}

export default Daftar;
