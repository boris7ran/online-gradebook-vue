import axios from 'axios'

export default class GradebookService {
  constructor() {
    axios.defaults.baseURL = 'http://localhost:8000/api/';
  }

  getAll() {
    return axios.get('gradebooks');
  }

  gradebookAdd(gradebook) {
    return axios.post('gradebooks', gradebook);
  }

  get(id) {
    return axios.get('gradebooks/' + id);
  }

  gradebookCommentAdd(id, comment) {
    return axios.post(`gradebooks/${id}/comments`, comment);
  }
}

export const gradebookService = new GradebookService();