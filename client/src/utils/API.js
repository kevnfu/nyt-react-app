import axios from 'axios';

export default {
  searchNYT(params) {
    return axios.get('/api/articles/search', { params })
      .then(res => res.data);
  },

  saveArticle(article) {
    delete article._id;
    return axios.post('/api/articles', article);
  },

  getSavedArticles() {
    return axios.get('api/articles')
      .then(res => res.data);
  },

  removeArticle(id) {
    return axios.delete(`/api/articles/${id}`)
  },

  updateNotes(id, str) {
    return axios.patch(`/api/articles/${id}/notes/`, {notes: str});
  }
};