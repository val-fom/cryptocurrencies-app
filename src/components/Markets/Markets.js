import React, { Component } from 'react';

import { API_SERVICE } from '../../api/coinmarketcap';
import { getFilteredTickerData } from '../../utils';
import { FIAT_CURRENCIES, CRYPTO_CURRENCIES } from '../../constants';

import Select from '../UI/Select';
import Ticker from './Ticker';

export default class Markets extends Component {
  state = {
    tickerData: {},
    fiatCurrency: FIAT_CURRENCIES[0],
  };

  componentDidMount() {
    this.getTickerData(this.state.fiatCurrency);
  }

  onFiatCurrencyChange = fiatCurrency => {
    this.getTickerData(fiatCurrency);
  };

  getTickerData(fiatCurrency) {
    API_SERVICE.getTicker(fiatCurrency).then(result => {
      const filteredTickerData = getFilteredTickerData(
        result.data,
        CRYPTO_CURRENCIES
      );

      this.setState({ tickerData: filteredTickerData, fiatCurrency });
    });
  }

  render() {
    const { tickerData, fiatCurrency } = this.state;
    console.log('tickerData: ', tickerData);

    return (
      <section className="section section__markets">
        <Select
          options={FIAT_CURRENCIES}
          onChange={this.onFiatCurrencyChange}
        />
        <Ticker tickerData={tickerData} fiatCurrency={fiatCurrency} />
      </section>
    );
  }
}
