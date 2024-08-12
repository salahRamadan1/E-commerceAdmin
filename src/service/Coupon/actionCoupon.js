import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
var URL = 'http://localhost:5001/coupon'
const token = localStorage.getItem('userToken')
export const getCoupon = createAsyncThunk(
    'home/Coupon',
    async (pageNumber = 1) => {
        const { data } = await axios.get(URL + `?page=${pageNumber}`)
        return data
    }
)

export const uploadCoupon = createAsyncThunk(
    'home/add/Coupon',
    async (formData) => {
        const { data } = await axios.post(URL, formData, { headers: { token: token } })
        console.log(data);
        return data
    }
)
export const deleteCoupon = createAsyncThunk(
    'home/delete/Coupon',
    async (id) => {
        const { data } = await axios.delete(URL + `/${id}`, { headers: { token: token } })

        return { data }
    }
)
export const getOneCoupon = createAsyncThunk(
    'home/oneCoupon/Coupon',
    async (id) => {
        const { data } = await axios.get(URL + `/${id}`,)
        return data
    }
)
export const updateOneCoupon = createAsyncThunk(
    'home/updateOneCoupon/Coupon',
    async (form) => {
        const { data } = await axios.put(URL, form, { headers: { token: token } })
        return data
    }

)
export const searchCoupon = createAsyncThunk(
    'home/searchCoupon/Coupon',
    async (value) => {
        const { data } = await axios.get(URL + `?keyword=${value}`)
        return data
    })