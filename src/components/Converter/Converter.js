import React, { Component } from 'react';

import { API_SERVICE } from '../../api/coinmarketcap';
import {
  getFilteredTickerData,
  mapTickerDataByName,
  convert,
} from '../../utils';
import { FIAT_CURRENCIES, CRYPTO_CURRENCIES } from '../../constants';

import Select from '../UI/Select';
import CurrencyInput from './CurrencyInput';

export default class Converter extends Component {
  state = {
    tickerData: null,
    currentCryptoCurrency: CRYPTO_CURRENCIES[0],
    currentFiatCurrency: FIAT_CURRENCIES[0],
    baseAmount: '',
    baseCurrency: 'crypto',
  };

  componentDidMount() {
    this.getTickerData(this.state.currentFiatCurrency);
  }

  onFiatCurrencyChange = fiatCurrency => {
    this.getTickerData(fiatCurrency);
  };

  onCryptoCurrencyChange = currentCryptoCurrency =>
    this.setState({ currentCryptoCurrency });

  getTickerData(fiatCurrency) {
    API_SERVICE.getTicker(fiatCurrency).then(result => {
      const filteredTickerData = getFilteredTickerData(
        result.data,
        CRYPTO_CURRENCIES
      );

      const tickerDataMappedByName = mapTickerDataByName(filteredTickerData);

      this.setState({
        tickerData: tickerDataMappedByName,
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
    const {
      baseAmount,
      baseCurrency,
      currentCryptoCurrency,
      currentFiatCurrency,
      tickerData,
    } = this.state;
    console.log('this.state: ', this.state);

    if (!tickerData) return null;

    const { price } = tickerData[currentCryptoCurrency].quotes[
      currentFiatCurrency
    ];

    const cryptoValue =
      baseCurrency === 'fiat' ? convert(baseAmount, 1 / price) : baseAmount;
    const fiatValue =
      baseCurrency === 'crypto' ? convert(baseAmount, price) : baseAmount;

    return (
      <section className="section section__converter">
        <header className="converter__header">
          Cryptocurrency Converter Calculator
        </header>

        <fieldset>
          <CurrencyInput
            value={cryptoValue}
            currency={currentCryptoCurrency}
            onValueChange={this.handleCryptoValueChange}
          />
          <Select
            options={CRYPTO_CURRENCIES}
            onChange={this.onCryptoCurrencyChange}
          />
        </fieldset>

        <fieldset>
          <CurrencyInput
            value={fiatValue}
            currency={currentFiatCurrency}
            onValueChange={this.handleFiatValueChange}
          />
          <Select
            options={FIAT_CURRENCIES}
            onChange={this.onFiatCurrencyChange}
          />
        </fieldset>
      </section>
    );
  }
}
