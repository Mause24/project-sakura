import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext'
import Home from '../../views/Home';
import Login from '../../views/Login';
import Register from '../../views/Register';
import Admin from '../../views/Admin';
import Header from '../Header'
import { useEffect } from 'react';

const AppLayout = () => {

  const localstorage = window.localStorage

  const { auth, setAuth } = useAuthContext();


  useEffect(() => {
    setAuth(localstorage.getItem('auth'))
  }, [])


  return (
    <>
      {/* HEADER */}
      <Header />
      {/* MAIN */}
      <Routes>

        {
          auth !== '' ?
            <>
              <Route path={'/'} element={<Home />} />
              <Route path={'/about'} element={<div>About</div>} />
              <Route path={'/admin'} element={<Admin />} />
            </>
            :
            <>
              <Route path={'/'} element={<Login />} />
              <Route path={'/register'} element={<Register />} />
            </>
        }
        <Route path={'/*'} element={<div>404 NOT FOUND</div>} />
      </Routes>
      {/* FOOTER */}

    </>
  )
}

export default AppLayout