import React from 'react'
import { getSubCategory } from '../../service/SubCategory/actionSub';
import { Pagination, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

export default function PaginationSub() {
    //1. Access state from the subCategory slice of the Redux store
    const { dataSubCategory } = useSelector((state) => state.subCategory)
    const dispatch = useDispatch();
    /*****************************************************************************************************************************/
    //2.Main Function to handle  page subCategory
    const handlePagination = async (event, pageNumber) => {
        event.preventDefault();

        await dispatch(getSubCategory(pageNumber))
    };
    return (
        <>
            {dataSubCategory.result && dataSubCategory.result.length >= 0 && <div className='pagination my-1 d-flex justify-content-center'>
                <Stack spacing={2} >
                    <Pagination count={dataSubCategory.numberOfPage} onChange={handlePagination} />
                </Stack>
            </div>}
        </>
    )
}
