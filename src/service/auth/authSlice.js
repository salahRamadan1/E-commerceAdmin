import { createSlice } from '@reduxjs/toolkit';

import { jwtDecode } from 'jwt-decode';
import { logInUser, resetPassWord, SendNumberverfiy, verfiy } from './actionAuth';




const initialStateAuth = {


    // Verfiy
    loadingVerfiy: false,
    errorVerfiyNumberJoi: null,
    errorVerfiyApi: null,
    errorVerfiyNetWork: null,
    errorVerfiyEmailJoi: null,
    // SendNumberverfiy
    loadingSendNumberverfiy: false,
    errorSendNumberverfiyJoi: null,
    errorSendNumberverfiyApi: null,
    errorSendNumberverfiyNetWork: null,
    // resetPassword
    loadingResetPassWord: false,
    errorResetPassWordJoi: null,
    errorResetPassWordApi: null,
    errorResetPassWordNetWork: null,
    // // change profile image
    // loadingProfileImage: false,
    // errorProfileImageApi: null,
    // errorProfileImageNetWork: null,
    // // change Name
    // loadingChangeName: false,
    // errorChangeNameApi: null,
    // errorChangeNameNetWork: null,
    // // change Password
    // loadingChangePassword: false,
    // errorChangePasswordApi: null,
    // errorChangePasswordNetWork: null,
    // errorCurrentPasswordChange: null,
    // errorNewPasswordChange: null,


    emailUser: null,
    userData: null,
    isLoggedIn: false,

    // login
    loadingLogIn: false,
    errorLogInApi: null,
    errorLogInNetWork: null,
    errorJoiApiLogInPassword: null,
    errorJoiApiLogInEmail: null,
}
const authSlice = createSlice({
    name: 'auth',
    initialState: initialStateAuth,
    reducers: {
        logIn: (state) => {
            if (localStorage.getItem('userToken')) {
                state.isLoggedIn = true
                let token = localStorage.getItem('userToken')
                state.userData = jwtDecode(token)
            }

        },
        logout: (state) => {

            localStorage.removeItem('userToken')
            localStorage.removeItem('user')
            state.isLoggedIn = false
            state.userData = null

        },
        makeStateIsEmpityAuth: (state) => {
            const fields = [
                // login
                'loadingLogIn', 'errorLogInApi', 'errorLogInNetWork', 'errorJoiApiLogInPassword', 'errorJoiApiLogInEmail',
                // SendNumberverfiy
                'loadingSendNumberverfiy', 'errorSendNumberverfiyJoi', 'errorSendNumberverfiyApi', 'errorSendNumberverfiyNetWork',
                // Verfiy
                'loadingVerfiy', 'errorVerfiyNumberJoi', 'errorVerfiyApi', 'errorVerfiyNetWork', 'errorVerfiyEmailJoi',
                // resetPassWord
                'loadingResetPassWord', 'errorResetPassWordJoi', 'errorResetPassWordNetWork', 'errorResetPassWordApi',
            ]; 

            fields.forEach(field => {
                state[field] = field.startsWith('loading') ? false : null;
            });

        }
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(logInUser.pending, (state) => {
                // Set loading state to true, clear all error states
                state.loadingLogIn = true;
                state.errorLogInApi = null;
                state.errorLogInNetWork = null;
                state.errorJoiApiLogInPassword = null;
                state.errorJoiApiLogInEmail = null;
            })
            .addCase(logInUser.fulfilled, (state, action) => {
                console.log(action);
                // Set loading state to false
                state.loadingLogIn = false;
                // Handle potential Joi validation errors
                if (action.payload.length) {
                    console.log(action.payload);
                    action.payload.forEach((elm) => {

                        if (elm.path[0] === 'email') state.errorJoiApiLogInEmail = elm.message;
                        if (elm.path[0] === 'password') state.errorJoiApiLogInPassword = elm.message;
                    });
                    return;// Exit early if there were Joi errors   
                }
                // Clear Joi error states
                state.errorJoiApiLogInEmail = null;
                state.errorJoiApiLogInPassword = null;
                // Handle login success or failure
                if (action.payload.message === 'logged in successfully') {
                    // Store token and user data, set isLoggedIn to true
                    localStorage.setItem('userToken', action.payload.token)
                    state.isLoggedIn = true
                    state.userData = jwtDecode(localStorage.getItem('userToken'))
                } else {
                    // Set login API error message
                    state.errorLogInApi = action.payload.message;
                  
                }
            })
            .addCase(logInUser.rejected, (state, action) => {
                // Set loading state to false, set network error message if applicable
                state.loadingLogIn = false;
                state.errorLogInNetWork = !action.payload ? action.error.message : null;
            })
            // Send Number Verify
            .addCase(SendNumberverfiy.pending, (state) => {
                // Set loading state to true, clear all error states
                state.loadingSendNumberverfiy = true;
                state.errorSendNumberverfiyJoi = null;
                state.errorSendNumberverfiyApi = null;
                state.errorSendNumberverfiyNetWork = null;
            })
            .addCase(SendNumberverfiy.fulfilled, (state, action) => {
                // Set loading state to false
                state.loadingSendNumberverfiy = false;
                // Handle potential Joi validation errors
                if (action.payload.length) {
                    console.log(action.payload);
                    action.payload.forEach((elm) => {

                        if (elm.path[0] === 'email') state.errorSendNumberverfiyJoi = elm.message;

                    });
                    return;// Exit early if there were Joi errors   
                }
                // Clear Joi error states
                state.errorSendNumberverfiyJoi = null;
                // Handle send number success or failure
                if (action.payload.message === 'success') {
                    state.emailUser = action.payload.email;
                } else {
                    // Set sendd number API error message
                    state.errorSendNumberverfiyApi = action.payload.message;
                }
            })
            .addCase(SendNumberverfiy.rejected, (state, action) => {
                // Set loading state to false, set network error message if applicable
                state.loadingSendNumberverfiy = false;
                state.errorSendNumberverfiyNetWork = !action.payload ? action.error.message : null;
            })
            // Confirm Email
            .addCase(verfiy.pending, (state) => {
                // Set loading state to true, clear all error states

                state.loadingVerfiy = true;
                state.errorVerfiyNumberJoi = null;
                state.errorVerfiyApi = null;
                state.errorVerfiyNetWork = null;
            })
            .addCase(verfiy.fulfilled, (state, action) => {
                // Set loading state to false
                state.loadingVerfiy = false;
                // Handle potential Joi validation errors

                if (action.payload.length >= 0) {
                    action.payload.forEach((elm) => {
                        if (elm.path === 'email') state.errorVerfiyEmailJoi = elm.message;
                        if (elm.path === 'ConfirmEmailNum') state.errorVerfiyNumberJoi = elm.message;
                    });
                    return;// Exit early if there were Joi errors  
                }
                // Clear Joi error states
                state.errorVerfiyNumberJoi = null;
                state.errorVerfiyEmailJoi = null;
                // Handle send number success or failure

                if (action.payload.message === 'success') {
                    console.log('hello');
                } else {


                    state.errorVerfiyApi = action.payload.message;
                }
            })
            .addCase(verfiy.rejected, (state, action) => {
                // Set sendd number API error message

                state.loadingVerfiy = false;
                state.errorVerfiyNetWork = !action.payload ? action.error.message : null;
            })
            // Reset Password
            .addCase(resetPassWord.pending, (state) => {
                // Set loading state to true, clear all error states
                state.loadingResetPassWord = true;
                state.errorResetPassWordJoi = null;
                state.errorResetPassWordNetWork = null;
                state.errorResetPassWordApi = null;
            })
            .addCase(resetPassWord.fulfilled, (state, action) => {
                // Set loading state to false

                state.loadingResetPassWord = false;
                // Handle potential Joi validation errors

                if (action.payload.length >= 0) {
                    action.payload.forEach((elm) => {
                        if (elm.path[0] === 'password') state.errorResetPassWordJoi = elm.message;
                    });
                    return;// Exit early if there were Joi errors  
                }
                // Clear Joi error states
                state.errorResetPassWordJoi = null;
                // Handle send number success or failure
                if (action.payload.message === 'success') {
                    state.emailUser = null;
                } else {
                    state.errorResetPassWordApi = action.payload.message;
                }
            })
            .addCase(resetPassWord.rejected, (state, action) => {
                // Set sendd number API error message
                state.loadingResetPassWord = false;
                state.errorResetPassWordNetWork = !action.payload ? action.error.message : null;
            })

    }

})

export const { logout, logIn, currentUser, makeStateIsEmpityAuth } = authSlice.actions;
export default authSlice.reducer;