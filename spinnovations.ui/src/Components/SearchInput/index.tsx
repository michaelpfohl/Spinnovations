import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { SearchProps } from "../../Helpers/Interfaces/SearchInterfaces";

class SearchInput extends Component<SearchProps> {
  state = {
    text: "",
    greetingColor: 0,
  };

  componentDidMount(): void {
    this.setState({ greetingColor: Math.floor(Math.random() * 7) + 1 });
  }

  handleSubmit = () => {
    this.props.history.push(`/search/${this.state.text}`);
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { greetingColor } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          placeholder="Search for a Spinnovation!"
          type="text"
          name="text"
          className={`search-input color-half-border-${greetingColor}`}
          value={this.state.text}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

export default withRouter(SearchInput);
