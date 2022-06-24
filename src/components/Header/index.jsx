import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../styles/Headers.css'
import { Android } from '@mui/icons-material';
import { useAuthContext } from '../../contexts/AuthContext';

const Header = () => {

    const { auth, setAuth } = useAuthContext();
    const navigate = useNavigate()
    const localstorage = window.localStorage

    const endSession = () => {
        localstorage.setItem('auth', '')
        setAuth('')
        navigate('/', { replace: true })
    }

    return (
        <header>
            {/* LOGO */}
            <div className='header__logo'>
                <Android id='logo__img' />
                <h1>Sakura</h1>
            </div>

            {/* MENU */}
            <div className='header__separator'></div>
            <nav>
                <ul>
                    {
                        auth === '' ?
                            <>
                                <Link to={"/"} ><li>Login</li></Link>
                                <Link to={"/Register"}><li>Register</li></Link>
                            </>
                            :
                            <>
                                <Link to={"/"}><li> home</li></Link>
                                <Link to={"/admin"}><li>Admin</li></Link>
                                <Link to={"/about"}><li>About</li></Link>
                                <li onClick={endSession}>log-out</li>
                            </>
                    }
                </ul>
            </nav>
        </header>
    )
}

export default Header