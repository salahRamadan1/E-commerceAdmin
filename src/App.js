import './App.css';
import { Route, Routes } from 'react-router-dom';
import LogIn from './components/authComponents/login';
import CheckEmail from './components/authComponents/checkEmail';
import Digit from './components/authComponents/digit';
import Resetpassword from './components/authComponents/resetpassword';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from './service/auth/authSlice';
import Profile from './components/SettingsComponents/Profile';



import Home from './components/HomeConponents/Home';
import HomeaCategory from './components/categoryComponents/HomeCategory';
import HomeSubCategory from './components/subCategoryComponents/HomeSubCategory';
import HomeBrand from './components/brandComponents/HomeBrand';
import HomeProduct from './components/ProductComponents/HomeProduct';
import LeftBar from './components/leftbar/LeftBar';
import MainOneProduct from './components/ProductComponents/oneProduct/MainOneProduct';
import CouponMain from './components/couponComponents/CouponMain';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logIn())
  }, )
  return (
    <div>

      <LeftBar className='me-5' />
      
      <div className=' container'>
        <Routes >

          <Route path='/' element={<LogIn />} />
          <Route path='home' element={<Home />} />
          {/* auth component  */}
          <Route path='login' element={<LogIn />} />
          <Route path='checkemail' element={<CheckEmail />} />
          <Route path='digit' element={< Digit />} />
          <Route path='resetpassword' element={< Resetpassword />} />

          {/* categoryComponents */}
          <Route path='category' element={< HomeaCategory />} />
          {/* subcategoryComponents */}
          <Route path='subCategory' element={< HomeSubCategory />} />
          {/* brandComponents */}
          <Route path='brand' element={< HomeBrand />} />
          {/* settingcomponint */}
          <Route path='profile' element={< Profile />} />
          {/* settingcomponint */}
          <Route path='product' element={< HomeProduct />} />
          <Route path='MainOneProduct/:id' element={< MainOneProduct />} />
          <Route path='CouponMain' element={< CouponMain />} />

        </Routes>


      </div>


    </div>
  );
}

export default App;
