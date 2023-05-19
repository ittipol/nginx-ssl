import api from "@/util/axios"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { RegisterBody, RegisterResponseData, RegisterResponseResult } from "@/models/register";
import { LoginResponseData, LoginResponseResult } from "@/models/login";
import { ErrorResult } from "@/models/response";
import { UserResponseData, UserResponseResult } from "@/models/user";

export interface UserState {
    isAuth: boolean,
    accessToken: string,
    name: string
}

const initialState: UserState = {
    isAuth: false,
    accessToken: '',
    name: ''
}

export const userProfile = createAsyncThunk(
    'user/profile',
    async (_, thunkAPI) => {
        
        try {
            const res = await api.get<UserResponseData>('user/profile')

            // payload
            return thunkAPI.fulfillWithValue<UserResponseResult>({
                data: res.data,
                status: res.status
            })
        }
        catch (ex) {
            const error = ex as AxiosError
            return thunkAPI.rejectWithValue({
                error: error.response?.statusText,
                status: error.response?.status
            } as ErrorResult)
        }

    }
)

export const userLogin = createAsyncThunk(
    'user/login',
    async (body :{email:string, password:string}, thunkAPI) => {
        
        try {
            const res = await api.post<LoginResponseData>('login', body)
            // return res.data

            // payload
            return thunkAPI.fulfillWithValue<LoginResponseResult>({
                data: res.data,
                status: res.status
            })
        }
        catch (ex) {
            const error = ex as AxiosError
            return thunkAPI.rejectWithValue({
                error: error.response?.statusText,
                status: error.response?.status
            } as ErrorResult)
        }
        
    }
)

export const userRegister = createAsyncThunk(
    'user/register',
    async (body: RegisterBody, thunkAPI) => {

        try {
            const res = await api.post<RegisterResponseData>('register', body)

            return thunkAPI.fulfillWithValue<RegisterResponseResult>({
                data: res.data,
                status: res.status
            })
        }
        catch (ex) {
            const error = ex as AxiosError
            return thunkAPI.rejectWithValue({
                error: error.response?.statusText,
                status: error.response?.status
            } as ErrorResult)
        }

    }
)

export const refreshToken = createAsyncThunk(
    'user/token/refresh',
    async (_, thunkAPI) => {

        try {
            const res = await api.post<RegisterResponseData>('token/refresh')

            return thunkAPI.fulfillWithValue<RegisterResponseResult>({
                data: res.data,
                status: res.status
            })
        }
        catch (ex) {
            const error = ex as AxiosError
            return thunkAPI.rejectWithValue({
                error: error.response?.statusText,
                status: error.response?.status
            } as ErrorResult)
        }

    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: { },
    extraReducers(builder) {
        builder
        .addCase(userLogin.fulfilled, (state, action) => {
            state.isAuth = true
            state.accessToken = action.payload.data.accessToken
        })
        .addCase(userLogin.rejected, (state, _) => {
            state.isAuth = false
            state.accessToken = ''
        })

        .addCase(userRegister.fulfilled, (state, action) => {
            
        })
        .addCase(userRegister.rejected, (state, action) => {
            
        })

        .addCase(userProfile.fulfilled, (state, action) => {
            state.name = action.payload.data.name
        })
        .addCase(userProfile.rejected, (state, action) => {

        })
    },
})

export default userSlice.reducer