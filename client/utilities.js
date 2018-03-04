import formatCurrencyInternal from 'format-currency';
import parseNumInternal from 'parse-num';
import moment from 'moment';

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

export function formatDateTime(input) {
  return moment(input).format('YYYY-DD-MM');
}
