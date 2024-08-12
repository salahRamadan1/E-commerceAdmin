import React, { useState } from 'react'
import { getBrand, searchBrand } from '../../service/Brand/actionBrand'
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Stack } from '@mui/material';

export default function SearchBrand() {
    // 1.State variables for  modal visibility
    const [valueSearch, setValueSearch] = useState('')// State variable to store the search value
    /*****************************************************************************************************************************/
    //2. Access state from the Brand slice of the Redux store
    const dispatch = useDispatch();
    const {
        loadingSearchBrand,
        errorSearchBrand,
        errorSearchBrandApi,
        loadingGetBrand

    } = useSelector((state) => state.brand)
    /*****************************************************************************************************************************/
    //3.Main Function to handle  search Brand
    async function handleSearch(event) {
        event.preventDefault(); // Prevent default form submission behavior
        // Dispatch a search action with the search value[]
        dispatch(searchBrand(valueSearch))
    }

    /*****************************************************************************************************************************/
    // 3. Helper Functions:
    const handleNameChange = (event) => {
        // Update the valueSearch state variable with the new value from the input field
        setValueSearch(event.target.value);

    };
    /*****************************************************************************************************************************/
    // 4. Function to  make inputs empity
    const clearInputsearch = () => {
        // Clear the search value
        setValueSearch('')
        // Fetch and dispatch all brands
        dispatch(getBrand())
    }
    return (
        <>
            {!loadingGetBrand && <>
                <div className=' search container'>
                    {valueSearch && <i className="fa-solid fa-xmark iconeSearchClose mouseCursor" onClick={clearInputsearch}> <button className=' d-none'></button></i>}
                    <form onSubmit={handleSearch}>
                        <input value={valueSearch} onChange={handleNameChange} className='   form form-control text-center  m-auto my-3 rounded-5 shadow-lg' placeholder='Search' />
                        <i className="fa-solid fa-magnifying-glass iconeSearch mouseCursor" onClick={handleSearch}> <button type='submit' className=' d-none'></button></i>
                    </form>
                </div >
                <div className=' container text-center'>
                    <Stack sx={{ width: '100%' }} spacing={2} className=' my-2'>

                        {/* error api search Brand */}
                        {errorSearchBrandApi && <Alert severity="error">{errorSearchBrandApi}</Alert>}
                        {/* error search Brand */}
                        {errorSearchBrand && <Alert severity="error">{errorSearchBrand}</Alert>}

                    </Stack>
                    {loadingSearchBrand && <div className=' loading d-flex justify-content-center  mt-5'>
                        <div className="loader d-flex "></div>
                    </div>}
                </div>
            </>
            }
        </>
    )
}
