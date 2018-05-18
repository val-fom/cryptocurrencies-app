import React, { Component } from 'react';

import * as api from '../../api';
import { FIAT_CURRENCIES, CRYPTO_CURRENCIES } from '../../constants';

import Select from '../UI/Select';
import Prices from './Prices';

import './Markets.css';

export default class Markets extends Component {
  state = {
    prices: null,
    currency: FIAT_CURRENCIES[0],
  };

  componentDidMount() {
    api.getPrices(CRYPTO_CURRENCIES, FIAT_CURRENCIES).then(prices => {
      this.setState({ prices });
    });
  }

  onCurrencyChange = currency => this.setState({ currency });

  render() {
    const { prices, currency } = this.state;

    if (!prices) return null;

    return (
      <section className="section markets__section">
        <header className="section__header">Markets</header>
        <Select options={FIAT_CURRENCIES} onChange={this.onCurrencyChange} />
        <Prices prices={prices} currency={currency} />
      </section>
    );
  }
}
