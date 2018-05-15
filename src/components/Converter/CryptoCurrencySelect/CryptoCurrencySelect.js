import React, { Component } from 'react';

export default class CryptoCurrencySelect extends Component {
  state = {
    value: 1,
  };

  handleChange = e => {
    const { value } = e.target;
    this.setState({ value });
    this.props.onChange(value);
  };

  render() {
    const { tickerData } = this.props;

    return (
      <select value={this.state.value} onChange={this.handleChange}>
        {Object.keys(tickerData).map(coinId => (
          <option key={coinId} value={coinId}>
            {tickerData[coinId].name}
          </option>
        ))}
      </select>
    );
  }
}
