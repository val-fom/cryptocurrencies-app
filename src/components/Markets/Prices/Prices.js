import React from 'react';
import './Prices.css';

const Prices = ({ prices, currency }) =>
  Object.keys(prices).map(coin => (
    <article className="price" key={coin}>
      <header className="price__header">{coin}</header>
      <span className="price__span">{prices[coin][currency]}</span>
    </article>
  ));

export default Prices;
