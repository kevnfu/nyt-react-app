import React from 'react';
import PropTypes from 'prop-types';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.blankState = {
      q: "",
      start_year: "",
      end_year: ""
    }
    this.state = {...this.blankState};
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // send form results back to parent
    this.props.onSubmit(this.state);
    this.setState({ ...this.blankState });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <form onSubmit={ this.handleSubmit }>

        <div className="form-group">
          <label>Topic</label>
          <input type="text" name="q" className="form-control" required
            onChange={ this.handleChange }
            value={ this.state.q }/>
        </div>

        <div className="form-group">
          <label>Start Year</label>
          <input type="text" name="start_year" className="form-control"
            onChange={ this.handleChange }
            value={ this.state.start_year }
            pattern={'^[0-9]{8}$'}
            placeholder="YYYYMMDD"/>
        </div>

        <div className="form-group">
          <label>End Year</label>
          <input type="text" name="end_year" className="form-control"
            onChange={ this.handleChange }
            value={ this.state.end_year }
            pattern={'^[0-9]{8}$'}
            placeholder="YYYYMMDD"/>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    )
  }
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default SearchForm;