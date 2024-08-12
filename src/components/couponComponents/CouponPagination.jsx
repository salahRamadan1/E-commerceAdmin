import React from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { getCoupon } from '../../service/Coupon/actionCoupon';
export default function CouponPagination() {
    //1. Access state from the Coupon slice of the Redux store
    const dispatch = useDispatch();
    const { dataCoupon,loadingGetCoupon } = useSelector((state) => state.coupon)
    /*****************************************************************************************************************************/
    //2.Main Function to handle  page Coupon
    const handlePagination = async (event, pageNumber) => {
        event.preventDefault();
        await dispatch(getCoupon(pageNumber))
    };
    return (
        <>
            {!loadingGetCoupon && <>
                {dataCoupon.result && dataCoupon.result.length >= 0 && <div className='pagination my-1 d-flex justify-content-center'>
                    <Stack spacing={2} >
                        <Pagination count={dataCoupon.numberOfPage} onChange={handlePagination} />
                    </Stack>
                </div>}
            </>}

        </>
    )
}
