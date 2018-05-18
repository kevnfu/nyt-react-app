import React from 'react';
import io from 'socket.io-client';
import API from '../utils/API';
import ArticleCard from './ArticleCard';
import debounce from '../utils/debounce';

class SavedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      savedArticles: []
    }
    this.updateNotes = debounce(API.updateNotes,3000);
  }

  syncWithServer() {
    API.getSavedArticles()
      .then(data => this.setState({ savedArticles: data }));
  }

  componentDidMount() {
    this.syncWithServer();
    // listen for db changes
    this.socket = io();
    this.socket.on('dbChange', () => this.syncWithServer());
  }

  handleClick(article) {
    debounce(API.removeArticle)
    API.removeArticle(article._id);
  }

  handleChange(event, index, id) {
    this.updateNotes(id, event.target.value);
  }

  render() {
    const {savedArticles} = this.state;
    return savedArticles.map((article, index) => {
      return (
        <ArticleCard key={article._id} data={article}
          buttonLabel="Remove" onClick={() => this.handleClick(article)}>
          <textarea className="w-100"
            value={savedArticles[index].notes}
            onChange={e => this.handleChange(e, index, article._id)} />
        </ArticleCard>
      );
    });
  }
}

export default SavedList;