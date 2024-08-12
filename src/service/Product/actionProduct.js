import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
var URL = 'http://localhost:5001/product'
const token = localStorage.getItem('userToken')
export const getProduct = createAsyncThunk(
    'home/Product',
    async (pageNumber = 1) => {
        const { data } = await axios.get(URL + `?page=${pageNumber}`)
        return data // done
    }
)

export const uploadProduct = createAsyncThunk(
    'home/add/Product',
    async (dataform) => {
        const { data } = await axios.post(URL, dataform, { headers: { token: token } })
        return data //done
    }
)
export const deleteProduct = createAsyncThunk(
    'home/delete/Product',
    async (id) => {
        const { data } = await axios.delete(URL + `/${id}`, { headers: { token: token } })
        return { data }
    }
)
export const getOneProduct = createAsyncThunk(
    'home/oneProduct/Product',
    async (id) => {
        const { data } = await axios.get(URL + `/${id}`,)
        return data
    }
)
export const updateOneProductImagesOrImage = createAsyncThunk(
    'home/updateOneProduct/Product',
    async (form) => {
        const { data } = await axios.patch(URL , form, { headers: { token: token } })
        return data
    }

)
export const searchProduct = createAsyncThunk(
    'home/searchProduct/Product',
    async (value) => {
        const { data } = await axios.get(URL + `?keyword=${value}`)
        return data
    })

    export const updateProductValue = createAsyncThunk(
        'home/updateProductValue/Product',
        async (dataform) => {
            const { data } = await axios.put(URL, dataform, { headers: { token: token } })
            return data //done
        }
    )