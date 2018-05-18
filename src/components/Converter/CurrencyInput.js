import React, { Component, Fragment } from 'react';
import './CurrencyInput.css';

export default class CurrencyInput extends Component {
  handleChange = ev => {
    this.props.onValueChange(ev.target.value);
  };

  render() {
    const { value, currency } = this.props;

    return (
      <Fragment>
        <label className="currency-input__label">
          Enter {currency} amount:
        </label>
        <input
          type="number"
          className="currency-input"
          value={value}
          onChange={this.handleChange}
        />
      </Fragment>
    );
  }
}
