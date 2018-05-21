import React, { Component, Fragment } from 'react';

import './App.css';

import Markets from './components/Markets';
import Converter from './components/Converter';
import ChartContainer from './components/ChartContainer';
import Footer from './components/Footer';

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <div className="root__container">
          <Markets />
          <Converter />
          <ChartContainer />
        </div>
        <Footer />
      </Fragment>
    );
  }
}
