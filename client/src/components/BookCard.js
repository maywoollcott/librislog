
import React from 'react'
import { useContext, useState }from 'react'
import { Context } from '../Context'
import apiService from '../utils/apiService'
import moment from 'moment'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { useHistory } from 'react-router-dom';

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
    bookID: '',
    startingPage: '',
    endingPage: '',
    pagesRead: '',
    minutes: '',
    date: ''
  });

  const startSessionHandler = async () => {
    let newSession = {...sessionData};
    newSession.bookID = props.id;
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

    let lastSessionDate = null;
    if (value.sessions.length > 0) {
      lastSessionDate = value.sessions[0].date;
    };
    let lastSessionDateFormatted = moment(lastSessionDate).format('MMM Do YY');
    let currentSessionDateFormatted = moment(finishTime).format('MMM Do YY')
    let yesterday = moment().subtract(1, 'day').format('MMM Do YY')

    const accessToken = localStorage.getItem('accessToken');

    let newStreak = {
      newStreak: value.streak
    };

    if (currentSessionDateFormatted === lastSessionDateFormatted) {
      console.log('Same day, streak will stay the same.')
    } else if (lastSessionDateFormatted === yesterday || value.sessions.length === 0) {
      newStreak.newStreak ++;
      console.log('string will increment')
      console.log(newStreak)
      value.setStreak(newStreak.newStreak)
      const res = await apiService.updateStreak(newStreak, accessToken)
      console.log(res)
    } else {
      newStreak.newStreak = 1;
      console.log('string will be one')
      console.log(newStreak)
      value.setStreak(newStreak.newStreak);
      const res = await apiService.updateStreak(newStreak, accessToken)
      console.log(res)
    }


    const updatedSessions = ([...value.sessions]);
    updatedSessions.unshift(newSession);
    value.setSessions(updatedSessions);

    const updatedLib = ([...value.library]);
    let index = updatedLib.findIndex(book => {
      return book.id === props.id
    })
    updatedLib[index].currentPage = sessionData.endingPage;
    value.setLibrary(updatedLib);

    await apiService.updateLibrary(updatedLib, accessToken)
    await apiService.updateSessions(updatedSessions, accessToken)

    setSessionPageDisplay('default')
    setPageDisplay('default')
  }

  const bookSessions = value.sessions.filter(session => session.bookID === props.id);

  let total = bookSessions.reduce((acc, curr) => acc + curr.minutes, 0);

  const [sessionPageDisplay, setSessionPageDisplay] = useState('default');

  const endSession = () => {
    setSessionPageDisplay('endSession')
  }

  const showStars = () => {
    setSessionPageDisplay('showStars')
  }

  const [volumeFormData, setVolumeFormData] = useState({
    rating: ''
  });

  const history = useHistory();

  const finishInSession = async () => {

    let newSession = {...sessionData};
    newSession.pagesRead = props.pages - sessionData.startingPage;
    let startTime = moment(sessionData.date);
    let finishTime = moment();
    newSession.minutes = finishTime.diff(startTime, 'minutes')

    let lastSessionDate = null;
    if (value.sessions.length > 0) {
      lastSessionDate = value.sessions[0].date;
    };
    let lastSessionDateFormatted = moment(lastSessionDate).format('MMM Do YY');
    let currentSessionDateFormatted = moment(finishTime).format('MMM Do YY')
    let yesterday = moment().subtract(1, 'day').format('MMM Do YY')

    const accessToken = localStorage.getItem('accessToken');

    let newStreak = {
      newStreak: value.streak
    };

    if (currentSessionDateFormatted === lastSessionDateFormatted) {
      console.log('Same day, streak will stay the same.')
    } else if (lastSessionDateFormatted === yesterday || value.sessions.length === 0) {
      newStreak.newStreak ++;
      value.setStreak(newStreak.newStreak)
      const res = await apiService.updateStreak(newStreak, accessToken)
      console.log(res)
    } else {
      newStreak.newStreak = 1;
      value.setStreak(newStreak.newStreak);
      const res = await apiService.updateStreak(newStreak, accessToken)
      console.log(res)
    }

    const updatedSessions = ([...value.sessions]);
    updatedSessions.unshift(newSession);
    value.setSessions(updatedSessions);

    const newLib = ([...value.library]);
    let index = newLib.findIndex(book => {
      return book.id === props.id
    })

    newLib[index].status = 'finished'
    newLib[index].currentPage = props.pages
    newLib[index].dateFinished = moment()
    newLib[index].rating = volumeFormData.rating
    value.setLibrary(newLib);

    await apiService.updateLibrary(newLib, accessToken)
    await apiService.updateSessions(updatedSessions, accessToken)

    setSessionPageDisplay('default')
    setPageDisplay('default')

    history.push({
      pathname: '/bookstats',
      bookData: {
        id: props.id,
        name: 'may'
      }

    })
  }

  const [stars, setStars] = useState([false, false, false, false, false]);

  const changeRating = (index) => {
    let newRating = index + 1
    console.log(newRating);
    let newStar = updateLowerStars(index);
    console.log(newStar)
    setStars(newStar);

    setVolumeFormData({ ...volumeFormData, rating : newRating })
  }

  const updateLowerStars = (index) => {
    let starsCopy = [...stars]
    for (let i = index; i >= 0; i--) {
      starsCopy[i] = true
    }
    for (let i = index + 1; i <= 4; i++) {
      starsCopy[i] = false
    }
    return starsCopy;
  }

  return (
    <div className={props.active ? "panel active" : "panel"} onClick={clickActiveHandler}>
      <div className="bookinfo">
        <h1>{props.title}</h1>
        <h2>{props.author}</h2>
        <img src={props.imageURL} alt=""/>
        {pageDisplay === 'default' &&  
          <> 
            <h2>Currently at page {props.currentPage} with {props.pages - props.currentPage} left to go!</h2>
            <h2>Reading sessions: {bookSessions.length}</h2>
            <h2>Total minutes: {total}</h2>
          </>
        }
        {pageDisplay === 'default' && props.active &&
          <button className="loginbtn" onClick={updateProgressHandler}>Log Progress</button>
        }
        {pageDisplay === 'updateProgress' &&
          <div className="verticalflextext">
            <form className="addbookform" onSubmit={updateBookHandler} >
              <div className="formBox">
                <h3>I'm currently at page: </h3>
                <input type="text" name="currentPage"  onChange={handleDataChange} required/>
              </div>
              <button className="loginbtn" type="submit">Submit</button>
            </form>
          </div>
        } 
        {pageDisplay === 'startSession' &&
          <div className="verticalflextext">
              <div>Session started at: {moment(sessionData.date).format('LT')}</div>
            <div>Starting page: {sessionData.startingPage} </div>
            {sessionPageDisplay === 'default' &&
                <>                 
                  <button className="loginbtn" onClick={endSession}>End session</button>
                  <button className="loginbtn" onClick={showStars}>Finished the book!</button>
                </>
            }
            {sessionPageDisplay === 'endSession' &&
                <>                 
                  <form className="addbookform" onSubmit={updateBookSessionHandler} >
                    <div className="formBox">
                      <h3>I made it to page: </h3>
                      <input type="text" name="endingPage" onChange={handleSessionDataChange} required/>
                      <button className="loginbtn" type="submit">Submit</button>
                    </div>
                  </form>
                </>
            }
            {sessionPageDisplay === 'showStars' &&
              <>               
                <div className="starscontainer">
                  <h3>RATING:</h3>
                  {stars.map((star, index) => {
                    return star ? <AiFillStar onClick={() => changeRating(index)}/> : <AiOutlineStar onClick={() => changeRating(index)} key={index}/>
                  })}
                </div>
                <button className="loginbtn" onClick={finishInSession}>Submit</button>
              </>
            }
            
          </div>
        } 
        {pageDisplay === 'default' && props.active &&     
        <button className="loginbtn"onClick={startSessionHandler}> Start Session</button>
        }
        {/* {pageDisplay === 'default' && props.active &&     
        <button className="loginbtn"onClick={imFinishedHandler}> I'm finished!</button>
        } */}
      </div>
      {!props.active &&      
        <div className="spineinfo">
          <h1>{props.title}</h1>
        </div>
      }
    </div>
  )
}

export default BookCard
