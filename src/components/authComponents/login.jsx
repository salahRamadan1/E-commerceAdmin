import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { validationAuth } from '../../functions/functionValidation'
import { PasswordShowAndHide } from '../../functions/showAndHidePassword'
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button, Alert, IconButton, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './auth.css'
import { logInUser } from '../../service/auth/actionAuth';
import { makeStateIsEmpityAuth } from '../../service/auth/authSlice';

export default function Login() {
    // 1. State and Utility Variables:
    let { showPassword, toggle } = PasswordShowAndHide(); // Password visibility functions
    let navigate = useNavigate(); // Navigation function
    const [formUserLogIn, setFormUserLogIn] = useState({
        email: '',
        password: ''
    }); // LogIn form data state
    const [errorList, setErrorList] = useState([]); // Error list state
    /*****************************************************************************************************************************/
    // 2. Data Fetching and Error Handling:
    const dispatch = useDispatch();
    const {
        loadingLogIn,
        errorLogInApi,
        errorLogInNetWork,
        errorJoiApiLogInPassword,
        errorJoiApiLogInEmail,
    } = useSelector((state) => state.auth); // Get auth data and errors from Redux store
    /*****************************************************************************************************************************/
    // 3. Helper Functions:
    function handleInputChange(e) {
        setFormUserLogIn({ ...formUserLogIn, [e.target.name]: e.target.value });
        dispatch(makeStateIsEmpityAuth())
        setErrorList([])
    }
    // 4. Main LogIn Function:
    const handleLogIn = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        dispatch(makeStateIsEmpityAuth())
        // // Validate user input using Joi
        const valid = validationAuth(formUserLogIn);
        if (valid.error) {
            // If validation fails, set error list and return
            setErrorList(valid.error.details);
            return;
        }

        // Dispatch login user action
        const response = await dispatch(logInUser(formUserLogIn));

        if (response.payload?.message === 'logged in successfully') {
            // If login successful, clear error list and navigate to home page
            setErrorList([]);
            navigate('/home');
        }
    };
    // 5. Cleanup Function (Optional):
    useEffect(() => {
        if (errorJoiApiLogInPassword) {

            console.log(errorJoiApiLogInPassword);
        }
        if (localStorage.getItem('userToken')) {
            navigate('/home')
        }
        return () => dispatch(makeStateIsEmpityAuth()); // Cleanup function (if needed)
    },);
    return (
        <div className=' text-center mt-5 pt-5'>

            <h3>E-commerce admin</h3>
            <div className=' mx-auto '>
                <form onSubmit={handleLogIn} className=" py-2   ">
                    {/* Error handling for api  */}
                    {errorLogInApi && <Alert severity='error' sx={{ width: "90%", alignItems: "center", margin: "auto", marginY: "5px" }}  >{errorLogInApi}</Alert>}
                    
                    {/* Email field */}
                    <div className='' >
                        <TextField
                            label="Email Address"
                            variant="outlined"
                            margin="normal"
                            sx={{ width: "90%" }}
                            required
                            name="email"
                            value={formUserLogIn.email}
                            onChange={handleInputChange}
                            error={!!errorList.find((elm) => elm.path[0] === 'email')} // Set error helperText if email error exists
                            helperText={errorList.find((elm) => elm.path[0] === 'email')?.message} // Display email error message
                        />
                    </div>
                    {/* Error handling api for specific Joi validation error errorEmail */}

                    {errorJoiApiLogInEmail && <Alert severity='error' sx={{ width: "90%", alignItems: "center", margin: "auto", marginY: "5px" }}  >{errorJoiApiLogInEmail}</Alert>} {/* error joi api */}

                    {/* Password field */}
                    <div>
                        <TextField

                            id="outlined-basic"
                            label="Password"
                            variant="outlined"
                            margin="normal"
                            sx={{ width: "90%" }}
                            required
                            name="password"
                            value={formUserLogIn.password}
                            onChange={handleInputChange}
                            type={showPassword ? 'text' : 'password'}
                            error={!!errorList.find((elm) => elm.path[0] === 'password')} // Set error helperText if password error exists
                            helperText={errorList.find((elm) => elm.path[0] === 'password')?.message} // Display password error message
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        onClick={toggle}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                ),
                            }}
                        />
                    </div>
                    {/* Error handling api for specific Joi validation error Password */}

                    {errorJoiApiLogInPassword && <Alert severity='error' sx={{ width: "90%", alignItems: "center", margin: "auto", marginY: "5px" }}  >{errorJoiApiLogInPassword}</Alert>} {/* error joi api */}

                    {/* Submit button */}
                    <div>
                        <Button variant="contained" type="submit" color="primary" sx={{ mt: 2, width: '80%' }} disabled={loadingLogIn}>
                            {loadingLogIn ? <CircularProgress /> : 'Login'}
                        </Button>
                    </div>
                </form>
                {/* Forget password */}
                <NavLink to="/checkemail" >
                    Forgotten password?
                </NavLink>
            </div>
            {/* Error handling for network  */}
            {errorLogInNetWork && <Alert severity='error' sx={{ width: "90%", alignItems: "center", margin: "auto", marginY: "5px" }}  >{errorLogInNetWork}</Alert>}

        </div>

    )
}

