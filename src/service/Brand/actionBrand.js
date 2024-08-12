import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
var URL = 'http://localhost:5001/brand'
const token = localStorage.getItem('userToken')
export const getBrand = createAsyncThunk(
    'home/Brand',
    async (pageNumber = 1) => {
        const { data } = await axios.get(URL + `?page=${pageNumber}`)
        return data // done
    }
)

export const uploadBrand = createAsyncThunk(
    'home/add/Brand',
    async (dataform) => {
        const { data } = await axios.post(URL, dataform, { headers: { token: token } })
        return data //done
    }
)
export const deleteBrand = createAsyncThunk(
    'home/delete/Brand',
    async (id) => {
        const { data } = await axios.delete(URL + `/${id}`, { headers: { token: token } })
        return { data }
    }
)
export const getOneBrand = createAsyncThunk(
    'home/oneBrand/Brand',
    async (id) => {
        const { data } = await axios.get(URL + `/${id}`,)
        return data
    }
)
export const updateOneBrand = createAsyncThunk(
    'home/updateOneBrand/Brand',
    async (form) => {
        const { data } = await axios.put(URL, form, { headers: { token: token } })
        return data
    }

)
export const searchBrand = createAsyncThunk(
    'home/searchBrand/Brand',
    async (value) => {
        const { data } = await axios.get(URL + `?keyword=${value}`)
        return data
    })