import React from 'react';
import PropTypes from 'prop-types';
import { Header, Grid, Tab } from 'semantic-ui-react';

import DistributorForm from './DistributorForm';
import BuyForm from './BuyForm';

import { AuthenticatedLayout } from '../share';

const propTypes = {
};
const defaultProps = {
};


export default class Import extends React.Component {
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
                Buy
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
                        <BuyForm />
                      </Tab.Pane>
                    ),
                  },
                ]}
              />
            </Grid.Column>
            <Grid.Column textAlign="left" width="8">
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </AuthenticatedLayout>
    );
  }
}

