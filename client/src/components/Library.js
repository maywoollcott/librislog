import { useContext, useEffect, useState }from 'react'
import { Context } from '../Context'
import  ListCard from './ListCard'

const Library = (props) => {

  const value = useContext(Context);

  
  const allBooks = value.library;
  const currentlyReading = value.library.filter(book => book.status === 'currentlyReading');
  const finished = value.library.filter(book => book.status === 'finished');
  const wantToRead = value.library.filter(book => book.status === 'wantToRead');
  

  return (
    <div className="dashboard">
      <h1>All Books</h1>
      <div className="librarycontainer">
          {allBooks.map((book, index) => {
            console.log(book)
            return <ListCard key={index} title={book.title} author={book.author} index={index} yearPublished={book.yearPublished} imageURL={book.imageURL}/>
          })}
      </div>
      <h1>Currently Reading</h1>
      <div className="librarycontainer">
          {currentlyReading.map((book, index) => {
            console.log(book)
            return <ListCard key={index} title={book.title} author={book.author} index={index} yearPublished={book.yearPublished}imageURL={book.imageURL}/>
          })}
      </div>
      <h1>Finished</h1>
        <div className="librarycontainer">
            {finished.map((book, index) => {
              console.log(book)
              return <ListCard key={index} title={book.title} author={book.author} index={index} yearPublished={book.yearPublished} imageURL={book.imageURL}/>
            })}
        </div>
      <h1>To Read</h1>
        <div className="librarycontainer">
              {wantToRead.map((book, index) => {
                console.log(book)
                return <ListCard key={index} title={book.title} author={book.author} index={index} yearPublished={book.yearPublished} imageURL={book.imageURL}/>
              })}
          </div>
    </div>
  )
}

export default Library
