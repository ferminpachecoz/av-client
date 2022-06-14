import React from 'react';
import './Register.css';
import { useState, useEffect } from 'react';

export default function Login() {
  const [input, setInput] = useState({});
  const [user, setUser] = useState({});

  const setting = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setInput(values => ({...values, [name]: value}))
  }

  const handleSubmit = e =>{
    e.preventDefault();

    const reqData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input),
      mode: "cors",

    }
    fetch('/users/login', reqData)
      .then(res => res.json())
      .then(a => setUser(a))
      .catch(err => console.error(err))
  }
  useEffect(() =>{
    if(user && user.email && user.password){
      sessionStorage.setItem('email', user.email);
      sessionStorage.setItem('name', user.name);
      sessionStorage.setItem('lastname', user.lastname)
      if(user.role){
        sessionStorage.setItem('admin', "true")
      }else{
        sessionStorage.setItem('admin', "false")
      }
      window.location.replace('/')
    }
  }, [user])

  return (
    <div className='container-fluid body-register'>
      <div className='row justify-content-center align-items-center'>
        <div className='col-4 mt-4 border border-secondary px-5 py-3 rounded form-container'>
          <div className='logo-register'></div>
          <form className='form-register' onSubmit={e => handleSubmit(e)}>
            <div className='row g-4'>
              <div className='col-12 input-group'>
                <span className='input-group-text'><i className="bi bi-envelope-check"></i></span>
                <input type="email" placeholder='Email' className={`form-control ${user.msg?'is-invalid':''}`} name='email' onChange={e => setting(e)}/>
              </div>
              <div className='col-12 input-group mb-3'>
                <span className='input-group-text'><i className="bi bi-shield-lock"></i></span>
                <input type="password" placeholder='Contraseña' className={`form-control ${user.msg?'is-invalid':''}`} name='password' onChange={e => setting(e)}/>
                {user.msg &&
                    <div className='invalid-feedback'>
                      {user.msg}
                    </div>
                }
              </div>
              <div className='d-flex justify-content-center align-items-center'>
                <button className='btn btn-info btn-lg col-12'>Iniciar Sesión</button>
              </div>
            </div>
          </form>
          <div className=' my-2'>
            <div>
              <p className='register-text'>Don´t have an account? <a href="/" className='link-secondary'>Register</a></p>
            </div>
            <div className='row'>
              <div className='col'>
                <a href="/nada" className='link-secondary'>Forgot my password</a>
              </div>
              <div className="form-check col">
                <label className="form-check-label text-white" htmlFor="flexCheckDefault">Remember me</label>
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
