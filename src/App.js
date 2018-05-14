import React, { Component, Fragment } from 'react';

import './App.css';

import Markets from './components/Markets';

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Markets />
      </Fragment>
    );
  }
}
