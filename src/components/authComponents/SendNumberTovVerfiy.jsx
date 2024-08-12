import { Alert } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStateIsEmpityAuth } from '../../service/auth/authSlice';
import { SendNumberverfiy } from '../../service/auth/actionAuth';

export default function SendNumberToVerify() {
    // 1. Define state variables
    const [count, setCount] = useState(1);
    const [isCoolingDown, setIsCoolingDown] = useState(false); // Track cooldown state
    /*****************************************************************************************************************************/

    // 2. Data Fetching and Error Handling:
    const {
        errorSendNumberverfiyJoi,
        errorSendNumberverfiyApi,
        errorSendNumberverfiyNetWork,
        emailUser
    } = useSelector((state) => state.auth)
    /*****************************************************************************************************************************/

    // 3. Define dispatch function (assuming it's from a Redux store)
    const dispatch = useDispatch();
    /*****************************************************************************************************************************/

    // 4. Handle sending verification code (click handler)
    const handleClick = async () => {

        // Handle sending verification code logic here (e.g., API call)
        console.log('Sending verification code...'); // Simulate sending code

        // Reset timer and cooldown state after successful sending
        setCount(1); // Reset counter
        setIsCoolingDown(false); // Allow resending after cooldown period

        await dispatch(SendNumberverfiy({ email: emailUser }))

        setTimeout(() => {
            dispatch(makeStateIsEmpityAuth()) // to make error empity
        }, 2000);
    };
    /*****************************************************************************************************************************/

    // 5. Timer for cooldown (useEffect hook)
    useEffect(() => {


        const timer = setInterval(() => {
            if (count > 0) {
                setCount(prevCount => prevCount - 1);
            } else {
                clearInterval(timer);
                setIsCoolingDown(true); // Set cooldown flag after timer finishes
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [count]); // Dependency on `count` ensures timer updates

    return (
        <div id='auth' className=" auth d-flex justify-content-center">
            <span  >
                {/* Message displayed when code couldn't be sent yet */}
                We couldn't send code yet.

                {/* 
  Conditional rendering based on cooldown state:
  - If `isCoolingDown` is true (cooldown period):
    - Display "Send code" with click functionality (handleClick)
      - Text color: primary
      - Class: "try" (likely for styling purposes)
      - Cursor: pointer (indicates clickability)
  - If `isCoolingDown` is false (no cooldown):
    - Display "You can try again after {count}s"
      - Text color: primary
      - Class: "try" (likely for styling purposes)
*/}

                {isCoolingDown ? (
                    <span className="text-primary try" style={{ cursor: "pointer" }} onClick={handleClick}>
                        Send code
                    </span>
                ) : (
                    <span className="text-primary try">You can try again after {count}s</span>
                )}
                {/* 
      Conditional rendering of error messages based on specific error states:
      - If `errorSendNumberverfiy` exists, display an Alert with "error" severity and the error message
      - Repeat for `errorSendNumberverfiyApi` and `errorSendNumberverfiyNetWork` as well
    */}
                {errorSendNumberverfiyJoi && <Alert sx={{ width: "90%", marginX: "auto" }} severity='error'>{errorSendNumberverfiyJoi}</Alert>}
                {errorSendNumberverfiyApi && <Alert sx={{ width: "90%", marginX: "auto" }} severity='error'>{errorSendNumberverfiyApi}</Alert>}
                {errorSendNumberverfiyNetWork && <Alert sx={{ width: "90%", marginX: "auto" }} severity='error'>{errorSendNumberverfiyNetWork}</Alert>}
            </span>

        </div>
    );
}
