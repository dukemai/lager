import React, { Component } from 'react';
import { Form, Accordion, Icon, Button, Divider } from 'semantic-ui-react';

export default class DistributorForm extends Component {
  state = { activeIndex: -1 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;
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
            </Form.Group>
            <Form.Input fluid label="Phone number" placeholder="Phone number" />
            <Form.Input fluid label="Email" placeholder="Email" />
            <Form.Input fluid label="Address" placeholder="Address" />
            <Form.Input fluid label="Company" placeholder="Company" />
            <Form.Input fluid label="Tax" placeholder="Tax" />
          </Accordion.Content>
        </Accordion>
        <Divider />
        <Button positive>
          Next
          <Icon name="right arrow" />
        </Button>
      </Form>
    );
  }
}
