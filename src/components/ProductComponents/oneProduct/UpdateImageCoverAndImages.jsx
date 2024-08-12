import { Alert, Button, DialogActions, IconButton, Stack, Tooltip } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react'
import UploadIcon from '@mui/icons-material/Upload';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { readFileAsImage } from '../../../functions/functionFileReader';
import { getOneProduct, updateOneProductImagesOrImage } from '../../../service/Product/actionProduct';
export default function UpdateImageCoverAndImages({ imageCover, id, index, images }) {
    // 1. State and Utility Variables:
    const [open, setOpen] = useState(false);
    const [messageSuccess, setMessageSuccess] = useState(false)// Success message to be displayed after successful update
    const [isValid, setIsValid] = useState(false);// Flag to indicate if Brand data is valid
    const [image, setImage] = useState(null);// Image to be uploaded for a new category
    const indexImag = index
    const [newImage, setnewImage] = useState(null);// Another image variable, purpose unclear without more context
    /*****************************************************************************************************************************/
    // 2. Data Fetching and Error Handling:
    const dispatch = useDispatch();
    const {
        loadingUpdateProduct, errorUpdateOneProduct, errorUpdateOneProductApi,


    } = useSelector((state) => state.brand)// Get auth data and errors from Redux store
    /*****************************************************************************************************************************/
    // 3. Helper Functions:
    const handleImageChangeUpdate = (event) => {
        setIsValid(true)
        // set file image in varribale 
        setImage(event.target.files[0]);
        readFileAsImage(event.target.files[0], (newImage) => {
            setnewImage(newImage);
        });
    };
    /*****************************************************************************************************************************/
    // 4. Functions to close the moda , make inputs empity and open the model
    const handleClose = () => {
        setOpen(false);
        setnewImage(null)
        setMessageSuccess(false)
        setIsValid(false)
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    /*****************************************************************************************************************************/
    // 6. Function Main to update one oneProduct
    const updateoneProductId = async (event) => {
        // Prevent default form submission behavior
        event.preventDefault();
        const formData = new FormData();// Create a FormData object to hold form data
        // Add the oneProduct ID to the form data
        formData.append('id', id);
        if (imageCover) {
            formData.append('image', image);
        } else {
            formData.append('images', image);
            formData.append('index', indexImag);

        }
        // Dispatch an action to update the oneProduct
        let response = await dispatch(updateOneProductImagesOrImage(formData))
        // Check if the update was successful
        if (response.payload?.message === 'success') {
        
            // Set a success message
            setMessageSuccess(response.payload.message)
            // Clear the success message and close the dialog after 1 second
            setTimeout(() => {
                dispatch(getOneProduct(id))

                handleClose()
            }, 1000);
        }
    }

    return (<>
        <Tooltip title="update"  >
            <IconButton onClick={handleClickOpen}>
                <EditIcon />
            </IconButton>
        </Tooltip>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
        >
            <DialogTitle id="alert-dialog-title" sx={{ marginX: "auto" }}>
                {"change image cover"}
            </DialogTitle>
            <form className='p-2' onSubmit={updateoneProductId}>
                <Stack sx={{ width: '100%' }} spacing={2} className=' my-2'>

                    {/* error update on oneProduct */}
                    {errorUpdateOneProduct && <Alert severity="error">{errorUpdateOneProduct}</Alert>}
                    {/* error update on oneProduct api */}
                    {errorUpdateOneProductApi && <Alert severity="error">{errorUpdateOneProductApi}</Alert>}
                    {messageSuccess && <Alert severity="success">success</Alert>}

                </Stack>
                {imageCover ? <img src={newImage ? newImage : imageCover} alt="" className=' imageCoverOneProduct' /> :
                    <img src={newImage ? newImage : images} alt="" className=' imageCoverOneProduct' />}

                <div className=' d-flex mx-auto justify-content-center align-items-center btn btn-dark  my-3  w-50'>
                    <label htmlFor='imageChange' className='mouseCursor ' >Upload Image</label>
                    <input id='imageChange' type="file" className=' d-none' onChange={handleImageChangeUpdate} />
                    <UploadIcon ></UploadIcon>
                </div>
                <DialogActions className=' d-flex justify-content-end' >
                    <Button type='submit' autoFocus color='success' className='fw-bolder' disabled={!isValid}>

                        {loadingUpdateProduct ? <i className='spinner-border text-danger'></i> : 'update'}
                    </Button>
                    <Button onClick={handleClose} color='warning' >Close</Button>
                </DialogActions>

            </form>
        </Dialog>
    </>

    )
}
