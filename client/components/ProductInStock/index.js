import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header, Breadcrumb, Form } from 'semantic-ui-react';

import { AuthenticatedLayout } from '../share';


const propTypes = {
};
const defaultProps = {
};

const sections = [
  {
    key: 'inspect', content: 'Inspect', link: true, href: '/inspect',
  },
  { key: 'new-product', content: 'Add product', active: true },
];

class ProductInStock extends React.Component {
  state = {

  }
  render() {
    return (
      <AuthenticatedLayout>
        <Grid padded>
          <Grid.Row>
            <Grid.Column textAlign="left" width="16">
              <Breadcrumb sections={sections} />
              <Header textAlign="left" as="h2">
                Add new product to Stock
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="left" width="10">
              <Form>
                <Form.Group widths="equal">
                  <Form.Input fluid label="Product code" placeholder="Product code" />
                  <Form.Input fluid label="Product name" placeholder="Product name" />
                </Form.Group>
                <Form.Input fluid label="Product category" placeholder="Product category" />
                <Form.Group widths="equal">
                  <Form.Input fluid label="Product price" placeholder="Product price" />
                  <Form.Input fluid label="Product quantity" placeholder="Product quantity" />
                </Form.Group>
                <Form.Input fluid label="Product unit" placeholder="Product unit" />
                <Form.Input fluid label="Date time" placeholder="Date time" />
                <Form.Group widths="equal">
                  <Form.Input fluid label="Contact name" placeholder="Contact name" />
                </Form.Group>
                <Form.Input fluid label="Phone number" placeholder="Phone number" />
                <Form.Input fluid label="Email" placeholder="Email" />
                <Form.Input fluid label="Address" placeholder="Address" />
                <Form.Input fluid label="Company" placeholder="Company" />
                <Form.Input fluid label="Tax" placeholder="Tax" />
                <Form.Checkbox label="I agree to the Terms and Conditions" />
                <Form.Button>Submit</Form.Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </AuthenticatedLayout>
    );
  }
}

ProductInStock.propTypes = propTypes;
ProductInStock.defaultProps = defaultProps;
export default ProductInStock;
