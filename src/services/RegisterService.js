import axios from 'axios'

export default class RegisterService {
  constructor() {
    axios.defaults.baseURL = 'http://localhost:8000/api/'
  }

  registerUser(user) {
    return axios.post('register', user);
  }

  getUsers() {
    return axios.get('users');
  }
}

export const registerService = new RegisterService();