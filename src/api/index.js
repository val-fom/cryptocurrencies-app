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
