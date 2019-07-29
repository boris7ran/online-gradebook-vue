import axios from 'axios'

export default class ProffessorService {
    constructor() {
      axios.defaults.baseURL = 'localhost:8000/api/'
    }

}

export const proffessorService = new ProffessorService();