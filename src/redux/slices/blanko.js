import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import BlankoService from 'services/blanko.service';
import { setMessage } from './message';
import { PURGE } from 'redux-persist';

export const getAllBlanko = createAsyncThunk('blanko/getAllBlanko', async () => {
  const response = await BlankoService.getAllBlanko();
  return response.data;
});

export const getBlankoById = createAsyncThunk('blanko/getBlankoById', async (id) => {
  const response = await BlankoService.getBlankoById(id);
  return response.data;
});

export const addBlanko = createAsyncThunk('blanko/addBlanko', async (data, thunkAPI) => {
  const response = await BlankoService.addBlanko(data);
  thunkAPI.dispatch(setMessage(response));
  return response.data;
});

const initialState = { riwayat: [], status: null, detail: {} };
const blankoSlice = createSlice({
  name: 'blanko',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
    builder.addCase(getAllBlanko.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getAllBlanko.fulfilled, (state, action) => {
      state.status = 'success';
      state.riwayat = action.payload.data;
    });
    builder.addCase(getAllBlanko.rejected, (state) => {
      state.status = 'failed';
    });
    builder.addCase(getBlankoById.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getBlankoById.fulfilled, (state, action) => {
      state.status = 'success';
      state.detail = action.payload.data;
    });
    builder.addCase(getBlankoById.rejected, (state) => {
      state.status = 'failed';
    });
    builder.addCase(addBlanko.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(addBlanko.fulfilled, (state) => {
      state.status = 'success';
    });
    builder.addCase(addBlanko.rejected, (state) => {
      state.status = 'failed';
    });
  }
});

export default blankoSlice.reducer;
