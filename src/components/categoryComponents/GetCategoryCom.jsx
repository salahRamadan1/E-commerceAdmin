import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory } from '../../service/Category/actionCategory'

import Stack from '@mui/material/Stack';

import Alert from '@mui/material/Alert';

import UpdateCategoryCom from './UpdateCategoryCom';
import DeleteCategoryCom from './DeleteCategoryCom';
export default function GetCategoryCom() {
    // 1. Data Fetching and Error Handling:
    const {
        errorGetCategory,
        errorGetCategoryApi,
        loadingGetCategory,
        dataCategory,
    } = useSelector((state) => state.category)
    const dispatch = useDispatch();
    /*****************************************************************************************************************************/
    useEffect(() => {
        /******************************function get category**************************************/
        dispatch(getCategory())
    }, [])

    return (
        <>
            {/*  message  errorr and success */}
            <Stack sx={{ width: '100%' }} spacing={2} className=' my-2'>

                {/* error api get category */}
                {errorGetCategoryApi && <Alert severity="error">{errorGetCategoryApi}</Alert>}
                {/* error get category */}
                {errorGetCategory && <Alert severity="error">{errorGetCategory}</Alert>}
                {/* if category deleted */}
            </Stack>
            {loadingGetCategory && <div className=' loading d-flex justify-content-center  mt-5'>
                <div className="loader d-flex "></div>
            </div>}
            {/* get */}
            {dataCategory.result <= 0 && <h3 className=' text-center'> category is empity</h3>}


            <div className=' row g-3 text-center justify-content-evenly '>

                {dataCategory.result && dataCategory.result.map((elm, i) => (
                    <div className=' col-md-2  ' key={i}>

                        <img src={`http://localhost:5001/category/${elm.image}`} alt="" className='imageCategory' />
                        <h5 className=' my-1 text-center'>  {elm.name}</h5>
                        <div className=' d-flex justify-content-center'>
                            <UpdateCategoryCom idCategory={elm._id} />
                            <DeleteCategoryCom idCategory={elm._id} />
                        </div>
                        <hr className=' my-2 w-50  mx-auto' />
                    </div>
                ))}
            </div>



        </>
    )
}





