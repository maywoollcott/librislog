import { useHistory } from 'react-router-dom';
import { Context } from '../Context'
import React, { Fragment, useState, useContext } from 'react';
import apiService from '../utils/apiService'

const AddBook = () => {
  const value = useContext(Context);
  const history = useHistory();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    yearPublished: '',
    pages: '',
    status: ''

  });

  const { title, author, yearPublished, pages, status } = formData;

  const handleDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const newBook = formData;
    let currentLibrary = [...value.library];
    currentLibrary.unshift(newBook);
    value.setLibrary(currentLibrary);

    const accessToken = localStorage.getItem('accessToken');
    const res = await apiService.updateLibrary(currentLibrary, accessToken)
    console.log(res.data)

    history.push('/library')

    console.log(newBook)
  }


  return (
    <div>
      <h1>Add book here!</h1>
      <div className="addbookcard">
        <form className="addbookform" onSubmit={onSubmit} >
          <div className="formBox">
            <h3>TITLE: </h3>
            <input type="text" name="title" value={ title } onChange={handleDataChange} required/>
          </div>
          <div className="formBox">
            <h3>AUTHOR: </h3>
            <input type="author" name="author" value={ author } onChange={handleDataChange} required/>
          </div>
          <div className="formBox">
            <h3>YEAR PUBLISHED: </h3>
            <input type="yearPublished" name="yearPublished" value={ yearPublished } onChange={handleDataChange} required/>
          </div>
          <div className="formBox">
            <h3>PAGES: </h3>
            <input type="pages" name="pages" value={ pages } onChange={handleDataChange} required/>
          </div>
          <div className="radio">
            <div className="radioitem">
              <input type="radio" name="status" value='currentlyReading' onChange={handleDataChange} required/>
              <h3>CURRENTLY READING</h3>
            </div>
            <div className="radioitem">
              <input type="radio" name="status" value='wantToRead' onChange={handleDataChange} required/>
              <h3>WANT TO READ</h3>
            </div>
            <div className="radioitem">
              <input type="radio" name="status" value='finished' onChange={handleDataChange} required/>
              <h3>FINISHED</h3>
            </div>
          </div>
          <button className="loginbtn" type="submit">Add Book</button>
        </form>
      </div>
    </div>
  )
}

export default AddBook
