import React from 'react';

const Ticker = ({ tickerData, currentFiatCurrency }) =>
  Object.keys(tickerData).map(coinId => (
    <article className="market" key={coinId}>
      <header className="market__header">{tickerData[coinId].name}</header>
      <span className="">
        {tickerData[coinId].quotes[currentFiatCurrency].price}
      </span>
    </article>
  ));

export default Ticker;
