import axios from 'axios'
const BASE_URL = 'http://localhost:5000';

// possible to refactor into a 'fetch factory' to reduce repetition

const apiService = {};

apiService.register = (user) => {
  return axios.post(`${BASE_URL}`, {
    username: user.username,
    password: user.password,
    password2: user.password2,
    email: user.email,
    readingGoal: user.readingGoal
  })
  // .then(response => {
  //   response.send()
  // })
};


apiService.login = (username, password) => {
  return axios.post(`${BASE_URL}/auth`, {
    username,
    password
  })
};

apiService.getLibrary= (token) => {
  return axios.get(`${BASE_URL}/books`, {
    headers: {
      "Authorization" : `Bearer ${token}`
    }
  })
};

apiService.updateLibrary= (library, token) => {
  return axios.put(`${BASE_URL}/updatelibrary`, library, {
    headers: {
      "Authorization" : `Bearer ${token}`
    },
  })
};

apiService.logout = () => {

};

apiService.searchGoogleBooks= (title, author) => {
  return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${author}&key=AIzaSyDmAH6FlhUPAkiWpKOhQA-Pqaps1sucP3M`)
};

apiService.getGoogleBooksVolumeDetails= (id) => {
  return axios.get(`https://www.googleapis.com/books/v1/volumes/${id}?key=AIzaSyDmAH6FlhUPAkiWpKOhQA-Pqaps1sucP3M`)
};

export default apiService;