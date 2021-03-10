import { Link, useHistory } from 'react-router-dom';
import logo from '../img/logo.png';
import { useContext, useEffect }from 'react'
import { Context } from '../Context'

const Navbar = () => {

  const value = useContext(Context);
  const history = useHistory();

  useEffect ( () => {
    const haveValidToken = JSON.parse(localStorage.getItem('haveValidToken'))
    haveValidToken ? value.setIsAuthenticated(true) : value.setIsAuthenticated(false)
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    localStorage.clear();
    value.setIsAuthenticated(false);
    history.push('/')
  }
  return (
    <nav className="navbar">
      <img src={logo} alt=""/>
      <ul className="navlinks">
        {value.isAuthenticated && 
          <>
            <li><Link to="/current" className="textlink">Current</Link></li>
            <li><Link to="/library" className="textlink">Library</Link></li>
            <li><Link to="/stats" className="textlink">Stats</Link></li>
            <li><Link to="/addbook" className="textlink">Add Book</Link></li>
            <button className="navbtn" onClick={logout}>Logout</button>
          </>
        }
        {!value.isAuthenticated && <li><Link to="/" className="textlink">Log In</Link></li>}
        {!value.isAuthenticated && <li><Link to="/register" className="textlink">Register</Link></li>}
      </ul>
    </nav>
  )
}

export default Navbar
