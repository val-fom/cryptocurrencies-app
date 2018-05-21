import React from 'react';

const Prices = ({ prices, currency }) =>
  Object.keys(prices).map(coin => (
    <article className="markets__price" key={coin}>
      <header className="header">{coin}</header>
      <span className="span">{prices[coin][currency]}</span>
    </article>
  ));

export default Prices;
