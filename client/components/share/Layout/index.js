import React from 'react';
import PropTypes from 'prop-types';

import './styles.styl';

const propTypes = {
  children: PropTypes.node,
};
const defaultProps = {
  children: null,
};

const Layout = ({ children }) => (
  <div className="layout layout--main">
    {children}
  </div>
);

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;
export default Layout;
