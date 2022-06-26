import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import LahanService from 'services/lahan.service';
// import { setMessage } from './message';
import { PURGE } from 'redux-persist';

export const getAllLahan = createAsyncThunk('lahan/getAllLahan', async () => {
  const response = await LahanService.getAllLahan();
  return response.data;
});

export const addLahan = createAsyncThunk('lahan/addLahan', async (data) => {
  const response = await LahanService.addLahan(data);
  return response.data;
});

export const getLahanById = createAsyncThunk('lahan/getLahanById', async (id) => {
  const response = await LahanService.getLahanById(id);
  return response.data;
});

export const editLuasRusakLahan = createAsyncThunk('lahan/editLuasRusakLahan', async (id, data) => {
  const response = await LahanService.editLuasRusakLahan(id, data);
  return response.data;
});

const initialState = { riwayat: [], status: null, detail: {} };
const lahanSlice = createSlice({
  name: 'lahan',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
    builder.addCase(getAllLahan.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getAllLahan.fulfilled, (state, action) => {
      state.status = 'success';
      state.riwayat = action.payload.data;
    });
    builder.addCase(getAllLahan.rejected, (state) => {
      state.status = 'failed';
    });
    builder.addCase(getLahanById.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getLahanById.fulfilled, (state, action) => {
      state.status = 'success';
      state.detail = action.payload.data;
    });
    builder.addCase(getLahanById.rejected, (state) => {
      state.status = 'failed';
    });
    builder.addCase(editLuasRusakLahan.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(editLuasRusakLahan.fulfilled, (state) => {
      state.status = 'success';
    });
    builder.addCase(editLuasRusakLahan.rejected, (state) => {
      state.status = 'failed';
    });
  }
});

export default lahanSlice.reducer;