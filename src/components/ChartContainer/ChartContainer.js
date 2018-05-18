import React, { Component } from 'react';

import Chart from './Chart';
import Select from '../UI/Select';

import { FIAT_CURRENCIES, CRYPTO_CURRENCIES, PERIODS } from '../../constants';

export default class ChartContainer extends Component {
  state = {
    period: 'Day',
    coin: 'BTC',
    currency: 'USD',
  };

  onPeriodChange = period => this.setState({ period });
  onCoinChange = coin => this.setState({ coin });
  onCurrencyChange = currency => this.setState({ currency });

  render() {
    return (
      <section className="section chart__section">
        <Select
          placeHolder="Choose period..."
          options={PERIODS}
          onChange={this.onPeriodChange}
        />
        <Select
          placeHolder="Choose coin..."
          options={CRYPTO_CURRENCIES}
          onChange={this.onCoinChange}
        />
        <Select
          placeHolder="Choose currency..."
          options={FIAT_CURRENCIES}
          onChange={this.onCurrencyChange}
        />
        <Chart queryOptions={{ ...this.state }} />
      </section>
    );
  }
}
