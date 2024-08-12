import React from 'react'
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { getBrand } from '../../service/Brand/actionBrand';
import { Pagination } from '@mui/material';
export default function PaginationBrand() {
    //1. Access state from the brand slice of the Redux store
    const { dataBrand, loadingGetBrand } = useSelector((state) => state.brand)
    const dispatch = useDispatch();
    /*****************************************************************************************************************************/

    //2.Main Function to handle  page brand
    const handlePagination = async (event, pageNumber) => {
        event.preventDefault();

        await dispatch(getBrand(pageNumber))
    };
    return (
        <>
            {!loadingGetBrand &&
                <>

                    {dataBrand.result && dataBrand.result.length >= 0 && <div className='pagination my-1 d-flex justify-content-center'>
                        <Stack spacing={2} >
                            <Pagination count={dataBrand.numberOfPage} onChange={handlePagination} />
                        </Stack>
                    </div>}

                </>


            }

            {/* {dataBrand.result && dataBrand.result.length >= 0 && <div className='pagination my-1 d-flex justify-content-center'>
                        <Stack spacing={2} >
                            <Pagination count={dataBrand.numberOfPage} onChange={handlePagination} />
                        </Stack>
                    </div>} */}
        </>
    )
}
