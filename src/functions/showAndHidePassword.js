import { useState } from "react";

function PasswordShowAndHide(params) {
    var [showPassword, setShowPassword] = useState(false);
    function toggle() {

        if (showPassword == false) {
            setShowPassword(true)
        }
        else if (showPassword == true) {
            setShowPassword(false)

        }
    }

    return {showPassword, toggle}

}

export { PasswordShowAndHide }