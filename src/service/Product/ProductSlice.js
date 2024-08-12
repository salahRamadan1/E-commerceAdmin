import { createSlice } from '@reduxjs/toolkit';
import { deleteProduct, getProduct, getOneProduct, searchProduct,  uploadProduct, updateOneProductImagesOrImage, updateProductValue } from './actionProduct';
const initialStateProduct = {
    // error get Product 
    loadingGetProduct: false, errorGetProduct: null, errorGetProductApi: null,
    //error add Product
    errorAddProduct: null, errorAddProductApi: null, loadingAddProduct: false,
    // error delete Product
    loadingDeleteProduct: false, errorDeleteProduct: null, errorDeleteProductApi: null,
    // error get one Product
    loadingGetOneProduct: false, errorGetOneProduct: null, errorGetOneProductApi: null,
    // error update one Product image
    loadingUpdateProduct: false, errorUpdateOneProduct: null, errorUpdateOneProductApi: null,
    // error update one Product value
    loadingUpdateProductValue: false, errorUpdateOneProductValue: null, errorUpdateOneProductValueApi: null,
    // error searsh Product
    loadingSearchProduct: false, errorSearchProduct: null, errorSearchProductApi: null,
    // data products
    dataProduct: [],
    // data one product
    dataOneProduct: []
}
const ProductSlice = createSlice({
    name: 'Product',
    initialState: initialStateProduct,
    reducers: {
        makeStateIsEmpityProduct: (state) => {
            const fields = [
                //   get Product 
                'loadingGetProduct', 'errorGetProduct', 'errorGetProductApi',//done
                //  add Product

                'loadingAddProduct', 'errorAddProduct', 'errorAddProductApi',//done
                //   delete Product

                'loadingDeleteProduct', 'errorDeleteProduct', 'errorDeleteProductApi',
                //   get one Product

                'loadingGetOneProduct', 'errorGetOneProduct', 'errorGetOneProductApi',//done
                //   update one Product image
                'loadingUpdateProduct', 'errorUpdateOneProduct', 'errorUpdateOneProductApi',
                //   update one Product image
                'loadingUpdateProductValue', 'errorUpdateOneProductValue', 'errorUpdateOneProductValueApi',
                //   searsh Product
                'loadingSearchProduct', 'errorSearchProduct', 'errorSearchProductApi',
            ];

            fields.forEach(field => {
                state[field] = field.startsWith('loading') ? false : null;
            });

        }
    },
    extraReducers: (builder) => {
        builder
            // get Product
            .addCase(getProduct.pending, (state) => {
                // Indicate that product upload is in progress
                state.loadingGetProduct = true

            })
            .addCase(getProduct.fulfilled, (state, action) => {
                // Data fetching completed
                state.loadingGetProduct = false
                // Check if the request was successful
                if (action.payload.massage === 'success') {
                    // Set data and clear errors
                    state.loadingGetProduct = false
                    state.error = null

                    state.dataProduct = action.payload
                }
                // Handle error case
                state.errorGetProduct = action.payload.message
            })
            .addCase(getProduct.rejected, (state, action) => {
                // Data fetching failed
                state.loadingGetProduct = false
                // Handle error      // Set API error message                       // Clear API error
                !action.payload ? state.errorGetProductApi = action.error.message : state.errorGetProductApi = null
            })
            // add Product
            .addCase(uploadProduct.pending, (state, action) => {
                // Indicate that product upload is in progress
                state.loadingAddProduct = true
            })
            .addCase(uploadProduct.fulfilled, (state, action) => {
                // Category upload completed

                state.loadingAddProduct = false
                // Check if there's an error   // Set error message if document is not present    // Clear error if document is present
                !action.payload.Document ? state.errorAddProduct = action.payload.message : state.errorAddProduct = ''
            })
            .addCase(uploadProduct.rejected, (state, action) => {
                // Handle error      // Set API error message                       // Clear API error
                !action.payload ? state.errorAddProductApi = action.error.message : state.errorAddProductApi = null
                // Category upload failed
                state.loadingAddProduct = false
            })
            // delete
            .addCase(deleteProduct.pending, (state) => {
                // Indicate that product upload is in progress
                state.loadingDeleteProduct = true
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                // Reset the loading state to indicate the deletion process is complete.
                state.loadingDeleteProduct = false
                // Check the response data's "message" property.
                if (action.payload.data.message !== 'success') {

                    // If the message is not "success", update the error state with the received message.
                    state.errorDeleteProduct = action.payload.message
                } else {

                    // If the message is "success", clear the error state.
                    state.errorDeleteProduct = null
                }
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                // Handle error      // Set API error message                       // Clear API error
                action.error ? state.errorDeleteProductApi = action.error.message : state.errorDeleteProductApi = null
                // Category upload failed
                state.loadingDeleteProduct = false
            })
            // get one Product
            .addCase(getOneProduct.pending, (state) => {
                // Indicate that product upload is in progress
                state.loadingGetOneProduct = true
            })
            .addCase(getOneProduct.fulfilled, (state, action) => {

                // Fetching a single category has completed
                state.loadingGetOneProduct = false

                // Check if the fetch was successful
                if (action.payload.message !== 'success') {
                    // Handle fetch error
                    state.errorGetOneProduct = action.payload.message
                    state.dataOneProduct = null
                }
                else {

                    // Fetch successful, clear error (this line might be redundant)
                    state.errorGetOneProduct = null
                    state.dataOneProduct = action.payload.result
                }
            })
            .addCase(getOneProduct.rejected, (state, action) => {
                // Handle error      // Set API error message                       // Clear API error

                !action.payload ? state.errorGetOneProductApi = action.error.message : state.errorGetOneProductApi = null
                // Category upload failed

                state.loadingGetOneProduct = false
            })
            // update one Product image
            .addCase(updateOneProductImagesOrImage.pending, (state, action) => {
                // Indicate that product upload is in progress

                state.loadingUpdateProduct = true
            })
            .addCase(updateOneProductImagesOrImage.fulfilled, (state, action) => {
                // Fetching a single category has completed

                state.loadingUpdateProduct = false
                // Check if the fetch was successful

                if (action.payload.message !== 'success') {
                    // Handle fetch error
                    state.errorUpdateOneProduct = action.payload.message
                }
                else {
                    // Fetch successful, clear error (this line might be redundant)
                    state.errorUpdateOneProduct = null

                }

            })
            .addCase(updateOneProductImagesOrImage.rejected, (state, action) => {
                // Handle error      // Set API error message                       // Clear API error
                !action.payload ? state.errorUpdateOneProductApi = action.error.message : state.errorUpdateOneProductApi = null
                // Category upload failed
                state.loadingUpdateProduct = false
            })
            // update one Product value
            .addCase(updateProductValue.pending, (state, action) => {
                // Indicate that product upload is in progress

                state.loadingUpdateProductValue = true
            })
            .addCase(updateProductValue.fulfilled, (state, action) => {
                // Fetching a single category has completed

                state.loadingUpdateProductValue = false
                // Check if the fetch was successful

                    // Handle fetch error
                if (action.payload.message !== 'success') {
                    state.errorUpdateOneProductValue = action.payload.message
                }
                else {
                    // Fetch successful, clear error (this line might be redundant)
                    state.errorUpdateOneProductValue = null

                }

            })
            .addCase(updateProductValue.rejected, (state, action) => {
                // Handle error      // Set API error message                       // Clear API error
                !action.payload ? state.errorUpdateOneProductValueApi = action.error.message : state.errorUpdateOneProductValueApi = null
                // Category upload failed
                state.loadingUpdateProductValue = false
            })
            // searchValue
            .addCase(searchProduct.pending, (state) => {
                // Update Product process has completed
                state.loadingSearchProduct = true
                state.dataProduct = []
            })
            .addCase(searchProduct.fulfilled, (state, action) => {
                // Search for Product has completed
                state.loadingSearchProduct = false
                // Check if the search was successful
                if (action.payload.massage === 'success') {
                    // Clear any previous errors
                    state.errorSearchProduct = false
                    // Update the Product data with the received payload
                    state.dataProduct = action.payload
                    // Clear any general error
                    state.error = null
                }
                else {

                    // Handle search error
                    state.errorGetProduct = action.payload.message
                }

            })
            .addCase(searchProduct.rejected, (state, action) => {
                // Handle error      // Set API error message                       // Clear API error
                !action.payload ? state.errorSearchProductApi = action.error.message : state.errorSearchProductApi = null
                // Product upload failed
                state.loadingSearchProduct = false
            })

    }
})
export const { makeStateIsEmpityProduct } = ProductSlice.actions;
export default ProductSlice.reducer;
