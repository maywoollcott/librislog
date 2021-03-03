import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';
import { useContext, useEffect, useState }from 'react'
import { Context } from '../Context'

const Navbar = () => {

  const value = useContext(Context);

  const checkState = () => {
    console.log(`Library is ${value.library}`)
    console.log(value.isAuthenticated)
  }
  return (
    <nav className="navbar">
      <img src={logo} alt=""/>
      <ul className="navlinks">
        <li><Link to="/current" className="textlink">Current</Link></li>
        <li><Link to="/library" className="textlink">Library</Link></li>
        <li><Link to="/toread" className="textlink">Discover</Link></li>
        <li><Link to="/vocab" className="textlink">Vocab</Link></li>
        <li><Link to="/stats" className="textlink">Stats</Link></li>
        <button onClick={checkState}>Check State</button>
      </ul>
    </nav>
  )
}

export default Navbar
