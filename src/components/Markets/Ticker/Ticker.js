import React from 'react';
import './Ticker.css';

const Ticker = ({ tickerData, currentFiatCurrency }) =>
  Object.keys(tickerData).map(coinId => (
    <article className="ticker" key={coinId}>
      <header className="ticker__header">{tickerData[coinId].name}</header>
      <span className="ticker__price">
        {tickerData[coinId].quotes[currentFiatCurrency].price
          .toString()
          .slice(0, 9)}
      </span>
    </article>
  ));

export default Ticker;
