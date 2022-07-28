import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import UsangService from 'services/usang.service';
import { setMessage } from './message';

export const getAllUsang = createAsyncThunk('usang/getAllUsang', async () => {
  const response = await UsangService.getAllUsang();
  return response.data;
});

export const getUsangById = createAsyncThunk('usang/getUsangById', async (id) => {
  const response = await UsangService.getUsangById(id);
  return response.data;
});

export const addUsang = createAsyncThunk('usang/addUsang', async (data, thunkAPI) => {
  const response = await UsangService.addUsang(data);
  thunkAPI.dispatch(setMessage(response));
  return response.data;
});

export const deleteUsang = createAsyncThunk('usang/deleteUsang', async (id, thunkAPI) => {
  const response = await UsangService.deleteUsang(id);
  thunkAPI.dispatch(setMessage(response));
  return response.data;
});

const initialState = { usang: [], status: null, detail: {} };
const usangSlice = createSlice({
  name: 'stok',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
    builder.addCase(getAllUsang.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getAllUsang.fulfilled, (state, action) => {
      state.status = 'success';
      state.usang = action.payload.data;
    });
    builder.addCase(getAllUsang.rejected, (state) => {
      state.status = 'failed';
    });
    builder.addCase(getUsangById.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getUsangById.fulfilled, (state, action) => {
      state.status = 'success';
      state.detail = action.payload.data;
    });
    builder.addCase(getUsangById.rejected, (state) => {
      state.status = 'failed';
    });
    builder.addCase(addUsang.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(addUsang.fulfilled, (state, action) => {
      state.status = 'success';
      state.detail = action.payload.data;
    });
    builder.addCase(addUsang.rejected, (state) => {
      state.status = 'failed';
    });
    builder.addCase(deleteUsang.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(deleteUsang.fulfilled, (state) => {
      state.status = 'success';
    });
    builder.addCase(deleteUsang.rejected, (state) => {
      state.status = 'failed';
    });
  }
});

export default usangSlice.reducer;
