import React from 'react'
import { useContext, useEffect }from 'react'
import { Context } from '../Context'
import apiService from '../utils/apiService'

const ListCard = (props) => {
  const value = useContext(Context)
  const index = props.index;



  const deleteHandler = async () => {
    const newLib = ([...value.library]);
    newLib.splice(index, 1);
    value.setLibrary(newLib);

    const accessToken = localStorage.getItem('accessToken');
    const res = await apiService.updateLibrary(newLib, accessToken)
    console.log(res.data)
  }

  return (
    <div className="booklist">
      <div className="smallcardinfo">
        <h1>{props.title}</h1>
        <h2>{props.author}</h2>
        <h2>{props.yearPublished}</h2>
        <button onClick={deleteHandler}>Delete Book Entirely</button>
      </div>
    </div>
  )
}

export default ListCard
