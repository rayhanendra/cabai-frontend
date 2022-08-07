import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import SupervisiService from 'services/supervisi.service';
import { setMessage } from './message';

export const getAllSupervisi = createAsyncThunk('supervisi/getAllSupervisi', async () => {
  const response = await SupervisiService.getAllSupervisi();
  return response.data;
});

export const deleteSupervisi = createAsyncThunk(
  'supervisi/deleteSupervisi',
  async (_, thunkAPI) => {
    const response = await SupervisiService.deleteSupervisi();
    thunkAPI.dispatch(setMessage(response));
    return response.data;
  }
);

const initialState = {
  status: '',
  petani: []
};
const pdhSlice = createSlice({
  name: 'supervisi',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
    builder.addCase(getAllSupervisi.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getAllSupervisi.fulfilled, (state, action) => {
      state.status = 'success';
      state.petani = action.payload.data[0].petani;
    });
    builder.addCase(getAllSupervisi.rejected, (state) => {
      state.status = 'failed';
    });
    builder.addCase(deleteSupervisi.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(deleteSupervisi.fulfilled, (state) => {
      state.status = 'success';
    });
    builder.addCase(deleteSupervisi.rejected, (state) => {
      state.status = 'failed';
    });
  }
});

export default pdhSlice.reducer;
