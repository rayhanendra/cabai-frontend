import { Box, Stack, Typography } from '@mui/material';
import BaseButton from 'components/Base/BaseButton';
import BaseHeader from 'components/Base/BaseHeader';
import BaseListDetail from 'components/Base/BaseListDetail';
import FormikController from 'components/Formik/FormikController';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkBlanko, syncBlanko } from 'redux/slices/blanko';
import lahanService from 'services/lahan.service';
import { CabaiEnum } from 'utils/constants';
import urlFormData from 'utils/urlFormData';
import * as yup from 'yup';

function CekBlankoPetani(props) {
  const { setFormBlanko } = props;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [dataTipeCabai, setDataTipeCabai] = useState([]);

  useEffect(() => {
    lahanService.getTipeLahan().then((response) => {
      const data = response.data.data.map((item) => ({
        value: item,
        label: CabaiEnum[item]
      }));
      setDataTipeCabai(data);
    });
  }, []);

  const initialValues = {
    tipeCabai: '',
    tanggalPencatatan: new Date()
  };
  const validationSchema = yup.object({
    tipeCabai: yup.string('Masukkan tipe cabai').required('Tipe cabai diperlukan'),
    tanggalPencatatan: yup
      .date('Masukkan tanggal pencatatan')
      .required('Tanggal pencatatan diperlukan')
  });
  const onSubmit = (formValue) => {
    // alert(JSON.stringify(formValue, null, 2));
    const { tipeCabai, tanggalPencatatan } = formValue;
    setFormBlanko(formValue);

    const formData = urlFormData({ tipeCabai, tanggalPencatatan });

    setLoading(true);
    dispatch(checkBlanko(formData))
      .unwrap()
      .then(() => {})
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  return (
    <>
      <BaseHeader label="Catat Blanko" to={-1} />
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {(formikProps) => (
          <Form>
            <Stack gap={2} p={2}>
              <Typography variant="h5">Pilih Tipe Cabai</Typography>
              <FormikController
                control="select"
                id="tipeCabai"
                name="tipeCabai"
                label="Tipe Cabai"
                options={dataTipeCabai}
                formikProps={formikProps}
              />
              <FormikController
                control="datepicker"
                month
                label="Tanggal Penanaman"
                name="tanggalPencatatan"
                formikProps={formikProps}
              />
              <Box>
                <BaseButton
                  fullWidth
                  type="submit"
                  disabled={!(formikProps.isValid && formikProps.dirty) || loading}>
                  {loading ? 'Memuat...' : 'Cek Blanko'}
                </BaseButton>
              </Box>
            </Stack>
          </Form>
        )}
      </Formik>
    </>
  );
}

function KirimBlankoPetani(props) {
  const { formBlanko } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { check } = useSelector((state) => state.blanko);

  const data = [
    { label: 'Tipe Cabai', value: CabaiEnum[check?.tipeCabai] ?? '-' },
    { label: 'Luas Tanaman Akhir Bulan Lalu (ha)', value: check?.luasTanamanAkhirBulanLalu ?? '-' },
    { label: 'Luas Panen Habis / Dibongkar (ha)', value: check?.luasPanenHabis ?? '-' },
    { label: 'Luas Panen Belum Habis (ha)', value: check?.luasPanenBelumHabis ?? '-' },
    { label: 'Luas Rusak/Tidak Berhasil/Puso (ha)', value: check?.luasRusak ?? '-' },
    { label: 'Luas Penanaman Baru/Tambah Tanam (ha)', value: check?.luasPenanamanBaru ?? '-' },
    {
      label: 'Luas Tanaman Akhir Bulan Laporan (ha)',
      value: check?.luasTanamanAkhirBulanLaporan
    },
    { label: 'Produksi Dipanen Habis/Dibongkar (kuintal)', value: check?.prodPanenHabis ?? '-' },
    { label: 'Produksi Belum Habis (kuintal)', value: check?.prodBelumHabis ?? '-' },
    { label: 'Rata-rata Harga Jual Per Kilogram (Rupiah)', value: check?.rataHargaJual ?? '-' }
  ];

  const handleSubmit = () => {
    const formData = urlFormData(formBlanko);
    setLoading(true);
    dispatch(syncBlanko(formData))
      .unwrap()
      .then(() => {
        navigate(-1);
        setLoading(false);
      })
      .catch(() => {});
  };

  return (
    <>
      <Stack p={2} gap={2}>
        <BaseListDetail data={data} />
        <BaseButton type="submit" onClick={handleSubmit} disabled={loading}>
          Kirim Blanko
        </BaseButton>
      </Stack>
    </>
  );
}

function CatatBlankoPetani() {
  const [formBlanko, setFormBlanko] = useState({});
  return (
    <>
      <CekBlankoPetani setFormBlanko={setFormBlanko} />
      <KirimBlankoPetani formBlanko={formBlanko} />
    </>
  );
}

export default CatatBlankoPetani;
