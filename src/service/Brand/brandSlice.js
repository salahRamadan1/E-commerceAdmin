import { createSlice } from '@reduxjs/toolkit';
import { deleteBrand, getBrand, getOneBrand, searchBrand, updateOneBrand, uploadBrand } from './actionBrand';

const initialStateBrand = {
    // error get Brand 
    loadingGetBrand: false, errorGetBrand: null, errorGetBrandApi: null,
    //error add Brand
    errorAddBrand: null, errorAddBrandApi: null, loadingAddBrand: false,
    // error delete Brand
    loadingDeleteBrand: false, errorDeleteBrand: null, errorDeleteBrandApi: null,
    // error get one Brand
    loadingGetOneBrand: false, errorGetOneBrand: null, errorGetOneBrandApi: null,
    // error update one Brand
    loadingUpdateBrand: false, errorUpdateOneBrand: null, errorUpdateOneBrandApi: null,
    // error searsh Brand
    loadingSearchBrand: false, errorSearchBrand: null, errorSearchBrandApi: null, dataBrand: [],

}
const BrandSlice = createSlice({
    name: 'brand',
    initialState: initialStateBrand,
    reducers: {
        makeStateIsEmpityBrand: (state) => {
            const fields = [
                //   get Brand 
                'loadingGetBrand', 'errorGetBrand', 'errorGetBrandApi',
                //  add Brand

                'loadingAddBrand', 'errorAddBrand', 'errorAddBrandApi',
                //   delete Brand

                'loadingDeleteBrand', 'errorDeleteBrand', 'errorDeleteBrandApi',
                //   get one Brand

                'loadingGetOneBrand', 'errorGetOneBrand', 'errorGetOneBrandApi',
                //   update one Brand

                'loadingUpdateBrand', 'errorUpdateOneBrand', 'errorUpdateOneBrandApi',
                //   searsh Brand

                'loadingSearchBrand', 'errorSearchBrand', 'errorSearchBrandApi',
            ];

            fields.forEach(field => {
                state[field] = field.startsWith('loading') ? false : null;
            });

        }
    },
    extraReducers: (builder) => {
        builder
            // get Brand
            .addCase(getBrand.pending, (state) => {
                // Update Brand process has completed

                state.loadingGetBrand = true

            })
            .addCase(getBrand.fulfilled, (state, action) => {
                // Data fetching completed
                state.loadingGetBrand = false
                // Check if the request was successful

                if (action.payload.massage === 'success') {
                    // Set data and clear errors

                    state.loadingGetBrand = false
                    state.dataBrand = action.payload
                    state.error = null


                }
                // Handle error case
                state.errorGetBrand = action.payload.message
            })
            .addCase(getBrand.rejected, (state, action) => {
                // Brand upload failed
                state.loadingGetBrand = false
                // Handle error      // Set API error message                       // Clear API error
                !action.payload ? state.errorGetBrandApi = action.error.message : state.errorGetBrandApi = null
            })
            // add Brand
            .addCase(uploadBrand.pending, (state) => {
                // Update Brand process has completed

                state.loadingAddBrand = true

            })
            .addCase(uploadBrand.fulfilled, (state, action) => {
                // Brand upload completed
                state.loadingAddBrand = false
                // Check if there's an error   // Set error message if document is not present    // Clear error if document is present
                !action.payload.Document ? state.errorAddBrand = action.payload.message : state.errorAddBrand = ''
            })
            .addCase(uploadBrand.rejected, (state, action) => {
                // Handle error      // Set API error message                       // Clear API error
                !action.payload ? state.errorAddBrandApi = action.error.message : state.errorAddBrandApi = null
                // Brand upload failed
                state.loadingAddBrand = false
            })
            // delete
            .addCase(deleteBrand.pending, (state) => {
                // Update Brand process has completed

                state.loadingDeleteBrand = true

            })
            .addCase(deleteBrand.fulfilled, (state, action) => {
                // Reset the loading state to indicate the deletion process is complete.
                state.loadingDeleteBrand = false
                // Check the response data's "message" property.
                if (action.payload.data.message !== 'success') {

                    // If the message is not "success", update the error state with the received message.
                    state.errorDeleteBrand = action.payload.message
                } else {
                    // If the message is "success", clear the error state.

                    state.errorDeleteBrand = null
                }
            })
            .addCase(deleteBrand.rejected, (state, action) => {

                // Handle error      // Set API error message                       // Clear API error

                action.error ? state.errorDeleteBrandApi = action.error.message : state.errorDeleteBrandApi = null
                // Brand upload failed
                state.loadingDeleteBrand = false
            })
            // get one Brand
            .addCase(getOneBrand.pending, (state) => {
                // Update Brand process has completed

                state.loadingGetOneBrand = true

            })
            .addCase(getOneBrand.fulfilled, (state, action) => {
                // Fetching a single Brand has completed
                state.loadingGetOneBrand = false
                // Check if the fetch was successful

                if (action.payload.message !== 'success') {
                    // Handle fetch error

                    state.errorGetOneBrand = action.payload.message
                }
                // Fetch successful, clear error (this line might be redundant)
                state.errorGetOneBrand = null
            })
            .addCase(getOneBrand.rejected, (state, action) => {

                // Handle error      // Set API error message                       // Clear API error

                !action.payload ? state.errorGetOneBrandApi = action.error.message : state.errorGetOneBrandApi = null

                state.loadingGetOneBrand = false                // Brand upload failed

            })
            // update one Brand
            .addCase(updateOneBrand.pending, (state) => {
                // Update Brand process has completed

                state.loadingUpdateBrand = true

            })
            .addCase(updateOneBrand.fulfilled, (state, action) => {
                // Update Brand process has completed
                state.loadingUpdateBrand = false
                // Check if the update was successful

                if (action.payload.message !== 'success') {
                    // Handle update error
                    state.errorUpdateOneBrand = action.payload.message
                }
                else {
                    // Update successful, clear error
                    state.errorUpdateOneBrand = null

                }

            })
            .addCase(updateOneBrand.rejected, (state, action) => {
                // Handle error      // Set API error message                       // Clear API error

                !action.payload ? state.errorUpdateOneBrandApi = action.error.message : state.errorUpdateOneBrandApi = null
                // Brand upload failed
                state.loadingUpdateBrand = false
            })
            // searchvalue
            .addCase(searchBrand.pending, (state) => {
                // Update Brand process has completed

                state.loadingSearchBrand = true

                state.dataBrand = []
            })
            .addCase(searchBrand.fulfilled, (state, action) => {
                // Search for Brand has completed
                state.loadingSearchBrand = false

                // Check if the search was successful
                if (action.payload.massage === 'success') {
                    // Clear any previous errors
                    state.errorSearchBrand = false
                    // Update the Brand data with the received payload
                    state.dataBrand = action.payload
                    // Clear any general error
                    state.error = null
                }
                else {

                    // Handle search error
                    state.errorGetBrand = action.payload.message
                }

            })
            .addCase(searchBrand.rejected, (state, action) => {
                // Handle error      // Set API error message                       // Clear API error
                !action.payload ? state.errorSearchBrandApi = action.error.message : state.errorSearchBrandApi = null
                // Brand upload failed
                state.loadingSearchBrand = false


            })
    }
})
export const { makeStateIsEmpityBrand } = BrandSlice.actions;
export default BrandSlice.reducer;
