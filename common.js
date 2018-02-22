import Validator from 'validatorjs';

export function validateCompany(company) {
  const rules = {
    name: 'required',
    email: 'required|email',
  };

  return new Validator(company, rules).passes();
}
