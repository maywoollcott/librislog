import { useContext, useEffect, useState }from 'react'
import { Context } from '../Context'
import BookCard from './BookCard'
import AddBook from './AddBook'
import { useHistory } from 'react-router-dom';

const Dashboard = () => {

  const value = useContext(Context);
  const history = useHistory();
  
  const currentlyReading = value.library.filter(book => book.status === 'currentlyReading');

  const [active, setActive] = useState('');

  const updateActive = (index) => {
    setActive(index)
  };

  const addBook = () => {
    history.push('/addbook')
  }
  
  if (currentlyReading.length < 1) {
    return (
      <div className="dashboardcurrent">
        <h1>No books being currently read. :( Add one below:</h1>
        <button className="loginbtn" onClick={addBook}>Add Book</button>
      </div>
    )
  } else {
    return (
      <div className="dashboardcurrent">
        <h1>Currently Reading</h1>
        <div className="container">
            {currentlyReading.map((book, index) => {
              return <BookCard key={index} title={book.title} author={book.author} index={index} yearPublished={book.yearPublished} imageURL={book.imageURL}active={index === active ? true : false} updateActive={updateActive}/>
            })}
        </div>
  
      </div>
    )
  }
}

export default Dashboard
