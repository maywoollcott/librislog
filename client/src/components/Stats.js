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
    <div className="statscard">
      <h1>STATS</h1>
      <h2>Reading sessions: {totalReadingSessions}</h2>
      <h2>Minutes read: {totalReadingTime}</h2>
      <h2>Pages read: {totalPagesRead}</h2>
      <h2>Books finished: {totalBooksFinished}</h2>
      <h2>Average reading pace: {Math.round(totalPagesRead/totalReadingTime*60)} pages per hour</h2>
      <h2>Longest reading session: {Math.max(...value.sessions.map(session => session.minutes), 0)} minutes</h2>
      <h2>Streak: {value.streak}</h2>
    </div>
  )
}

export default Stats
