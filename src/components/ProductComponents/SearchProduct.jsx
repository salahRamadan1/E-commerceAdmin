import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, searchProduct } from '../../service/Product/actionProduct';
import { Alert, Stack } from '@mui/material';

export default function SearchProduct() {
    // 1.State variables for  modal visibility
    const [valueSearch, setValueSearch] = useState('')// State variable to store the search value
    /*****************************************************************************************************************************/
    //2. Access state from the Product slice of the Redux store
    const dispatch = useDispatch();
    const {
        loadingSearchProduct,
        errorSearchProduct,
        errorSearchProductApi,
    } = useSelector((state) => state.product)
    /*****************************************************************************************************************************/
    //3.Main Function to handle  search product
    async function handleSearch(event) {
        event.preventDefault(); // Prevent default form submission behavior
        // Dispatch a search action with the search value[]
        dispatch(searchProduct(valueSearch))
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
        // Fetch and dispatch all Products
        dispatch(getProduct())
    }
    return (
        <>
            <div className=' search container'>

                {valueSearch && <i className="fa-solid fa-xmark iconeSearchClose mouseCursor" onClick={clearInputsearch}> <button className=' d-none'></button></i>}
                <form onSubmit={handleSearch}>
                    <input value={valueSearch} onChange={handleNameChange} className='   form form-control text-center  m-auto my-3 rounded-5 shadow-lg' placeholder='Search' />
                    <i className="fa-solid fa-magnifying-glass iconeSearch mouseCursor" onClick={handleSearch}> <button type='submit' className=' d-none'></button></i>
                </form>
            </div >
            <div className=' container text-center'>
                <Stack sx={{ width: '100%' }} spacing={2} className=' my-2'>

                    {/* error api search Product */}
                    {errorSearchProductApi && <Alert severity="error">{errorSearchProductApi}</Alert>}
                    {/* error search Product */}
                    {errorSearchProduct && <Alert severity="error">{errorSearchProduct}</Alert>}

                </Stack>
                {loadingSearchProduct && <div className=' loading d-flex justify-content-center  mt-5'>
                    <div className="loader d-flex "></div>
                </div>}
            </div>
        </>
    )
}
