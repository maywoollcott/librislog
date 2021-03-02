
import React from 'react'
import { useContext, useEffect }from 'react'
import { Context } from '../Context'

const BookCard = (props) => {

  const value = useContext(Context)
  const index = props.index

  const clickActiveHandler = () => {
    props.updateActive(props.index)
  };

  const deleteHandler = () => {
    const newLib = ([...value.library])
    newLib.splice(index, 1)
    value.setLibrary(newLib)
  }

  return (
    <div className={props.active ? "panel active" : "panel"} onClick={clickActiveHandler}>
      <div className="bookinfo">
        <h1>{props.title}</h1>
        <h2>{props.author}</h2>
        <h2>{props.yearPublished}</h2>
        <button onClick={deleteHandler}>Delete</button>
      </div>
    </div>
  )
}

export default BookCard
