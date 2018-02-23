import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Label, Icon } from 'semantic-ui-react';

import { IfComponent } from '../';
/* eslint-disable */
const propTypes = {
  isSingleChoice: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
};
const defaultProps = {
  isSingleChoice: true,
  value: null,
  onChange: () => {},
};

class AutoComplete extends React.Component {
  state = {
    isReadOnly: false,
  }
  onReadOnlyAdded = () => {
    this.setState({
      isReadOnly: this.props.isSingleChoice,
    });
  }
  onReadOnlyRemoved = () => {
    this.setState({
      isReadOnly: false,
    });
  }
  render() {
    const componentProps = { ...this.props };
    delete componentProps.isSingleChoice;
    return (
      <IfComponent
        condition={this.state.isReadOnly}
        whenTrue={
          <Label>{this.props.value}<Icon name="delete" onClick={this.onReadOnlyRemoved} /></Label>
        }
        whenFalse={
          <Dropdown
            {...componentProps}
            onAddItem={(event, data) => {
              this.onReadOnlyAdded();
              this.props.onAddItem(event, data);
            }}
            onChange={(event, data) => {
              this.onReadOnlyAdded();
              this.props.onChange(event, data);
            }}
          />
        }
      />
    );
  }
}

AutoComplete.propTypes = propTypes;
AutoComplete.defaultProps = defaultProps;
export default AutoComplete;
