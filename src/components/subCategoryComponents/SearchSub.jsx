import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Stack } from '@mui/material';
import { getSubCategory, searchSubCategory } from '../../service/SubCategory/actionSub';
export default function SearchSub() {
    // 1.State variables for  modal visibility
    const [valueSearch, setValueSearch] = useState('')// State variable to store the search value
    /*****************************************************************************************************************************/
    /*****************************************************************************************************************************/
    //2. Access state from the category slice of the Redux store
    const dispatch = useDispatch();
    const {
        loadingSearchSubCategory,
        errorSearchSubCategory,
        errorSearchSubCategoryApi,
    } = useSelector((state) => state.subCategory)
    /*****************************************************************************************************************************/
    //3.Main Function to handle  search subCategory

    const handleSearch = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        // Dispatch a search action with the search value
        dispatch(searchSubCategory(valueSearch))
    }
    const handleNameChange = (event) => {
        setValueSearch(event.target.value);

    };
    // 4. Function to  make inputs empity
    const clearInputsearch = () => {

        // Clear the search value
        setValueSearch('')
        // Fetch and dispatch all subCategories
        dispatch(getSubCategory())
    }

    return (
        <>
            <div className=' search container'>

                {valueSearch && <i className="fa-solid fa-xmark iconeSearchClose mouseCursor" onClick={clearInputsearch}> <button className=' d-none'></button></i>}
                <form onSubmit={handleSearch}>
                    <input value={valueSearch} onChange={handleNameChange} className='   form form-control text-center  m-auto mt-2 rounded-5 shadow-lg' placeholder='Search' />
                    <i className="fa-solid fa-magnifying-glass iconeSearch mouseCursor" onClick={handleSearch}> <button type='submit' className=' d-none'></button></i>
                </form>
            </div >
            <div className=' container text-center'>
                <Stack sx={{ width: '100%' }} spacing={2} className=' my-2'>

                    {/* error api search category */}
                    {errorSearchSubCategoryApi && <Alert severity="error">{errorSearchSubCategoryApi}</Alert>}
                    {/* error search category */}
                    {errorSearchSubCategory && <Alert severity="error">{errorSearchSubCategory}</Alert>}

                </Stack>
                {loadingSearchSubCategory && <div className=' loading d-flex justify-content-center  mt-5'>
                    <div className="loader d-flex "></div>
                </div>}
            </div>
        </>
    )
}
