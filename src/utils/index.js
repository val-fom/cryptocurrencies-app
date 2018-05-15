export const status = res => {
  if (res.ok || res.status === 400) return res;
  console.log('response:', res);
  throw new Error(res.statusText);
};

export const json = res => res.json();

// TODO: refactor to 'extract priceList'
export const getFilteredTickerData = (tickerData, allowedData) =>
  Object.keys(tickerData)
    .filter(coinId => allowedData.includes(tickerData[coinId].name))
    .reduce((obj, key) => {
      obj[key] = tickerData[key];
      return obj;
    }, {});

export const mapTickerDataByName = tickerData =>
  Object.keys(tickerData).reduce((obj, key) => {
    obj[tickerData[key].name] = tickerData[key];
    return obj;
  }, {});

export const convert = (amount, price) => {
  const input = parseFloat(amount);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = input * price;
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
};
