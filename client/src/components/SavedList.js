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
    // stores index of savedArticles that have notes modified
    this.updatedIndexes = new Set();

    // debounce syncNotes
    this.syncNotes = debounce(this.syncNotes, 1000);
  }

  syncNotes() {
    const {savedArticles} = this.state

    this.updatedIndexes.forEach(index => {
      const {_id, notes} = savedArticles[index];
      API.updateNotes(_id, notes);
    });

    this.updatedIndexes.clear();
  }

  syncWithServer() {
    API.getSavedArticles()
      .then(data => this.setState({ savedArticles: data }))
      .then(() => this.updatedIndexes.clear());
  }

  componentDidMount() {
    this.syncWithServer();
    // listen for db changes
    this.socket = io();
    this.socket.on('dbChange', () => this.syncWithServer());
  }

  handleClick(article) {
    API.removeArticle(article._id);
  }

  handleChange(event, index) {
    // update state
    const updatedArticles = [...this.state.savedArticles];
    updatedArticles[index].notes = event.target.value;
    this.setState({savedArticles: updatedArticles})

    // alert server
    this.updatedIndexes.add(index);
    this.syncNotes();
  }

  render() {
    const {savedArticles} = this.state;
    return savedArticles.map((article, index) => {
      return (
        <ArticleCard key={article._id} data={article}
          buttonLabel="Remove" onClick={() => this.handleClick(article)}>
          <textarea className="w-100"
            value={savedArticles[index].notes}
            onChange={e => this.handleChange(e, index)} />
        </ArticleCard>
      );
    });
  }
}

export default SavedList;