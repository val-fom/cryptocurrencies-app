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

export const getHistoricalData = (period, coin, currency, limit, aggregate) =>
  fetch(
    `https://min-api.cryptocompare.com/data/histo${period}?fsym=${coin}&tsym=${currency}&limit=${limit}&aggregate=${aggregate}`
  )
    .then(status)
    .then(json)
    .catch(console.error);
