import { PURGE } from 'redux-persist';
import UserService from 'services/user.service';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const getProfile = createAsyncThunk('user/getProfile', async (id) => {
  const response = await UserService.getProfile(id);
  return response.data;
});

const initialState = { status: '', profile: null };
const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
    builder.addCase(getProfile.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.status = 'success';
      state.profile = action.payload.data;
    });
    builder.addCase(getProfile.rejected, (state) => {
      state.status = 'failed';
    });
  }
});
const { reducer } = userSlice;
export default reducer;
