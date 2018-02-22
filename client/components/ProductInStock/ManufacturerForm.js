import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Accordion, Icon, Button, Divider } from 'semantic-ui-react';

export default class ManufacturerForm extends Component {
  static propTypes = {
    onNextClicked: PropTypes.func,
  }
  static defaultProps = {
    onNextClicked: () => { },
  }
  state = { activeIndex: -1 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;
    const { onNextClicked } = this.props;
    return (
      <Form>
        <Form.Group widths="equal">
          <Form.Input fluid label="Company name" placeholder="Company name" />
        </Form.Group>
        <Accordion>
          <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
            <Icon name="dropdown" />
            New Company
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <Form.Group widths="equal">
              <Form.Input fluid label="Contact name" placeholder="Contact name" />
              <Form.Input fluid label="Phone number" placeholder="Phone number" />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input fluid label="Email" placeholder="Email" />
              <Form.Input fluid label="Address" placeholder="Address" />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input fluid label="Tax" placeholder="Tax" />
              <Form.Input fluid label="Website" placeholder="Website" />
            </Form.Group>
          </Accordion.Content>
        </Accordion>
        <Divider />
        <Button onClick={onNextClicked} positive>
          Next
          <Icon name="right arrow" />
        </Button>
      </Form>
    );
  }
}
