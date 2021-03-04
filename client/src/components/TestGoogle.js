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
    status: ''
  });

  const [displayQuestions, toggleDisplayQuestions] = useState('primaryform');

  const [options, setOptions] = useState([]);

  const { title, author } = formData;

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


    // const volumeId = res.data.items[0].id
    // console.log(volumeId)
    // const volumeRes = await apiService.getGoogleBooksVolumeDetails(volumeId)

    // console.log(volumeRes.data.volumeInfo.title)
    // console.log(volumeRes.data.volumeInfo.authors[0])
    // console.log(volumeRes.data.volumeInfo.publishedDate)
    // console.log(volumeRes.data.volumeInfo.pageCount)

    // const newBook = formData;
    // let currentLibrary = [...value.library];
    // currentLibrary.unshift(newBook);
    // value.setLibrary(currentLibrary);

    // const accessToken = localStorage.getItem('accessToken');
    // const res = await apiService.updateLibrary(currentLibrary, accessToken)
    // console.log(res.data)

      // const res = await apiService.register(formData)
      //   console.log(res.data)
      //   const { accessToken } = res.data;
      //   localStorage.setItem('accessToken', accessToken);
      //   localStorage.setItem('haveValidToken', true)
      //   value.setIsAuthenticated(true);
      //   history.push('/current')

      // console.log(newBook)
  }

  const selectBook = (index) => {
    const bookInfo = options[index].volumeInfo;
    toggleDisplayQuestions('finalformdisplay');
    const finalBookDraft = {
      title: bookInfo.title,
      author: bookInfo.authors[0],
      yearPublished: bookInfo.yearPublished,
      pages: bookInfo.pageCount,
      status: ''
    }
    setFinalBook(finalBookDraft);
    
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
            <form className="addbookform" onSubmit={onSubmit} >
              <div className="radio">
                <div className="radioitem">
                  <input type="radio" name="status" value='currentlyReading' onChange={handleDataChange} required/>
                  <h3>CURRENTLY READING</h3>
                </div>
                <div className="radioitem">
                  <input type="radio" name="status" value='wantToRead' onChange={handleDataChange} required/>
                  <h3>WANT TO READ</h3>
                </div>
                <div className="radioitem">
                  <input type="radio" name="status" value='finished' onChange={handleDataChange} required/>
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