import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  component: PropTypes.func,
  label: PropTypes.string,
  field: PropTypes.string,
  onChange: PropTypes.func,
};
const defaultProps = {
  component: () => {},
  label: PropTypes.string,
  field: PropTypes.string,
  onChange: () => {},
};
const FormInput = (props) => {
  const {
    component, label, field, onChange,
  } = props;
  const componentProps = {
    ...props,
    onChange: (e, { value }) => { onChange(field, value); },
    label,
    placeHolder: label,
  };
  delete componentProps.component;
  delete componentProps.field;
  return React.createElement(component, componentProps);
};

FormInput.propTypes = propTypes;
FormInput.defaultProps = defaultProps;
export default FormInput;
