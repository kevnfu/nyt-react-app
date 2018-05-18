import React from 'react';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div class="form-group">
          <label>Topic</label>
          <input type="text" name="topic" class="form-control" />
        </div>
      </form>
    )
  }
}

export default SearchForm;