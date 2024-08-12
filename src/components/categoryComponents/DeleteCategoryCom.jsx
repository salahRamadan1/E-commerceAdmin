import React, { Fragment, useState } from 'react'
import { deleteCategory, getCategory } from '../../service/Category/actionCategory'
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import { Alert, CircularProgress } from '@mui/material';
export default function DeleteCategoryCom({ idCategory }) {
    // 1.State variables for  modal visibility
    const [open, setOpen] = React.useState(false);
    const [openSnacker, setOpenSnacker] = useState(false);
    /*****************************************************************************************************************************/
    //2. Access state from the category slice of the Redux store
    const {
        errorDeleteCategoryApi,
        errorDeleteCategory,
        loadingDeleteCategory
    } = useSelector((state) => state.category)
    const dispatch = useDispatch();
    /*****************************************************************************************************************************/

    // 3. Function to open the moda
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    //4.Main Function to handle  delete category
    async function deleteCategoryByid() {
        // Dispatch the deleteCategory action with the category ID as payload.
        // Await the promise returned by the dispatch to get the response data.
        let { payload } = await dispatch(deleteCategory(idCategory))
        // Check if the payload exists and the message indicates success.
        if (payload && payload.data.message === "success") {
            // Close a modal or dialog (likely based on your implementation).
            handleClose()
            // Open a snackbar for notification (likely using a UI library)
            setOpenSnacker(true)
            // Simulate a 1-second delay before fetching updated categories
            setTimeout(() => {
                // Dispatch the getCategory action to fetch updated category data.
                dispatch(getCategory())
                // Close the snackbar after the delay.
                setOpenSnacker(false)
            }, 1000);
        }
    }

    return (
        <div>


            <Button className='text-danger' onClick={handleClickOpen} >Delete</Button>
            <Fragment>
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
                            {errorDeleteCategoryApi && <Alert severity="error" >{errorDeleteCategoryApi}</Alert>}
                            {errorDeleteCategory && <Alert severity="error" >{errorDeleteCategory}</Alert>}
                            Are you sure you want to Delete  your Category?


                        </DialogContentText>


                    </DialogContent>
                    <DialogActions className=' d-flex justify-content-start'>
                        <Button onClick={deleteCategoryByid} autoFocus color='warning'>
                            {loadingDeleteCategory ? <CircularProgress color='warning' /> : 'Delete'}
                        </Button>
                        <Button onClick={handleClose} autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>

            {openSnacker ? <Snackbar
                open={true}
                autoHideDuration={6000}
                message="Deleted"
            /> : ""}


        </div>
    )
}
