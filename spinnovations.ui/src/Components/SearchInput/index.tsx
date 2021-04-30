import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { SearchProps } from '../../Helpers/Interfaces/SearchInterfaces';



class SearchInput extends Component<SearchProps> {
  state = {
    text: '',
  }

  handleSubmit= () => {
    this.props.history.push(`/search/${this.state.text}`);

    this.setState({
      text: '',
    });
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type='text' name='text' value={this.state.text} onChange={this.handleChange} />
      </form>
    );
  }
}

export default withRouter(SearchInput);
