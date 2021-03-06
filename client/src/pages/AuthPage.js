import React, { useContext, useEffect, useState } from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'


export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({
    email: '', password: ''
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try{
      const data = await request('/api/auth/register', 'POST', {...form})
      console.log('Data', data)
    } catch(e) {

    }
  }

  const loginHandler = async () => {
    try{
      const data = await request('/api/auth/login', 'POST', {...form})
      auth.login(data.token, data.userId)
    } catch(e) {

    }
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Сократи ссылку</h1>
        <div className="card blue darken-1">
        <div className="card-content white-text">
          <span className="card-title">Auth</span>
          <div>
            <div className="input-field">
              <input
                placeholder="Enter Email" 
                id="email" 
                type="text" 
                className="yellow-input" 
                name="email"
                onChange={changeHandler}
                value={form.email}
              />
              <label for="email">Email</label>
            </div>
            <div className="input-field">
              <input
                placeholder="Enter Password" 
                id="password" 
                type="password" 
                className="yellow-input"
                name="password"
                onChange={changeHandler}
                value={form.password}
              />
              <label for="email">Password</label>
            </div>
          </div>
        </div>
        <div className="card-action">
          <button 
            className="btn yellow darken-4" 
            style={{marginRight: 10}}
            disabled={loading}
            onClick={loginHandler}
          >
            sign in
          </button>
          <button 
            className="btn grey darken-4"
            onClick={registerHandler}
            disabled={loading}
          >
            sign up
          </button>
        </div>
      </div>
      </div>
    </div>
  )
}