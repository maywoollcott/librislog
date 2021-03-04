import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import logo from '../img/logo.png';
import { useContext, useEffect, useState }from 'react'
import { Context } from '../Context'

const Navbar = () => {

  const value = useContext(Context);
  const history = useHistory();


  useEffect ( () => {
    const haveValidToken = JSON.parse(localStorage.getItem('haveValidToken'))
    haveValidToken ? value.setIsAuthenticated(true) : value.setIsAuthenticated(false)
  }, []);

  const checkState = () => {
    console.log(`Library is ${value.library}`)
    console.log('isAuthenticated:' + value.isAuthenticated)
  };

  const logout = () => {
    localStorage.clear();
    value.setIsAuthenticated(false);
    history.push('/')
  }
  return (
    <nav className="navbar">
      <img src={logo} alt=""/>
      <ul className="navlinks">
        {value.isAuthenticated && <li><Link to="/current" className="textlink">Current</Link></li>}
        {value.isAuthenticated && <li><Link to="/library" className="textlink">Library</Link></li>}
        {value.isAuthenticated && <li><Link to="/toread" className="textlink">Discover</Link></li>}
        {value.isAuthenticated && <li><Link to="/vocab" className="textlink">Vocab</Link></li>}
        {value.isAuthenticated && <li><Link to="/stats" className="textlink">Stats</Link></li>}
        {value.isAuthenticated && <li><Link to="/addbook" className="textlink">Add Book</Link></li>}
        {!value.isAuthenticated && <li><Link to="/" className="textlink">Log In</Link></li>}
        {!value.isAuthenticated && <li><Link to="/register" className="textlink">Register</Link></li>}
        {value.isAuthenticated && <button className="navbtn" onClick={logout}>Logout</button>}
      </ul>
    </nav>
  )
}

export default Navbar
