import axios from 'axios'

export default class CommentService {
  constructor() {
    axios.defaults.baseURL = 'http://localhost:8000/api/';
  }

  delete(id) {
    return axios.delete(`comments/${id}`);
  }
}

export const commentService = new CommentService();