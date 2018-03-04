import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Label, Icon } from 'semantic-ui-react';

import { IfComponent } from '../';
/* eslint-disable */
const propTypes = {
  isSingleChoice: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
};
const defaultProps = {
  isSingleChoice: true,
  value: null,
  onChange: () => { },
  onClear: () => { },
};

class AutoComplete extends React.Component {
  state = {
    isReadOnly: false,
  }
  componentWillMount() {
    this.state.isReadOnly = Boolean(this.props.isSingleChoice && this.props.value);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      isReadOnly: Boolean(nextProps.isSingleChoice && nextProps.value),
    })
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
    this.props.onClear();
  }
  render() {
    const componentProps = { ...this.props };
    delete componentProps.isSingleChoice;
    delete componentProps.onClear;
    return (
      <IfComponent
        condition={this.state.isReadOnly}
        whenTrue={
          <Label size="large" as="div" basic>{this.props.text}<Icon name="close" onClick={this.onReadOnlyRemoved} /></Label>
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
