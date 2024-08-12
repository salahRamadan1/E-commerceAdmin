import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
var URL = 'http://localhost:5001/category'
const token = localStorage.getItem('userToken')
export const getCategory = createAsyncThunk(
    'home/category',
    async (pageNumber = 1) => {
        const { data } = await axios.get(URL + `?page=${pageNumber}`)
        return data
    }
)

export const uploadCategory = createAsyncThunk(
    'home/add/category',
    async (formData) => {
        const { data } = await axios.post(URL, formData, { headers: { token: token } })
        return data
    }
)
export const deleteCategory = createAsyncThunk(
    'home/delete/category',
    async (id) => {
        const { data } = await axios.delete(URL + `/${id}`, { headers: { token: token } })

        return { data }
    }
)
export const getOneCategory = createAsyncThunk(
    'home/oneCategory/category',
    async (id) => {
        const { data } = await axios.get(URL + `/${id}`,)
        return data
    }
)
export const updateOneCategory = createAsyncThunk(
    'home/updateOneCategory/category',
    async (form) => {
        const { data } = await axios.put(URL, form, { headers: { token: token } })
        return data
    }

)
export const searchCategory = createAsyncThunk(
    'home/searchCategory/category',
    async (value) => {
        const { data } = await axios.get(URL + `?keyword=${value}`)
        return data
    })