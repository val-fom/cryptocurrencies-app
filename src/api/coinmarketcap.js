import { status, json } from '../utils';

class ApiService {
  constructor() {
    this.DOMAIN = 'https://api.coinmarketcap.com';
    this.BASE_API_URL = `${this.DOMAIN}/v2`;
    this.END_POINTS = {
      ticker: 'ticker',
    };
  }

  // TODO: getTopTen refactor
  getTicker(currency) {
    const query = currency ? `?convert=${currency}&limit=10` : '?limit=10';
    return this._get(this.END_POINTS.ticker, query);
  }

  _get(endpoint, query) {
    const headers = new Headers({ accept: 'application/json' });
    return fetch(`${this.BASE_API_URL}/${endpoint}/${query}`, { headers })
      .then(status)
      .then(json)
      .catch(console.error);
  }
}

export const API_SERVICE = new ApiService();
