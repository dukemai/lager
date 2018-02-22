import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import { Menu, Icon, Grid, Header, Table, Sticky, Segment, Progress, Checkbox, Button, Divider } from 'semantic-ui-react';

import { AuthenticatedLayout } from '../share';
import './styles.styl';

const propTypes = {
  newStockProductClicked: PropTypes.func,
  newStockCompanyClicked: PropTypes.func,
};
const defaultProps = {
  newStockCompanyClicked: () => {},
  newStockProductClicked: () => {},
};

class Inspect extends React.Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  state = {
  }

  render() {
    const { newStockProductClicked, newStockCompanyClicked } = this.props;
    return (
      <AuthenticatedLayout>
        <Grid padded>
          <Grid.Row>
            <Grid.Column textAlign="left" width="12">
              <Header textAlign="left" as="h2">
                Stock
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="left" width="12">
              <Table className="inspectScreen__table" celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Product code</Table.HeaderCell>
                    <Table.HeaderCell>Product title</Table.HeaderCell>
                    <Table.HeaderCell>Category</Table.HeaderCell>
                    <Table.HeaderCell>Quantity</Table.HeaderCell>
                    <Table.HeaderCell>Unit</Table.HeaderCell>
                    <Table.HeaderCell>Import Price</Table.HeaderCell>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.HeaderCell>Distributor</Table.HeaderCell>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      TL027
                    </Table.Cell>
                    <Table.Cell>Thien Long 027</Table.Cell>
                    <Table.Cell>But</Table.Cell>
                    <Table.Cell>10</Table.Cell>
                    <Table.Cell>Thung</Table.Cell>
                    <Table.Cell>3.000</Table.Cell>
                    <Table.Cell>4.000</Table.Cell>
                    <Table.Cell>Thien Long</Table.Cell>
                    <Table.Cell>Feb-21 22.38</Table.Cell>
                  </Table.Row>
                </Table.Body>

                <Table.Footer>
                  <Table.Row>
                    <Table.HeaderCell colSpan="9">
                      <Menu floated='right' pagination>
                        <Menu.Item as='a' icon>
                          <Icon name='left chevron' />
                        </Menu.Item>
                        <Menu.Item as='a'>1</Menu.Item>
                        <Menu.Item as='a'>2</Menu.Item>
                        <Menu.Item as='a'>3</Menu.Item>
                        <Menu.Item as='a'>4</Menu.Item>
                        <Menu.Item as='a' icon>
                          <Icon name='right chevron' />
                        </Menu.Item>
                      </Menu>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Footer>
              </Table>
            </Grid.Column>
            <Grid.Column width="4">
              <Sticky>
                <Segment color="olive">
                  <Button onClick={newStockProductClicked} icon positive labelPosition="left">
                    <Icon name="plus" />
                    Product
                  </Button>
                  <Divider />
                  <Button onClick={newStockCompanyClicked} color="teal" icon labelPosition="left">
                    <Icon name="plus" />
                    Company
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

Inspect.propTypes = propTypes;
Inspect.defaultProps = defaultProps;

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  newStockProductClicked: () => {
    dispatch(push('/inspect/new-product'));
  },
  newStockCompanyClicked: () => {
    dispatch(push('/inspect/new-company'));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Inspect);
