import { createSlice } from '@reduxjs/toolkit';
import { deleteCategory, getCategory, getOneCategory, searchCategory, updateOneCategory, uploadCategory } from './actionCategory';
const initialStateCategory = {
    // error get category 
    loadingGetCategory: false,
    errorGetCategory: null,
    errorGetCategoryApi: null,

    //error add category
    errorAddCategory: null,
    errorAddCategoryApi: null,
    loadingAddCategory: false,

    // error delete category
    loadingDeleteCategory: false,
    errorDeleteCategory: null,
    errorDeleteCategoryApi: null,
    // error get one category
    loadingGetOneCategory: false,
    errorGetOneCategory: null,
    errorGetOneCategoryApi: null,
    // error update one category
    loadingUpdateCategory: false,
    errorUpdateOneCategory: null,
    errorUpdateOneCategoryApi: null,
    // error searsh category
    loadingSearchCategory: false,
    errorSearchCategory: null,
    errorSearchCategoryApi: null,
    dataCategory: [],


}
const categorySlice = createSlice({
    name: 'category',
    initialState: initialStateCategory,
    reducers: {
        makeStateIsEmpityCategory: (state) => {
            const fields = [
                //   get category 
                'loadingGetCategory', 'errorGetCategory', 'errorGetCategoryApi',
                //  add category

                'loadingAddCategory', 'errorAddCategory', 'errorAddCategoryApi',
                //   delete category

                'loadingDeleteCategory', 'errorDeleteCategory', 'errorDeleteCategoryApi',
                //   get one category

                'loadingGetOneCategory', 'errorGetOneCategory', 'errorGetOneCategoryApi',
                //   update one category

                'loadingUpdateCategory', 'errorUpdateOneCategory', 'errorUpdateOneCategoryApi',
                //   searsh category

                'loadingSearchCategory', 'errorSearchCategory', 'errorSearchCategoryApi',
            ];

            fields.forEach(field => {
                state[field] = field.startsWith('loading') ? false : null;
            });

        }
    },
    extraReducers: (builder) => {
        builder
            // get category
            .addCase(getCategory.pending, (state, action) => {

                // Indicate that data is being fetched
                state.loadingGetCategory = true
            })
            .addCase(getCategory.fulfilled, (state, action) => {
                // Data fetching completed
                state.loadingGetCategory = false
                // Check if the request was successful
                if (action.payload.massage === 'success') {
                    // Set data and clear errors
                    state.loadingGetCategory = false
                    state.dataCategory = action.payload
                    state.error = null
                }
                // Handle error case
                state.errorGetCategory = action.payload.message
            })
            .addCase(getCategory.rejected, (state, action) => {

                // Data fetching failed
                state.loadingGetCategory = false
                // Handle error      // Set API error message                       // Clear API error

                !action.payload ? state.errorGetCategoryApi = action.error.message : state.errorGetCategoryApi = null
            })
            // add category
            .addCase(uploadCategory.pending, (state) => {
                // Indicate that category upload is in progress
                state.loadingAddCategory = true
            })
            .addCase(uploadCategory.fulfilled, (state, action) => {
                // Category upload completed

                state.loadingAddCategory = false
                // Check if there's an error   // Set error message if document is not present    // Clear error if document is present
                !action.payload.Document ? state.errorAddCategory = action.payload.message : state.errorAddCategory = ''
            })
            .addCase(uploadCategory.rejected, (state, action) => {
                // Handle error      // Set API error message                       // Clear API error
                !action.payload ? state.errorAddCategoryApi = action.error.message : state.errorAddCategoryApi = null
                // Category upload failed
                state.loadingAddCategory = false
            })
            // delete
            .addCase(deleteCategory.pending, (state) => {
                // Indicate that category upload is in progress
                state.loadingDeleteCategory = true
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                // Reset the loading state to indicate the deletion process is complete.
                state.loadingDeleteCategory = false
                // Check the response data's "message" property.
                if (action.payload.data.message !== 'success') {
                    // If the message is not "success", update the error state with the received message.
                    state.errorDeleteCategory = action.payload.message
                } else {
                    // If the message is "success", clear the error state.
                    state.errorDeleteCategory = null
                }
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                // Handle error      // Set API error message                       // Clear API error
                action.error ? state.errorDeleteCategoryApi = action.error.message : state.errorDeleteCategoryApi = null
                // Category upload failed
                state.loadingDeleteCategory = false
            })
            // get one category
            .addCase(getOneCategory.pending, (state) => {
                // Indicate that fetching a single category is in progress
                state.loadingGetOneCategory = true
            })
            .addCase(getOneCategory.fulfilled, (state, action) => {
                // Fetching a single category has completed
                state.loadingGetOneCategory = false;

                // Check if the fetch was successful
                if (action.payload.message !== 'success') {
                    // Handle fetch error
                    state.errorGetOneCategory = action.payload.message;
                } else {
                    // Fetch successful, clear error (this line might be redundant)
                    state.errorGetOneCategory = null;
                }
            })
            .addCase(getOneCategory.rejected, (state, action) => {
                // Handle error      // Set API error message                       // Clear API error
                !action.payload ? state.errorGetOneCategoryApi = action.error.message : state.errorGetOneCategoryApi = null
                // Category upload failed
                state.loadingGetOneCategory = false
            })
            // update one category
            .addCase(updateOneCategory.pending, (state) => {
                // Indicate that the update category process is in progress
                state.loadingUpdateCategory = true
            })
            .addCase(updateOneCategory.fulfilled, (state, action) => {
                // Update category process has completed
                state.loadingUpdateCategory = false;

                // Check if the update was successful
                if (action.payload.message !== 'success') {
                    // Handle update error
                    state.errorUpdateOneCategory = action.payload.message;
                } else {
                    // Update successful, clear error
                    state.errorUpdateOneCategory = null;
                }
            })
            .addCase(updateOneCategory.rejected, (state, action) => {
                // Handle error      // Set API error message                       // Clear API error
                !action.payload ? state.errorUpdateOneCategoryApi = action.error.message : state.errorUpdateOneCategoryApi = null
                // Category upload failed
                state.loadingUpdateCategory = false
            })
            // searchvalue
            .addCase(searchCategory.pending, (state) => {
                // Indicate that the search for categories is in progress
                state.loadingSearchCategory = true;
                // Clear previous search results
                state.dataCategory = [];
            })
            .addCase(searchCategory.fulfilled, (state, action) => {
                // Search for categories has completed
                state.loadingSearchCategory = false;

                // Check if the search was successful
                if (action.payload.massage === 'success') {
                    // Clear any previous errors
                    state.errorSearchCategory = false;
                    // Update the category data with the received payload
                    state.dataCategory = action.payload;
                    // Clear any general error
                    state.error = null;
                } else {
                    // Handle search error
                    state.errorGetCategory = action.payload.message;
                }
            })
            .addCase(searchCategory.rejected, (state, action) => {
                // Handle error      // Set API error message                       // Clear API error
                !action.payload ? state.errorSearchCategoryApi = action.error.message : state.errorSearchCategoryApi = null
                // Category upload failed
                state.loadingSearchCategory = false
            })
    }
})
export const { makeStateIsEmpityCategory } = categorySlice.actions;

export default categorySlice.reducer;
