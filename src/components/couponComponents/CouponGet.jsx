import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCoupon } from '../../service/Coupon/actionCoupon'

import Stack from '@mui/material/Stack';

import Alert from '@mui/material/Alert';
import CouponDelete from './CouponDelete';
import UpdateCouponCom from './CouponUpdate';

// import UpdateCouponCom from './UpdateCouponCom';
// import DeleteCouponCom from './DeleteCouponCom';
export default function CouponGet() {
    // 1. Data Fetching and Error Handling:
    const {
        errorGetCoupon,
        errorGetCouponApi,
        loadingGetCoupon,
        dataCoupon,
    } = useSelector((state) => state.coupon)
    const dispatch = useDispatch();
    /*****************************************************************************************************************************/
    useEffect(() => {
        /******************************function get Coupon**************************************/
        dispatch(getCoupon())
    }, [])

    return (
        <>
            {/*  message  errorr and success */}
            <Stack sx={{ width: '100%' }} spacing={2} className=' my-2'>

                {/* error api get Coupon */}
                {errorGetCouponApi && <Alert severity="error">{errorGetCouponApi}</Alert>}
                {/* error get Coupon */}
                {errorGetCoupon && <Alert severity="error">{errorGetCoupon}</Alert>}
                {/* if Coupon deleted */}
            </Stack>
            {loadingGetCoupon && <div className=' loading d-flex justify-content-center  mt-5'>
                <div className="loader d-flex "></div>
            </div>}
            {/* get */}
            {dataCoupon.result <= 0 && <h3 className=' text-center'> Coupon is empity</h3>}


            <div className=' row g-3 text-center justify-content-evenly '>

                {dataCoupon.result && dataCoupon.result.map((elm, i) => (
                    <div className=' col-md-2   text-start ' key={i}>

                        <img src={`http://localhost:5001/Coupon/${elm.image}`} alt="" className='imageCoupon' />


                        <p  > <span className=' fw-bolder'>Name:</span>  {elm.name}</p>
                        <p><span className=' fw-bolder'>Title:</span> {elm.title}</p>
                        <p><span className=' fw-bolder'>Discount:</span> {elm.discount}</p>
                        <p><span className=' fw-bolder'>Expires:</span> {elm.expires.split("T")[0]}</p>


                        <div className='d-flex justify-content-center'  >

                            <UpdateCouponCom elm={elm} />
                            <CouponDelete idCoupon={elm._id} />
                        </div>


                        <hr className=' my-  ' />
                    </div>
                ))}
            </div>



        </>
    )
}





