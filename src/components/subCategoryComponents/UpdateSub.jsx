import React, { Fragment, useState } from 'react'
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { getOneSubCategory, getSubCategory, updateOneSubCategory } from '../../service/SubCategory/actionSub';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, CircularProgress, Stack, TextField } from '@mui/material';
import ChooseCategory from '../categoryComponents/ChooseCategory';
export default function UpdateSub({ id }) {
    // 1.State variables for  modal visibility
    const [success, setSuccess] = useState(false)
    const [LengthNameError, setLengthNameError] = useState(false)
    const [oneSubCategory, setOneSubCategory] = useState(null)
    const [open, setOpen] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [name, setName] = useState('');
    const [categoryId, setCategoryId] = useState(null);
    /*****************************************************************************************************************************/
    //2. Access state from the category slice of the Redux store
    const dispatch = useDispatch();
    const {
        // error update
        errorUpdateOneSubCategory,
        errorUpdateOneSubCategoryApi,
        loadingUpdateSubCategory,
        //error get one category
        loadingGetOneSubCategory,
        errorGetOneSubCategory,
        errorGetOneSubCategoryApi,
    } = useSelector((state) => state.subCategory)
    /*****************************************************************************************************************************/
    // 3. Function to open model and fechting one SubCategory
    const getOneSubCategoryApi = async () => {
        // Open the modal
        setOpen(true);
        // Fetch sub-category data
        const response = await dispatch(getOneSubCategory(id));

        // If data fetched successfully, update state
        if (response.payload?.message === 'success') {
            setOneSubCategory(response.payload.result);
        }
    };
    /*****************************************************************************************************************************/
    // 4. Helper Functions:
    function getName(e) {
        setName(e.target.value)
        if (name.length + 1 < 2 || name.length > 16 - 1) {
            setLengthNameError(true)
            setIsValid(false)
        } else {
            setLengthNameError(false)
            setIsValid(true)
        }
    }
    /*****************************************************************************************************************************/
    //5. Function to get category id and 
    const handleStringValue = (newValue) => {
        setCategoryId(newValue);
        setIsValid(true)

    };
    /*****************************************************************************************************************************/
    //6.Main Function to handle form submission

    const updateSubCategory = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Determine which fields to update based on their values
        if (name && !categoryId) {
            // Update only the name of the sub-category
            const response = await dispatch(updateOneSubCategory({ name, id }));
            factoryResponse(response);
        } else if (categoryId && !name) {
            // Update only the category ID of the sub-category
            const response = await dispatch(updateOneSubCategory({ categoryId, id }));
            factoryResponse(response);
        } else {
            // Update both name and category ID of the sub-category
            const response = await dispatch(updateOneSubCategory({ name, categoryId, id }));
            factoryResponse(response);
        }
    }
    /*****************************************************************************************************************************/
    //7.Function to factory response
    const factoryResponse = (response) => {
        if (response.payload?.message === 'success') {
            // Reset state after successful update
            setOneSubCategory(null); // Clear selected sub-category
            setName(''); // Clear name input
            setSuccess(true); // Indicate success
            dispatch(getSubCategory()); // Refresh sub-category list

            // Close modal and reset other states after 1 second
            setTimeout(() => {
                setOpen(false);
                setIsValid(false);
                setLengthNameError(false);
                setSuccess(false);
            }, 1000);
        }

    }
    return (
        <div>
            <Button
                variant="outlined"
                color="success"
                endDecorator={<i className="fa-solid fa-pen"></i>}
                onClick={getOneSubCategoryApi}
            >
                Discard
            </Button>
            <Fragment>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <ModalDialog variant="outlined" role="alertdialog">
                        <DialogTitle>
                            <i className="fa-solid fa-pen text-success mt-1"></i>
                            Confirmation
                        </DialogTitle>
                        <Divider />
                        <DialogContent>
                            <Stack sx={{ width: '100%' }} spacing={2} className=' my-2'>
                                {/* error update on category */}
                                {errorUpdateOneSubCategory && <Alert severity="error">{errorUpdateOneSubCategory}</Alert>}
                                {/* error update on category api */}
                                {errorUpdateOneSubCategoryApi && <Alert severity="error">{errorUpdateOneSubCategoryApi}</Alert>}
                                {/* {messageSuccess && <Alert severity="success">{messageSuccess}</Alert>} */}

                            </Stack>
                            {/*   form                                                     */}

                            {errorGetOneSubCategoryApi && <>
                                <Alert severity="error">{errorGetOneSubCategoryApi}</Alert>

                            </>}
                            {errorGetOneSubCategory && <>
                                <Alert severity="error">{errorGetOneSubCategory}</Alert>

                            </>}

                            {oneSubCategory &&
                                <form onSubmit={updateSubCategory}>
                                    <TextField color={!LengthNameError ? 'success' : "error"} sx={{ width: '100%', marginBottom: "20px" }} id="outlined-basic" label="Name Subcategory" variant="outlined" defaultValue={oneSubCategory.name} onChange={(e) => getName(e)} />
                                    {LengthNameError && <Alert severity="error">max length is 16 min length is 2</Alert>}

                           
                                        <TextField sx={{ width: "100%" }} value={categoryId ? categoryId : "Update categrory >"} />

                                        <ChooseCategory sendStringToParent={handleStringValue} />
                                 
                                    <DialogActions>
                                        <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button variant="solid" color="success" type='submit' disabled={!isValid}>
                                            {loadingUpdateSubCategory ? <i className='spinner-border text-danger'></i> : 'update'}
                                        </Button>
                                    </DialogActions>
                                </form>
                            }
                            <div className=' text-center'>
                                {loadingGetOneSubCategory && <CircularProgress color='warning' />}
                            </div>
                            {success && <Alert severity='success'>Success</Alert>}
                        </DialogContent>

                    </ModalDialog>
                </Modal>
            </Fragment>


        </div>
    )
}


