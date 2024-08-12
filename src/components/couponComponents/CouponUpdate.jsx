import { Alert, Button,  Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, TextField, Tooltip } from '@mui/material'
import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCoupon, updateOneCoupon } from '../../service/Coupon/actionCoupon';
import UploadIcon from '@mui/icons-material/Upload';
import { readFileAsImage } from '../../functions/functionFileReader';
import EditIcon from '@mui/icons-material/Edit';
import { makeStateIsEmpityCoupon } from '../../service/Coupon/CouponSlice';

export default function UpdateCouponCom({ idCoupon, elm }) {
    // 1. State and Utility Variables:

    const [messageSuccess, setMessageSuccess] = useState(false)// Success message to be displayed after successful update
    const [open, setOpen] = useState(false);// Controls the opening and closing of a modal or dialog

    const [newImage, setnewImage] = useState(null);// Another image variable, purpose unclear without more context
    // to set nwo value
    const [name, setName] = useState(null);// Coupon name
    const [image, setImage] = useState(null);// Image to be uploaded for a new Coupon
    const [discount, setDiscount] = useState(null);// Coupon dicount
    const [title, setTitle] = useState(null);// Coupon title
    const [expires, setExpires] = useState(null);// Coupon expires
    // // to set old value in input
    // const [oneCouponName, setOneCouponName] = useState(null)// Name of a single Coupon (likely for editing)
    // // const [oneCouponImage, setOneCouponImage] = useState(null)// Image of a single Coupon (likely for editing)
    // const [oneCouponDiscount, setOneCouponDiscount] = useState(null)// Discount of a single Coupon (likely for editing)
    // const [oneCouponTitle, setOneCouponTitle] = useState(null)// Title of a single Coupon (likely for editing)
    // const [oneCouponExpires, setOneCouponExpires] = useState(null)// Expires of a single Coupon (likely for editing)
    /*****************************************************************************************************************************/
    // 2. Data Fetching and Error Handling:
    const dispatch = useDispatch();
    const {
        // error update
        errorUpdateOneCoupon,
        errorUpdateOneCouponApi,
        loadingUpdateCoupon,
   
    } = useSelector((state) => state.coupon)// Get auth data and errors from Redux store
    /*****************************************************************************************************************************/
    //3. Function  helper
    const handleNameChange = (event) => {
        // Update the name state with the new value from the input field
        setName(event.target.value);
        // Clear any existing error messages (optional)

    };
    const handleDiscountChange = (event) => {
        // Update the Discount state with the new value from the input field
        setDiscount(event.target.value);
        // Clear any existing error messages (optional)

    }
    const handleExpiresChange = (event) => {
        // Update the Discount state with the new value from the input field
        setExpires(event.target.value);
        // Clear any existing error messages (optional)

    }
    const handleTitleChange = (event) => {
        // Update the Discount state with the new value from the input field
        setTitle(event.target.value);
        // Clear any existing error messages (optional)

    }
    const handleImageChangeUpdate = (event) => {

        // set file image in varribale 
        setImage(event.target.files[0]);

        readFileAsImage(event.target.files[0], (newImage) => {
            setnewImage(newImage);
        });
    };
    /*****************************************************************************************************************************/
    // 4. Function to close the moda and make inputs empity
    const handleClose = () => {
        setOpen(false);
        setnewImage(null)
        setName(null)
        setImage(null)
        setDiscount(null)
        setTitle(null)
        setExpires(null)
        setMessageSuccess(false)
        dispatch(makeStateIsEmpityCoupon())

    };
    //5. Function to open model  
    const handleClickOpen = async () => {

        //  to open model
        setOpen(true);


    };
    // 6. Function Main to update one Coupon
    const updateCouponId = async (event) => {
        // Prevent default form submission behavior
        event.preventDefault();
        const formData = new FormData();// Create a FormData object to hold form data
        // Add the Coupon ID to the form data
        formData.append('id', elm._id);
        name && formData.append('name', name)
        // Add the Coupon image to the form data if it exists
        image && formData.append('image', image);
        // Add the Coupon discount to the form data if it exists
        discount && formData.append('discount', discount);
        // Add the Coupon title to the form data if it exists
        title && formData.append('title', title);
        // Add the Coupon expires to the form data if it exists
        expires && formData.append('expires', expires);
        ;

        // Dispatch an action to update the Coupon
        let response = await dispatch(updateOneCoupon(formData))
        console.log(response);
        // Check if the update was successful
        if (response.payload?.message === 'success') {
            setMessageSuccess(true)

            // Refresh the Coupon list
            await dispatch(getCoupon())
            // Set a success message
            setMessageSuccess(response.payload.message)
            // Clear the success message and close the dialog after 1 second
            setTimeout(() => {
                setMessageSuccess(false)
                dispatch(makeStateIsEmpityCoupon())

                handleClose()
            }, 1000);
        }
    }
   

    return (
        <>

            <Tooltip title="update"  >
                <IconButton onClick={handleClickOpen} >
                    <EditIcon sx={{ color: 'green' }} />
                </IconButton>
            </Tooltip>
            <Fragment>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth={true}
                >
                    <DialogTitle id="alert-dialog-title" textAlign={'center'}  >
                        {"Update Coupon"}
                    </DialogTitle>
                    <DialogContent>
                        <Stack sx={{ width: '100%' }} spacing={2} className=' my-2'>

                            {/* error update on Coupon */}
                            {errorUpdateOneCoupon && <Alert severity="error">{errorUpdateOneCoupon}</Alert>}
                            {/* error update on Coupon api */}
                            {errorUpdateOneCouponApi && <Alert severity="error">{errorUpdateOneCouponApi}</Alert>}
                            {messageSuccess && <Alert severity="success">success</Alert>}

                        </Stack>
                        {/*   form                                                     */}


                        {elm &&
                            <form onSubmit={updateCouponId}>
                                {/* name field */}
                                <div className='' >
                                    <TextField
                                        type='text'
                                        required
                                        sx={{ width: '100%', marginBottom: "20px" }} id="outlined-basic" label="Name Coupon" variant="outlined"
                                        defaultValue={elm.name}
                                        onChange={(e) => handleNameChange(e)}

                                    />
                                </div>
                                {/* discount field */}
                                <div className='' >
                                    <TextField
                                        required
                                        type='number'
                                        sx={{ width: '100%', marginBottom: "20px" }} id="outlined-basic" label="discount Coupon" variant="outlined"

                                        defaultValue={elm.discount}

                                        onChange={(e) => handleDiscountChange(e)}

                                    />
                                </div>
                                {/* expires field */}
                                <div className='' >
                                    <TextField
                                        type='date'
                                        id="outlined-required"
                                        required
                                        focused
                                        sx={{ width: '100%', marginBottom: "20px" }} label="expires Coupon" variant="outlined"
                                        defaultValue={elm.expires.split("T")[0]}

                                        onChange={(e) => handleExpiresChange(e)}

                                    />
                                </div>
                                {/* Title field */}
                                <div className='' >
                                    <TextField
                                        type='title'
                                        id="outlined-required"
                                        required
                                        focused
                                        sx={{ width: '100%', marginBottom: "20px" }} label="Title Coupon" variant="outlined"
                                        defaultValue={elm.title}

                                        onChange={(e) => handleTitleChange(e)}

                                    />
                                </div>



                                <div className=' d-flex mx-auto justify-content-center align-items-center btn btn-dark  '>
                                    <label htmlFor='imageChange' className='mouseCursor' >Upload Image</label>
                                    <input id='imageChange' type="file" className=' d-none' onChange={handleImageChangeUpdate} />
                                    <UploadIcon ></UploadIcon>

                                </div>


                                {newImage ? <img src={newImage} alt="" className='imageStatic ' /> : <img src={`http://localhost:5001/coupon/${elm.image}`} alt="" className='imageStatic ' />}

                                <hr />
                                <DialogActions className=' d-flex justify-content-start' >
                                    <Button type='submit' color='success' className='fw-bolder'  >
                                        {loadingUpdateCoupon ? <i className='spinner-border text-danger'></i> : 'update'}
                                    </Button>
                                    <Button onClick={handleClose} color='warning' >Close</Button>
                                </DialogActions>
                            </form>
                        }
                     
                    </DialogContent>

                </Dialog>
            </Fragment >


        </>



    )
}
