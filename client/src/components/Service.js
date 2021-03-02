import { useContext, useEffect }from 'react'
import { Context } from '../Context'
import axios from 'axios';

const Service = () => {

  const value = useContext(Context);


  useEffect ( () => {

      console.log('hello')
      const currentUserId = value.currentUser.user;

      if(currentUserId!==null) {
        axios.get(`http://localhost:5000/auth/${currentUserId}`)
        .then(res => {
          const library = res.data;
          value.setLibrary(library);
        })
      }
        //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

    return null;

}

export default Service
