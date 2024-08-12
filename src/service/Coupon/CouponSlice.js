import { createSlice } from '@reduxjs/toolkit';
import { deleteCoupon, getCoupon, getOneCoupon, searchCoupon, updateOneCoupon, uploadCoupon,   } from './actionCoupon';
const initialStateCoupon = {
    // error get Coupon 
    loadingGetCoupon: false,
    errorGetCoupon: null,
    errorGetCouponApi: null,
    //error add Coupon
    errorAddCoupon: null,
    errorAddCouponApi: null,
    loadingAddCoupon: false,
    // error delete Coupon
    loadingDeleteCoupon: false,
    errorDeleteCoupon: null,
    errorDeleteCouponApi: null,
    // error get one Coupon
    loadingGetOneCoupon: false,
    errorGetOneCoupon: null,
    errorGetOneCouponApi: null,
    // error update one Coupon
    loadingUpdateCoupon: false,
    errorUpdateOneCoupon: null,
    errorUpdateOneCouponApi: null,
    // error searsh Coupon
    loadingSearchCoupon: false,
    errorSearchCoupon: null,
    errorSearchCouponApi: null,
    dataCoupon: [],
}
const couponSlice = createSlice({
    name: 'Coupon',
    initialState: initialStateCoupon,
    reducers: {
        makeStateIsEmpityCoupon: (state) => {
            const fields = [
                //   get Coupon 
                'loadingGetCoupon', 'errorGetCoupon', 'errorGetCouponApi',
                //  add Coupon

                'loadingAddCoupon', 'errorAddCoupon', 'errorAddCouponApi',
                //   delete Coupon

                'loadingDeleteCoupon', 'errorDeleteCoupon', 'errorDeleteCouponApi',
                //   get one Coupon

                'loadingGetOneCoupon', 'errorGetOneCoupon', 'errorGetOneCouponApi',
                //   update one Coupon

                'loadingUpdateCoupon', 'errorUpdateOneCoupon', 'errorUpdateOneCouponApi',
                //   searsh Coupon

                'loadingSearchCoupon', 'errorSearchCoupon', 'errorSearchCouponApi',
            ];

            fields.forEach(field => {
                state[field] = field.startsWith('loading') ? false : null;
            });

        }
    },
    extraReducers: (builder) => {
        builder
            // get Coupon
            .addCase(getCoupon.pending, (state, action) => {

                // Indicate that data is being fetched
                state.loadingGetCoupon = true
            })
            .addCase(getCoupon.fulfilled, (state, action) => {
                // Data fetching completed
                state.loadingGetCoupon = false
                // Check if the request was successful
                if (action.payload.massage === 'success') {
                    // Set data and clear errors
                    state.loadingGetCoupon = false
                    state.dataCoupon = action.payload
                    state.error = null
                }
                // Handle error case
                state.errorGetCoupon = action.payload.message
            })
            .addCase(getCoupon.rejected, (state, action) => {

                // Data fetching failed
                state.loadingGetCoupon = false
                // Handle error      // Set API error message                       // Clear API error

                !action.payload ? state.errorGetCouponApi = action.error.message : state.errorGetCouponApi = null
            })
            // add Coupon
            .addCase(uploadCoupon.pending, (state) => {
                // Indicate that Coupon upload is in progress
                state.loadingAddCoupon = true
            })
            .addCase(uploadCoupon.fulfilled, (state, action) => {
                // Coupon upload completed
                console.log(action);
                state.loadingAddCoupon = false
                // Check if there's an error   // Set error message if document is not present    // Clear error if document is present
                !action.payload.Document ? state.errorAddCoupon = action.payload.message : state.errorAddCoupon = ''
            })
            .addCase(uploadCoupon.rejected, (state, action) => {
                // Handle error      // Set API error message                       // Clear API error
                !action.payload ? state.errorAddCouponApi = action.error.message : state.errorAddCouponApi = null
                // Coupon upload failed
                state.loadingAddCoupon = false
            })
            // delete
            .addCase(deleteCoupon.pending, (state) => {
                // Indicate that Coupon upload is in progress
                state.loadingDeleteCoupon = true
            })
            .addCase(deleteCoupon.fulfilled, (state, action) => {
                // Reset the loading state to indicate the deletion process is complete.
                state.loadingDeleteCoupon = false
                // Check the response data's "message" property.
                if (action.payload.data.message !== 'success') {
                    // If the message is not "success", update the error state with the received message.
                    state.errorDeleteCoupon = action.payload.message
                } else {
                    // If the message is "success", clear the error state.
                    state.errorDeleteCoupon = null
                }
            })
            .addCase(deleteCoupon.rejected, (state, action) => {
                // Handle error      // Set API error message                       // Clear API error
                action.error ? state.errorDeleteCouponApi = action.error.message : state.errorDeleteCouponApi = null
                // Coupon upload failed
                state.loadingDeleteCoupon = false
            })
            // get one Coupon
            .addCase(getOneCoupon.pending, (state) => {
                // Indicate that fetching a single Coupon is in progress
                state.loadingGetOneCoupon = true
            })
            .addCase(getOneCoupon.fulfilled, (state, action) => {
                // Fetching a single Coupon has completed
                state.loadingGetOneCoupon = false;

                // Check if the fetch was successful
                if (action.payload.message !== 'success') {
                    // Handle fetch error
                    state.errorGetOneCoupon = action.payload.message;
                } else {
                    // Fetch successful, clear error (this line might be redundant)
                    state.errorGetOneCoupon = null;
                }
            })
            .addCase(getOneCoupon.rejected, (state, action) => {
                // Handle error      // Set API error message                       // Clear API error
                !action.payload ? state.errorGetOneCouponApi = action.error.message : state.errorGetOneCouponApi = null
                // Coupon upload failed
                state.loadingGetOneCoupon = false
            })
            // update one Coupon
            .addCase(updateOneCoupon.pending, (state) => {
                // Indicate that the update Coupon process is in progress
                state.loadingUpdateCoupon = true
            })
            .addCase(updateOneCoupon.fulfilled, (state, action) => {
                console.log(action);
                // Update Coupon process has completed
                state.loadingUpdateCoupon = false;

                // Check if the update was successful
                if (action.payload.message !== 'success') {
                    // Handle update error
                    state.errorUpdateOneCoupon = action.payload.message;
                } else {
                    // Update successful, clear error
                    state.errorUpdateOneCoupon = null;
                }
            })
            .addCase(updateOneCoupon.rejected, (state, action) => {
                // Handle error      // Set API error message                       // Clear API error
                !action.payload ? state.errorUpdateOneCouponApi = action.error.message : state.errorUpdateOneCouponApi = null
                // Coupon upload failed
                state.loadingUpdateCoupon = false
            })
            // searchvalue
            .addCase(searchCoupon.pending, (state) => {
                // Indicate that the search for categories is in progress
                state.loadingSearchCoupon = true;
                // Clear previous search results
                state.dataCoupon = [];
            })
            .addCase(searchCoupon.fulfilled, (state, action) => {
                // Search for categories has completed
                state.loadingSearchCoupon = false;

                // Check if the search was successful
                if (action.payload.massage === 'success') {
                    // Clear any previous errors
                    state.errorSearchCoupon = false;
                    // Update the Coupon data with the received payload
                    state.dataCoupon = action.payload;
                    // Clear any general error
                    state.error = null;
                } else {
                    // Handle search error
                    state.errorGetCoupon = action.payload.message;
                }
            })
            .addCase(searchCoupon.rejected, (state, action) => {
                // Handle error      // Set API error message                       // Clear API error
                !action.payload ? state.errorSearchCouponApi = action.error.message : state.errorSearchCouponApi = null
                // Coupon upload failed
                state.loadingSearchCoupon = false
            })
    }
})
export const { makeStateIsEmpityCoupon } = couponSlice.actions;

export default couponSlice.reducer;
