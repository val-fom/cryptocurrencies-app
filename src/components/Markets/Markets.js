import React, { Component } from 'react';

import { getTickerOfTopSix } from '../../api';
import { FIAT_CURRENCIES } from '../../constants';

import Select from '../UI/Select';
import Ticker from './Ticker';

export default class Markets extends Component {
  state = {
    tickerData: null,
    currentFiatCurrency: 'USD',
  };

  componentDidMount() {
    this.getTickerData(this.state.currentFiatCurrency);
  }

  onFiatCurrencyChange = fiatCurrency => {
    this.getTickerData(fiatCurrency);
  };

  getTickerData(fiatCurrency) {
    getTickerOfTopSix(fiatCurrency).then(result => {
      this.setState({
        tickerData: result.data,
        currentFiatCurrency: fiatCurrency,
      });
    });
  }

  render() {
    const { tickerData, currentFiatCurrency } = this.state;

    if (!tickerData) return null;

    return (
      <section className="section section__markets">
        <Select
          options={FIAT_CURRENCIES}
          onChange={this.onFiatCurrencyChange}
        />
        <Ticker
          tickerData={tickerData}
          currentFiatCurrency={currentFiatCurrency}
        />
      </section>
    );
  }
}
