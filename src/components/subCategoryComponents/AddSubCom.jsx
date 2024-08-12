import React, { useState } from 'react'
import { Alert, Stack, TextField } from '@mui/material';
 
import { useDispatch, useSelector } from 'react-redux';
import { getSubCategory, uploadSubCategory } from '../../service/SubCategory/actionSub';
import { makeStateIsEmpitySubCategory } from '../../service/SubCategory/subSlice';
import ChooseCategory from '../categoryComponents/ChooseCategory';

export default function AddSubCom() {
    // 1.State variables for form data, errors, and modal visibility
    const [isValid, setIsValid] = useState(false); // Flag for form validity
    const [LengthNameError, setLengthNameError] = useState(false)
    const [messeageSuccess, setMesseageSuccess] = useState(false)// Temporary success message
    const [categoryId, setCategoryId] = useState('');
    const [name, setName] = useState('')
    /*****************************************************************************************************************************/
    //2. Access state from the subCategory slice of the Redux store
    const dispatch = useDispatch();
    const { errorAddSubCategory,
        errorAddSubCategoryApi,
        loadingAddSubCategory } = useSelector((state) => state.subCategory)
    /*****************************************************************************************************************************/
    //3. Function to handle name and validation
    const setvalueNameSubCategory = (e) => {
        dispatch(makeStateIsEmpitySubCategory())
        setName(e.target.value)
        if (name.length + 1 < 2 || name.length > 16 - 1) {
            setLengthNameError(true)
        } else {
            setLengthNameError(false)
        }
    }
    //4.Function to get category id from chile component
    const handleStringValue = (newValue) => {
        setCategoryId(newValue);
        setIsValid(true)
    };


    //5. Main Function to handle form submission
    const handleUploadSubCategory = async (e) => {
        e.preventDefault();  // Prevent default form submission behavior
        // Check if the form is valid
        if (!isValid) {
            return;// Exit the function if the form is invalid
        }
        if (!name) {
            setIsValid(false)
        }
        // Dispatch the uploadSubCategory action with the provided data
        const response = await dispatch(uploadSubCategory({ name, categoryId }))
        // Check if the upload was successful
        if (response.payload?.message === 'success') {
            // Indicate successful upload
            setMesseageSuccess(true)

            // Reset success message after 1 second
            setTimeout(() => {
                dispatch(getSubCategory())
                // Clear input fields
                makeInputEmpity()
            }, 1000);
        }
    }
    //6. Reset form fields and state
    const makeInputEmpity = () => {
        setName('')
        setCategoryId('')
        setMesseageSuccess(false)
        dispatch(makeStateIsEmpitySubCategory())
        setIsValid(false)
    }
    return (
        <>
            <div className=' container  py-2 border rounded-4 shadow-lg'>
                <form className='' onSubmit={handleUploadSubCategory} >
                    {loadingAddSubCategory && <div className=' loading d-flex justify-content-center  mt-5'>
                        <div className="loader d-flex "></div>
                    </div>}
                    <h5 className='  text-center'>Upload SubCategory</h5>

                    <div className=' mb-2'>
                        <TextField color={!LengthNameError ? 'success' : "error"} value={name} label='Name SubCategory' onChange={setvalueNameSubCategory} />
                        {LengthNameError && <p className=' text-danger'>max length is 16 min length is 2</p>}
                    </div>


                    <TextField value={categoryId ? categoryId : "please choose categrory >"} InputProps={{ readOnly: true, }} label='Category id' />
                    <br />
                    <div className=' w-25 mx-auto'>

                    <ChooseCategory sendStringToParent={handleStringValue} />
                    </div>
                    <br />
                    <button disabled={!isValid} type='submit' className=' btn btn-success'> Upload</button>

                    <Stack sx={{ width: '100%' }} spacing={2} className=' my-2'>

                        {errorAddSubCategory &&
                            <Alert severity="error">{errorAddSubCategory}</Alert>

                        }
                        {errorAddSubCategoryApi &&
                            <Alert severity="error">{errorAddSubCategoryApi}</Alert>

                        }
                        {messeageSuccess &&
                            <Alert severity="success">Success</Alert>

                        }
                    </Stack>
                </form>
            </div>


        </>
    )
}
