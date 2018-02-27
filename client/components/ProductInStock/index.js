import React from 'react';
import PropTypes from 'prop-types';
import { Header, Grid, Tab } from 'semantic-ui-react';

import ManufacturerForm from './ManufacturerForm';
import ProductForm from './ProductForm';
import DistributorForm from './DistributorForm';
import RightPanel from './RightPanel';

import { AuthenticatedLayout } from '../share';
import './styles.styl';

const propTypes = {
};
const defaultProps = {
};

export default class ProductInStock extends React.Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  state = {
    activeIndex: 2,
  }
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
            <Grid.Column className="productInStock" textAlign="left" width="12">
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
              <RightPanel />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </AuthenticatedLayout>
    );
  }
}

