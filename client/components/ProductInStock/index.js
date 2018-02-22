import React from 'react';
import PropTypes from 'prop-types';
import { Header, Grid, Tab, Breadcrumb, Checkbox, List, Segment } from 'semantic-ui-react';

import ManufacturerForm from './ManufacturerForm';
import ProductForm from './ProductForm';
import DistributorForm from './DistributorForm';

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

export default class ProductInStock extends React.Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  }
  render() {
    return (
      <AuthenticatedLayout>
        <Grid padded>
          <Grid.Row>
            <Grid.Column textAlign="left" width="16">
              <Breadcrumb sections={sections} />
              <Header textAlign="left" as="h2">
                New product to stock
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="left" width="10">
              <Tab
                menu={{
                  pointing: true,
                }}
                panes={[
                  {
                    menuItem: 'Manufacturer Information',
                    render: () => (
                      <Tab.Pane attached={false}>
                        <ManufacturerForm />
                      </Tab.Pane>
                    ),
                  },
                  {
                    menuItem: 'Distributor Information',
                    render: () => (
                      <Tab.Pane attached={false}>
                        <DistributorForm />
                      </Tab.Pane>
                    ),
                  },
                  {
                    menuItem: 'Product Information',
                    render: () => (
                      <Tab.Pane attached={false}>
                        <ProductForm />
                      </Tab.Pane>
                    ),
                  },
                ]}
              />
            </Grid.Column>
            <Grid.Column width="4">
              <Segment inverted color="olive">
                <List>
                  <List.Item>
                    <Checkbox toggle label="Remember company" />
                  </List.Item>
                  <List.Item>
                    <Checkbox toggle label="Remember distributor" />
                  </List.Item>
                  <List.Item>
                    <Checkbox toggle label="Remember category" />
                  </List.Item>
                </List>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </AuthenticatedLayout>
    );
  }
}

