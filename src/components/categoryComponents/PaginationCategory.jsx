import React from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from '../../service/Category/actionCategory';
export default function PaginationCategory() {
    //1. Access state from the category slice of the Redux store
    const dispatch = useDispatch();
    const { dataCategory, loadingGetCategory } = useSelector((state) => state.category)
    /*****************************************************************************************************************************/
    //2.Main Function to handle  page category
    const handlePagination = async (event, pageNumber) => {
        event.preventDefault();
        await dispatch(getCategory(pageNumber))
    };
    return (
        <>
            {!loadingGetCategory && <>


                {dataCategory.result && dataCategory.result.length >= 0 && <div className='pagination my-1 d-flex justify-content-center'>
                   
                    <Stack spacing={2} >
                            <Pagination count={dataCategory.numberOfPage} onChange={handlePagination} />
                        </Stack>
                </div>}

            </>






            }
        </>
    )
}
