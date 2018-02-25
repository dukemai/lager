import Validator from 'validatorjs';

export function validateCompany(company) {
  const rules = {
    name: 'required',
    email: 'required|email',
  };

  return new Validator(company, rules).passes();
}

export function validateDistributor(input) {
  const rules = {
    name: 'required',
    email: 'required|email',
  };

  return new Validator(input, rules).passes();
}

export function validateCategory(input) {
  const rules = {
    name: 'required',
  };

  return new Validator(input, rules).passes();
}

export function validateUnit(input) {
  const rules = {
    name: 'required',
  };

  return new Validator(input, rules).passes();
}

export function validateProduct(input) {
  const rules = {
    name: 'required',
    code: 'required',
  };

  return new Validator(input, rules).passes();
}
