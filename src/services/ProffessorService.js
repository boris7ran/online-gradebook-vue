import axios from 'axios'

export default class ProffessorService {
    constructor() {
      axios.defaults.baseURL = 'http://localhost:8000/api/'
    }

    proffessorAdd( proffessor ) {
      return axios.post('proffessors', proffessor);
    }

    getAll() {
      return axios.get('proffessors');
    }
}

export const proffessorService = new ProffessorService();