import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography
} from '@mui/material';
import BaseButton from 'components/Base/BaseButton';
import BaseHeader from 'components/Base/BaseHeader';
import FormikController from 'components/Formik/FormikController';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { optionsTipeCabai, optionsPedagang, optionsGradeCabai } from 'utils/constants';
import { useEffect } from 'react';
import userService from 'services/user.service';
import { useState } from 'react';
import { addTransaksi } from 'redux/slices/transaksi';
import { today } from 'utils/MomentFormat';
import { RadioButtonChecked, RadioButtonUnchecked } from '@mui/icons-material';
import urlFormData from 'utils/urlFormData';

function CatatTransaksiPedagang() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tipePembeli, setTipePedagang] = useState('distributor');
  const [namaPembeli, setNamaPembeli] = useState([]);
  const [haveAccount, setHaveAccount] = useState('yes');

  const { status } = useSelector((state) => state.transaksi);

  useEffect(() => {
    if (tipePembeli) {
      setLoading(true);
      userService
        .getPedagangByRole(tipePembeli)
        .then((response) => {
          const data = response.data.pedagang.map(({ _id, name }) => ({ id: _id, label: name }));
          setNamaPembeli(data);
          setLoading(false);
        })
        .catch((error) => error);
    }
  }, [tipePembeli]);

  const initialValues = {
    tipeCabai: '',
    tanggalPencatatan: today,
    jumlahDijual: '',
    hargaJual: '',
    pembeli: '',
    namaPembeli: '',
    tipePembeli: ''
  };
  const validationSchema = yup.object({
    tipeCabai: yup.string('Masukkan tipe cabai').required('Tipe cabai diperlukan'),
    tanggalPencatatan: yup
      .date('Masukkan tanggal transaksi')
      .required('Tanggal transaksi diperlukan'),
    jumlahDijual: yup.number('Masukkan jumlah dijual').required('Jumlah dijual diperlukan'),
    hargaJual: yup.number('Masukkan harga per kg').required('Harga per kg diperlukan'),
    grade: yup.string('Masukkan grade cabai').required('Grade cabai diperlukan')
    // tipePembeli: yup.string('Tipe pedagang dijual').required('Tipe pedagang diperlukan'),
    // pembeli: yup.string('Masukkan nama pedagang').required('Nama pedagang diperlukan')
  });
  const onSubmit = (formValue) => {
    const { tipeCabai, tanggalPencatatan, jumlahDijual, grade, hargaJual, pembeli, namaPembeli } =
      formValue;

    const accountForm = { tipeCabai, tanggalPencatatan, jumlahDijual, hargaJual, grade, pembeli };
    const noAccountForm = {
      tipeCabai,
      tanggalPencatatan,
      jumlahDijual,
      hargaJual,
      grade,
      namaPembeli,
      tipePembeli
    };

    let formData = {};

    if (haveAccount === 'yes') {
      formData = urlFormData(accountForm);
    } else {
      formData = urlFormData(noAccountForm);
    }

    setLoading(true);
    dispatch(addTransaksi(formData))
      .unwrap()
      .then(() => {
        navigate(-1);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  return (
    <>
      <BaseHeader label="Catat Transaksi Cabai" to={-1} />
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {(formikProps) => {
          console.log('formikprops', formikProps);
          setTipePedagang(formikProps.values.tipePembeli);
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
                  control="numberweight"
                  label="Jumlah Dijual (kg)"
                  name="jumlahDijual"
                  formikProps={formikProps}
                />
                <FormikController
                  control="numbercurrency"
                  label="Harga Jual Per kg (Rp)"
                  name="hargaJual"
                  formikProps={formikProps}
                />
                <FormikController
                  control="radio"
                  options={optionsGradeCabai}
                  label="Grade"
                  name="grade"
                  formikProps={formikProps}
                />
                <FormControl>
                  <Typography variant="h5" sx={{ mb: 1 }}>
                    Pembeli
                  </Typography>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={haveAccount}
                    onChange={(event) => setHaveAccount(event.target.value)}>
                    <Stack direction="column" gap={2}>
                      <Stack
                        direction="column"
                        gap={1}
                        borderRadius={2}
                        border="4px solid"
                        p={1}
                        sx={
                          haveAccount === 'yes'
                            ? {
                                borderColor: 'primary.main'
                              }
                            : {
                                border: '4px solid white'
                              }
                        }>
                        <FormControlLabel
                          value="yes"
                          control={
                            <Radio
                              icon={<RadioButtonUnchecked />}
                              checkedIcon={<RadioButtonChecked />}
                            />
                          }
                          label={<Typography variant="h6">Pedangang punya akun</Typography>}
                          labelPlacement="end"
                        />

                        <FormikController
                          control="select"
                          label="Tipe Pedagang"
                          name="tipePembeli"
                          options={optionsPedagang}
                          defaultValue={'distributor'}
                          disabled={haveAccount == 'no'}
                          formikProps={formikProps}
                        />
                        <FormikController
                          control="autocomplete"
                          label="Nama Pedagang"
                          name="pembeli"
                          options={namaPembeli}
                          disabled={loading || haveAccount == 'no'}
                          formikProps={formikProps}
                        />
                      </Stack>

                      <Stack
                        direction="column"
                        gap={1}
                        borderRadius={2}
                        border="4px solid"
                        p={1}
                        sx={
                          haveAccount === 'no'
                            ? {
                                borderColor: 'primary.main'
                              }
                            : {
                                border: '4px solid white'
                              }
                        }>
                        <FormControlLabel
                          value="no"
                          control={
                            <Radio
                              icon={<RadioButtonUnchecked />}
                              checkedIcon={<RadioButtonChecked />}
                            />
                          }
                          label={<Typography variant="h6">Pedangang belum punya akun</Typography>}
                          labelPlacement="end"
                        />

                        <FormikController
                          control="select"
                          label="Tipe Pedagang"
                          name="tipePembeli"
                          options={optionsPedagang}
                          defaultValue={'distributor'}
                          disabled={haveAccount == 'yes'}
                          formikProps={formikProps}
                        />
                        <FormikController
                          control="textfield"
                          label="Nama Pedagang"
                          name="namaPembeli"
                          disabled={haveAccount == 'yes'}
                          formikProps={formikProps}
                        />
                      </Stack>
                    </Stack>
                  </RadioGroup>
                </FormControl>
                <Box mt={5}>
                  <BaseButton
                    fullWidth
                    type="submit"
                    disabled={
                      !(formikProps.isValid && formikProps.dirty) || formikProps.isSubmitting
                    }>
                    {status === 'loading' ? 'Memuat...' : 'Kirim'}
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

export default CatatTransaksiPedagang;
