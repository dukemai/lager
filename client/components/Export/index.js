import React from 'react';
import PropTypes from 'prop-types';
import { Header, Grid, Segment, Form } from 'semantic-ui-react';

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
              <Segment.Group>
                <Segment>
                  <Header as="h4">
                    Customer Information
                  </Header>
                  <CustomerForm />
                </Segment>
                <Segment>
                  <Header as="h4">
                    Sale Information
                  </Header>
                  <SaleForm />
                </Segment>
                <Segment>
                  <Form.Button>Save</Form.Button>
                </Segment>
              </Segment.Group>
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

