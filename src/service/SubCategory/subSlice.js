import { createSlice } from '@reduxjs/toolkit';
import { deleteSubCategory, getSubCategory, getOneSubCategory, searchSubCategory, updateOneSubCategory, uploadSubCategory } from './actionSub';
const initialStateSubCategory = {
    // error get SubCategory 
    loadingGetSubCategory: false,
    errorGetSubCategory: null,
    errorGetSubCategoryApi: null,

    //error add SubCategory
    errorAddSubCategory: null,
    errorAddSubCategoryApi: null,
    loadingAddSubCategory: false,

    // error delete SubCategory
    loadingDeleteSubCategory: false,
    errorDeleteSubCategory: null,
    errorDeleteSubCategoryApi: null,
    // error get one SubCategory
    loadingGetOneSubCategory: false,
    errorGetOneSubCategory: null,
    errorGetOneSubCategoryApi: null,
    // error update one SubCategory
    loadingUpdateSubCategory: false,
    errorUpdateOneSubCategory: null,
    errorUpdateOneSubCategoryApi: null,
    // error searsh SubCategory
    loadingSearchSubCategory: false,
    errorSearchSubCategory: null,
    errorSearchSubCategoryApi: null,
    dataSubCategory: [],
}
const SubCategorySlice = createSlice({
    name: 'SubCategory',
    initialState: initialStateSubCategory,
    reducers: {
        makeStateIsEmpitySubCategory: (state) => {
            const fields = [
                //   get Subcategory 
                'loadingGetSubCategory', 'errorGetSubCategory', 'errorGetSubCategoryApi',
                //  add Subcategory

                'loadingAddSubCategory', 'errorAddSubCategory', 'errorAddSubCategoryApi',
                //   delete Subcategory

                'loadingDeleteSubCategory', 'errorDeleteSubCategory', 'errorDeleteSubCategoryApi',
                //   get one Subcategory

                'loadingGetOneSubCategory', 'errorGetOneSubCategory', 'errorGetOneSubCategoryApi',
                //   update one Subcategory

                'loadingUpdateSubCategory', 'errorUpdateOneSubCategory', 'errorUpdateOneSubCategoryApi',
                //   searsh Subcategory

                'loadingSearchSubCategory', 'errorSearchSubCategory', 'errorSearchSubCategoryApi',
            ];

            fields.forEach(field => {
                state[field] = field.startsWith('loading') ? false : null;
            });

        }
    },
    extraReducers: (builder) => {
        builder
            // get SubCategory
            .addCase(getSubCategory.pending, (state) => {
                // Indicate that data is being fetched

                state.loadingGetSubCategory = true

            })
            .addCase(getSubCategory.fulfilled, (state, action) => {
                // Data fetching completed

                state.loadingGetSubCategory = false
                // Check if the request was successful
                if (action.payload.massage === 'success') {
                    // Set data and clear errors
                    state.loadingGetSubCategory = false
                    state.dataSubCategory = action.payload
                    state.error = null


                }
                // Handle error case
                state.errorGetSubCategory = action.payload.message
            })
            .addCase(getSubCategory.rejected, (state, action) => {
                // Category upload failed
                state.loadingGetSubCategory = false
                // Handle error      // Set API error message                       // Clear API error
                !action.payload ? state.errorGetSubCategoryApi = action.error.message : state.errorGetSubCategoryApi = null
            })
            // add SubCategory
            .addCase(uploadSubCategory.pending, (state) => {
                // Indicate that data is being fetched

                state.loadingAddSubCategory = true
            })
            .addCase(uploadSubCategory.fulfilled, (state, action) => {
                // Category upload completed
                state.loadingAddSubCategory = false
                // Check if there's an error   // Set error message if document is not present    // Clear error if document is present
                !action.payload.Document ? state.errorAddSubCategory = action.payload.message : state.errorAddSubCategory = ''
            })
            .addCase(uploadSubCategory.rejected, (state, action) => {
                // Handle error      // Set API error message                       // Clear API error
                !action.payload ? state.errorAddSubCategoryApi = action.error.message : state.errorAddSubCategoryApi = null
                // Category upload failed
                state.loadingAddSubCategory = false
            })
            // delete
            .addCase(deleteSubCategory.pending, (state) => {
                // Indicate that data is being fetched

                state.loadingDeleteSubCategory = true
            })
            .addCase(deleteSubCategory.fulfilled, (state, action) => {
                console.log(action);
                // Reset the loading state to indicate the deletion process is complete.
                state.loadingDeleteSubCategory = false
                // Check the response data's "message" property.
                if (action.payload.data.message !== 'success') {
                    // If the message is not "success", update the error state with the received message.

                    state.errorDeleteSubCategory = action.payload.message
                } else {

                    // If the message is "success", clear the error state.
                    state.errorDeleteSubCategory = null
                }
            })
            .addCase(deleteSubCategory.rejected, (state, action) => {


                // Handle error      // Set API error message                       // Clear API error
                action.error ? state.errorDeleteSubCategoryApi = action.error.message : state.errorDeleteSubCategoryApi = null
                // Category upload failed
                state.loadingDeleteSubCategory = false
            })
            // get one SubCategory
            .addCase(getOneSubCategory.pending, (state) => {
                // Indicate that data is being fetched

                state.loadingGetOneSubCategory = true
            })
            .addCase(getOneSubCategory.fulfilled, (state, action) => {
                // Fetching a single category has completed
                state.loadingGetOneSubCategory = false

                // Check if the fetch was successful
                if (action.payload.message !== 'success') {

                    // Handle fetch error
                    state.errorGetOneSubCategory = action.payload.message
                }
                // Fetch successful, clear error (this line might be redundant)
                state.errorGetOneSubCategory = null
            })
            .addCase(getOneSubCategory.rejected, (state, action) => {
                console.log(action);
                // Handle error      // Set API error message                       // Clear API error
                !action.payload ? state.errorGetOneSubCategoryApi = action.error.message : state.errorGetOneSubCategoryApi = null

                // Category upload failed
                state.loadingGetOneSubCategory = false
            })
            // update one SubCategory
            .addCase(updateOneSubCategory.pending, (state) => {
                // Indicate that data is being fetched

                state.loadingUpdateSubCategory = true
            })
            .addCase(updateOneSubCategory.fulfilled, (state, action) => {
                // Update category process has completed
                state.loadingUpdateSubCategory = false
                console.log(action);
                // Check if the update was successful
                if (action.payload.message !== 'success') {
                    // Handle update error
                    state.errorUpdateOneSubCategory = action.payload.message
                }
                else {
                    // Update successful, clear error
                    state.errorUpdateOneSubCategory = null

                }

            })
            .addCase(updateOneSubCategory.rejected, (state, action) => {

                // Handle error      // Set API error message                       // Clear API error
                !action.payload ? state.errorUpdateOneSubCategoryApi = action.error.message : state.errorUpdateOneSubCategoryApi = null
                // Category upload failed
                state.loadingUpdateSubCategory = false
            })
            // searchvalue
            .addCase(searchSubCategory.pending, (state) => {
                // Indicate that data is being fetched

                state.loadingSearchSubCategory = true
                state.dataSubCategory = []
            })
            .addCase(searchSubCategory.fulfilled, (state, action) => {
                // Search for categories has completed
                state.loadingSearchSubCategory = false
                // Check if the search was successful
                if (action.payload.massage === 'success') {
                    // Clear any previous errors
                    state.errorSearchSubCategory = false
                    // Update the category data with the received payload
                    state.dataSubCategory = action.payload
                    // Clear any general error
                    state.error = null
                }
                else {

                    // Handle search error
                    state.errorGetSubCategory = action.payload.message
                }

            })
            .addCase(searchSubCategory.rejected, (state, action) => {
                // Handle error      // Set API error message                       // Clear API error
                !action.payload ? state.errorSearchSubCategoryApi = action.error.message : state.errorSearchSubCategoryApi = null
                // Category upload failed
                state.loadingSearchSubCategory = false
            })
    }
})
export const { makeStateIsEmpitySubCategory } = SubCategorySlice.actions;
export default SubCategorySlice.reducer;
