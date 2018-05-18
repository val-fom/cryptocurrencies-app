import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

import * as api from '../../../api';
import { chartDatasetBoilerplate, MONTH_NAMES } from '../../../constants';

export default class Chart extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    return prevState.id !== nextProps.id ? { id: nextProps.id } : null;
  }

  state = {
    chartData: null,
    id: null,
  };

  componentDidMount() {
    this._getChartData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.id !== this.props.id) this._getChartData();
  }

  _getChartData() {
    const { queryOptions } = this.props;

    api.getHistoricalData(queryOptions).then(result => {
      const data = [];
      const labels = [];

      result.Data.forEach(candle => {
        const date = new Date(candle.time * 1000);
        let label;
        switch (queryOptions.period) {
          case 'Year':
            label = `${date.getDate()} ${MONTH_NAMES[date.getMonth()]}`;
            break;
          case 'Month':
            label = `${date.getDate()} ${MONTH_NAMES[date.getMonth()]}`;
            break;
          case 'Day':
            label = `${date.getHours()}:00`;
            break;
          default:
            break;
        }

        data.push(candle.close);
        labels.push(label);
      });

      this.setState({ chartData: { labels, data } });
    });
  }

  render() {
    if (!this.state.chartData) return null;

    const { labels, data } = this.state.chartData;

    return (
      <Line
        data={{ labels, datasets: [{ ...chartDatasetBoilerplate, data }] }}
        options={{ legend: { display: false } }}
      />
    );
  }
}
