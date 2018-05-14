import React, { Component } from 'react';

import { API_SERVICE } from '../../api/coinmarketcap';

import FiatCurrencySelect from '../FiatCurrencySelect';
import Ticker from '../Ticker';

export default class Markets extends Component {
  state = {
    tickerData: {},
    fiatCurrency: 'USD',
  };

  componentDidMount() {
    this.getTickerData(this.state.fiatCurrency);
  }

  onFiatCurrencyChange = fiatCurrency => {
    this.getTickerData(fiatCurrency);
  };

  getTickerData(fiatCurrency) {
    API_SERVICE.getTicker(fiatCurrency).then(result => {
      const tickerData = result.data;
      this.setState({ tickerData, fiatCurrency });
    });
  }

  render() {
    const { tickerData, fiatCurrency } = this.state;

    return (
      <section className="section section__markets">
        <FiatCurrencySelect onFiatCurrencyChange={this.onFiatCurrencyChange} />
        <Ticker tickerData={tickerData} fiatCurrency={fiatCurrency} />
      </section>
    );
  }
}
