import React from 'react';

const Ticker = ({ tickerData, fiatCurrency }) =>
  Object.keys(tickerData).map(coinId => (
    <article className="market" key={coinId}>
      <header className="market__header">{tickerData[coinId].name}</header>
      <span className="">{tickerData[coinId].quotes[fiatCurrency].price}</span>
    </article>
  ));

export default Ticker;
