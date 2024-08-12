import React, { Fragment, forwardRef, useState } from 'react'
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Alert, Stack, TextField } from '@mui/material';
import { Textarea } from '@mui/joy';
import { readFileAsImage } from '../../functions/functionFileReader';
import ChooseCategory from '../categoryComponents/ChooseCategory';
import ChooseSubCategory from '../subCategoryComponents/ChooseSubCategory';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, uploadProduct } from '../../service/Product/actionProduct';
import { validationProduct } from '../../functions/functionValidation';
import { makeStateIsEmpityProduct } from '../../service/Product/ProductSlice';
import ChooseBrand from '../brandComponents/ChooseBrand';
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function AddProduct() {
    // 1.State variables for form data, errors, and modal visibility
    const [open, setOpen] = useState(false);// State for controlling a modal or popup
    const [imageUrl, setImageUrl] = useState(null);// State for storing the URL of an image
    const [imagePreviews, setImagePreviews] = useState([]);// State for storing an array of image preview URLs
    const [images, setImages] = useState([]); // Array to store multiple images
    const [image, setImage] = useState(null);// Single image state
    const [errorImageSelect, setErrorImageSelect] = useState(''); // Error message for image selection
    const [messeageSuccess, setMesseageSuccess] = useState(false); // Error message for image selection
    // Product category , subcategory and Brand states
    const [categoryId, setCategoryId] = useState('');
    const [subCategoryId, setSubCategoryId] = useState('');
    const [ BrandId, setSubBrandId] = useState('');
    // Product details states
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    const [discount, setDiscount] = useState('')
    const [description, setDescription] = useState('')
    // Validation states
    const [errorList, setErrorList] = useState([]); // Error list state
    /*****************************************************************************************************************************/
    //2. Access state from the Brand slice of the Redux store
    const dispatch = useDispatch();
    const {
        loadingAddProduct,
        errorAddProduct,
        errorAddProductApi,
    } = useSelector((state) => state.product)
    /*****************************************************************************************************************************/
    // 3. Function to open the moda
    const handleClickOpen = () => setOpen(true);
    /*****************************************************************************************************************************/
    // 4. Reset form fields and state and Function to close the moda
    const handleClose = () => {
        setOpen(false);
        setImage(null)
        setImageUrl(null)
        setImages([])
        setImagePreviews([])
        setErrorImageSelect('')
        setCategoryId('')
        setSubCategoryId('')
        setQuantity('')
        setPrice('')
        setDescription('')
        setName('')
        setMesseageSuccess(false)
        dispatch(makeStateIsEmpityProduct())
        setErrorList([])
    };
    /*****************************************************************************************************************************/
    //5. Function to handle image input change 
    const handleImageChangeCover = (event) => {

        // Set the image state with the selected file
        setImage(event.target.files[0]);
        // Read the selected file as an image and set the preview URL
        readFileAsImage(event.target.files[0], (imageUrl) => {
            setImageUrl(imageUrl);
        });
    };
    //6. Function to handle remobe  image cover
    const handleRemoveImageCover = () => {
        // Clears the image URL preview
        setImageUrl(null);
        // Clears the selected image file
        setImage(null);
    };
    //7. Function to show images and set varribale
    const handleImageChange = (event) => {


        // Get all selected image files
        const newImages = Array.from(event.target.files);

        // Optional: Limit selection and handle excess
        if (newImages.length > 3) {
            setErrorImageSelect('Only 3 images can be selected at a time. Exceeding images will be removed.');
            setTimeout(() => setErrorImageSelect(''), 2000); // Clear error message after 2 seconds
            setImages(newImages.slice(0, 3)); // Limit to the first 3 images
        } else {
            setImages(newImages); // Set all selected images if less than or equal to 3
        }

        // Create an empty array to store image previews
        const previews = [];

        // Loop through each selected image
        newImages.forEach((image) => {
            readFileAsImage(image, (imageUrl) => {
                // Read the image and add the URL to the previews array
                previews.push(imageUrl);

                // Update the imagePreviews state with a maximum of 3 previews
                setImagePreviews([...imagePreviews.slice(0, 3), ...previews.slice(0, 3)]);
            });
        });
    };
    //. Function to remove one image  from images
    const handleRemoveOneImage = (index) => {
        // Create a copy of the images array to avoid mutating the original state
        const updatedImages = [...images];

        // Remove the image at the specified index from the copy
        updatedImages.splice(index, 1);

        // Update the images state with the modified array
        setImages(updatedImages);

        // Create a new array of image previews without the removed image
        const updatedPreviews = [...imagePreviews.slice(0, index), ...imagePreviews.slice(index + 1)];

        // Update the image previews state with the new array
        setImagePreviews(updatedPreviews);
    };

    //9. Function to select id category
    const handleStringValue = (newValue) => {


        // Update the category ID with the provided new value
        setCategoryId(newValue);
    };
    //10. Function to select id subCategory
    const handleStringValueSubcategory = (newValue) => {

        // Update the subCategory ID with the provided new value
        setSubCategoryId(newValue);

    };
    //11.Function to select id brand
    const HandleStringValueBrand =  (newValue) => {
        // Update the brand ID with the provided new value
        setSubBrandId (newValue)
    }
    //12. Function to make input empity
    const makeInputErrorsIsEmity = () => {
        setErrorList([])
    }
    //13. Main Function to handle form submission
    const handleUpload = async (event) => {
        event.preventDefault();// Prevents default form submission behavior
        const valid = validationProduct({ name, image, images, description, categoryId, subCategoryId, price, discount, quantity , BrandId });
        // Handle validation errors
        if (valid.error) {
            // If validation fails, set error list and return
            setErrorList(valid.error.details);
            return;
        }
        // Append multiple images to FormData
        const formData = new FormData()
        for (let i = 0; i < images.length; i++) {
            formData.append(`images`, images[i])
        }
        // Append other form data fields
        formData.append('image', image)
        formData.append('name', name)
        formData.append('categoryId', categoryId)
        formData.append('subCategoryId', subCategoryId)
        formData.append('brandId', BrandId)
        formData.append('quantity', quantity)
        formData.append('price', price)
        formData.append('description', description)
        formData.append('discount', discount)
        // Dispatch uploadProduct action to send form data to server
        const response = await dispatch(uploadProduct(formData))
        dispatch(getProduct())

        // Check if upload was successful
        if (response.payload?.message === 'success') {
            // Indicate successful upload
            setMesseageSuccess(true)

            // Reset success message after 1 second
            setTimeout(() => {
                // Assuming handleClose clears input fields
                handleClose()
            }, 1000);
        }
    }


    return (
        <div>
            <Box sx={{ '& > :not(style)': { m: 1 } }} className='floatButton' onClick={handleClickOpen}>
                <Fab className='fab' aria-label="add">
                    <AddIcon />
                </Fab>
            </Box>
            <Fragment >
                <Dialog
                    fullScreen
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar sx={{ position: 'relative', backgroundColor: "black" }} >
                        <Toolbar>
                            <IconButton
                                edge="start"
                                onClick={handleClose}
                                aria-label="close"

                                sx={{ color: "red" }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <List>
                        <div className=' container mt-3'>
                            <Stack sx={{ width: '100%' }} spacing={2} className=' my-2'>

                                {errorAddProduct &&
                                    <Alert severity="error">{errorAddProduct}</Alert>

                                }
                                {errorAddProductApi &&
                                    <Alert severity="error">{errorAddProductApi}</Alert>

                                }
                                {messeageSuccess &&
                                    <Alert severity="success">Success</Alert>

                                }
                            </Stack>

                            <form onSubmit={handleUpload} onChange={makeInputErrorsIsEmity}>
                                <div className=' row align-items-center'>
                                    {/* fields name ,price and  quantity  */}
                                    <div className=' col-md-2'>
                                        <div className='  '>
                                            {/* First column for name and quantity */}
                                            <div>
                                                <TextField value={name} label='name'
                                                    sx={{ marginBottom: "5px", width: "100%" }}
                                                    onChange={(e) => setName(e.target.value)}
                                                    error={!!errorList.find((elm) => elm.path[0] === 'name')} // Set error helperText if name error exists
                                                    helperText={errorList.find((elm) => elm.path[0] === 'name')?.message} // Display name error message

                                                />
                                            </div>
                                            {/* Second column for   quantity */}
                                            <div>
                                                <TextField value={quantity}
                                                    label='quantity' type='number'
                                                    sx={{ marginBottom: "5px", width: "100%" }}


                                                    onChange={(e) =>
                                                        setQuantity(e.target.value)}
                                                    error={!!errorList.find((elm) => elm.path[0] === 'quantity')} // Set error helperText if quantity error exists
                                                    helperText={errorList.find((elm) => elm.path[0] === 'quantity')?.message} // Display quantity error message
                                                />


                                            </div>
                                            {/* third column for price  */}
                                            <div>

                                                <TextField value={price}
                                                    sx={{ marginBottom: "5px", width: "100%" }}


                                                    label='price'
                                                    type='number'
                                                    onChange={(e) => setPrice(e.target.value)}
                                                    error={!!errorList.find((elm) => elm.path[0] === 'price')} // Set error helperText if price error exists
                                                    helperText={errorList.find((elm) => elm.path[0] === 'price')?.message} // Display price error message
                                                />
                                            </div>
                                            {/* Fourthly column for discount  */}
                                            <div>

                                                <TextField
                                                    value={discount}
                                                    label='discount'
                                                    type='number'
                                                    sx={{ marginBottom: "5px", width: "100%" }}


                                                    onChange={(e) => setDiscount(e.target.value)}
                                                    error={!!errorList.find((elm) => elm.path[0] === 'discount')} // Set error helperText if discount error exists
                                                    helperText={errorList.find((elm) => elm.path[0] === 'discount')?.message} // Display discount error message
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* filed discreption */}
                                    <div className=' col-md-4'>
                                        <Textarea
                                            // sx={{marginTop:}}
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            minRows={9}
                                            placeholder="description"
                                        />
                                        {errorList.filter(elm => elm.path[0] === 'description').map((error, index) => (
                                            <p key={index} className=' mt-1 text-danger'>{error.message}</p>
                                        ))}
                                    </div>
                                    {/* filed image cover  , images ,CategoryId ,Subcategory and brand  */}
                                    <div className=' col-md-2'>
                                        {/* Sixthly  Image Cover */}
                                        <div>
                                            <label htmlFor="cover" style={{ cursor: 'pointer' }} className='bg-dark p-1 rounded-2 text-white  mb-3  mt-3 w-100 text-center  '>Upload Cover</label>
                                            <input type="file" id='cover' className=' d-none' onChange={handleImageChangeCover} />

                                            {errorList.filter(elm => elm.path[0] === 'image').map((error, index) => (
                                                <p key={index} className='pErrors  mt-1 text-danger'>{error.message}</p>
                                            ))}
                                        </div>
                                        {/* Seventh  Images*/}
                                        <div>
                                            <label htmlFor="Images" style={{ cursor: 'pointer' }} className='bg-dark p-1 rounded-2 text-white  mb-3   w-100 text-center   '>Upload Images</label>
                                            <input type="file" onChange={handleImageChange} multiple id='Images' className=' d-none' />
                                            {errorList.filter(elm => elm.path[0] === 'images').map((error, index) => (
                                                <p key={index} className='pErrors  mt-1 text-danger'>{error.message}</p>
                                            ))}
                                        </div>
                                        {/* Eighth CategoryId */}
                                        <div>
                                            {!categoryId ? <ChooseCategory sendStringToParent={handleStringValue} /> : <button className='  btn btn-danger mb-1 w-100 text-center' onClick={() => setCategoryId('')}> remove Category Id</button>}
                                            {errorList.filter(elm => elm.path[0] === 'categoryId').map((error, index) => (
                                                <p key={index} className='pErrors  text-danger'>{error.message}</p>
                                            ))}
                                        </div>

                                        {/* Ninth  Subcategory*/}
                                        <div>

                                            {!subCategoryId ? <ChooseSubCategory sendStringToParent={handleStringValueSubcategory} /> : <button className='  btn btn-danger  mb-1  w-100 text-center' onClick={() => setSubCategoryId('')}> remove subCategory Id</button>}
                                            {errorList.filter(elm => elm.path[0] === 'subCategoryId').map((error, index) => (
                                                <p key={index} className='pErrors   text-danger'>{error.message}</p>
                                            ))}
                                        </div>
                                        {/* tenth  Brand*/}

                                        <div>
                                            {!BrandId ? <ChooseBrand sendStringToParent={HandleStringValueBrand} /> : <button className='  btn btn-danger mb-1  w-100 text-center' onClick={() => setSubBrandId('')}> remove brand Id</button>}
                                            {errorList.filter(elm => elm.path[0] === 'brandId').map((error, index) => (
                                                <p key={index} className='pErrors   text-danger'>{error.message}</p>
                                            ))}
                                        </div>

                                    </div>
                                    {/* show image cover and images */}
                                    <div className=' col-md-4'>
                                        {!image || !images ? <span className=' d-flex justify-content-center align-content-center fw-bolder text-center'>The images you choose will be displayed here </span> :

                                            <>

                                                <div className=' divImagesProduct'>
                                                    {/* image Cover */}
                                                    {imageUrl && <>
                                                        <img src={imageUrl} className='w-100    ' alt="" />
                                                        <span className=' text-decoration-none' onClick={handleRemoveImageCover} >
                                                            <CloseIcon className=' iconCloseProduct mouseCursor' />
                                                        </span>

                                                    </>
                                                    }
                                                </div>

                                                {/*  images */}
                                                <div className='  row g-1'>
                                                    {errorImageSelect && < Alert severity='warning'>{errorImageSelect}</Alert>}
                                                    {imagePreviews.length > 0 && imagePreviews.map((image, i) =>
                                                        <div className=' col-sm-4  divImagesProduct mt-2' key={i}>
                                                            <img src={image} className='w-100  mt-2 ' alt="" />
                                                            <span className=' text-decoration-none' onClick={() => handleRemoveOneImage(i)}>
                                                                <CloseIcon className=' iconCloseProduct mouseCursor' />
                                                            </span>
                                                        </div>
                                                    )}

                                                </div>
                                            </>


                                        }
                                    </div>
                                </div>
                                {/* button upload */}
                                <button type='submit' autoFocus className='fw-bolder btn btn-success w-100 mt-3'   >
                                    {loadingAddProduct ? <i className='spinner-border text-danger'></i> : 'Upload'}
                                </button>

                            </form>
                        </div>
                    </List>
                </Dialog>
            </Fragment>
        </div >
    )
}
