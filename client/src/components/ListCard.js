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
        <h3>{props.title}</h3>
        <img src={props.imageURL} alt=""/>
        <h3>{props.author}</h3>
        <button className="loginbtn" onClick={deleteHandler}>Delete Book Entirely</button>
      </div>
    </div>
  )
}

export default ListCard
