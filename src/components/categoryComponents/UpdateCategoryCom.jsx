import { Alert, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'
import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCategory, getOneCategory, updateOneCategory } from '../../service/Category/actionCategory';
import UploadIcon from '@mui/icons-material/Upload';
import { readFileAsImage } from '../../functions/functionFileReader';
export default function UpdateCategoryCom({ idCategory }) {
    // 1. State and Utility Variables:
    const [name, setName] = useState(null);// Category name
    const [isValid, setIsValid] = useState(false);// Flag to indicate if category data is valid
    const [messageSuccess, setMessageSuccess] = useState(false)// Success message to be displayed after successful update
    const [open, setOpen] = useState(false);// Controls the opening and closing of a modal or dialog
    const [onecategoryName, setOnecategoryName] = useState(null)// Name of a single category (likely for editing)
    const [oneCategoryImage, setOneCategoryImage] = useState(null)// Image of a single category (likely for editing)
    const [image, setImage] = useState(null);// Image to be uploaded for a new category
    const [newImage, setnewImage] = useState(null);// Another image variable, purpose unclear without more context
    /*****************************************************************************************************************************/
    // 2. Data Fetching and Error Handling:
    const dispatch = useDispatch();
    const {
        // error update
        errorUpdateOneCategory,
        errorUpdateOneCategoryApi,
        loadingGetOneCategory,
        loadingUpdateCategory,
        //error get one category
        errorGetOneCategory,
        errorGetOneCategoryApi,

    } = useSelector((state) => state.category)// Get auth data and errors from Redux store
    /*****************************************************************************************************************************/
    // 3. Helper Functions:
    const getName = (e) => {
        setIsValid(true)

        setName(e.target.value)
    }
    const handleImageChangeUpdate = (event) => {
        setIsValid(true)
        // set file image in varribale 
        setImage(event.target.files[0]);
        // to set photo in modal 
        setOneCategoryImage(null)
        readFileAsImage(event.target.files[0], (newImage) => {
            setnewImage(newImage);
        });
    };
    /*****************************************************************************************************************************/
    // 4. Function to close the moda and make inputs empity
    const handleClose = () => {
        setOpen(false);
        setOnecategoryName(null)
        setOneCategoryImage(null)
        setnewImage(null)
        setName(null)
        setImage(null)
        setIsValid(false)
        setMessageSuccess(false)

    };
    //5. Function to open model and get one category
    const handleClickOpen = async () => {
        //  to open model
        setOpen(true);
        //get information one category
        let response = await dispatch(getOneCategory(idCategory))

        if (response.payload?.message === 'success') {
            setOnecategoryName(response.payload.result.name)
            setOneCategoryImage(response.payload.result.image)
        }

    };
    // 6. Function Main to update one category
    const updateCategoryId = async (event) => {
        // Prevent default form submission behavior
        event.preventDefault();

        const formData = new FormData();// Create a FormData object to hold form data
        // Add the category ID to the form data
        formData.append('id', idCategory);
        // Add the category name to the form data if it exists
        if (name) {
            formData.append('name', name);
        }
        // Add the category image to the form data if it exists
        if (image) {
            formData.append('image', image);
        }
        // Dispatch an action to update the category
        let response = await dispatch(updateOneCategory(formData))
        // Check if the update was successful
        if (response.payload?.message === 'success') {
            setMessageSuccess(true)

            // Refresh the category list
            await dispatch(getCategory())
            // Set a success message
            setMessageSuccess(response.payload.message)
            // Clear the success message and close the dialog after 1 second
            setTimeout(() => {
                setMessageSuccess(false)
                handleClose()
            }, 1000);
        }
    }
    // async function updateCategoryId(event) {
    //     // Prevent default form submission behavior
    //     event.preventDefault();

    //     const formData = new FormData();// Create a FormData object to hold form data
    //     // Add the category ID to the form data
    //     formData.append('id', idCategory);
    //     // Add the category name to the form data if it exists
    //     if (name) {
    //         formData.append('name', name);
    //     }
    //     // Add the category image to the form data if it exists
    //     if (image) {
    //         formData.append('image', image);
    //     }
    //     // Dispatch an action to update the category
    //     let response = await dispatch(updateOneCategory(formData))
    //     // Check if the update was successful
    //     if (response.payload?.message === 'success') {
    //         // Refresh the category list
    //         await dispatch(getCategory())
    //         // Set a success message
    //         setMessageSuccess(response.payload.message)
    //         // Clear the success message and close the dialog after 1 second
    //         setTimeout(() => {
    //             setMessageSuccess(null)
    //             handleClose()
    //         }, 1000);
    //     }
    // }


    return (
        <>
            <Button className='text-success' onClick={handleClickOpen}>Update</Button>
            <Fragment>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth={true}
                >
                    <DialogTitle id="alert-dialog-title" textAlign={'center'}  >
                        {"Update Category"}
                    </DialogTitle>
                    <DialogContent>
                        <Stack sx={{ width: '100%' }} spacing={2} className=' my-2'>

                            {/* error update on category */}
                            {errorUpdateOneCategory && <Alert severity="error">{errorUpdateOneCategory}</Alert>}
                            {/* error update on category api */}
                            {errorUpdateOneCategoryApi && <Alert severity="error">{errorUpdateOneCategoryApi}</Alert>}
                            {messageSuccess && <Alert severity="success">success</Alert>}

                        </Stack>
                        {/*   form                                                     */}

                        {errorGetOneCategoryApi && <>
                            <Alert severity="error">{errorGetOneCategoryApi}</Alert>
                            <Button onClick={handleClose} color='warning' >Close</Button>
                        </>}
                        {errorGetOneCategory && <>
                            <Alert severity="error">{errorGetOneCategory}</Alert>
                            <Button onClick={handleClose} color='warning' >Close</Button>
                        </>}

                        {onecategoryName &&
                            <form onSubmit={updateCategoryId}>
                                <TextField color='success' sx={{ width: '100%', marginBottom: "20px" }} id="outlined-basic" label="Name category" variant="outlined" defaultValue={onecategoryName} onChange={(e) => getName(e)} />
                                <div className=' d-flex mx-auto justify-content-center align-items-center btn btn-dark  '>
                                    <label htmlFor='imageChange' className='mouseCursor' >Upload Image</label>
                                    <input id='imageChange' type="file" className=' d-none' onChange={handleImageChangeUpdate} />
                                    <UploadIcon ></UploadIcon>
                                </div>
                                {oneCategoryImage && <img src={`http://localhost:5001/category/${oneCategoryImage}`} alt="" className='imageStatic ' />}
                                {newImage && <img src={newImage} alt="" className='imageStatic ' />}

                                <hr />
                                <DialogActions className=' d-flex justify-content-start' >
                                    <Button type='submit' autoFocus color='success' className='fw-bolder' disabled={!isValid}>
                                        {loadingUpdateCategory ? <i className='spinner-border text-danger'></i> : 'update'}
                                    </Button>
                                    <Button onClick={handleClose} color='warning' >Close</Button>
                                </DialogActions>
                            </form>
                        }
                        <div className=' text-center'>
                            {loadingGetOneCategory && <CircularProgress color='warning' />}
                        </div>
                    </DialogContent>

                </Dialog>
            </Fragment >


        </>



    )
}
