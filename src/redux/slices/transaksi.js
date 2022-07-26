import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import TransaksiService from 'services/transaksi.service';
import { setMessage } from './message';

export const getAllTransaksi = createAsyncThunk('transaksi/getAllTransaksi', async () => {
  const response = await TransaksiService.getAllTransaksi();
  return response.data;
});

export const getTransaksiById = createAsyncThunk('transaksi/getTransaksiById', async (id) => {
  const response = await TransaksiService.getTransaksiById(id);
  return response.data;
});

export const addTransaksi = createAsyncThunk('transaksi/addTransaksi', async (data, thunkAPI) => {
  const response = await TransaksiService.addTransaksi(data);
  thunkAPI.dispatch(setMessage(response));
  return response.data;
});

export const deleteTransaksi = createAsyncThunk(
  'transaksi/deleteTransaksi',
  async (id, thunkAPI) => {
    const response = await TransaksiService.deleteTransaksi(id);
    thunkAPI.dispatch(getAllTransaksi());
    thunkAPI.dispatch(setMessage(response));
    return response.data;
  }
);

export const acceptTransaksi = createAsyncThunk(
  'transaksi/acceptTransaksi',
  async (id, thunkAPI) => {
    const response = await TransaksiService.acceptTransaksi(id);
    thunkAPI.dispatch(getAllTransaksi());
    thunkAPI.dispatch(setMessage(response));
    return response.data;
  }
);

export const declineTransaksi = createAsyncThunk(
  'transaksi/declineTransaksi',
  async (id, thunkAPI) => {
    const response = await TransaksiService.declineTransaksi(id);
    thunkAPI.dispatch(getAllTransaksi());
    thunkAPI.dispatch(setMessage(response));
    return response.data;
  }
);

export const editTransaksi = createAsyncThunk(
  'transaksi/editTransaksi',
  async ({ id, formData }, thunkAPI) => {
    const response = await TransaksiService.editTransaksi({ id, formData });
    thunkAPI.dispatch(setMessage(response));
    return response.data;
  }
);

const initialState = {
  status: '',
  konfirmasi: [],
  diajukan: [],
  detail: {},
  riwayat: []
};
const transaksiSlice = createSlice({
  name: 'transaksi',
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.detail = {};
    }
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
    builder.addCase(getAllTransaksi.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getAllTransaksi.fulfilled, (state, action) => {
      state.status = 'success';
      state.konfirmasi = action.payload.dibeli.filter((item) => item.statusTransaksi === 0);
      state.diajukan = action.payload.dijual.filter((item) => item.statusTransaksi === 0);
      state.riwayat = action.payload.dijual.filter((item) => item.statusTransaksi !== 0);
    });
    builder.addCase(getAllTransaksi.rejected, (state) => {
      state.status = 'failed';
    });
    builder.addCase(getTransaksiById.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getTransaksiById.fulfilled, (state, action) => {
      state.status = 'success';
      state.detail = action.payload.data;
    });
    builder.addCase(getTransaksiById.rejected, (state) => {
      state.status = 'failed';
    });
    builder.addCase(addTransaksi.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(addTransaksi.fulfilled, (state) => {
      state.status = 'success';
    });
    builder.addCase(addTransaksi.rejected, (state) => {
      state.status = 'failed';
    });
    builder.addCase(deleteTransaksi.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(deleteTransaksi.fulfilled, (state) => {
      state.status = 'success';
    });
    builder.addCase(deleteTransaksi.rejected, (state) => {
      state.status = 'failed';
    });
    builder.addCase(acceptTransaksi.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(acceptTransaksi.fulfilled, (state) => {
      state.status = 'success';
    });
    builder.addCase(acceptTransaksi.rejected, (state) => {
      state.status = 'failed';
    });
    builder.addCase(declineTransaksi.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(declineTransaksi.fulfilled, (state) => {
      state.status = 'success';
    });
    builder.addCase(declineTransaksi.rejected, (state) => {
      state.status = 'failed';
    });
    builder.addCase(editTransaksi.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(editTransaksi.fulfilled, (state) => {
      state.status = 'success';
    });
    builder.addCase(editTransaksi.rejected, (state) => {
      state.status = 'failed';
    });
  }
});

export const { reset } = transaksiSlice.actions;
export default transaksiSlice.reducer;
