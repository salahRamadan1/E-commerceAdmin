import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth/authSlice'
import CategorySlice from './Category/CategorySlice'
import SubCategorySlice from './SubCategory/subSlice'
import brandSlice from './Brand/brandSlice'
import ProductSlice from './Product/ProductSlice'
import CouponSlice from './Coupon/CouponSlice'




export const store = configureStore({
    reducer: {

        auth: authSlice,
        category: CategorySlice,
        subCategory: SubCategorySlice,
        brand: brandSlice,
        product: ProductSlice,
        coupon: CouponSlice
    },
})
