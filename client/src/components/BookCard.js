
import React from 'react'
import { useContext, useEffect }from 'react'
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

  return (
    <div className={props.active ? "panel active" : "panel"} onClick={clickActiveHandler}>
      <div className="bookinfo">
        <h1>{props.title}</h1>
        <h2>{props.author}</h2>
        <h2>{props.yearPublished}</h2>
        <button onClick={imFinishedHandler}>I'm finished!</button>
      </div>
    </div>
  )
}

export default BookCard
