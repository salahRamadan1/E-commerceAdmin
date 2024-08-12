import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

var URL = 'http://localhost:5001/user/'


export const logInUser = createAsyncThunk(
    'auth/logIn',
    async (userData) => {
        const { data } = await axios.post(`${URL}logIn`, userData)
        return data

    }
)
export const SendNumberverfiy = createAsyncThunk(
    'auth/numberVerfiy',
    async (userData) => {
        const { data } = await axios.post(`${URL}numberVerviy`, userData)
        return data
    }
)

export const verfiy = createAsyncThunk(
    'auth/verfiy',
    async (userData) => {
        const { data } = await axios.post(`${URL}verfiy`, userData)
        return data
    }
)



export const resetPassWord = createAsyncThunk(
    'auth/resetPawword',
    async (userData) => {
        const { data } = await axios.post(`${URL}resetPassword`, userData)
        return data

    }
)