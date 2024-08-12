import { Alert, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Snackbar, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getProduct } from '../../service/Product/actionProduct';
import { makeStateIsEmpityProduct } from '../../service/Product/ProductSlice';
export default function DeleteProduct({ id }) {
    // 1.State variables for  modal visibility
    const [open, setOpen] = useState(false);
    const [openSnacker, setOpenSnacker] = useState(false);
    /*****************************************************************************************************************************/
    //2. Access state from the Product slice of the Redux store
    const {
        errorDeleteProductApi,
        errorDeleteProduct,
        loadingDeleteProduct
    } = useSelector((state) => state.product)
    const dispatch = useDispatch();
    /*****************************************************************************************************************************/
    // 3. Function to open the moda
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        dispatch(makeStateIsEmpityProduct())
    };
    /*****************************************************************************************************************************/
    //4.Main Function to handle  delete Product
    async function deleteProductByid() {
        // Dispatch the deleteProduct action with the Product ID as payload.
        // Await the promise returned by the dispatch to get the response data.
        let { payload } = await dispatch(deleteProduct(id))
        // Check if the payload exists and the message indicates success.
        if (payload && payload.data.message === "success") {
            setOpen(false)
            // Close a modal or dialog (likely based on your implementation).
            handleClose()
            // Open a snackbar for notification (likely using a UI library)
            setOpenSnacker(true)
            // Simulate a 1-second delay before fetching updated categories
            setTimeout(() => {
                // Dispatch the getProduct action to fetch updated Product data.
                dispatch(getProduct())
                // Close the snackbar after the delay.
                setOpenSnacker(false)
            }, 1000);
        }
    }
    return (
        <>

            <Tooltip title="delete"  >
                <IconButton onClick={handleClickOpen} >
                    <DeleteIcon sx={{ color: 'red' }} />
                </IconButton>
            </Tooltip>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete Category"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {errorDeleteProductApi && <Alert severity="error" >{errorDeleteProductApi}</Alert>}
                        {errorDeleteProduct && <Alert severity="error" >{errorDeleteProduct}</Alert>}
                        Are you sure you want to Delete  your Product?


                    </DialogContentText>


                </DialogContent>
                <DialogActions className=' d-flex justify-content-end'>
                    <Button onClick={deleteProductByid} autoFocus color='warning'>
                        {loadingDeleteProduct ? <CircularProgress color='warning' /> : 'Delete'}
                    </Button>
                    <Button onClick={handleClose} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>


            {openSnacker ? <Snackbar
                open={true}
                autoHideDuration={6000}
                message="Deleted"
            /> : ""}
        </>
    )
}
