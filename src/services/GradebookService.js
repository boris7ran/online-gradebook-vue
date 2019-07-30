import axios from 'axios'

export default class GradebookService {
  constructor() {
    axios.defaults.baseURL = 'http://localhost:8000/api/';
  }

  gradebookAdd(gradebook) {
    return axios.post('gradebooks', gradebook);
  }
}

export const gradebookService = new GradebookService();