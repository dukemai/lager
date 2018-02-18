import React from 'react';
import PropTypes from 'prop-types';
import { Header, Grid, Tab } from 'semantic-ui-react';

import { AuthenticatedLayout } from '../share';
import SaleForm from './SaleForm';
import CustomerForm from './CustomerForm';
import SaleList from './SaleList';

const propTypes = {
};
const defaultProps = {
};


export default class Export extends React.Component {
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
            <section>
              <Header textAlign="left" as="h2">
                Sell
              </Header>
            </section>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="left" width="8">
              <Tab
                menu={{
                  secondary: true,
                  pointing: true,
                }}
                panes={[
                  {
                    menuItem: 'Customer Information',
                    render: () => (
                      <Tab.Pane attached={false}>
                        <CustomerForm />
                      </Tab.Pane>
                    ),
                  },
                  {
                    menuItem: 'Sale Information',
                    render: () => (
                      <Tab.Pane attached={false}>
                        <SaleForm />
                      </Tab.Pane>
                    ),
                  },
                ]}
              />
            </Grid.Column>
            <Grid.Column textAlign="left" width="8">
              <SaleList />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </AuthenticatedLayout>
    );
  }
}

