import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../service/auth/authSlice';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import StoreIcon from '@mui/icons-material/Store';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import './styleNav.css'
export default function NavBar() {

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { isLoggedIn, user } = useSelector((state) => state.auth);
    const handleLogout = () => {
        dispatch(logout());
        navigate('/login')
    };


    return (
        <div>
            {isLoggedIn &&
                <AppBar position="static" className='NavBar  '>
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <StoreIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                            <Typography
                                variant="h6"
                                noWrap

                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.2rem',
                                    color: 'darkred',
                                    textDecoration: 'none',
                                }}
                            >
                                <NavLink to='/home' className='text-decoration-none text-white'>
                                    <span>E-commerce</span>
                                </NavLink>
                            </Typography>
                            {isLoggedIn &&

                                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleOpenNavMenu}
                                        color="inherit"
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorElNav}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                        open={Boolean(anchorElNav)}
                                        onClose={handleCloseNavMenu}
                                        sx={{
                                            display: { xs: 'block', md: 'none' },
                                        }}
                                    >

                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">
                                                <NavLink to='category' className={({ isActive }) => isActive ? "link-activeMobile" : "link-inactiveMobile"}  >Category</NavLink>
                                            </Typography>

                                        </MenuItem>
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">
                                                <NavLink to='subCategory' className={({ isActive }) => isActive ? "link-activeMobile " : "link-inactiveMobile "}  >subCategory</NavLink>
                                            </Typography>
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">
                                                <NavLink to='brand' className={({ isActive }) => isActive ? "link-activeMobile " : "link-inactiveMobile "}  >Brand</NavLink>
                                            </Typography>
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">
                                                <NavLink to='product' className={({ isActive }) => isActive ? "link-activeMobile " : "link-inactiveMobile "}  >Product</NavLink>
                                            </Typography>
                                        </MenuItem>

                                    </Menu>
                                </Box>
                            }

                            <StoreIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                            <Typography
                                variant="h5"
                                noWrap

                                sx={{
                                    mr: 2,
                                    display: { xs: 'flex', md: 'none' },
                                    flexGrow: 1,
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.2rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                <NavLink to='/home' className='text-decoration-none text-white'>
                                    <span>E-commerce</span>
                                </NavLink>
                            </Typography>
                            {

                                isLoggedIn &&
                                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        <NavLink to='category' className={({ isActive }) => isActive ? "link-activeWeb " : "link-inactiveWeb "}  >Category</NavLink>
                                        <NavLink to='subCategory' className={({ isActive }) => isActive ? "link-activeWeb " : "link-inactiveWeb "}  >subCategory</NavLink>
                                        <NavLink to='brand' className={({ isActive }) => isActive ? "link-activeWeb " : "link-inactiveWeb "}  >brand</NavLink>
                                        <NavLink to='product' className={({ isActive }) => isActive ? "link-activeWeb " : "link-inactiveWeb "}  >product</NavLink>

                                    </Button>

                                </Box>
                            }
                            {isLoggedIn &&
                                <Box sx={{ flexGrow: 0 }}>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar alt="Remy Sharp" src={user.profilePicture} />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >

                                        <MenuItem onClick={handleCloseUserMenu} className='d-flex'>
                                            <Typography textAlign="start">
                                                <span className=' d-flex align-items-center justify-content-between'>

                                                    <NavLink to='profile' className={({ isActive }) => isActive ? "link-activeMobile " : "link-inactiveMobile  "}  >Profile </NavLink>
                                                    < Person2OutlinedIcon className='mt-1' />
                                                </span>

                                                <span className=' d-flex align-items-center justify-content-between'>

                                                    <NavLink to='myorder' className={({ isActive }) => isActive ? "link-activeMobile " : "link-inactiveMobile "}  >My Order </NavLink>
                                                    <BorderColorOutlinedIcon className='mt-1' />
                                                </span>

                                                <span className='d-flex align-items-center justify-content-between'>

                                                    <NavLink to='notification' className={({ isActive }) => isActive ? "link-activeMobile " : "link-inactiveMobile "}  >Notification </NavLink>
                                                    <NotificationsNoneOutlinedIcon className=' mt-1' />
                                                </span>
                                                <span className='d-flex align-items-center justify-content-between ' onClick={handleLogout}>

                                                    <NavLink className='  text-decoration-none text-danger'>logOut </NavLink>
                                                    <LogoutOutlinedIcon className=' mt-1 text-danger' />
                                                </span>
                                            </Typography >
                                        </MenuItem>

                                    </Menu>

                                </Box>
                            }
                            {!isLoggedIn && <NavLink to='login' className='text-decoration-none text-white fw-bold me-2   m-auto ' >Login</NavLink>
                            }
                        </Toolbar>
                    </Container>
                </AppBar>
            }



        </div>
    )
}
