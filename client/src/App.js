import React from "react";
import SearchForm from "./components/SearchForm"

class App extends React.Component {

  handleSubmit(data) {

  }

  render() {
    return (
      <div className="container">

        <div className="jumbotron text-center">
          <h1 className="display-4">New York Times Article Saver</h1>
          <p className="lead">Search and save articles!</p>
        </div>

        <div class="card">
          <h4 class="card-header">Search</h4>
          <div class="card-body">
            <SearchForm onSubmit={this.handleSubmit} />
          </div>
        </div>

      </div>

    );
  }
}

export default App;
