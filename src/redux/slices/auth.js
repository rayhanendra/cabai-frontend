/* eslint-disable */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from './message';
import AuthService from '../../services/auth.service';
import { persistor } from 'redux/store';
import { PURGE } from 'redux-persist';
import SupervisiService from 'services/supervisi.service';

const user = JSON.parse(localStorage.getItem('user'));
// const childUser = JSON.parse(localStorage.getItem('child-user'));

export const signup = createAsyncThunk('auth/signup', async (data, thunkAPI) => {
  try {
    const response = await AuthService.signup(data);
    thunkAPI.dispatch(setMessage(response));
    return { user: response.data.user };
  } catch (error) {
    const response = error.response;
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    thunkAPI.dispatch(setMessage(response));
    return thunkAPI.rejectWithValue();
  }
});

export const signin = createAsyncThunk('auth/signin', async (data, thunkAPI) => {
  try {
    const response = await AuthService.signin(data);
    thunkAPI.dispatch(setMessage(response));
    return { user: response.data.user };
  } catch (error) {
    const response = error.response;
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    thunkAPI.dispatch(setMessage(response));
    return thunkAPI.rejectWithValue();
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  persistor.purge().then(() => {
    AuthService.logout();
  });
});

// Supervisi

export const relog = createAsyncThunk('auth/relog', async (data, thunkAPI) => {
  try {
    const response = await SupervisiService.relog(data);
    thunkAPI.dispatch(setMessage(response));
    return { user: response.data.data.petani };
  } catch (error) {
    const response = error.response;
    thunkAPI.dispatch(setMessage(response));
    return thunkAPI.rejectWithValue();
  }
});

export const relogById = createAsyncThunk('auth/relogById', async (id, thunkAPI) => {
  try {
    const response = await SupervisiService.relogById(id);
    thunkAPI.dispatch(setMessage(response));
    return { user: response.data.data.petani };
  } catch (error) {
    const response = error.response;
    thunkAPI.dispatch(setMessage(response));
    return thunkAPI.rejectWithValue();
  }
});

export const addSupervisi = createAsyncThunk('auth/addSupervisi', async (data, thunkAPI) => {
  try {
    const response = await SupervisiService.addSupervisi(data);
    thunkAPI.dispatch(setMessage(response));
    return { user: response.data.petani };
  } catch (error) {
    const response = error.response;
    thunkAPI.dispatch(setMessage(response));
    return thunkAPI.rejectWithValue();
  }
});

const initialState = { isLoggedIn: user ? true : false, user: null, parentUser: null, status: '' };
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeUser: (state) => {
      localStorage.removeItem('child-user');
      localStorage.removeItem('child-token');
      return { isLoggedIn: true, user: state.parentUser, parentUser: state.parentUser };
    }
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
    builder.addCase(signup.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.status = 'success';
    });
    builder.addCase(signup.rejected, (state) => {
      state.isLoggedIn = false;
      state.status = 'failed';
    });
    builder.addCase(signin.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.parentUser = action.payload.user;
      state.status = 'success';
    });
    builder.addCase(signin.rejected, (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.status = 'failed';
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.parentUser = null;
    });
    builder.addCase(relog.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(relog.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.status = 'success';
    });
    builder.addCase(relog.rejected, (state) => {
      state.status = 'failed';
    });
    builder.addCase(relogById.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(relogById.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.status = 'success';
    });
    builder.addCase(relogById.rejected, (state) => {
      state.status = 'failed';
    });
    builder.addCase(addSupervisi.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(addSupervisi.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.status = 'success';
    });
    builder.addCase(addSupervisi.rejected, (state) => {
      state.status = 'failed';
    });
  }
});
const { reducer, actions } = authSlice;
export const { changeUser } = actions;
export default reducer;
