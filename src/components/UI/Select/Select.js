import React, { Component } from 'react';

export default class Select extends Component {
  state = {
    value: 'USD',
  };

  handleChange = e => {
    const { value } = e.target;
    this.setState({ value });
    this.props.onChange(value);
  };

  render() {
    return (
      <select
        className="select"
        value={this.state.value}
        onChange={this.handleChange}
      >
        {this.props.options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }
}
