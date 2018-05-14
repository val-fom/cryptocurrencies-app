import React, { Component } from 'react';

export default class FiatCurrencySelect extends Component {
  state = {
    value: 'USD',
  };

  handleChange = e => {
    const { value } = e.target;
    this.setState({ value });
    this.props.onFiatCurrencyChange(value);
  };

  render() {
    return (
      <select value={this.state.value} onChange={this.handleChange}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="RUB">RUB</option>
      </select>
    );
  }
}
