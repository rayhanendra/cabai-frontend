import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import LahanService from 'services/lahan.service';
import { setMessage } from './message';
import { PURGE } from 'redux-persist';

export const getAllLahan = createAsyncThunk('lahan/getAllLahan', async () => {
  const response = await LahanService.getAllLahan();
  return response.data;
});

export const addLahan = createAsyncThunk('lahan/addLahan', async (data, thunkAPI) => {
  const response = await LahanService.addLahan(data);
  thunkAPI.dispatch(setMessage(response));
  return response.data;
});

export const getLahanById = createAsyncThunk('lahan/getLahanById', async (id) => {
  const response = await LahanService.getLahanById(id);
  return response.data;
});

export const editLuasRusakLahan = createAsyncThunk(
  'lahan/editLuasRusakLahan',
  async ({ id, data }, thunkAPI) => {
    const response = await LahanService.editLuasRusakLahan(id, data);
    thunkAPI.dispatch(setMessage(response));
    return response.data;
  }
);

export const finishLahan = createAsyncThunk('lahan/finishLahan', async ({ id, data }, thunkAPI) => {
  const response = await LahanService.finishLahan(id, data);
  thunkAPI.dispatch(setMessage(response));
  return response.data;
});

export const cancelFinishLahan = createAsyncThunk(
  'lahan/cancelFinishLahan',
  async (id, thunkAPI) => {
    const response = await LahanService.cancelFinishLahan(id);
    thunkAPI.dispatch(setMessage(response));
    return response.data;
  }
);

export const editModal = createAsyncThunk('lahan/editModal', async ({ id, data }, thunkAPI) => {
  const response = await LahanService.editModal(id, data);
  thunkAPI.dispatch(setMessage(response));
  return response.data;
});

export const deleteLahan = createAsyncThunk('lahan/deleteLahan', async (id, thunkAPI) => {
  const response = await LahanService.deleteLahan(id);
  thunkAPI.dispatch(setMessage(response));
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
    builder.addCase(finishLahan.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(finishLahan.fulfilled, (state) => {
      state.status = 'success';
    });
    builder.addCase(finishLahan.rejected, (state) => {
      state.status = 'failed';
    });
    builder.addCase(cancelFinishLahan.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(cancelFinishLahan.fulfilled, (state) => {
      state.status = 'success';
    });
    builder.addCase(cancelFinishLahan.rejected, (state) => {
      state.status = 'failed';
    });
    builder.addCase(editModal.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(editModal.fulfilled, (state) => {
      state.status = 'success';
    });
    builder.addCase(editModal.rejected, (state) => {
      state.status = 'failed';
    });
  }
});

export default lahanSlice.reducer;
