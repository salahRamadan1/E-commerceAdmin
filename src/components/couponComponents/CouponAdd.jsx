import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCoupon, uploadCoupon } from '../../service/Coupon/actionCoupon';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import UploadIcon from '@mui/icons-material/Upload';
import { Alert, Stack, TextField } from '@mui/material';
import { readFileAsImage } from '../../functions/functionFileReader';
import { makeStateIsEmpityCoupon } from '../../service/Coupon/CouponSlice';
import { validationCategoryAndBrandAndCoupon } from '../../functions/functionValidation';
export default function CouponAdd() {
    // 1.State variables for form data, errors, and modal visibility
    const [isValid, setIsValid] = useState(false); // Flag for form validity
    const [name, setName] = useState(null); // Coupon name
    const [discount, setDiscount] = useState(null); // Coupon discount
    const [expires, setExpires] = useState(Date); // Coupon expires
    const [title, setTitle] = useState(Date); // Coupon expires
    const [image, setImage] = useState(null); // Selected image file
    const [imageUrl, setImageUrl] = useState(null); // Image preview URL (if available)
    const [messageSuccess, setMessageSuccess] = useState(null); // Temporary success message
    const [errorList, setErrorList] = useState([]); // Error list state
    const [openModalAdd, setOpenModalAdd] = React.useState(false);
    /*****************************************************************************************************************************/

    //2. Access state from the Coupon slice of the Redux store
    const dispatch = useDispatch();
    const { errorAddCoupon, errorAddCouponApi, loadingAddCoupon } = useSelector((state) => state.coupon)
    /*****************************************************************************************************************************/

    //3. Function to handle image upload
    const handleImageChange = (event) => {
        setImage(event.target.files[0]); // Update image state
        setIsValid(true); // Set form potentially valid (depends on other factors)

        // Read selected file as image and update preview URL
        readFileAsImage(event.target.files[0], (imageUrl) => {
            setImageUrl(imageUrl);
        });
    };
    /*****************************************************************************************************************************/

    //4. Function  helper
    const handleNameChange = (event) => {
        // Update the name state with the new value from the input field
        setName(event.target.value);
        // Clear any existing error messages (optional)
        setErrorList([])
    };
    const handleDiscountChange = (event) => {
        // Update the Discount state with the new value from the input field
        setDiscount(event.target.value);
        // Clear any existing error messages (optional)
        setErrorList([])
    }
    const handleExpiresChange = (event) => {
        // Update the Discount state with the new value from the input field
        setExpires(event.target.value);
        // Clear any existing error messages (optional)
        setErrorList([])
    }
    const handleTitleChange = (event) => {
        // Update the Discount state with the new value from the input field
        setTitle(event.target.value);
        // Clear any existing error messages (optional)
        setErrorList([])
    }
    /*****************************************************************************************************************************/

    //5. Function to Fetching data
    const getCoupons = async () => {

        await dispatch(getCoupon())
    }
    /*****************************************************************************************************************************/

    //5. Main Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Check if form is valid before proceeding
        if (!isValid) {
            return;
        }
        // Validate user input using Joi
        const valid = validationCategoryAndBrandAndCoupon({ name, image, expires });
        console.log(valid);
        // Handle validation errors
        if (valid.error) {
            // If validation fails, set error list and return
            setErrorList(valid.error.details);
            return;
        }
        // Create form data for API request
        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', image);
        formData.append('expires', expires);
        formData.append('discount', discount);
        formData.append('title', title);

        // Dispatch uploadCoupon action to send data to server

        let response = await dispatch(uploadCoupon(formData))
        // Handle successful upload
        if (response.payload?.message === 'success') {
            // Clear Coupon state
            dispatch(makeStateIsEmpityCoupon())
            // Fetch updated Coupons
            getCoupons()
            // Set success message
            setMessageSuccess(response.payload.message)
            // Reset form and clear success message after 1 second
            setTimeout(() => {
                makeInputEmpaty()
                setMessageSuccess(null)
            }, 1000);

        }

    }
    /*****************************************************************************************************************************/

    //6. Reset form fields and state
    const makeInputEmpaty = () => {
        setName('')
        setImage(null)
        setExpires(null)
        setDiscount(null)
        setImageUrl(null)
        setExpires(null)
        setIsValid(false)
        setOpenModalAdd(false);
        dispatch(makeStateIsEmpityCoupon())
        setErrorList([])
    }
    /*****************************************************************************************************************************/

    // 7. Function to open the moda
    const handleClickOpenModalAdd = () => {
        setOpenModalAdd(true);
    };



    return (
        <>
            {/* <button className='floatButton' data-bs-toggle="modal" data-bs-target="#staticBackdrop1"><i className="fa-solid fa-plus"></i></button> */}
            <Box sx={{ '& > :not(style)': { m: 1 } }} className='floatButton' onClick={handleClickOpenModalAdd}>
                <Fab className='fab' aria-label="add">
                    <AddIcon />
                </Fab>
            </Box>

            <Fragment>
                <Dialog
                    open={openModalAdd}
                    onClose={makeInputEmpaty}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth={true}
                >
                    <DialogTitle id="alert-dialog-title" textAlign={'center'}  >
                        {"Update Coupon"}
                    </DialogTitle>
                    <DialogContent>
                        <Stack sx={{ width: '100%' }} spacing={2} className=' my-2'>

                            {errorAddCoupon &&
                                <Alert severity="error">{errorAddCoupon}</Alert>

                            }
                            {errorAddCouponApi &&
                                <Alert severity="error">{errorAddCouponApi}</Alert>

                            }




                        </Stack>

                        <form onSubmit={handleSubmit}>

                            {/* name field */}
                            <div className='' >
                                <TextField
                                    type='text'
                                    required
                                    sx={{ width: '100%', marginBottom: "20px" }} id="outlined-basic" label="Name Coupon" variant="outlined"
                                    onChange={handleNameChange}
                                    error={!!errorList.find((elm) => elm.path[0] === 'name')} // Set error helperText if name error exists
                                    helperText={errorList.find((elm) => elm.path[0] === 'name')?.message} // Display name error message
                                />
                            </div>
                            {/* discount field */}
                            <div className='' >
                                <TextField
                                    required
                                    type='number'
                                    sx={{ width: '100%', marginBottom: "20px" }} id="outlined-basic" label="discount Coupon" variant="outlined"
                                    onChange={handleDiscountChange}
                                    error={!!errorList.find((elm) => elm.path[0] === 'discount')} // Set error helperText if discount error exists
                                    helperText={errorList.find((elm) => elm.path[0] === 'discount')?.message} // Display emadiscountil error message
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
                                    onChange={handleExpiresChange}
                                    error={!!errorList.find((elm) => elm.path[0] === 'expires')} // Set error helperText if expires error exists
                                    helperText={errorList.find((elm) => elm.path[0] === 'expires')?.message} // Display emaexpiresil error message
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
                                    onChange={handleTitleChange}
                                    error={!!errorList.find((elm) => elm.path[0] === 'title')} // Set error helperText if title error exists
                                    helperText={errorList.find((elm) => elm.path[0] === 'title')?.message} // Display ematitleil error message
                                />
                            </div>



                            <div className=' d-flex mx-auto justify-content-center align-items-center btn btn-dark  '>
                                <label htmlFor='imageChange' className='mouseCursor' >Upload Image</label>
                                <input id='imageChange' type="file" className=' d-none' onChange={handleImageChange} />
                                <UploadIcon ></UploadIcon>

                            </div>
                            {errorList.filter(elm => elm.path[0] === 'image').map((error, index) => (
                                <p key={index} className=' mt-1 text-danger'>{error.message}</p>
                            ))}
                            {imageUrl && <img src={imageUrl} alt="" className='imageStatic ' />}

                            <hr />
                            <DialogActions className=' d-flex justify-content-start' >
                                <Button type='submit' autoFocus color='success' className='fw-bolder' disabled={!isValid}>
                                    {loadingAddCoupon ? <i className='spinner-border text-danger'></i> : 'Uploade'}
                                </Button>
                                <Button onClick={makeInputEmpaty} color='warning' >Close</Button>

                            </DialogActions>
                        </form>

                    </DialogContent>
                    {messageSuccess &&
                        <Alert severity="success">{messageSuccess}</Alert>

                    }
                </Dialog>
            </Fragment >



        </>
    )
}
