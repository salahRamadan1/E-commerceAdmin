import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {  validationAuth } from '../../functions/functionValidation';
import { useSelector, useDispatch } from 'react-redux';
import { SendNumberverfiy } from '../../service/auth/actionAuth';
import './auth.css'

import { Alert, Button, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import { makeStateIsEmpityAuth } from '../../service/auth/authSlice';

export default function CheckEmail() {
    // 1. State and Utility Variables:
    const [email, setEmail] = useState(''); // LogIn email flag
    const [errorList, setErrorList] = useState([]); // Error list state
    let navigate = useNavigate(); // Navigation function
    /*****************************************************************************************************************************/
    // 2. Data Fetching and Error Handling:
    const {
        loadingSendNumberverfiy, errorSendNumberverfiyJoi, errorSendNumberverfiyApi, errorSendNumberverfiyNetWork,
    } = useSelector((state) => state.auth)
    /*****************************************************************************************************************************/
    // 3. Helper Functions:
    function handleInputChange(e) {
        setEmail(e.target.value)
        dispatch(makeStateIsEmpityAuth())
        setErrorList([])

    }
    /*****************************************************************************************************************************/

    // 4. Define dispatch function (assuming it's from a Redux store)
    const dispatch = useDispatch();
    /*****************************************************************************************************************************/
    // 5. Handle sending verification code (click handler)
    const handleClick = async (e) => {
        e.preventDefault();

        var valid = validationAuth({ email: email }) // validation Joi
        console.log(valid);
        if (valid.error)  // if error found
        {
            setErrorList(valid.error.details)
            return
        }
        const response = await dispatch(SendNumberverfiy({ email: email }))
        if (response.payload?.message === 'success') {
            setErrorList([])
            navigate('/digit')

        }
    };
  
    return (
        <div className="d-flex justify-content-center  mt-5 pt-5">
            <div className=' col-md-12  '>



                <form onSubmit={handleClick}>
                    <div >
                        <Typography variant="h4" sx={{ marginBottom: "20px" }} component="h2">
                            Check Email

                        </Typography>

                    </div>
                    <TextField
                        id="email"
                        name="email"
                        label="Enter your email"
                        type="email"
                        sx={{ width: "100%", marginBottom: "20px" }}
                        required
                        error={!!errorList.find((elm) => elm.path[0] === 'email')}
                        helperText={
                            errorList.find((elm) => elm.path[0] === 'email')?.message
                        }
                        onChange={handleInputChange}
                        value={email}
                    />
                   
                    {errorSendNumberverfiyApi && (<Alert severity="error"> {errorSendNumberverfiyApi}  </Alert>)}
                    {errorSendNumberverfiyNetWork && (<Alert severity="error"> {errorSendNumberverfiyNetWork}  </Alert>)}
                    {errorSendNumberverfiyJoi && (<Alert severity="error"> {errorSendNumberverfiyJoi}  </Alert>)}
                    <Stack direction="row" spacing={2}>
                        <Button type="submit" sx={{ width: "100%" }} variant="contained" disabled={loadingSendNumberverfiy}>
                            {loadingSendNumberverfiy ? (
                                <CircularProgress />
                            ) : (
                                'Continue -->'
                            )}
                        </Button>
                    </Stack>
                </form>

                {/* Forget password */}
                <NavLink to="/login" className='float-end mt-1'>
                    Login
                </NavLink>

            </div>

        </div>
    )
}
