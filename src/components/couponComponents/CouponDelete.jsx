import React, { Fragment, useState } from 'react'
import { deleteCoupon, getCoupon } from '../../service/Coupon/actionCoupon'
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import DeleteIcon from '@mui/icons-material/Delete';
import { Alert, CircularProgress, IconButton, Tooltip } from '@mui/material';
export default function CouponDelete({ idCoupon }) {
    // 1.State variables for  modal visibility
    const [open, setOpen] = React.useState(false);
    const [openSnacker, setOpenSnacker] = useState(false);
    /*****************************************************************************************************************************/
    //2. Access state from the Coupon slice of the Redux store
    const {
        errorDeleteCouponApi,
        errorDeleteCoupon,
        loadingDeleteCoupon
    } = useSelector((state) => state.coupon)
    const dispatch = useDispatch();
    /*****************************************************************************************************************************/
    // 3. Function to open the moda
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    //4.Main Function to handle  delete Coupon
    async function deleteCouponByid() {
        // Dispatch the deleteCoupon action with the Coupon ID as payload.
        // Await the promise returned by the dispatch to get the response data.
        let { payload } = await dispatch(deleteCoupon(idCoupon))
        console.log(payload);
        // Check if the payload exists and the message indicates success.
        if (payload && payload.data.message === "success") {
            // Close a modal or dialog (likely based on your implementation).
            handleClose()
            // Open a snackbar for notification (likely using a UI library)
            setOpenSnacker(true)
            // Simulate a 1-second delay before fetching updated categories
            setTimeout(() => {
                // Dispatch the getCoupon action to fetch updated Coupon data.
                dispatch(getCoupon())
                // Close the snackbar after the delay.
                setOpenSnacker(false)
            }, 1000);
        }
    }
    return (
        <div>

            <Tooltip title="delete"  >
                <IconButton onClick={handleClickOpen} >
                    <DeleteIcon sx={{ color: 'red' }} />
                </IconButton>
            </Tooltip>
            {/* <Button className='text-danger' onClick={handleClickOpen} >Delete</Button> */}
            <Fragment>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth={true}
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Delete Coupon"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {errorDeleteCouponApi && <Alert severity="error" >{errorDeleteCouponApi}</Alert>}
                            {errorDeleteCoupon && <Alert severity="error" >{errorDeleteCoupon}</Alert>}
                            Are you sure you want to Delete  your Coupon?


                        </DialogContentText>


                    </DialogContent>
                    <DialogActions className=' d-flex justify-content-start'>
                        <Button onClick={deleteCouponByid} autoFocus color='warning'>
                            {loadingDeleteCoupon ? <CircularProgress color='warning' /> : 'Delete'}
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
