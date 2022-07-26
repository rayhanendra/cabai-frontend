import { Box, Stack, Typography } from '@mui/material';
import BaseButton from 'components/Base/BaseButton';
import BaseHeader from 'components/Base/BaseHeader';
import FormikController from 'components/Formik/FormikController';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { optionsTipeCabai, optionsPedagang } from 'utils/constants';
import { useEffect } from 'react';
import userService from 'services/user.service';
import { useState } from 'react';
import { addTransaksi } from 'redux/slices/transaksi';

function CatatTransaksiPedagang() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tipePedagang, setTipePedagang] = useState('distributor');
  const [namaPedagang, setNamaPedagang] = useState([]);
  const { status } = useSelector((state) => state.transaksi);

  useEffect(() => {
    if (tipePedagang) {
      setLoading(true);
      userService
        .getPedagangByRole(tipePedagang)
        .then((response) => {
          const data = response.data.pedagang.map(({ _id, name }) => ({ id: _id, label: name }));
          setNamaPedagang(data);
          setLoading(false);
        })
        .catch((error) => error);
    }
  }, [tipePedagang]);

  const initialValues = {
    tipeCabai: '',
    tanggal: null,
    jumlahDijual: '',
    hargaJual: '',
    tipePedagang: '',
    pembeli: ''
  };
  const validationSchema = yup.object({
    tipeCabai: yup.string('Masukkan tipe cabai').required('Tipe cabai diperlukan'),
    tanggal: yup.date('Masukkan tanggal transaksi').required('Tanggal transaksi diperlukan'),
    jumlahDijual: yup.number('Masukkan jumlah dijual').required('Jumlah dijual diperlukan'),
    hargaJual: yup.number('Masukkan harga per kg').required('Harga per kg diperlukan'),
    tipePedagang: yup.string('Tipe pedagang dijual').required('Tipe pedagang diperlukan'),
    pembeli: yup.string('Masukkan nama pedagang').required('Nama pedagang diperlukan')
  });
  const onSubmit = (formValue) => {
    const { tipeCabai, tanggal, jumlahDijual, hargaJual, pembeli } = formValue;
    const formData = new URLSearchParams();
    formData.append('tipeCabai', tipeCabai);
    formData.append('tanggal', tanggal);
    formData.append('jumlahDijual', jumlahDijual);
    formData.append('hargaJual', hargaJual);
    formData.append('pembeli', pembeli);
    setLoading(true);
    dispatch(addTransaksi(formData))
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
      <BaseHeader label="Catat Transaksi Cabai" to={-1} />
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {(formikProps) => {
          setTipePedagang(formikProps.values.tipePedagang);
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
                  name="tanggal"
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
                <Typography variant="h5">Dijual Kepada</Typography>
                <FormikController
                  control="select"
                  label="Tipe Pedagang"
                  name="tipePedagang"
                  options={optionsPedagang}
                  defaultValue={'distributor'}
                  formikProps={formikProps}
                />
                <FormikController
                  control="autocomplete"
                  label="Nama Pedagang"
                  name="pembeli"
                  options={namaPedagang}
                  disabled={loading}
                  formikProps={formikProps}
                />
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
