import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon, Grid, Header, Table, Label, Sidebar, Segment, Image, Form, Button } from 'semantic-ui-react';

import { AuthenticatedLayout } from '../share';

const propTypes = {
};
const defaultProps = {
};

class Inspect extends React.Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  state = { activeIndex: 0, visible: false, }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  }
  handleItemClick = () => {
    this.setState({
      visible: !this.state.visible,
    })
  }
  render() {
    const { activeItem, visible } = this.state;
    return (
      <AuthenticatedLayout>
        <Menu icon>
          <Menu.Menu position="right">
            <Menu.Item name="signup" active={activeItem === 'signup'} onClick={this.handleItemClick}>
              <Icon name="plus" />
              Add Product
            </Menu.Item>
            <Menu.Item name="signup" active={activeItem === 'signup'} onClick={this.handleItemClick}>
              <Icon name="user plus" />
              Add Company
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <Grid padded>
          <Grid.Row>
            <Grid.Column textAlign="left" width="16">
              <Header textAlign="left" as="h2">
                Stock
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="left" width="16">
              <Sidebar.Pushable as={Segment}>
                <Sidebar inverted direction='right' animation='overlay' width="very wide" as={Segment} visible={visible} icon='labeled' vertical inverted>
                  <Segment inverted>
                  <Form inverted>
                    <Form.Field>
                      <label>First Name</label>
                      <input placeholder='First Name' />
                    </Form.Field>
                    <Form.Field>
                      <label>Last Name</label>
                      <input placeholder='Last Name' />
                    </Form.Field>
                    <Button type='submit'>Submit</Button>
                  </Form>
                  </Segment>
                </Sidebar>
                <Sidebar.Pusher>
                  <Segment basic>
                    <Table celled>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Header</Table.HeaderCell>
                          <Table.HeaderCell>Header</Table.HeaderCell>
                          <Table.HeaderCell>Header</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>

                      <Table.Body>
                        <Table.Row>
                          <Table.Cell>
                            <Label ribbon>First</Label>
                          </Table.Cell>
                          <Table.Cell>Cell</Table.Cell>
                          <Table.Cell>Cell</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>Cell</Table.Cell>
                          <Table.Cell>Cell</Table.Cell>
                          <Table.Cell>Cell</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>Cell</Table.Cell>
                          <Table.Cell>Cell</Table.Cell>
                          <Table.Cell>Cell</Table.Cell>
                        </Table.Row>
                      </Table.Body>

                      <Table.Footer>
                        <Table.Row>
                          <Table.HeaderCell colSpan='3'>
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
                  </Segment>
                </Sidebar.Pusher>
              </Sidebar.Pushable>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </AuthenticatedLayout>
    );
  }
}

Inspect.propTypes = propTypes;
Inspect.defaultProps = defaultProps;
export default Inspect;
