import axios from 'axios'
const BASE_URL = 'http://localhost:5000';
const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY

const apiService = {};

apiService.register = (user) => {
  return axios.post(`${BASE_URL}`, {
    username: user.username,
    password: user.password,
    password2: user.password2,
    email: user.email,
    readingGoal: user.readingGoal
  })
};


apiService.login = (username, password) => {
  return axios.post(`${BASE_URL}/auth`, {
    username,
    password
  })
};

apiService.getUserInfo= (token) => {
  return axios.get(`${BASE_URL}/books`, {
    headers: {
      "Authorization" : `Bearer ${token}`
    }
  })
};

apiService.getSessions= (token) => {
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

apiService.updateSessions= (sessions, token) => {
  return axios.put(`${BASE_URL}/updatesessions`, sessions, {
    headers: {
      "Authorization" : `Bearer ${token}`
    },
  })
};

apiService.updateStreak= (streak, token) => {
  try {
    return axios.put(`${BASE_URL}/updatestreak`, streak, {
      headers: {
        "Authorization" : `Bearer ${token}`
      },
    })
  } catch (error) {
    console.log(error.response.data)
  }
};

apiService.logout = () => {

};

apiService.searchGoogleBooks= (title, author) => {
  return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${author}&key=${googleApiKey}`)
};

apiService.getGoogleBooksVolumeDetails= (id) => {
  return axios.get(`https://www.googleapis.com/books/v1/volumes/${id}?key=${googleApiKey}`)
};

export default apiService;