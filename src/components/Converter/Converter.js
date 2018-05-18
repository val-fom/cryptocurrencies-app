import React, { Component } from 'react';

import * as api from '../../api';
import { convert } from '../../utils';
import { FIAT_CURRENCIES, CRYPTO_CURRENCIES } from '../../constants';

import Select from '../UI/Select';
import CurrencyInput from './CurrencyInput';
import CryptoCurrencySelect from './CryptoCurrencySelect';

import './Converter.css';

export default class Converter extends Component {
  state = {
    tickerData: null,
    currentCryptoCurrencyId: 1,
    currentFiatCurrency: 'USD',
    baseAmount: '',
    baseCurrency: 'crypto',
  };

  componentDidMount() {
    this.getTickerData(this.state.currentFiatCurrency);
  }

  onFiatCurrencyChange = fiatCurrency => {
    this.getTickerData(fiatCurrency);
  };

  onCryptoCurrencyChange = currentCryptoCurrencyId =>
    this.setState({ currentCryptoCurrencyId });

  getTickerData(fiatCurrency) {
    api.getPrices(CRYPTO_CURRENCIES, [fiatCurrency]).then(result => {
      this.setState({
        tickerData: result.data,
        currentFiatCurrency: fiatCurrency,
      });
    });
  }

  handleCryptoValueChange = baseAmount => {
    this.setState({ baseCurrency: 'crypto', baseAmount });
  };

  handleFiatValueChange = baseAmount => {
    this.setState({ baseCurrency: 'fiat', baseAmount });
  };

  render() {
    // return null; // TODO:

    const {
      baseAmount,
      baseCurrency,
      currentCryptoCurrencyId,
      currentFiatCurrency,
      tickerData,
    } = this.state;

    if (!tickerData) return null;

    const { price } = tickerData[currentCryptoCurrencyId].quotes[
      currentFiatCurrency
    ];

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
            currency={tickerData[currentCryptoCurrencyId].name}
            onValueChange={this.handleCryptoValueChange}
          />
          <CryptoCurrencySelect
            tickerData={tickerData}
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
