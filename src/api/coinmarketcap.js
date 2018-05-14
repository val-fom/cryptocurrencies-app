import { status, json } from '../utils';

class ApiService {
  constructor() {
    this.DOMAIN = 'https://api.coinmarketcap.com';
    this.BASE_API_URL = `${this.DOMAIN}/v2`;
    this.END_POINTS = {
      ticker: 'ticker',
    };
  }

  getTicker(currency) {
    const queries = currency ? `?convert=${currency}&limit=6` : '?limit=6';
    return this._get(this.END_POINTS.ticker, queries);
  }

  _get(endpoint, queries) {
    const headers = new Headers({ accept: 'application/json' });
    return fetch(`${this.BASE_API_URL}/${endpoint}/${queries}`, { headers })
      .then(status)
      .then(json)
      .catch(console.error);
  }
}

export const API_SERVICE = new ApiService();
