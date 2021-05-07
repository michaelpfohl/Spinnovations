import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { SearchProps } from '../../Helpers/Interfaces/SearchInterfaces';



class SearchInput extends Component<SearchProps> {
  state = {
    text: '',
  }

  handleSubmit= () => {
    this.props.history.push(`/search/${this.state.text}`);
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input placeholder="Search for a Spinnovation!" type='text' name='text' className="search-input" value={this.state.text} onChange={this.handleChange} />
      </form>
    );
  }
}

export default withRouter(SearchInput);
