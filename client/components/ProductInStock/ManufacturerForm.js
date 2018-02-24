import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { find } from 'lodash';
import { Form, Accordion, Icon, Button, Divider } from 'semantic-ui-react';

import { AutoComplete } from '../share';
import { addCompany, getCompanies } from '../../server-interactions';
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
    isFetchingCompanies: false,
    companyId: '',
    companyName: '',
    contactName: '',
    companyPhoneNumber: '',
    companyEmail: '',
    companyAddress: '',
    companyTax: '',
    companyWebsite: '',
    companies: [],
    companySources: [],
  }
  componentWillMount() {
    const { token } = this.props;
    this.loadCompanies(token);
  }
  componentWillReceiveProps(nextProps) {
    const { token } = nextProps;
    this.loadCompanies(token);
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
  onCompanySelectionChange = (e, data) => {
    const { value } = data;
    const { companySources, companies } = this.state;
    const company = find(companies, { value });
    if (company) {
      const source = find(companySources, { _id: value });
      this.setState({
        companyId: value,
        companyName: company.text,
        contactName: source.contact,
        companyPhoneNumber: source.phoneNumber,
        companyEmail: source.email,
        companyAddress: source.address,
        companyTax: source.tax,
        companyWebsite: source.website,
      });
    } else {
      this.setState({
        companyId: value,
        companyName: company.text,
      });
    }
  }
  loadCompanies = (token) => {
    if (token) {
      this.setState({
        isFetchingCompanies: true,
      });
      getCompanies(token)
        .then((response) => {
          const companies = response.companies.map(doc => ({
            key: doc._id,
            text: doc.name,
            value: doc._id,
          }));
          this.setState({
            isFetchingCompanies: false,
            companies,
            companySources: response.companies,
          });
        })
        .catch((error) => {
          this.setState({
            isFetchingCompanies: false,
          });
        });
    }
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
      companyEmail, companyTax, companyWebsite, isFetchingCompanies,
      companyId,
    } = this.state;
    const isNewCompany = !Boolean(companyId);
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
              onChange={this.onCompanySelectionChange}
              disabled={isSaving}
              loading={isFetchingCompanies}
            />
          </Form.Field>
        </Form.Group>
        <Accordion>
          <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
            <Icon name="dropdown" />
            {isNewCompany ? 'New company' : 'View company information'}
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="Contact name"
                placeholder="Contact name"
                value={contactName}
                onChange={(event, { value }) => { this.onInputChanged('contactName', value); }}
                disabled={isSaving || !isNewCompany}
              />
              <Form.Input
                fluid
                label="Phone number"
                placeholder="Phone number"
                value={companyPhoneNumber}
                onChange={(event, { value }) => { this.onInputChanged('companyPhoneNumber', value); }}
                disabled={isSaving || !isNewCompany}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="Email"
                placeholder="Email"
                value={companyEmail}
                onChange={(event, { value }) => { this.onInputChanged('companyEmail', value); }}
                disabled={isSaving || !isNewCompany}
              />
              <Form.Input
                fluid
                label="Address"
                placeholder="Address"
                disabled={isSaving || !isNewCompany}
                value={companyAddress}
                onChange={(event, { value }) => { this.onInputChanged('companyAddress', value); }}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                disabled={isSaving || !isNewCompany}
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
                disabled={isSaving || !isNewCompany}
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
