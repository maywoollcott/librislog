import { useContext, useEffect, useState }from 'react'
import { Context } from '../Context'
import  ListCard from './ListCard'

const Library = (props) => {

  const value = useContext(Context);

  
  const allBooks = value.library;

  

  return (
    <div className="dashboard">
      <h1>All Books</h1>
      <div className="librarycontainer">
          {allBooks.map((book, index) => {
            console.log(book)
            return <ListCard key={index} title={book.title} author={book.author} index={index} yearPublished={book.yearPublished}/>
          })}
      </div>
      <h1>Currently Reading</h1>
      <div className="librarycontainer">
          {allBooks.map((book, index) => {
            console.log(book)
            return <ListCard key={index} title={book.title} author={book.author} index={index} yearPublished={book.yearPublished}/>
          })}
      </div>
      <h1>Finished</h1>
        <div className="librarycontainer">
            {allBooks.map((book, index) => {
              console.log(book)
              return <ListCard key={index} title={book.title} author={book.author} index={index} yearPublished={book.yearPublished}/>
            })}
        </div>
      <h1>To Read</h1>
        <div className="librarycontainer">
              {allBooks.map((book, index) => {
                console.log(book)
                return <ListCard key={index} title={book.title} author={book.author} index={index} yearPublished={book.yearPublished}/>
              })}
          </div>
    </div>
  )
}

export default Library
