
import React from 'react'
import { useContext, useState }from 'react'
import { Context } from '../Context'
import apiService from '../utils/apiService'
import moment from 'moment'

const BookCard = (props) => {

  const value = useContext(Context)

  const clickActiveHandler = () => {
    props.updateActive(props.index)
  };

  const imFinishedHandler = async () => {
    const newLib = ([...value.library]);
    let index = newLib.findIndex(book => {
      return book.id === props.id
    })
    newLib[index].status = 'finished'
    value.setLibrary(newLib);

    const accessToken = localStorage.getItem('accessToken');
    const res = await apiService.updateLibrary(newLib, accessToken)
    console.log(res.data)
  }

  const updateProgressHandler = async () => {
    setPageDisplay('updateProgress')
  }



  const [currentPageData, setCurrentPageData] = useState({
    currentPage: '',
  });

  const [pageDisplay, setPageDisplay] = useState('default');


  const { currentPage } = currentPageData;

  const handleDataChange = (e) => {
    setCurrentPageData({ ...currentPageData, [e.target.name]: e.target.value });
    console.log(currentPageData)
  }

  const [sessionData, setSessionData] = useState({
    bookId: '',
    startingPage: '',
    endingPage: '',
    pagesRead: '',
    minutes: '',
    date: ''
  });

  const startSessionHandler = async () => {
    let newSession = {...sessionData};
    newSession.bookId = props.id;
    newSession.startingPage = props.currentPage;
    newSession.date = moment().format();
    setSessionData(newSession);
    setPageDisplay('startSession')
    console.log(sessionData)
  }

  const { endingPage } = sessionData;
  
  const handleSessionDataChange = (e) => {
    setSessionData({ ...sessionData, [e.target.name]: e.target.value });
    console.log(sessionData)
  }


  const updateBookHandler = async (e) => {
    e.preventDefault();
    const newLib = ([...value.library]);
    let index = newLib.findIndex(book => {
      return book.id === props.id
    })
    newLib[index].currentPage = currentPageData.currentPage
    value.setLibrary(newLib);

    const accessToken = localStorage.getItem('accessToken');
    const res = await apiService.updateLibrary(newLib, accessToken)
    console.log(res.data)
    setPageDisplay('default')
  }

  const updateBookSessionHandler = async (e) => {
    e.preventDefault();
    let newSession = {...sessionData};
    newSession.pagesRead = sessionData.endingPage - sessionData.startingPage;
    let startTime = moment(sessionData.date);
    let finishTime = moment();
    newSession.minutes = finishTime.diff(startTime, 'minutes')
    console.log(newSession)

    const updatedSessions = ([...value.sessions]);
    updatedSessions.unshift(newSession);
    value.setSessions(updatedSessions);

    const updatedLib = ([...value.library]);
    let index = updatedLib.findIndex(book => {
      return book.id === props.id
    })
    updatedLib[index].currentPage = sessionData.endingPage;
    value.setLibrary(updatedLib);

    const accessToken = localStorage.getItem('accessToken');
    const res2 = await apiService.updateLibrary(updatedLib, accessToken)
    const res = await apiService.updateSessions(updatedSessions, accessToken)
    console.log(value.sessions)
    console.log(res.data)
    console.log(res2.data)
    setPageDisplay('default')
  }




  return (
    <div className={props.active ? "panel active" : "panel"} onClick={clickActiveHandler}>
      <div className="bookinfo">
        <h1>{props.title}</h1>
        <img src={props.imageURL} alt=""/>
        <h2>{props.author}</h2>
        {pageDisplay === 'default' &&        
          <h2>Currently at page {props.currentPage} with {props.pages - props.currentPage} left to go!</h2>
        }
        {pageDisplay === 'default' && props.active &&
          <button className="loginbtn" onClick={updateProgressHandler}>Log Progress</button>
        }
        {pageDisplay === 'updateProgress' &&
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
        {pageDisplay === 'startSession' &&
          <div className="verticalflextext">
              <div>Session started at: {sessionData.date}</div>
            <div>Starting page: {sessionData.startingPage} </div>
            <form className="addbookform" onSubmit={updateBookSessionHandler} >
              <div className="formBox">
                <h3>I made it to page: </h3>
                <input type="text" name="endingPage" value={ endingPage } onChange={handleSessionDataChange} required/>
              </div>
              <button className="loginbtn" type="submit">End Session</button>
            </form>
          </div>
        } 
        {pageDisplay === 'default' && props.active &&     
        <button className="loginbtn"onClick={startSessionHandler}> Start Timed Reading Session</button>
        }
        {pageDisplay === 'default' && props.active &&     
        <button className="loginbtn"onClick={imFinishedHandler}> I'm finished!</button>
        }
      </div>
      <div className="spineinfo">
        <h1>{props.title}</h1>
      </div>
    </div>
  )
}

export default BookCard
