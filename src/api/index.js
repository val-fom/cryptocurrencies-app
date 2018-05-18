import { status, json } from '../utils';

export const getTickerOfTopSix = currency =>
  fetch(
    `https://api.coinmarketcap.com/v2/ticker/${
      currency ? `?convert=${currency}&` : '?'
    }limit=6`
  )
    .then(status)
    .then(json)
    .catch(console.error);

export const getHistoricalData = ({ period, coin, currency }) => {
  let histoperiod;
  let limit;
  let aggregate;

  switch (period) {
    case 'Year':
      histoperiod = 'histoday';
      limit = '52';
      aggregate = '7';
      break;
    case 'Month':
      histoperiod = 'histoday';
      limit = '30';
      aggregate = '1';
      break;
    case 'Day':
      histoperiod = 'histohour';
      limit = '30';
      aggregate = '1';
      break;
    default:
      break;
  }

  return fetch(
    `https://min-api.cryptocompare.com/data/${histoperiod}?fsym=${coin}&tsym=${currency}&limit=${limit}&aggregate=${aggregate}`
  )
    .then(status)
    .then(json)
    .catch(console.error);
};
