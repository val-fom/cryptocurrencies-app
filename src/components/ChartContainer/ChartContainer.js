import React, { Component } from 'react';

import Chart from './Chart';
import Select from '../UI/Select';

import { FIAT_CURRENCIES, CRYPTO_CURRENCIES, PERIODS } from '../../constants';

export default class ChartContainer extends Component {
  state = {
    period: 'Day',
    coin: 'BTC',
    currency: 'USD',
    id: 0,
  };

  onPeriodChange = period => this.setState({ period, id: this.state.id + 1 });
  onCoinChange = coin => this.setState({ coin, id: this.state.id + 1 });
  onCurrencyChange = currency =>
    this.setState({ currency, id: this.state.id + 1 });

  render() {
    const { period, coin, currency, id } = this.state;

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
        <Chart queryOptions={{ period, coin, currency }} id={id} />
      </section>
    );
  }
}
