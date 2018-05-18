import React, { Component } from 'react';

export default class Select extends Component {
  state = {
    value: this.props.options[0],
  };

  handleChange = e => {
    const { value } = e.target;
    this.setState({ value });
    this.props.onChange(value);
  };

  render() {
    return (
      <select
        className="ui__select"
        value={this.state.value}
        onChange={this.handleChange}
      >
        {this.props.placeHolder ? (
          <option disabled>{this.props.placeHolder}</option>
        ) : null}
        {this.props.options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }
}
