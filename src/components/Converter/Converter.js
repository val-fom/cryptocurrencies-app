import React, { Component } from 'react';

import { getTickerOfTopSix } from '../../api';
import { convert } from '../../utils';
import { FIAT_CURRENCIES } from '../../constants';

import Select from '../UI/Select';
import CurrencyInput from './CurrencyInput';
import CryptoCurrencySelect from './CryptoCurrencySelect';

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
    getTickerOfTopSix(fiatCurrency).then(result => {
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
      <section className="section section__converter">
        <header className="converter__header">
          Cryptocurrency Converter Calculator
        </header>

        <fieldset>
          <CurrencyInput
            value={cryptoValue}
            currency={tickerData[currentCryptoCurrencyId].name}
            onValueChange={this.handleCryptoValueChange}
          />
          <CryptoCurrencySelect
            tickerData={tickerData}
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
