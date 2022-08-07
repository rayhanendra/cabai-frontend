import { Routes, Route, Navigate } from 'react-router-dom';

import Daftar from 'containers/Daftar';
import Masuk from 'containers/Masuk';

import IndexPetani from 'containers/Petani/IndexPetani';
import CatatTransaksiPetani from 'containers/Petani/CatatTransaksiPetani';
import BerandaPetani from 'containers/Petani/BerandaPetani';
import TransaksiPetani from 'containers/Petani/TransaksiPetani';
import RiwayatPetani from 'containers/Petani/RiwayatPetani';
import StokPetani from 'containers/Petani/StokPetani';
import CatatBlankoPetani from 'containers/Petani/CatatBlankoPetani';
import DetailBlankoPetani from 'containers/Petani/DetailBlankoPetani';
import DetailTransaksiPetani from 'containers/Petani/DetailTransaksiPetani';
import CatatStokPetani from 'containers/Petani/CatatStokPetani';
import DetailStokPetani from 'containers/Petani/DetailStokPetani';
import UlangTransaksiPetani from 'containers/Petani/UlangTransaksiPetani';
import LahanPetani from 'containers/Petani/LahanPetani';
import CatatLahanPetani from 'containers/Petani/CatatLahanPetani';

import IndexPedagang from 'containers/Pedagang/IndexPedagang';
import BerandaPedagang from 'containers/Pedagang/BerandaPedagang';
import TransaksiPedagang from 'containers/Pedagang/TransaksiPedagang';
import CatatTransaksiPedagang from 'containers/Pedagang/CatatTransaksiPedagang';
import UsangPedagang from 'containers/Pedagang/UsangPedagang';
import RiwayatPedagang from 'containers/Pedagang/RiwayatPedagang';
import CatatUsangPedagang from 'containers/Pedagang/CatatUsangPedagang';
import DetailUsangPedagang from 'containers/Pedagang/DetailUsangPedagang';
import DetailTransaksiPedagang from 'containers/Pedagang/DetailTransaksiPedagang';
import UlangTransaksiPedagang from 'containers/Pedagang/UlangTransaksiPedagang';

import IndexPdh from 'containers/Pdh/IndexPdh';
import BerandaPdh from 'containers/Pdh/BerandaPdh';
import RiwayatAkunPdh from 'containers/Pdh/RiwayatAkunPdh';
import DetailRiwayatAkunPdh from 'containers/Pdh/DetailRiwayatAkunPdh';
import DataDiri from 'containers/DataDiri';
import MasukPdh from 'containers/Pdh/MasukPdh';

import IndexDinas from 'containers/Dinas/IndexDinas';
import BerandaDinas from 'containers/Dinas/BerandaDinas';
import DetailLahanPetani from 'containers/Petani/DetailLahanPetani';
import UbahModalPetani from 'containers/Petani/UbahModalPetani';

function RouterConfig() {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/" element={<Navigate to={'masuk'} replace />} />
      <Route path="masuk" element={<Masuk />} />
      <Route path="daftar" element={<Daftar />} />

      {/* Petani */}
      <Route path="petani" element={<IndexPetani />}>
        <Route path="/petani" element={<Navigate to={'beranda'} replace />} />
        <Route path="beranda" element={<BerandaPetani />} />
        <Route path="beranda/catat-blanko" element={<CatatBlankoPetani />} />
        <Route path="beranda/detail-blanko/:id" element={<DetailBlankoPetani />} />
        <Route path="lahan" element={<LahanPetani />} />
        <Route path="lahan/catat-lahan" element={<CatatLahanPetani />} />
        <Route path="lahan/detail-lahan/:id" element={<DetailLahanPetani />} />
        <Route path="lahan/ubah-modal/:id" element={<UbahModalPetani />} />
        <Route path="stok" element={<StokPetani />} />
        <Route path="stok/catat-stok" element={<CatatStokPetani />} />
        <Route path="stok/detail-stok/:id" element={<DetailStokPetani />} />
        <Route path="transaksi" element={<TransaksiPetani />} />
        <Route path="transaksi/catat-transaksi" element={<CatatTransaksiPetani />} />
        <Route path="transaksi/ulang-transaksi/:id" element={<UlangTransaksiPetani />} />
        <Route path="transaksi/detail-transaksi/:type/:id" element={<DetailTransaksiPetani />} />
        <Route path="riwayat" element={<RiwayatPetani />} />
        <Route path="data-diri" element={<DataDiri />} />
      </Route>

      {/* Pedagang */}
      <Route path="pedagang" element={<IndexPedagang />}>
        <Route path="/pedagang" element={<Navigate to={'beranda'} replace />} />
        <Route path="beranda" element={<BerandaPedagang />} />
        <Route path="transaksi" element={<TransaksiPedagang />} />
        <Route path="transaksi/catat-transaksi" element={<CatatTransaksiPedagang />} />
        <Route path="transaksi/ulang-transaksi/:id" element={<UlangTransaksiPedagang />} />
        <Route path="transaksi/detail-transaksi/:type/:id" element={<DetailTransaksiPedagang />} />
        <Route path="usang" element={<UsangPedagang />} />
        <Route path="usang/catat-usang" element={<CatatUsangPedagang />} />
        <Route path="usang/detail-usang/:id" element={<DetailUsangPedagang />} />
        <Route path="riwayat" element={<RiwayatPedagang />} />
        <Route path="riwayat/detail-transaksi/:id" element={<DetailTransaksiPedagang />} />
        <Route path="riwayat/detail-usang/:id" element={<DetailUsangPedagang />} />
        <Route path="data-diri" element={<DataDiri />} />
      </Route>

      {/* PDH */}
      <Route path="pdh" element={<IndexPdh />}>
        <Route path="/pdh" element={<Navigate to={'beranda'} replace />} />
        <Route path="beranda" element={<BerandaPdh />} />
        <Route path="akuisisi-akun" element={<MasukPdh />} />
        <Route path="riwayat-akun" element={<RiwayatAkunPdh />} />
        <Route path="riwayat-akun/detail/:id" element={<DetailRiwayatAkunPdh />} />
        <Route path="data-diri" element={<DataDiri />} />
      </Route>

      {/* Dinas */}
      <Route path="dinas" element={<IndexDinas />}>
        <Route path="/dinas" element={<Navigate to={'beranda'} replace />} />
        <Route path="beranda" element={<BerandaDinas />} />
        <Route path="data-diri" element={<DataDiri />} />
      </Route>
    </Routes>
  );
}

export default RouterConfig;
