import { Alert, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'
import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getBrand, getOneBrand, updateOneBrand } from '../../service/Brand/actionBrand';
import UploadIcon from '@mui/icons-material/Upload';
import { readFileAsImage } from '../../functions/functionFileReader';
export default function UpdateBrand({ idBrand }) {
    // 1. State and Utility Variables:
    const [name, setName] = useState(null);// Brand name
    const [isValid, setIsValid] = useState(false);// Flag to indicate if Brand data is valid
    const [messageSuccess, setMessageSuccess] = useState(null)// Success message to be displayed after successful update
    const [open, setOpen] = useState(false);// Controls the opening and closing of a modal or dialog
    const [oneBrandName, setOneBrandName] = useState(null)// Name of a single Brand (likely for editing)
    const [oneBrandImage, setOneBrandImage] = useState(null)// Image of a single Brand (likely for editing)
    const [image, setImage] = useState(null);// Image to be uploaded for a new Brand
    const [newImage, setnewImage] = useState(null);// Another image variable, purpose unclear without more context
    /*****************************************************************************************************************************/
    // 2. Data Fetching and Error Handling:
    const dispatch = useDispatch();
    const {
        // error update
        errorUpdateOneBrand,
        errorUpdateOneBrandApi,
        loadingGetOneBrand,
        loadingUpdateBrand,
        //error get one Brand
        errorGetOneBrand,
        errorGetOneBrandApi,

    } = useSelector((state) => state.brand)// Get auth data and errors from Redux store
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
        setOneBrandImage(null)
        readFileAsImage(event.target.files[0], (newImage) => {
            setnewImage(newImage);
        });
    };
    // 4. Function to close the moda and make inputs empity
    const handleClose = () => {
        setOpen(false);
        setOneBrandName(null)
        setOneBrandImage(null)
        setnewImage(null)
        setName(null)
        setImage(null)
        setIsValid(false)

    };
    //5. Function to open model and get one category
    const handleClickOpen = async () => {
        //  to open model
        setOpen(true);
        //get information one category
        let response = await dispatch(getOneBrand(idBrand))

        if (response.payload?.message === 'success') {
            setOneBrandName(response.payload.result.name)
            setOneBrandImage(response.payload.result.image)
        }

    };
    // 6. Function Main to update one category
    const updateBrandId = async (event) => {
        // Prevent default form submission behavior
        event.preventDefault();

        const formData = new FormData();// Create a FormData object to hold form data
        // Add the category ID to the form data
        formData.append('id', idBrand);
        // Add the category name to the form data if it exists
        if (name) {
            formData.append('name', name);
        }
        // Add the category image to the form data if it exists
        if (image) {
            formData.append('image', image);
        }
        // Dispatch an action to update the category
        let response = await dispatch(updateOneBrand(formData))
        // Check if the update was successful
        if (response.payload?.message === 'success') {
            // Refresh the category list
            await dispatch(getBrand())
            // Set a success message
            setMessageSuccess(response.payload.message)
            // Clear the success message and close the dialog after 1 second
            setTimeout(() => {
                setMessageSuccess(null)
                handleClose()
            }, 1000);
        }
    }

    return (
        <div>

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
                        {"Update Brand"}
                    </DialogTitle>
                    <DialogContent>
                        <Stack sx={{ width: '100%' }} spacing={2} className=' my-2'>

                            {/* error update on Brand */}
                            {errorUpdateOneBrand && <Alert severity="error">{errorUpdateOneBrand}</Alert>}
                            {/* error update on Brand api */}
                            {errorUpdateOneBrandApi && <Alert severity="error">{errorUpdateOneBrandApi}</Alert>}
                            {messageSuccess && <Alert severity="success">{messageSuccess}</Alert>}

                        </Stack>
                        {/*   form                                                     */}

                        {errorGetOneBrandApi && <>
                            <Alert severity="error">{errorGetOneBrandApi}</Alert>
                            <Button onClick={handleClose} color='warning' >Close</Button>
                        </>}
                        {errorGetOneBrand && <>
                            <Alert severity="error">{errorGetOneBrand}</Alert>
                            <Button onClick={handleClose} color='warning' >Close</Button>
                        </>}

                        {oneBrandName &&
                            <form onSubmit={updateBrandId}>
                                <TextField color='success' sx={{ width: '100%', marginBottom: "20px" }} id="outlined-basic" label="Name Brand" variant="outlined" defaultValue={oneBrandName} onChange={(e) => getName(e)} />
                                <div className=' d-flex mx-auto justify-content-center align-items-center btn btn-dark  '>
                                    <label htmlFor='imageChange' className='mouseCursor' >Upload Image</label>
                                    <input id='imageChange' type="file" className=' d-none' onChange={handleImageChangeUpdate} />
                                    <UploadIcon ></UploadIcon>
                                </div>
                                {oneBrandImage && <img src={`http://localhost:5001/Brand/${oneBrandImage}`} alt="" className='imageStatic ' />}
                                {newImage && <img src={newImage} alt="" className='imageStatic ' />}

                                <hr />
                                <DialogActions className=' d-flex justify-content-start' >
                                    <Button type='submit' autoFocus color='success' className='fw-bolder' disabled={!isValid}>
                                        {loadingUpdateBrand ? <i className='spinner-border text-danger'></i> : 'update'}
                                    </Button>
                                    <Button onClick={handleClose} color='warning' >Close</Button>
                                </DialogActions>
                            </form>
                        }
                        <div className=' text-center'>
                            {loadingGetOneBrand && <CircularProgress color='warning' />}
                        </div>
                    </DialogContent>

                </Dialog>
            </Fragment >
        </div>
    )
}
