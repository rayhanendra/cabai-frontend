import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import StokService from 'services/stok.service';
import { setMessage } from './message';

export const getDashboardStok = createAsyncThunk('stok/getDashboardStok', async () => {
  const response = await StokService.getDashboardStok();
  return response.data;
});

export const addStok = createAsyncThunk('stok/addStok', async (data, thunkAPI) => {
  const response = await StokService.addStok(data);
  thunkAPI.dispatch(setMessage(response));
  return response.data;
});

export const getAllStok = createAsyncThunk('stok/getAllStok', async () => {
  const response = await StokService.getAllStok();
  return response.data.data;
});

export const getStokById = createAsyncThunk('stok/getStokById', async (id) => {
  const response = await StokService.getStokById(id);
  return response.data.data;
});

const initialState = { dashboard: {}, status: '', stoks: [], detail: {} };
const stokSlice = createSlice({
  name: 'stok',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
    builder.addCase(getDashboardStok.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getDashboardStok.fulfilled, (state, action) => {
      state.status = 'success';
      state.dashboard = action.payload;
    });
    builder.addCase(getDashboardStok.rejected, (state) => {
      state.status = 'failed';
    });
    builder.addCase(addStok.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(addStok.fulfilled, (state) => {
      state.status = 'success';
    });
    builder.addCase(addStok.rejected, (state) => {
      state.status = 'failed';
    });
    builder.addCase(getAllStok.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getAllStok.fulfilled, (state, action) => {
      state.status = 'success';
      state.stoks = action.payload;
    });
    builder.addCase(getAllStok.rejected, (state) => {
      state.status = 'failed';
    });
    builder.addCase(getStokById.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getStokById.fulfilled, (state, action) => {
      state.status = 'success';
      state.detail = action.payload;
    });
    builder.addCase(getStokById.rejected, (state) => {
      state.status = 'failed';
    });
  }
});

export default stokSlice.reducer;
