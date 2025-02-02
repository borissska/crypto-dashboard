import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EStatus, IUser, IUserAuth } from "../../shared/@types/user_types";
import axios from "axios";
import { RootState } from "../store";

type userData = {
  username: string;
  password: string;
};

const API_URL = "http://localhost:3001";

const initialState: IUserAuth = {
  user: null,
  token: localStorage.getItem("token"),
  status: EStatus.EMPTY,
};

export const fetchUserByToken = createAsyncThunk<IUser, string>(
  "auth/fetchUserByToken",
  async (token, { rejectWithValue }) => {
    try {
      console.log("Проверка токена!");
      const response = await axios.get(`${API_URL}/users/userAuth`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue("Токен недействителен или истек");
    }
  }
);

export const login = createAsyncThunk<IUserAuth, userData>(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      console.log("auth/login: Начали");

      const response = await axios.post(
        `${API_URL}/users/login`,
        {
          user: data,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response.data.user);
      return response.data;
    } catch (error) {
      return rejectWithValue("auth/login: Пользователь не найден");
    }
  }
);

export const register = createAsyncThunk<IUserAuth, userData>(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      console.log("Начали");
      const response = await axios.post(`${API_URL}/users/register`, { data });
      console.log(response.data.user);
      return response.data;
    } catch (error) {
      return rejectWithValue("Пользователь не найден");
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.status = EStatus.EMPTY;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserByToken.pending, (state) => {
        state.status = EStatus.LOADING;
      })
      .addCase(fetchUserByToken.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.status = EStatus.SUCCESS;
        state.user = action.payload;
      })
      .addCase(fetchUserByToken.rejected, (state) => {
        state.status = EStatus.ERROR;
        state.token = null;
        localStorage.removeItem("token");
      })

      .addCase(login.pending, (state) => {
        state.status = EStatus.LOADING;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<IUserAuth>) => {
        state.status = EStatus.SUCCESS;
        state.user = action.payload.user;
        const token = action.payload.token;
        state.token = token;
        if (token) localStorage.setItem("token", token);
      })
      .addCase(login.rejected, (state) => {
        state.status = EStatus.ERROR;
        state.token = null;
        localStorage.removeItem("token");
      })

      .addCase(register.pending, (state) => {
        state.status = EStatus.LOADING;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<IUserAuth>) => {
        state.status = EStatus.SUCCESS;
        state.user = action.payload.user;
        const token = action.payload.token;
        state.token = token;
        if (token) localStorage.setItem("token", token);
      })
      .addCase(register.rejected, (state) => {
        state.status = EStatus.ERROR;
        state.token = null;
        localStorage.removeItem("token");
      });
  },
});

export const getUser = (state: RootState) => state.user;
export const { logout } = userSlice.actions;
export default userSlice.reducer;
