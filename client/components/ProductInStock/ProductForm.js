import React, { Component } from 'react';
import { Form, Accordion, Icon, Button, Segment, Divider } from 'semantic-ui-react';

export default class BuyForm extends Component {
  state = {}
  render() {
    return (
      <Form>
        <Form.Group widths="2">
          <Form.Input fluid label="Product category" placeholder="Product category" />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input fluid label="Product name" placeholder="Product name" />
          <Form.Input fluid label="Product code" placeholder="Product code" />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input fluid label="Product quantity" placeholder="Product quantity" />
          <Form.Input fluid label="Product unit" placeholder="Product unit" />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input fluid label="Product price" placeholder="Product price" />
          <Form.Input fluid label="Product retail price" placeholder="Product retail price" />
        </Form.Group>
        <Form.Input fluid label="Product image" type="file" placeholder="Product image" />
      </Form>
    );
  }
}
