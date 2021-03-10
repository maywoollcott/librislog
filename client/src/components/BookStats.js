import React from 'react'
import { useLocation } from "react-router-dom";
import { useContext, useState }from 'react'
import { Context } from '../Context'
import moment from 'moment'

const BookStats = (props) => {

  const location = useLocation();
  const value = useContext(Context);

  const lib = [...value.library]
  const bookIndex = lib.findIndex(book => {
    return book.id === location.bookData?.id
  })

  const sessions = [...value.sessions];
  const bookSessions = sessions.filter(sesh => sesh.bookID === location.bookData?.id)

  const totalReadingSessions = bookSessions.length;
  const totalReadingTime = bookSessions.reduce((acc, curr) => acc + curr.minutes, 0)
  const averageSessionsLength = Math.round(totalReadingTime / totalReadingSessions);
  const totalPagesRead = bookSessions.reduce((acc, curr) => acc + curr.pagesRead, 0);
  const averageReadingPace = Math.round(totalPagesRead / totalReadingTime * 60)

  return (
    <div className="bookStats">
      <div className="statsheading">
        <div className="circleheading">
          <h1>{lib[bookIndex].title}</h1>
          <h3>{lib[bookIndex].author}</h3>
          <p>STARTED: {moment(lib[bookIndex].dateStarted).format('MMMM Do YYYY')}</p>
          <p>FINISHED: {lib[bookIndex].dateFinished ? moment(lib[bookIndex].dateFinished).format('MMMM Do YYYY') : 'Not finished yet!'}</p>
        </div>
      </div>
      <div>
      <div className="statscontainer">
        <div className="stats">
          <div className="circle">
            <h2>{totalReadingSessions}</h2>
          </div>
          <h3>READING SESSIONS</h3>
        </div>
        <div className="stats">
          <div className="circle">
            <h2>{totalReadingTime}</h2>
          </div>
          <h3>MINUTES READ</h3>
        </div>
        <div className="stats">
          <div className="circle">
            <h2>{averageReadingPace}</h2>
          </div>
          <h3>AVERAGE READING PACE</h3>
          <p>(pages per hour)</p>
        </div>
        <div className="stats">
          <div className="circle">
            <h2>{averageSessionsLength}</h2>
          </div>
          <h3>AVERAGE SESSION LENGTH</h3>
          <p>(in minutes)</p>
        </div>
        <div className="stats">
          <div className="circle">
            <h2>{Math.max(...bookSessions.map(session => session.minutes), 0)}</h2>
          </div>
          <h3>LONGEST READING SESSION</h3>
          <p>(in minutes)</p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default BookStats
