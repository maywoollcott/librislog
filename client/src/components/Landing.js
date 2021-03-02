import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import { Context } from '../Context'



const Landing = () => {

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const { username, password } = formData;

  const handleDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); //for some reason we're copying the formData using spread operater? then name is the name value in the input
  }

  const value = useContext(Context);


  const onSubmit = async (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/auth', {
      username,
      password
    })
    .then(res => {
      console.log(res)
      value.setCurrentUser({
        token: res.data.accessToken,
        isAuthenticated: true,
        loading: false,
        user: res.data.id
      })
      console.log(value.currentUser)
    })
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
