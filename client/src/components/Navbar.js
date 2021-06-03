import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const Navbar = () => {

  const auth = useContext(AuthContext)
  const history = useHistory()
  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }

  return (
    <nav>
      <div className="nav-wrapper">
        <a href="/" className="brand-logo">short link</a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to="/create">create</NavLink></li>
          <li><NavLink to="/links">links</NavLink></li>
          <li><a href="/" onClick={logoutHandler}>logout</a></li>
        </ul>
      </div>
    </nav>
  )
}