import React, { useEffect, useContext, useState } from 'react';
// import axios from 'axios';
import { Link, Redirect, useHistory  } from 'react-router-dom';
import { Context } from '../Context'
import apiService from '../utils/apiService'




const Landing = () => {

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const { username, password } = formData;

  const handleDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const value = useContext(Context);
  const history = useHistory();


  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await apiService.login(username, password);
    const { accessToken } = res.data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('haveValidToken', true)
    value.setIsAuthenticated(true);
    history.push('/current')
    

  }


  return (
    <div className="landingdashboard">
      <h1>Let's get reading!</h1>
      <h2>Sign in below.</h2>
      <form className="form" onSubmit={onSubmit} >
        <div className="formBox">
          <input type="string" placeholder="Username" name="username" value={ username } onChange={handleDataChange} required/>
        </div>
        <div className="formBox">
          <input type="password" placeholder="Password" name="password" minLength="6" value={ password } onChange={handleDataChange} required/>
        </div>
        <button className="loginbtn" type="submit">Log In</button>
      </form>
      <h3>Don't have an account yet? Click <Link to="/register" className="textlink">here</Link> to register.</h3>
    </div>
  )
}

export default Landing
