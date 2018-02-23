import React from 'react';
import PropTypes from 'prop-types';
import {
  Header, Grid, Tab, Checkbox, List,
  Segment, Divider, Progress, Button, Sticky,
} from 'semantic-ui-react';

import ManufacturerForm from './ManufacturerForm';
import ProductForm from './ProductForm';
import DistributorForm from './DistributorForm';

import { AuthenticatedLayout } from '../share';

const propTypes = {
};
const defaultProps = {
};

export default class ProductInStock extends React.Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  state = { activeIndex: 0 }
  onTabChanged = (event, data) => {
    this.setState({
      activeIndex: data.activeIndex,
    });
  }
  onNextTabClicked = () => {
    this.setState({
      activeIndex: this.state.activeIndex + 1,
    });
  }
  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  }
  render() {
    const { activeIndex } = this.state;
    return (
      <AuthenticatedLayout>
        <Grid padded>
          <Grid.Row>
            <Grid.Column textAlign="left" width="16">
              <Header textAlign="left" as="h2">
                <Header.Content>
                  New product to stock
                </Header.Content>
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="left" width="12">
              <Tab
                activeIndex={activeIndex}
                onTabChange={this.onTabChanged}
                menu={{
                  pointing: true,
                }}
                panes={[
                  {
                    menuItem: 'Manufacturer Information',
                    render: () => (
                      <Tab.Pane color="teal" attached={false}>
                        <ManufacturerForm onNextClicked={this.onNextTabClicked} />
                      </Tab.Pane>
                    ),
                  },
                  {
                    menuItem: 'Distributor Information',
                    render: () => (
                      <Tab.Pane color="green" attached={false}>
                        <DistributorForm onNextClicked={this.onNextTabClicked} />
                      </Tab.Pane>
                    ),
                  },
                  {
                    menuItem: 'Product Information',
                    render: () => (
                      <Tab.Pane color="violet" attached={false}>
                        <ProductForm />
                      </Tab.Pane>
                    ),
                  },
                ]}
              />
            </Grid.Column>
            <Grid.Column width="4">
              <Sticky>
                <Segment color="olive">
                  <Button positive>
                    Save Product
                  </Button>
                </Segment>
                <Segment color="olive">
                  <List>
                    <List.Item>
                      <Checkbox label="Remember company" />
                      <Divider />
                    </List.Item>
                    <List.Item>
                      <Checkbox label="Remember distributor" />
                      <Divider />
                    </List.Item>
                    <List.Item>
                      <Checkbox label="Remember category" />
                    </List.Item>
                  </List>
                </Segment>
                <Segment>
                  <Progress color="blue" size="small" percent={33.3} active>
                    Creating product
                  </Progress>
                </Segment>
              </Sticky>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </AuthenticatedLayout>
    );
  }
}

