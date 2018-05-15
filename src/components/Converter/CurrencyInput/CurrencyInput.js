import React, { Component, Fragment } from 'react';

export default class CurrencyInput extends Component {
  handleChange = ev => {
    this.props.onValueChange(ev.target.value);
  };

  render() {
    const { value } = this.props;
    const { currency } = this.props;

    return (
      <Fragment>
        <legend>Enter {currency} amount:</legend>
        <input value={value} onChange={this.handleChange} />
      </Fragment>
    );
  }
}
