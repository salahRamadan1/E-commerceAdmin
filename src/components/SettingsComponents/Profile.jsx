import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './setting.css'
import { currentUser } from '../../service/auth/authSlice';
export default function Profile() {

    const [user, setUser] = useState('')
    useEffect(() => {
        let currentUser = jwtDecode(localStorage.getItem('userToken'))

        setUser(currentUser)
        console.log(user);
    }, [])


    return (
        <>
          <div>
              

          </div>
        </>
    )
}
