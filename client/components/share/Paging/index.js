import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Menu } from 'semantic-ui-react';

const propTypes = {
  totalPages: PropTypes.number,
};
const defaultProps = {
  totalPages: 0,
};

const toPageNumberArray = (total) => {
  const arr = [];
  for (let index = 0; index < total; index++) {
    arr.push(index + 1);
  }
  return arr;
};

const Paging = ({ totalPages }) => (
  totalPages && (
    <Menu floated="right" pagination>
      <Menu.Item as="a" icon>
        <Icon name="left chevron" />
      </Menu.Item>
      {
        toPageNumberArray(totalPages).map(item => (
          <Menu.Item key={item} as="a">{item}</Menu.Item>
        ))
      }
      <Menu.Item as="a" icon>
        <Icon name="right chevron" />
      </Menu.Item>
    </Menu>
  )
);

Paging.propTypes = propTypes;
Paging.defaultProps = defaultProps;
export default Paging;
