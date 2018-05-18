import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

import { getHistoricalData } from '../../../api';
import { chartDatasetBoilerplate } from '../../../constants';

export default class Chart extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    return null;
  }

  state = {
    labels: null,
    data: null,
  };

  componentDidMount() {
    // TODO: compontDidUpdate or getDerivedStateFromProps
    const { period, coin, currency } = this.props;

    getHistoricalData(period, coin, currency, 12, 30).then(result => {
      console.log('result: ', result);
      const data = [];
      const labels = [];

      result.Data.forEach(candle => {
        data.push(candle.close);
        labels.push(candle.time);
      });

      this.setState({ labels, data });
    });
  }

  componentDidUpdate() {}

  render() {
    const { labels, data } = this.state;

    return (
      <div>
        <h2>Chart</h2>
        <Line
          data={{ labels, datasets: [{ ...chartDatasetBoilerplate, data }] }}
        />
      </div>
    );
  }
}
