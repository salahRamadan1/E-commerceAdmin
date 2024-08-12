import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
var URL = 'http://localhost:5001/subCategory'
const token = localStorage.getItem('userToken')
export const getSubCategory = createAsyncThunk(
    'home/SubCategory',
    async (pageNumber = 1) => {
        const { data } = await axios.get(URL + `?page=${pageNumber}`)
        return data // done
    }
)

export const uploadSubCategory = createAsyncThunk(
    'home/add/SubCategory',
    async (dataform) => {
        const { data } = await axios.post(URL, dataform, { headers: { token: token } })
        return data //done
    }
)
export const deleteSubCategory = createAsyncThunk(
    'home/delete/SubCategory',
    async (id) => {
        const { data } = await axios.delete(URL + `/${id}`, { headers: { token: token } })
        return { data }
    }
)
export const getOneSubCategory = createAsyncThunk(
    'home/oneSubCategory/SubCategory',
    async (id) => {
        const { data } = await axios.get(URL + `/${id}`,)
        return data
    }
)
export const updateOneSubCategory = createAsyncThunk(
    'home/updateOneSubCategory/SubCategory',
    async (form) => {
        const { data } = await axios.put(URL, form, { headers: { token: token } })
        return data
    }

)
export const searchSubCategory = createAsyncThunk(
    'home/searchSubCategory/SubCategory',
    async (value) => {
        const { data } = await axios.get(URL + `?keyword=${value}`)
        return data
    })