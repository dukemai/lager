import React, { Component } from 'react';
import { Form, Accordion, Icon } from 'semantic-ui-react';

export default class SaleForm extends Component {
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
          <Form.Input fluid label="Product name" placeholder="Product name" />
          <Form.Input fluid label="Product code" placeholder="Product code" />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input fluid label="Product price" placeholder="Product price" />
          <Form.Input fluid label="Product quality" placeholder="Product quality" />
        </Form.Group>
        <Form.Input fluid label="Product promotion" placeholder="Product promotion" />
        <Accordion>
          <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
            <Icon name="dropdown" />
            New Product
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <Form.Input fluid label="Product category" placeholder="Product category" />
            <Form.Input fluid label="Producer" placeholder="Producer" />
            <Form.Input fluid label="Distributor" placeholder="Distributor" />
          </Accordion.Content>
        </Accordion>
      </Form>
    );
  }
}
