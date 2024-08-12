import React, { Fragment, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { getBrand } from '../../service/Brand/actionBrand';
import { Alert, Stack } from '@mui/material';
import PaginationBrand from './PaginationBrand';
import SearchBrand from './SearchBrand';
 
export default function ChooseBrand(props) {
    // 1.State variables for form data, and modal visibility
    const [open, setOpen] = useState(false); // State to control the visibility of the modal
    const [inputValue, setInputValue] = useState(null)  // State to store the selected Brand ID (consider removing if unnecessary)
    /*****************************************************************************************************************************/
    //2. Access state from the Brand slice of the Redux store   
    const dispatch = useDispatch();
    const {
        errorGetBrand,
        errorGetBrandApi,
        loadingGetBrand,
        dataBrand,
    } = useSelector((state) => state.brand)
    const { sendStringToParent } = props;
    /*****************************************************************************************************************************/
    // 3.Function to open the modal and fetch Brand data
    const handleClickOpen = async () => {
        setOpen(true);
        await dispatch(getBrand())

    };
    /*****************************************************************************************************************************/
    //4. Function to close the modal and clear selected Brand
    const handleClose = () => {
        setOpen(false);
        setInputValue(null)
    };

    /*****************************************************************************************************************************/

    //5. Function to send the selected Brand ID to the parent component and close the modal
    const sendToParent = () => {
        const valueToSend = inputValue;
        sendStringToParent(valueToSend);
        handleClose()

    };
    return (
        <>
            <p onClick={handleClickOpen} className='bg-dark  rounded-2 text-center text-white  w-100 mt-1  ' style={{cursor:'pointer'}}> Choose Brand</p>
            <Fragment>
                <Dialog 
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth={true}
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Choose Brand"}
                    </DialogTitle>
                    <DialogContent>
                        {/* Error Handling */}
                        <Stack sx={{ width: '100%' }} spacing={2} className=' my-2'>
                            {/* error api get Brand */}
                            {errorGetBrandApi && <Alert severity="error">{errorGetBrandApi}</Alert>}
                            {/* error get Brand */}
                            {errorGetBrand && <Alert severity="error">{errorGetBrand}</Alert>}
                            {/* Loading Indicator */}
                            {loadingGetBrand && <div className=' loading d-flex justify-content-center  mt-5'>
                                <div className="loader d-flex "></div>
                            </div>}
                        </Stack>


                        <hr />
                        {/* No Brand Selected */}
                        {!inputValue ? <>
                            {/* No API Errors - Show Search Component */}
                            {!errorGetBrandApi && <SearchBrand />}
                            {/* Display Brand List if Data Fetched Successfully */}
                            {dataBrand.result && dataBrand.result.map((elm, index) => (
                                <div key={index}>
                                    <div className=' d-flex  justify-content-between' >
                                        <h5>{elm.name}</h5>
                                        <button className=' btn btn-dark w-25' onClick={e => setInputValue(elm._id)} >
                                            Select
                                        </button>
                                    </div>
                                    <hr />
                                </div>
                            ))
                            }
                            <PaginationBrand />

                        </>
                            : <>
                                {/* Brand Selected */}
                                <div className=' d-flex justify-content-center mx-auto'>
                                    <span className=' alert alert-success' >  you Selected Brand done</span>
                                </div>
                                {setTimeout(() => {
                                    sendToParent()
                                }, 1000)}
                            </>
                        }

                    </DialogContent>
                    <DialogActions className=' d-flex justify-content-start'>

                        <Button color='warning' onClick={handleClose} autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        </>
    )
}
