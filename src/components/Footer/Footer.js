import React from 'react';
import './Footer.css';

const Footer = () => (
  <div className="footer__container">
    <footer>
      <a
        href="https://github.com/val-fom/cryptocurrencies-app"
        className="footer__link footer__link-src"
      >
        src
      </a>
      <a
        href="https://min-api.cryptocompare.com"
        className="footer__link footer__link-api"
      >
        api
      </a>
    </footer>
  </div>
);

export default Footer;
