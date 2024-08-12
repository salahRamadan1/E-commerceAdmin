import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
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
import { getBrand, uploadBrand } from '../../service/Brand/actionBrand';
import { readFileAsImage } from '../../functions/functionFileReader';
import { validationCategoryAndBrandAndCoupon } from '../../functions/functionValidation';
import { makeStateIsEmpityBrand } from '../../service/Brand/brandSlice';
export default function AddBrand() {
    // 1.State variables for form data, errors, and modal visibility
    const [isValid, setIsValid] = useState(false); // Flag for form validity
    const [name, setName] = useState(''); // Brand name
    const [image, setImage] = useState(null); // Selected image file
    const [imageUrl, setImageUrl] = useState(null); // Image preview URL (if available)
    const [messageSuccess, setMessageSuccess] = useState(null); // Temporary success message
    const [errorList, setErrorList] = useState([]); // Error list state
    const [openModalAdd, setOpenModalAdd] = React.useState(false);
    /*****************************************************************************************************************************/

    //2. Access state from the Brand slice of the Redux store
    const dispatch = useDispatch();
    const { errorAddBrand,
        errorAddBrandApi,
        loadingAddBrand } = useSelector((state) => state.brand)
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

    //4. Function to handle name input change
    const handleNameChange = (event) => {
        // Update the name state with the new value from the input field

        setName(event.target.value);
        // Clear any existing error messages (optional)

        setErrorList([])
    };
    /*****************************************************************************************************************************/

    //5. Function to Fetching data
    const getBrands = async () => {

        await dispatch(getBrand())
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
        const valid = validationCategoryAndBrandAndCoupon({ name: name, image: image });
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
        // Dispatch uploadBrand action to send data to server

        let response = await dispatch(uploadBrand(formData))
        // Handle successful upload
        if (response.payload?.message === 'success') {
            // Clear Brand state
            dispatch(makeStateIsEmpityBrand())
            // Fetch updated categories
            getBrands()
            // Set success message
            setMessageSuccess(response.payload.message)
            // Reset form and clear success message after 1 second
            setTimeout(() => {
                makeInputEmpaty()
                setMessageSuccess(null)
            }, 1000);

        }

    }

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     if (!isValid) {
    //         return;
    //     }
    //     const formData = new FormData();
    //     formData.append('name', name);
    //     formData.append('image', image);
    //     let { payload } = await dispatch(uploadBrand(formData))
    //     console.log(payload);
    //     if (payload && payload.message == 'success') {
    //         getBrands()
    //         setMessageSuccess(payload.message)
    //         setTimeout(() => {
    //             makeInputEmpaty()
    //             setMessageSuccess(null)
    //         }, 1000);

    //     }

    // }
    /*****************************************************************************************************************************/

    //6. Reset form fields and state
    const makeInputEmpaty = () => {
        setName('')
        setImage(null)
        setImageUrl(null)
        setIsValid(false)
        setOpenModalAdd(false);
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
                        {"Update Brand"}
                    </DialogTitle>
                    <DialogContent>
                        <Stack sx={{ width: '100%' }} spacing={2} className=' my-2'>

                            {errorAddBrand &&
                                <Alert severity="error">{errorAddBrand}</Alert>

                            }
                            {errorAddBrandApi &&
                                <Alert severity="error">{errorAddBrandApi}</Alert>

                            }
                            {messageSuccess &&
                                <Alert severity="success">{messageSuccess}</Alert>

                            }



                        </Stack>

                        <form onSubmit={handleSubmit}>

                            {/* name field */}
                            <div className='' >
                                <TextField
                                    required
                                    sx={{ width: '100%', marginBottom: "20px" }} id="outlined-basic" label="Name Brand" variant="outlined"
                                    onChange={handleNameChange}
                                    error={!!errorList.find((elm) => elm.path[0] === 'name')} // Set error helperText if email error exists
                                    helperText={errorList.find((elm) => elm.path[0] === 'name')?.message} // Display email error message
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
                                    {loadingAddBrand ? <i className='spinner-border text-danger'></i> : 'Upload'}
                                </Button>
                                <Button onClick={makeInputEmpaty} color='warning' >Close</Button>
                            </DialogActions>
                        </form>

                    </DialogContent>

                </Dialog>
            </Fragment >
        </>
    )
}
