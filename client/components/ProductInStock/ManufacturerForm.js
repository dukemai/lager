import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Accordion, Icon, Button, Divider, Dropdown, Label } from 'semantic-ui-react';

import { AutoComplete } from '../share';

export default class ManufacturerForm extends Component {
  static propTypes = {
    onNextClicked: PropTypes.func,
    companyName: PropTypes.string,
  }
  static defaultProps = {
    onNextClicked: () => { },
    companyName: '',
  }
  state = {
    activeIndex: -1,
    isSaving: false,
    companyName: '',
    companies: [],
    isReadOnly: false,
  }
  onNewCompanyAdded = (e, { value }) => {
    const companyName = value;
    this.setState({
      companyName,
      companies: [...this.state.companies, {
        key: companyName,
        text: companyName,
        value: companyName,
      }],
      activeIndex: 0,
      isReadOnly: true,
    });
  }
  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  }
  nextClicked = () => {
    this.setState({
      isSaving: true,
    });
  }
  render() {
    const {
      activeIndex, isSaving, companyName, companies, isReadOnly
    } = this.state;
    const { onNextClicked } = this.props;
    return (
      <Form>
        <Form.Group widths="2">
          <Form.Field>
            <label>Company name</label>
            <AutoComplete
              allowAdditions
              additionLabel="Add "
              placeholder="Company name"
              fluid
              search
              selection
              options={companies}
              noResultsMessage="No company found"
              value={companyName}
              onAddItem={this.onNewCompanyAdded}
              deburr
              readOnly
            />
          </Form.Field>
        </Form.Group>
        <Accordion>
          <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
            <Icon name="dropdown" />
            New Company
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <Form.Group widths="equal">
              <Form.Input fluid label="Contact name" placeholder="Contact name" />
              <Form.Input fluid label="Phone number" placeholder="Phone number" />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input fluid label="Email" placeholder="Email" />
              <Form.Input fluid label="Address" placeholder="Address" />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                disabled={isSaving}
                fluid
                label="Tax"
                placeholder="Tax"
              />
              <Form.Input
                fluid
                label="Website"
                placeholder="Website"
                disabled={isSaving}
              />
            </Form.Group>
          </Accordion.Content>
        </Accordion>
        <Divider />
        <Button loading={isSaving} onClick={this.nextClicked} positive>
          Next
          <Icon name="right arrow" />
        </Button>
      </Form>
    );
  }
}
