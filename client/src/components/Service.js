import { useContext, useEffect }from 'react'
import { Context } from '../Context'
import axios from 'axios';

const Service = () => {

  const value = useContext(Context);


  useEffect ( () => {

    if (value.currentUser.user !== null) {
      const currentUserId = value.currentUser.user.id;

      axios.get(`http://localhost:5000/books/${currentUserId}`)
        .then(res => {
          const library = res.data;
          console.log(library);
          value.setLibrary(library);
        })
        //eslint-disable-next-line react-hooks/exhaustive-deps
    } else {
      return null;
    }
  }, [])

    return null;

}

export default Service
