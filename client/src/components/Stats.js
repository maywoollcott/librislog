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
      <h1>STATS</h1>
      <h1>Reading sessions: {totalReadingSessions}</h1>
      <h1>Minutes read: {totalReadingTime}</h1>
      <h1>Pages read: {totalPagesRead}</h1>
      <h1>Books finished: {totalBooksFinished}</h1>
      <h1>Average reading pace: {Math.round(totalPagesRead/totalReadingTime*60)} pages per hour</h1>
    </div>
  )
}

export default Stats
