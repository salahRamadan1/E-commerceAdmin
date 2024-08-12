import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSubCategory } from '../../service/SubCategory/actionSub';
import { Alert, Stack } from '@mui/material';
import DeleteSub from './DeleteSub';
import UpdateSub from './UpdateSub';
import PaginationSub from './PaginationSub';
export default function GetSub() {
    // 1. Data Fetching and Error Handling:
    const dispatch = useDispatch();
    const {
        loadingGetSubCategory,
        errorGetSubCategory,
        errorGetSubCategoryApi,
        dataSubCategory,
    } = useSelector((state) => state.subCategory)
    /*****************************************************************************************************************************/


    useEffect(() => {
        /******************************function get subCategory**************************************/
        dispatch(getSubCategory())

    }, [])
    return (
        <>
            <div className=' container p-2 border  mt-1 rounded-5 shadow-lg'>

                {/*  message  errorr and success */}
                <Stack sx={{ width: '100%' }} spacing={2} className=' my-2'>
                    {/* error api get category */}
                    {errorGetSubCategoryApi && <Alert severity="error">{errorGetSubCategoryApi}</Alert>}
                    {/* error get category */}
                    {errorGetSubCategory && <Alert severity="error">{errorGetSubCategory}</Alert>}
                    {/* if category deleted */}
                </Stack>
                {loadingGetSubCategory && <div className=' loading d-flex justify-content-center  mt-5'>
                    <div className="loader d-flex "></div>
                </div>}
                <table className=" table rounded-3    table-striped ">
                    <thead>
                        <tr>
                            <th> Name subCaegory</th>
                            <th>Category id</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>

                    </thead>

                    <tbody >
                        {dataSubCategory.result && dataSubCategory.result.map((elm, index) => (
                            <tr key={index} >
                                <td>{elm.name}</td>
                                <td className=' idCategory'>{elm.categoryId}</td>
                                <th><UpdateSub id={elm._id} /></th>
                                <th><DeleteSub subCategoryId={elm._id} />  </th>
                            </tr>
                        ))}

                    </tbody>
                </table>
                {dataSubCategory.result <= 0 && <h3 className=' text-center mx-auto d-flex justify-content-center my-3'> Subcategory is empity</h3>}

                <PaginationSub />

            </div>

        </>
    )
}
