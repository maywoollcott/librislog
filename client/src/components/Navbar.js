import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={logo} alt=""/>
      <ul className="navlinks">
        <li><Link to="/current" className="textlink">Current</Link></li>
        <li><Link to="/library" className="textlink">Library</Link></li>
        <li><Link to="/toread" className="textlink">Discover</Link></li>
        <li><Link to="/vocab" className="textlink">Vocab</Link></li>
        <li><Link to="/stats" className="textlink">Stats</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar
