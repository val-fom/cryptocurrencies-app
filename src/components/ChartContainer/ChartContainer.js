import React from 'react';
import Chart from './Chart';

export default class ChartContainer extends React.Component {
  state = {
    period: 'day',
    coin: 'BTC',
    currency: 'USD',
  };

  render() {
    return (
      <Chart
        period={this.state.period}
        coin={this.state.coin}
        currency={this.state.currency}
      />
    );
  }
}
