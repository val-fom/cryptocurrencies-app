import React, { Component } from 'react';

import * as api from '../../api';
import { convert } from '../../utils';
import { FIAT_CURRENCIES, CRYPTO_CURRENCIES } from '../../constants';

import Select from '../UI/Select';
import CurrencyInput from './CurrencyInput';

import './Converter.css';

export default class Converter extends Component {
  state = {
    prices: null,
    currentCryptoCurrency: CRYPTO_CURRENCIES[0],
    currentFiatCurrency: FIAT_CURRENCIES[0],
    baseAmount: '1',
    baseCurrency: 'crypto',
  };

  componentDidMount() {
    api.getPrices(CRYPTO_CURRENCIES, FIAT_CURRENCIES).then(prices => {
      console.log('prices: ', prices);
      this.setState({ prices });
    });
  }

  onFiatCurrencyChange = currentFiatCurrency =>
    this.setState({ currentFiatCurrency });

  onCryptoCurrencyChange = currentCryptoCurrency =>
    this.setState({ currentCryptoCurrency });

  handleCryptoValueChange = baseAmount => {
    this.setState({ baseCurrency: 'crypto', baseAmount });
  };

  handleFiatValueChange = baseAmount => {
    this.setState({ baseCurrency: 'fiat', baseAmount });
  };

  render() {
    const {
      baseAmount,
      baseCurrency,
      currentCryptoCurrency,
      currentFiatCurrency,
      prices,
    } = this.state;

    if (!prices) return null;

    const price = prices[currentCryptoCurrency][currentFiatCurrency];

    const cryptoValue =
      baseCurrency === 'fiat' ? convert(baseAmount, 1 / price) : baseAmount;
    const fiatValue =
      baseCurrency === 'crypto' ? convert(baseAmount, price) : baseAmount;

    return (
      <section className="section converter__section">
        <header className="section__header">
          Cryptocurrency Converter Calculator
        </header>

        <div className="converter__wrapper">
          <CurrencyInput
            value={cryptoValue}
            currency={currentCryptoCurrency}
            onValueChange={this.handleCryptoValueChange}
          />
          <Select
            options={CRYPTO_CURRENCIES}
            onChange={this.onCryptoCurrencyChange}
          />
        </div>

        <div className="converter__wrapper">
          <CurrencyInput
            value={fiatValue}
            currency={currentFiatCurrency}
            onValueChange={this.handleFiatValueChange}
          />
          <Select
            options={FIAT_CURRENCIES}
            onChange={this.onFiatCurrencyChange}
          />
        </div>
      </section>
    );
  }
}
