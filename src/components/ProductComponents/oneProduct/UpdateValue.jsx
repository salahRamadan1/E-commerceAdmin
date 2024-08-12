import { Alert, Button, Dialog, DialogActions, DialogTitle, IconButton, Stack, TextField, Tooltip } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';

import React, { useState } from 'react'
import { Textarea } from '@mui/joy';
import { useDispatch, useSelector } from 'react-redux';
import { validationProduct } from '../../../functions/functionValidation';
import { getOneProduct, getProduct, updateProductValue } from '../../../service/Product/actionProduct';
import { makeStateIsEmpityProduct } from '../../../service/Product/ProductSlice';


export default function UpdateValue({ id }) {
    // 1. Data Fetching and Error Handling:
    const dispatch = useDispatch();

    const {
        loadingUpdateProductValue, errorUpdateOneProductValue, errorUpdateOneProductValueApi,
        dataOneProduct
    } = useSelector((state) => state.product)

    /*****************************************************************************************************************************/
    // 2. State and Utility Variables:
    const [open, setOpen] = useState(false);
    // Product details states
    const [name, setName] = useState(dataOneProduct.name)
    const [quantity, setQuantity] = useState(dataOneProduct.quantity)
    const [price, setPrice] = useState(dataOneProduct.price)
    const [discount, setDiscount] = useState(dataOneProduct.discount)
    const [description, setDescription] = useState(dataOneProduct.description)
    const [messeageSuccess, setMesseageSuccess] = useState(false); // Error message for image selection
    const [errorList, setErrorList] = useState([]); // Error list state

    /*****************************************************************************************************************************/
    // 3. Functions to close the moda , make inputs empity and open the model
    const handleClose = () => {
        setOpen(false);
        setMesseageSuccess(false)
        setOpen(false);
        setQuantity('')
        setPrice('')
        setDescription('')
        setName('')
        dispatch(makeStateIsEmpityProduct())
        setMesseageSuccess(false)
        setErrorList([])
        dispatch(getOneProduct(id))

    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    /*****************************************************************************************************************************/
    // 6. Function Main to update one oneProduct
    const handleChangeValue = async (event) => {
        // Prevent default form submission behavior
        event.preventDefault();
        const valid = validationProduct({ name, description, price, discount, quantity });

        // Handle validation errors
        if (valid.error) {
            // If validation fails, set error list and return
            setErrorList(valid.error.details);
            return;
        }


        // Dispatch uploadProduct action to send form data to server
        const response = await dispatch(updateProductValue({ id, name, description, price, discount, quantity }))
        // Check if upload was successful
        if (response.payload?.message === 'success') {
            // Indicate successful upload
            setMesseageSuccess(true)

            // Reset success message after 1 second
            setTimeout(() => {
                dispatch(getProduct())
                // Assuming handleClose clears input fields
                handleClose()

            }, 1000);
        }

    }
    return (
        <>
            <Tooltip title="update" >
                <IconButton onClick={handleClickOpen} >
                    <EditIcon sx={{ color: "green" }} />
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
                    {"Edit value"}
                </DialogTitle>
                <form className='p-2' onSubmit={handleChangeValue} >
                    <Stack sx={{ width: '100%' }} spacing={2} className=' my-2'>


                        {errorUpdateOneProductValue && <Alert severity="error">{errorUpdateOneProductValue}</Alert>}

                        {errorUpdateOneProductValueApi && <Alert severity="error">{errorUpdateOneProductValueApi}</Alert>}
                        {messeageSuccess && <Alert severity="success">success</Alert>}

                    </Stack>
                    <div className=' d-flex  justify-content-evenly '>
                        <div>
                            {/* name field */}
                            <div className='' >
                                <TextField
                                    label="name"
                                    variant="outlined"
                                    margin="normal"
                                    sx={{ width: "100%" }}

                                    name="name"
                                    defaultValue={dataOneProduct.name}

                                    onChange={(e) => setName(e.target.value)}
                                    error={!!errorList.find((elm) => elm.path[0] === 'name')} // Set error helperText if name error exists
                                    helperText={errorList.find((elm) => elm.path[0] === 'name')?.message} // Display name error message
                                />
                            </div>
                            {/* quantity field */}
                            <div className='' >
                                <TextField
                                    label="quantity"
                                    variant="outlined"
                                    margin="normal"
                                    sx={{ width: "100%" }}
                                    required
                                    name="quantity"
                                    type='number'
                                    defaultValue={dataOneProduct.quantity}

                                    onChange={(e) => setQuantity(e.target.value)}

                                    error={!!errorList.find((elm) => elm.path[0] === 'quantity')} // Set error helperText if quantity error exists
                                    helperText={errorList.find((elm) => elm.path[0] === 'quantity')?.message} // Display quantity error message
                                />
                            </div>
                            {/* price  field */}
                            <div className='' >
                                <TextField
                                    label="price "
                                    variant="outlined"
                                    margin="normal"
                                    sx={{ width: "100%" }}
                                    required
                                    name="price "
                                    type='number'
                                    defaultValue={dataOneProduct.price}


                                    onChange={(e) => setPrice(e.target.value)}

                                    error={!!errorList.find((elm) => elm.path[0] === 'price')} // Set error helperText if price error exists
                                    helperText={errorList.find((elm) => elm.path[0] === 'price')?.message} // Display price error message
                                />
                            </div>
                            {/* discount   field */}
                            <div className='' >
                                <TextField
                                    label="discount  "
                                    variant="outlined"
                                    margin="normal"
                                    sx={{ width: "100%" }}
                                    required
                                    name="discount  "
                                    type='number'
                                    defaultValue={dataOneProduct.discount}
                                    onChange={(e) => setDiscount(e.target.value)}

                                    error={!!errorList.find((elm) => elm.path[0] === 'discount')} // Set error helperText if discount error exists
                                    helperText={errorList.find((elm) => elm.path[0] === 'discount')?.message} // Display discount error message
                                />
                            </div>

                        </div>
                        {/*description field */}


                        <Textarea
                            // value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            minRows={3}
                            placeholder="description"
                            sx={{ width: '60%' }}
                            defaultValue={dataOneProduct.description}
                        />
                        {errorList.filter(elm => elm.path[0] === 'description').map((error, index) => (
                            <p key={index} className=' mt-1 text-danger'>{error.message}</p>
                        ))}


                    </div>
                    <DialogActions className=' d-flex justify-content-end' >
                        <Button type='submit' autoFocus color='success' className='fw-bolder' >
                            {loadingUpdateProductValue ? <i className='spinner-border text-danger'></i> : 'Edit'}

                        </Button>
                        <Button onClick={handleClose} color='warning' >Close</Button>
                    </DialogActions>

                </form>
            </Dialog>
        </>
    )
}
