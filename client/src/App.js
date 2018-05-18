import React from 'react';
import SearchForm from './components/SearchForm';
import ResultsList from './components/ResultsList';
import SavedList from './components/SavedList';
import API from './utils/API';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: []
    }
  }

  componentDidMount() {
    // axios.get('/api/articles/')
    //   .then(res => res.data)
    //   .then(data => console.log(data));
  }

  handleSubmit = (data) => {
    // search results
    API.searchNYT(data)
      .then(data => this.setState({ searchResults: data }));
  }

  render() {
    return (
      <div className="container">

        <div className="jumbotron text-center">
          <h1 className="display-4">New York Times Article Saver</h1>
          <p className="lead">Search and save articles!</p>
        </div>

        <div className="card mb-3">
          <h4 className="card-header">Search</h4>
          <div className="card-body">
            <SearchForm onSubmit={ this.handleSubmit } />
          </div>
        </div>

        <div className="card mb-3">
          <h4 className="card-header">Results</h4>
          <div className="card-body">

            <ResultsList data={ this.state.searchResults } />
          </div>
        </div>

        <div className="card mb-3">
          <h4 className="card-header">Saved Articles</h4>
          <div className="card-body">

            <SavedList />
          </div>
        </div>

      </div>

    )
  }
}

export default App;
