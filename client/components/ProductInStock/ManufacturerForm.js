import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Accordion, Icon, Button, Divider, Dropdown, Label } from 'semantic-ui-react';

import { AutoComplete } from '../share';
import { addCompany } from '../../server-interactions';
import { setCompanyForProduct } from '../../actions';

class ManufacturerForm extends Component {
  static propTypes = {
    onNextClicked: PropTypes.func,
    companyName: PropTypes.string,
    token: PropTypes.string,
    setCompanyInformation: PropTypes.func,
  }
  static defaultProps = {
    onNextClicked: () => { },
    companyName: '',
    token: '',
    setCompanyInformation: () => { },
  }
  state = {
    activeIndex: -1,
    isSaving: false,
    companyId: '0',
    companyName: 'Thien Long',
    contactName: 'Duc Mai',
    companyPhoneNumber: '0985354437',
    companyEmail: 'contact@thienlong.org',
    companyAddress: 'hochiminh, VietNam',
    companyTax: '42342432',
    companyWebsite: 'thienlong.company',
    companies: [{
      key: 'Thien Long',
      text: 'Thien Long',
      value: 'Thien Long',
    }],
  }
  onInputChanged = (field, value) => {
    const { state } = this;
    state[field] = value;
    this.setState({
      ...state,
    });
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
    const {
      companyName, companyId,
      contactName, companyPhoneNumber, companyAddress,
      companyEmail, companyTax, companyWebsite,
    } = this.state;
    this.props.setCompanyInformation(companyId, companyName);
    this.props.onNextClicked();
    return;
    this.setState({
      isSaving: true,
    });

    addCompany(
      this.props.token, companyName, contactName, companyPhoneNumber,
      companyEmail, companyAddress, companyTax, companyWebsite,
    )
      .then((response) => {
        this.setState({
          isSaving: false,
        });
        this.props.onNextClicked();
      })
      .catch((error) => {
        this.setState({
          isSaving: false,
        });
      });
  }
  render() {
    const {
      activeIndex, isSaving, companyName, companies,
      contactName, companyPhoneNumber, companyAddress,
      companyEmail, companyTax, companyWebsite,
    } = this.state;
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
              onChange={(event, { value }) => { this.onInputChanged('companyName', value); }}
              disabled={isSaving}
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
              <Form.Input
                fluid
                label="Contact name"
                placeholder="Contact name"
                value={contactName}
                onChange={(event, { value }) => { this.onInputChanged('contactName', value); }}
                disabled={isSaving}
              />
              <Form.Input
                fluid
                label="Phone number"
                placeholder="Phone number"
                value={companyPhoneNumber}
                onChange={(event, { value }) => { this.onInputChanged('companyPhoneNumber', value); }}
                disabled={isSaving}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="Email"
                placeholder="Email"
                value={companyEmail}
                onChange={(event, { value }) => { this.onInputChanged('companyEmail', value); }}
                disabled={isSaving}
              />
              <Form.Input
                fluid
                label="Address"
                placeholder="Address"
                disabled={isSaving}
                value={companyAddress}
                onChange={(event, { value }) => { this.onInputChanged('companyAddress', value); }}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                disabled={isSaving}
                fluid
                label="Tax"
                placeholder="Tax"
                value={companyTax}
                onChange={(event, { value }) => { this.onInputChanged('companyTax', value); }}
              />
              <Form.Input
                fluid
                label="Website"
                placeholder="Website"
                disabled={isSaving}
                value={companyWebsite}
                onChange={(event, { value }) => { this.onInputChanged('companyWebsite', value); }}
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

const mapStateToProps = state => ({
  token: state.app.token,
});

const mapDispatchToProps = dispatch => ({
  setCompanyInformation: (companyId, companyName) => {
    dispatch(setCompanyForProduct(companyId, companyName));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ManufacturerForm);
