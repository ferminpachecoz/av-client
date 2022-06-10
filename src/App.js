import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Pages/Home';
import Admin from './components/Pages/Admin';
import Register from './components/Pages/Register';
import Login from './components/Pages/Login';
import { useState, useEffect } from 'react';

function App() {

  let user;

  if(sessionStorage.getItem('email')){
    user = sessionStorage.getItem('email')
  }
  console.log(sessionStorage);

  return (
    <Routes>
      {user &&
        <>
          <Route path='/' element={<Home />} />
          <Route path='/admin' element={<Admin />} />
        </>
      }
      {!user &&
        <>
          <Route path='/' element={<Register />}/>
          <Route path='/login' element={<Login />} />
        </>
      }
    </Routes>
  );
}

export default App;
