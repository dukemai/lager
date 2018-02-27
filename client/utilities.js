import formatCurrencyInternal from 'format-currency';
import parseNumInternal from 'parse-num';

export function validateEmail(input) {
  return Boolean(input);
}

export function validatePassword(input) {
  return Boolean(input);
}

export function validatePhoneNumber(input) {
  return Boolean(input);
}

export function formatCurrency(input) {
  return formatCurrencyInternal(input, {
    format: '%v',
    symbol: '$',
    locale: 'en-US',
  });
}

export function parseNumber(input) {
  return input ? parseNumInternal(input) : 0;
}
