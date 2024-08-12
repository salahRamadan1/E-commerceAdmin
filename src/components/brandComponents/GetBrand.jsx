import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import { getBrand } from '../../service/Brand/actionBrand';
import UpdateBrand from './UpdateBrand';
import DeleteBrand from './DeleteBrand';


export default function GetBrand() {
    // 1. Data Fetching and Error Handling:
    const {
        loadingGetBrand,
        errorGetBrand,
        errorGetBrandApi,
        dataBrand,
    } = useSelector((state) => state.brand)

    const dispatch = useDispatch();
    /*****************************************************************************************************************************/
    useEffect(() => {
        /******************************function get Brand**************************************/
        dispatch(getBrand())

    }, [])
    return (
        <>
            {/* message  errorr and success */}
            <Stack sx={{ width: '100%' }} spacing={2} className=' my-2'>

                {/* error api get Brand */}
                {errorGetBrandApi && <Alert severity="error">{errorGetBrandApi}</Alert>}
                {/* error get Brand */}
                {errorGetBrand && <Alert severity="error">{errorGetBrand}</Alert>}
                {/* if Brand deleted */}
            </Stack>
            {dataBrand.result <= 0 && <h3 className=' text-center'> Brand is empity</h3>}

            {loadingGetBrand ? <div className=' loading d-flex justify-content-center  mt-5'>
                <div className="loader d-flex "></div>
            </div> :




                <div className=' row g-3 text-center  justify-content-evenly '>

                    {dataBrand.result && dataBrand.result.map((elm, i) => (
                        <div className=' col-md-2  ' key={i}>

                            <img src={`http://localhost:5001/brand/${elm.image}`} alt="" className='imageBrand' />
                            <h5 className=' my-1 text-center'> Name: {elm.name}</h5>
                            <div className=' d-flex justify-content-center'>
                                <UpdateBrand idBrand={elm._id} />

                                <DeleteBrand idBrand={elm._id} />

                            </div>
                            <hr className=' my-2 w-50  mx-auto' />
                        </div>
                    ))}
                </div>



            }

        </>
    )
}
