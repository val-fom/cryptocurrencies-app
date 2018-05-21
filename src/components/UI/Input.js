import React, { Component } from 'react';

export default class CurrencyInput extends Component {
  handleChange = ev => {
    this.props.onChange(ev.target.value);
  };

  render() {
    return (
      <input
        className="ui__input"
        type={this.props.type}
        value={this.props.value}
        onChange={this.handleChange}
      />
    );
  }
}
