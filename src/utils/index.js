export const status = res => {
  if (res.ok || res.status === 400) return res;
  console.log('response:', res);
  throw new Error(res.statusText);
};

export const json = res => res.json();

export const convert = (amount, price) => {
  const input = parseFloat(amount);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = input * price;
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
};
