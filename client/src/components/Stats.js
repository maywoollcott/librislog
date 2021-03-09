import React from 'react'
import { useContext }from 'react'
import { Context } from '../Context'

const Stats = () => {

  const value = useContext(Context);

  const totalReadingSessions = value.sessions.length;
  const totalReadingTime = value.sessions.reduce((acc, curr) => acc + curr.minutes, 0);
  const totalPagesRead = value.sessions.reduce((acc, curr) => acc + curr.pagesRead, 0);
  const totalBooksFinished = value.library.filter(book => book.status === 'finished').length;


  return (
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
            <h2>{totalPagesRead}</h2>
          </div>
          <h3>PAGES READ</h3>
        </div>
        {/* <div className="stats">
          <div className="circle">
            <h2>{totalBooksFinished}</h2>
          </div>
          <h3>BOOKS FINISHED</h3>
        </div> */}
        <div className="stats">
          <div className="circle">
            <h2>{Math.round(totalPagesRead/totalReadingTime*60)}</h2>
          </div>
          <h3>AVERAGE READING PACE</h3>
          <p>(pages read per hour)</p>
        </div>
        <div className="stats">
          <div className="circle">
            <h2>{value.streak}</h2>
          </div>
          <h3>CURRENT STREAK</h3>
          <p>(in days)</p>
        </div>
        <div className="stats">
          <div className="circle">
            <h2>{Math.max(...value.sessions.map(session => session.minutes), 0)}</h2>
          </div>
          <h3>LONGEST READING SESSION</h3>
          <p>(in minutes)</p>
        </div>
      </div>
      
    </div>
  )
}

export default Stats
