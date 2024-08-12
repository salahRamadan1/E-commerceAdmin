import React, { Fragment, useEffect, useState } from 'react'
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DeleteForever from '@mui/icons-material/DeleteForever';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSubCategory, getSubCategory } from '../../service/SubCategory/actionSub';
import { Alert, CircularProgress, Snackbar } from '@mui/material';
export default function DeleteSub({ subCategoryId }) {
    // 1.State variables for form data, and modal visibility
    const [open, setOpen] = useState(false);// State to control the visibility of the modal
    const [openSnacker, setOpenSnacker] = useState(false); // State to control the visibility of the Snacker
    /*****************************************************************************************************************************/
    //2. Access state from the subCategory slice of the Redux store   
    const dispatch = useDispatch();
    const {
        loadingDeleteSubCategory,
        errorDeleteSubCategory,
        errorDeleteSubCategoryApi
    } = useSelector((state) => state.subCategory)
    /*****************************************************************************************************************************/
    //5. Main Function to handle form submission
    const deleteOneSubCategory = async () => {
        let response= await dispatch(deleteSubCategory(subCategoryId))
        if (response.payload?.data.message  === "success") {
            setOpenSnacker(true)
            setOpen(false)
            setTimeout(() => {
                dispatch(getSubCategory())
                setOpenSnacker(false)
            }, 1000);
        }
    }

    return (
        <div>
            <Button
                variant="outlined"
                color="danger"
                endDecorator={<DeleteForever />}
                onClick={() => setOpen(true)}
            >

                Discard
            </Button>
            <Fragment>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <ModalDialog variant="outlined" role="alertdialog">
                        <DialogTitle>
                            <WarningRoundedIcon />
                            Confirmation
                        </DialogTitle>
                        <Divider />
                        <DialogContent>
                            {errorDeleteSubCategoryApi && <Alert severity="error" >{errorDeleteSubCategoryApi}</Alert>}
                            {errorDeleteSubCategory && <Alert severity="error" >{errorDeleteSubCategory}</Alert>}
                            Are you sure you want to Delete  your SubCategory?
                        </DialogContent>
                        <DialogActions className='d-flex justify-content-start'>
                            <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button variant="solid" color="danger" onClick={deleteOneSubCategory}>
                           
                                {loadingDeleteSubCategory ? <CircularProgress color='warning' /> : 'Delete'}

                            </Button>
                        </DialogActions>
                    </ModalDialog>
                </Modal>
            </Fragment>

            {openSnacker ? <Snackbar
                open={true}
                autoHideDuration={6000}
                message="Deleted"
            /> : ""}
        </div>
    )
}
