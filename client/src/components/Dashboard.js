import { useContext, useEffect, useState }from 'react'
import { Context } from '../Context'
import BookCard from './BookCard'

const Dashboard = () => {

  const value = useContext(Context);
  const currentlyReading = value.library.filter(book => book.currentlyReading === true);

  const [active, setActive] = useState('');

  const updateActive = (index) => {
    setActive(index)
  };
  

  return (
    <div className="dashboard">
      <div className="container">
          {currentlyReading.map((book, index) => {
            return <BookCard key={index} title={book.title} author={book.author} index={index} yearPublished={book.yearPublished} active={index === active ? true : false} updateActive={updateActive}/>
          })}
      </div>
    </div>
  )
}

export default Dashboard
