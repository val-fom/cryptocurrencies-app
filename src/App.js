import React, { Component, Fragment } from 'react';

import './App.css';

import Markets from './components/Markets';
import Converter from './components/Converter';
import ChartContainer from './components/ChartContainer';

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Markets />
        <Converter />
        <ChartContainer />
      </Fragment>
    );
  }
}
