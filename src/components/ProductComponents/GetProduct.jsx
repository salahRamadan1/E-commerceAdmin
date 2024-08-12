import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../service/Product/actionProduct';
import { Alert, IconButton, Stack, Tooltip } from '@mui/material';
import { NavLink } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteProduct from './DeleteProduct';
export default function GetProduct() {

    // 1. Data Fetching and Error Handling:
    const {
        loadingGetProduct,
        errorGetProduct,
        errorGetProductApi,
        dataProduct
    } = useSelector((state) => state.product)
    const dispatch = useDispatch();
    /*****************************************************************************************************************************/
    useEffect(() => {
        /******************************function get Product**************************************/
        dispatch(getProduct())

    }, [])
    return (
        <>
            {/* message  errorr and success */}
            <Stack sx={{ width: '100%' }} spacing={2} className=' my-2'>

                {/* error api get Product */}
                {errorGetProductApi && <Alert severity="error">{errorGetProductApi}</Alert>}
                {/* error get Product */}
                {errorGetProduct && <Alert severity="error">{errorGetProduct}</Alert>}
                {/* if Product deleted */}
            </Stack>
            {loadingGetProduct && <div className=' loading d-flex justify-content-center  mt-5'>
                <div className="loader d-flex "></div>
            </div>}
            {/* get */}
            {dataProduct.result <= 0 && <h3 className=' text-center'> Product is empity</h3>}


            <div className=' row g-3 text-center justify-content-center   '>

                {dataProduct.result && dataProduct.result.map((elm, i) => (

                    <div className=' col-md-4  ' key={i}>
                        <NavLink className='text-black text-decoration-none' to={`/MainOneProduct/${elm._id}`}>

                            <img src={`http://localhost:5001/product/${elm.images[0]}`} alt={elm.name} className='imageGetProduct' />
                        </NavLink>
                        <div className=' d-flex justify-content-evenly align-items-center'>
                            <h5 className=' my-1 text-center'> Name: {elm.name}</h5>
                            <DeleteProduct id={elm._id} />
                        </div>

                        <hr className=' my-2 w-50  mx-auto' />
                    </div>

                ))}
            </div >

        </>
    )
}
