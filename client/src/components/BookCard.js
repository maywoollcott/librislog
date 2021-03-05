
import React from 'react'
import { useContext, useEffect, useState }from 'react'
import { Context } from '../Context'
import apiService from '../utils/apiService'

const BookCard = (props) => {

  const value = useContext(Context)
  const index = props.index

  const clickActiveHandler = () => {
    props.updateActive(props.index)
  };

  const imFinishedHandler = async () => {
    const newLib = ([...value.library]);
    let index = newLib.findIndex(book => {
      return book.title === props.title
    })
    newLib[index].status = 'finished'
    value.setLibrary(newLib);

    const accessToken = localStorage.getItem('accessToken');
    const res = await apiService.updateLibrary(newLib, accessToken)
    console.log(res.data)
  }

  const updateProgressHandler = async () => {
    setDisplayPageForm(true)
  }

  const [currentPageData, setCurrentPageData] = useState({
    currentPage: '',
  });

  const [displayPageForm, setDisplayPageForm] = useState(false);

  const { currentPage } = currentPageData;

  const handleDataChange = (e) => {
    setCurrentPageData({ ...currentPageData, [e.target.name]: e.target.value });
    console.log(currentPageData)
  }


  const updateBookHandler = async (e) => {
    e.preventDefault();
    const newLib = ([...value.library]);
    let index = newLib.findIndex(book => {
      return book.title === props.title
    })
    newLib[index].currentPage = currentPageData.currentPage
    value.setLibrary(newLib);

    const accessToken = localStorage.getItem('accessToken');
    const res = await apiService.updateLibrary(newLib, accessToken)
    console.log(res.data)
    setDisplayPageForm(false)
  }


  return (
    <div className={props.active ? "panel active" : "panel"} onClick={clickActiveHandler}>
      <div className="bookinfo">
        <h1>{props.title}</h1>
        <img src={props.imageURL} alt=""/>
        <h2>{props.author}</h2>
        <h2>Currently at page {props.currentPage} with {props.pages - props.currentPage} left to go!</h2>
        {!displayPageForm &&
          <button className="loginbtn"onClick={updateProgressHandler}>Update Progress</button>
        }
        {displayPageForm &&
          <div className="verticalflextext">
            <form className="addbookform" onSubmit={updateBookHandler} >
              <div className="formBox">
                <h3>I'm currently at page: </h3>
                <input type="text" name="currentPage" value={ currentPage } onChange={handleDataChange} required/>
              </div>
              <button className="loginbtn" type="submit">Submit</button>
            </form>
          </div>
        } 
        {!displayPageForm &&        
        <button className="loginbtn"onClick={imFinishedHandler}>I'm finished!</button>
        }
      </div>
    </div>
  )
}

export default BookCard
