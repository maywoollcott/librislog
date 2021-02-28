import axios from 'axios';
import React, { Fragment, useState } from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';


const Registration = () => {

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    password2: '',
    email: '',
    readingGoal: '',
  });

  const { username, password, password2, email, readingGoal } = formData;

  const handleDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); //for some reason we're copying the formData using spread operater? then name is the name value in the input
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log('Passwords must match.')
    } else {
      axios.post('http://localhost:5000/', {
        username,
        password,
        password2,
        email,
        readingGoal
      })
      .then(res => {
        console.log(res)
      })
    }
  }

  return (
    <div className="landingdashboard">
      <h1>Let's get reading!</h1>
      <h2>Register here to get started.</h2>
      <form className="form" onSubmit={onSubmit} >
        <div className="formBox">
          <h3>USERNAME: </h3>
          <input type="text" name="username" value={ username } onChange={handleDataChange} required/>
        </div>
        <div className="formBox">
          <h3>PASSWORD: </h3>
          <input type="password" name="password" minLength="6" value={ password } onChange={handleDataChange} required/>
        </div>
        <div className="formBox">
          <h3>RE-ENTER YOUR PASSWORD: </h3>
          <input type="password" name="password2" minLength="6" value={ password2 } onChange={handleDataChange} required/>
        </div>
        <div className="formBox">
          <h3>EMAIL: </h3>
          <input type="email" name="email" minLength="6" value={ email } onChange={handleDataChange} required/>
        </div>
        <button className="loginbtn" type="submit">Register</button>
      </form>
    </div>
  )
}

export default Registration
