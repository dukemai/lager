import React from 'react';
import PropTypes from 'prop-types';
import { Header, Grid, Tab, Sticky, Segment, Button, Icon } from 'semantic-ui-react';

import DistributorForm from './DistributorForm';
import BuyForm from './BuyForm';
import BuyList from './BuyList';

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
            <Grid.Column textAlign="left" width="16">
              <Header textAlign="left" as="h2">
                Buy
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="left" width="6">
              <Tab
                menu={{
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
            <Grid.Column textAlign="left" width="6">
              <BuyList />
            </Grid.Column>
            <Grid.Column width="4">
              <Sticky>
                <Segment color="olive">
                  <Button icon color="teal" labelPosition="left">
                    <Icon name="print" />
                    Print
                  </Button>
                </Segment>
              </Sticky>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </AuthenticatedLayout>
    );
  }
}

