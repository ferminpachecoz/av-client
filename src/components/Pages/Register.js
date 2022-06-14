import React from 'react';
import './Register.css';
import { useState, useEffect } from 'react';

export default function Register() {
  const [input, setInput] = useState({});
  const [user, setUser] = useState({});
  const [error, setError] = useState({});

  const setting = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setInput(values => ({...values, [name]: value}))
  }

  const handleSubmit = e =>{
    e.preventDefault();
    const reqData={
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input),
      mode: "cors"
    }
    fetch('/users/register', reqData)
      .then(res => res.json())
      .then(a => a.errors?setError(a.errors):setUser(a))
      .catch(err => console.error(err))
  }

  useEffect(()=>{
    if(user && user.email && user.password){
      sessionStorage.setItem('name', user.name)
      sessionStorage.setItem('lastname', user.lastname)
      sessionStorage.setItem('email', user.email)
      if(user.role){
        sessionStorage.setItem('admin', "true")
      }else{
        sessionStorage.setItem('admin', 'false')
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
                <span className='input-group-text'><i className="bi bi-person"></i></span>
                <input type="text" placeholder="Nombre" className={`form-control ${error.name?'is-invalid':''}`} name='name' onChange={e => setting(e)}/>
                {error.name &&
                  <div className='invalid-feedback'>
                    {error.name.msg}
                  </div>
                }
              </div>
              <div className='col-12 input-group'>
                <span className='input-group-text'><i className="bi bi-person-plus"></i></span>
                <input type="text" placeholder='Apellido' className={`form-control ${error.lastname?'is-invalid':''}`} name='lastname' onChange={e => setting(e)}/>
                {error.lastname &&
                  <div className='invalid-feedback'>
                    {error.lastname.msg}
                  </div>
                }
              </div>
              <div className='col-12 input-group'>
                <span className='input-group-text'><i className="bi bi-envelope-check"></i></span>
                <input type="email" placeholder='Email' className={`form-control ${error.email?'is-invalid':''}`} name='email' onChange={e => setting(e)}/>
                {error.email &&
                    <div className='invalid-feedback'>
                      {error.email.msg}
                    </div>
                }
              </div>
              <div className='col-12 input-group mb-3'>
                <span className='input-group-text'><i className="bi bi-shield-lock"></i></span>
                <input type="password" placeholder='Contraseña' className={`form-control ${error.password?'is-invalid':''}`} name='password' onChange={e => setting(e)}/>
                {error.password &&
                    <div className='invalid-feedback'>
                      {error.password.msg}
                    </div>
                }
              </div>
              <div className='d-flex justify-content-center align-items-center'>
                <button className='btn btn-info btn-lg col-12'>Registrarse</button>
              </div>
            </div>
          </form>
          <div className=' my-2'>
            <div>
              <p className='register-text'>Already have an account? <a href="/login" className='link-secondary'>Log in</a></p>
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
