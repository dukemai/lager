import Validator from 'validatorjs';
import PhoneNumber from 'awesome-phonenumber';

Validator.register('telephone', (value, requirement, attribute) => { // requirement parameter defaults to null
  return new PhoneNumber(value).isValid() || /\d+/.test(value);
}, 'The :attribute phone number is not in the format XXX-XXX-XXXX.');

export function validateCompany(company) {
  const rules = {
    name: 'required',
    email: 'required|email',
    phoneNumber: 'telephone',
  };

  return new Validator(company, rules);
}

export function validateDistributor(company) {
  const rules = {
    name: 'required',
    email: 'required|email',
    phoneNumber: 'telephone',
  };

  return new Validator(company, rules);
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

export function validateProductInStock(input) {
  const rules = {
    price: 'required',
    retailPrice: 'required',
    productId: 'required',
  };

  return new Validator(input, rules).passes();
}


export function validateNewProductClientSide(input) {
  const rules = {
    productName: 'required',
    productCode: 'required',
    productQuantity: 'required|numeric',
    productUnit: 'required',
    productPrice: 'required|numeric',
    productRetailPrice: 'required|numeric',
    companyId: 'required',
    distributorId: 'required',
  };

  return new Validator(input, rules);
}
