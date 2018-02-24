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
    companyId: PropTypes.string,
  }
  static defaultProps = {
    onNextClicked: () => { },
    companyName: '',
    token: '',
    setCompanyInformation: () => { },
    companyId: '',
  }
  initialCompanyState = {
    companyId: '',
    companyName: '',
    contactName: '',
    companyPhoneNumber: '',
    companyEmail: '',
    companyAddress: '',
    companyTax: '',
    companyWebsite: '',
  }
  state = {
    activeIndex: -1,
    isSaving: false,
    isFetchingCompanies: false,
    isNewCompany: false,
    ...this.initialCompanyState,
    companies: [],
    companySources: [],
  }
  componentWillMount() {
    const { token } = this.props;
    this.loadCompanies(token);
    this.setState({
      companyName: this.props.companyName,
      companyId: this.props.companyId,
    });
  }
  componentWillReceiveProps(nextProps) {
    const { token } = nextProps;
    this.loadCompanies(token);
    this.setState({
      companyName: this.props.companyName,
      companyId: this.props.companyId,
    });
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
      ...this.initialCompanyState,
      companyName,
      companies: [...this.state.companies, {
        key: companyName,
        text: companyName,
        value: companyName,
      }],
      activeIndex: 0,
      isReadOnly: true,
      isNewCompany: true,
    });
  }
  onCompanySelectionChange = (e, data) => {
    const { value } = data;
    const { companySources, companies } = this.state;
    const company = find(companies, { value });
    if (company) {
      this.populateCompanyInfo(value, companySources, company.text);
    } else {
      this.setState({
        companyId: value,
        companyName: value,
      });
    }
  }
  populateCompanyInfo = (companyId, companySources, companyName) => {
    if (companySources && companyId) {
      const source = find(companySources, { _id: companyId });
      if (source) {
        this.setState({
          companyId,
          companyName,
          contactName: source.contactName,
          companyPhoneNumber: source.phoneNumber,
          companyEmail: source.email,
          companyAddress: source.address,
          companyTax: source.tax,
          companyWebsite: source.website,
          isNewCompany: false,
        });
      } else {
        this.setState({
          companyId,
          companyName,
        });
      }
    }
  }
  resetCompanySelection = () => {
    this.setState({
      ...this.initialCompanyState,
    });
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
          const { companyId, companyName } = this.state;
          this.populateCompanyInfo(companyId, response.companies, companyName);
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
      isNewCompany,
    } = this.state;
    if (!isNewCompany) {
      this.props.setCompanyInformation(companyId, companyName);
      this.props.onNextClicked();
    } else {
      addCompany(
        this.props.token, companyName, contactName, companyPhoneNumber,
        companyEmail, companyAddress, companyTax, companyWebsite,
      )
        .then((response) => {
          this.setState({
            isSaving: false,
          });
          this.props.setCompanyInformation(response.company._id, companyName);
          this.props.onNextClicked();
        })
        .catch((error) => {
          this.setState({
            isSaving: false,
          });
        });
    }
  }
  render() {
    const {
      activeIndex, isSaving, companyId, companies,
      contactName, companyPhoneNumber, companyAddress,
      companyEmail, companyTax, companyWebsite, isFetchingCompanies,
      isNewCompany, companyName,
    } = this.state;
    const isAbleToNext = Boolean(companyName);
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
              value={companyId}
              text={companyName}
              onAddItem={this.onNewCompanyAdded}
              deburr
              readOnly
              onChange={this.onCompanySelectionChange}
              disabled={isSaving}
              loading={isFetchingCompanies}
              onClear={this.resetCompanySelection}
            />
          </Form.Field>
        </Form.Group>
        <Accordion>
          <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
            <Icon name="dropdown" />
            Company Detail
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
        <Button disabled={!isAbleToNext} loading={isSaving} onClick={this.nextClicked} positive>
          Next
          <Icon name="right arrow" />
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  token: state.app.token,
  companyName: state.addProductToStock.companyName,
  companyId: state.addProductToStock.companyId,
});

const mapDispatchToProps = dispatch => ({
  setCompanyInformation: (companyId, companyName) => {
    dispatch(setCompanyForProduct(companyId, companyName));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ManufacturerForm);
