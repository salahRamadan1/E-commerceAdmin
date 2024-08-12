import React, { Fragment, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Stack } from '@mui/material';
import { getSubCategory } from '../../service/SubCategory/actionSub';
import PaginationSub from './PaginationSub';
import SearchSub from './SearchSub';
export default function ChooseSubCategory(props) {
    // 1.State variables for form data, and modal visibility
    const [open, setOpen] = useState(false); // State to control the visibility of the modal
    const [inputValue, setInputValue] = useState(null)  // State to store the selected subCategory ID (consider removing if unnecessary)
    /*****************************************************************************************************************************/
    //2. Access state from the subCategory slice of the Redux store   
    const dispatch = useDispatch();
    const {
        loadingGetSubCategory,
        errorGetSubCategory,
        errorGetSubCategoryApi,
        dataSubCategory,
    } = useSelector((state) => state.subCategory)
    /*****************************************************************************************************************************/
    // 3.Function to open the modal and fetch subCategory data
    const handleClickOpen = async () => {
        setOpen(true);
        await dispatch(getSubCategory())

    };
    /*****************************************************************************************************************************/
    //4. Function to close the modal and clear selected subCategory
    const handleClose = () => {
        setOpen(false);
        setInputValue(null)
    };
    /*****************************************************************************************************************************/
    //5. Function to send the selected subCategory ID to the parent component and close the modal
    const { sendStringToParent } = props;
    const sendToParent = () => {
        const valueToSend = inputValue;
        sendStringToParent(valueToSend);
        handleClose()

    };
    return (
        <>
            <p onClick={handleClickOpen} className='bg-dark  rounded-2 text-center text-white  w-100 mt-1  ' style={{ cursor: 'pointer' }}>Choose subCategory</p>
            <Fragment>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth={true}
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Choose Category"}
                    </DialogTitle>
                    <DialogContent>


                        <Stack sx={{ width: '100%' }} spacing={2} className=' my-2'>
                            {/* error api get subCategory */}
                            {errorGetSubCategoryApi && <Alert severity="error">{errorGetSubCategoryApi}</Alert>}
                            {/* error get subCategory */}
                            {errorGetSubCategory && <Alert severity="error">{errorGetSubCategory}</Alert>}
                            {/* if subCategory deleted */}
                            {loadingGetSubCategory && <div className=' loading d-flex justify-content-center  mt-5'>
                                <div className="loader d-flex "></div>
                            </div>}
                        </Stack>


                        <hr />
                        {!inputValue ? <>
                            {!errorGetSubCategoryApi && <SearchSub />}
                            {dataSubCategory.result && dataSubCategory.result.map((elm, index) => (
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
                            <PaginationSub />

                        </>
                            : <>
                                <div className=' d-flex justify-content-center mx-auto'>
                                    <span className=' alert alert-success' >  you Selected Category done</span>
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
