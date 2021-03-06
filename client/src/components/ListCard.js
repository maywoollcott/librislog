import { useContext }from 'react'
import { Context } from '../Context'
import apiService from '../utils/apiService'
import { AiFillStar } from 'react-icons/ai'
import { useHistory } from 'react-router-dom';

const ListCard = (props) => {
  const value = useContext(Context)
  
  const history = useHistory();

  let status = '';

  if(props.status === 'wantToRead') {
    status = 'Want to read'
  } else if (props.status === 'currentlyReading') {
    status = 'Currently reading'
  }

  const deleteHandler = async () => {
    const newLib = ([...value.library]);
    let index = newLib.findIndex(book => {
      return book.id === props.id
    })
    newLib.splice(index, 1);
    value.setLibrary(newLib);

    const accessToken = localStorage.getItem('accessToken');
    const res = await apiService.updateLibrary(newLib, accessToken)
    console.log(res.data)
  }

  const checkStatsHandler = () => {
    history.push({
      pathname: '/bookstats',
      bookData: {
        id: props.id
      }
    })
  }

  return (
    <div className="booklist">
      <div className="smallcardinfo">
        <h3>{props.title}</h3>
        {props.status !== undefined &&
            <div>
              {props.status !== 'finished'  &&           
                <div className="statusInfo">{status}...</div>
              }
            </div>
        }
        <img src={props.imageURL} alt=""/>
        <div className="authorInfo">{props.author}</div>
        {props.rating &&           
        <div className="rating">          
          {[...Array(props.rating)].map((e, index) => {
            return <AiFillStar key={index} />
          })}
        </div>
        }
        <button className="loginbtn" onClick={deleteHandler}>Remove</button>
        {!props.dontShowButton &&
          <button className="loginbtn" onClick={checkStatsHandler}>Check stats</button>
        }
      </div>
    </div>
  )
}

export default ListCard
