import { useContext, useEffect }from 'react'
import { Context } from '../Context'
import axios from 'axios';

const Service = () => {

  const value = useContext(Context);


  useEffect ( () => {

    const currentUserId = '6039bf7279af642bc93b4048'

    axios.get(`http://localhost:5000/books/${currentUserId}`)
      .then(res => {
        const library = res.data;
        console.log(library);
        value.setLibrary(library);
      })
      //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null;

}

export default Service
