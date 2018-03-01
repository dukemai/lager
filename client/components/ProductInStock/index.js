import React from 'react';
import PropTypes from 'prop-types';
import { Header, Grid, Tab } from 'semantic-ui-react';
import { connect } from 'react-redux';

import ManufacturerForm from './ManufacturerForm';
import ProductForm from './ProductForm';
import DistributorForm from './DistributorForm';
import RightPanel from './RightPanel';

import { AuthenticatedLayout } from '../share';
import { selectTab } from '../../actions';
import './styles.styl';

const propTypes = {
  activeTab: PropTypes.number,
  setTab: PropTypes.func,
};
const defaultProps = {
  activeTab: 0,
  setTab: () => {},
};

class ProductInStock extends React.Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  onTabChanged = (event, data) => {
    this.props.setTab(data.activeIndex);
  }
  onNextTabClicked = () => {
    this.props.setTab(this.props.activeTab + 1);
  }
  render() {
    const { activeTab } = this.props;
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
                activeIndex={activeTab}
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

const mapStateToProps = state => ({
  activeTab: state.addProductToStock.activeTab,
});

const mapDispatchToProps = dispatch => ({
  setTab: (tabIdex) => {
    dispatch(selectTab(tabIdex));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductInStock);
