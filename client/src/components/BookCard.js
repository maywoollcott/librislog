import React from 'react'

const BookCard = (props) => {

  const clickActiveHandler = () => {
    props.updateActive(props.index)
  };

  return (
    <div className={props.active ? "panel active" : "panel"} onClick={clickActiveHandler}>
      <div className="bookinfo">
        <h1>{props.title}</h1>
        <h2>{props.author}</h2>
        <h2>{props.yearPublished}</h2>
      </div>
    </div>
  )
}

export default BookCard
