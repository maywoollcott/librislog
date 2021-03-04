import { useHistory, Link } from 'react-router-dom';
import { Context } from '../Context'
import React, { Fragment, useState, useContext } from 'react';
import apiService from '../utils/apiService';

const TestGoogle = () => {

  const value = useContext(Context);
  const history = useHistory();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
  });

  const [finalBook, setFinalBook] = useState({
    title: '',
    author: '',
    yearPublished: '',
    pages: '',
    status: '',
    imageURL: '',
  });

  const [volumeFormData, setVolumeFormData] = useState({
    status: '',
  });

  const [displayQuestions, toggleDisplayQuestions] = useState('primaryform');

  const [options, setOptions] = useState([]);

  const { title, author } = formData;
  const { status } = volumeFormData

  const handleDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData)
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const queryTitle = formData.title.split(' ').join('+')
    const queryAuthor = formData.author.split(' ').join('+')
    console.log(queryTitle)
    console.log(queryAuthor)

    const res = await apiService.searchGoogleBooks(queryTitle, queryAuthor);
    setOptions(res.data.items.slice(0, 3));
    toggleDisplayQuestions('optionsdisplay');
  }

  const selectBook = (index) => {
    const bookInfo = options[index].volumeInfo;
    toggleDisplayQuestions('finalformdisplay');
    const finalBookDraft = {
      title: bookInfo.title,
      author: bookInfo.authors[0],
      yearPublished: bookInfo.publishedDate.slice(0, 4),
      pages: bookInfo.pageCount,
      status: '',
      imageURL: bookInfo.imageLinks.thumbnail
    }
    setFinalBook(finalBookDraft);
    console.log(finalBookDraft)
  }


  const handleVolumeDataChange = (e) => {
    setVolumeFormData({ ...volumeFormData, [e.target.name]: e.target.value });
    console.log(volumeFormData)
  }

  const sendBookToDb = async (e) => {
    e.preventDefault();
    const newBook = {...finalBook}
    newBook.status = volumeFormData.status;
    setFinalBook(newBook);
    console.log(newBook)

    let currentLibrary = [...value.library];
    currentLibrary.unshift(newBook);
    value.setLibrary(currentLibrary);

    const accessToken = localStorage.getItem('accessToken');
    const res = await apiService.updateLibrary(currentLibrary, accessToken)
    console.log(res.data)

    history.push('/library')
  }



  return (
    <div className="bodydashboard">
      <h1>Add book here!</h1>
      <div className="addbookcard">
        {displayQuestions === 'primaryform' &&
          <form className="addbookform" onSubmit={onSubmit} >
            <div className="formBox">
              <h3>TITLE: </h3>
              <input type="text" name="title" value={ title } onChange={handleDataChange} required/>
            </div>
            <div className="formBox">
              <h3>AUTHOR: </h3>
              <input type="author" name="author" value={ author } onChange={handleDataChange} required/>
            </div>
            <button className="loginbtn" type="submit">See Options</button>
          </form>
        }
        {displayQuestions === 'optionsdisplay' && 
          <div className="radio">
            {options.map((edition, index) => {
              return <EditionOption title={edition.volumeInfo.title} publishedDate={edition.volumeInfo.publishedDate} pages={edition.volumeInfo.pageCount} index={index} selectBook={selectBook} />
            })}
          </div>
        }
        {displayQuestions === 'optionsdisplay' &&
          <div className="verticalflextext">
            <h3>None of these look right?</h3>
            <h3>Click <Link to="/addbookbyisbn" className="textlink">here</Link> to search by ISBN or <Link to="/addbookmanually" className="textlink">here</Link> to enter info manually.</h3>
          </div>
        }
        {displayQuestions === 'finalformdisplay' &&
          <div className="verticalflextext">
            <h1>{finalBook.title}</h1>
            <h3>by</h3>
            <h2>{finalBook.author}</h2>
            <form className="addbookform" onSubmit={sendBookToDb} >
              <div className="radio">
                <div className="radioitem">
                  <input type="radio" name="status" value='currentlyReading' onChange={handleVolumeDataChange} required/>
                  <h3>CURRENTLY READING</h3>
                </div>
                <div className="radioitem">
                  <input type="radio" name="status" value='wantToRead' onChange={handleVolumeDataChange} required/>
                  <h3>WANT TO READ</h3>
                </div>
                <div className="radioitem">
                  <input type="radio" name="status" value='finished' onChange={handleVolumeDataChange} required/>
                  <h3>FINISHED</h3>
                </div>
              </div>
              <button className="loginbtn" type="submit">Add Book</button>
            </form>
          </div>
        }
      </div>
    </div>
  )
}



const EditionOption = (props) => {

  const selectHandler = () => {
    console.log(props.index)
    props.selectBook(props.index);
  }

  return (
    <div className="radioitem">
      <h3>Title: {props.title}</h3>
      <h3>Edition Year: {props.publishedDate}</h3>
      <h3>Pages: {props.pages}</h3>
      <button className="loginbtn" onClick={selectHandler}>This looks right!</button>
    </div>
  )
}


export default TestGoogle