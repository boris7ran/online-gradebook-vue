import axios from 'axios'

export default class RegisterService {
  constructor() {
    axios.defaults.baseURL = 'http://localhost:8000/api/'
  }

  registerUser(user) {
    return axios.post('register', user)
      .then( () => {
        console.log('Success');
      })
  }
}

export const registerService = new RegisterService();