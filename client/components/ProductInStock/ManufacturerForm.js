import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { find } from 'lodash';
import { Form, Accordion, Icon, Button, Divider, Message } from 'semantic-ui-react';

import { AutoComplete } from '../share';
import { addCompany, getCompanies } from '../../server-interactions';
import { setCompanyForProduct } from '../../actions';
import { validateCompany } from '../../../common';

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
    isShowingSuccess: false,
    isShowingError: false,
    errorText: '',
    ...this.initialCompanyState,
    companies: [],
    companySources: [],
    validatedResult: null,
  }
  componentWillMount() {
    const { token } = this.props;
    this.loadCompanies(token);
    this.state.companyName = this.props.companyName;
    this.state.companyId = this.props.companyId;
  }
  componentWillReceiveProps(nextProps) {
    const { token } = nextProps;
    this.loadCompanies(token);
    this.state.companyName = nextProps.companyName;
    this.state.companyId = nextProps.companyId;
  }
  onInputChanged = (field, value) => {
    const { state } = this;
    state[field] = value;
    const { companyEmail, companyPhoneNumber, companyName } = state;
    const validatedResult = validateCompany({
      email: companyEmail,
      phoneNumber: companyPhoneNumber,
      name: companyName,
    });
    this.setState({
      ...state,
      isShowSuccess: false,
      isShowingError: false,
      validatedResult,
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
          requestAnimationFrame(() => {
            this.setState({
              isFetchingCompanies: false,
              companies,
              companySources: response.companies,
            });
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
      this.props.onNextClicked();
      this.props.setCompanyInformation(companyId, companyName);
    } else {
      this.setState({
        isSaving: true,
        isShowingError: false,
        isShowingSuccess: false,
        errorText: '',
      });
      addCompany(
        this.props.token, companyName, contactName, companyPhoneNumber,
        companyEmail, companyAddress, companyTax, companyWebsite,
      )
        .then((response) => {
          this.setState({
            isSaving: false,
            isShowingSuccess: true,
          });
          requestAnimationFrame(() => {
            this.props.onNextClicked();
            this.props.setCompanyInformation(response.company._id, companyName);
          });
        })
        .catch((response) => {
          this.setState({
            isSaving: false,
            isShowingError: true,
            errorText: response.error,
          });
        });
    }
  }
  getErrors = () => {
    const { validatedResult } = this.state;
    if (!validatedResult) {
      return [];
    }
    const errors = validatedResult.errors.all();
    let arr = [];
    Object.keys(errors).forEach((k) => {
      arr = [...arr, ...errors[k]];
    });
    return arr;
  }
  render() {
    const {
      activeIndex, isSaving, companyId, companies,
      contactName, companyPhoneNumber, companyAddress,
      companyEmail, companyTax, companyWebsite, isFetchingCompanies,
      isNewCompany, companyName, isShowingSuccess, isShowingError,
      errorText, validatedResult,
    } = this.state;
    const isAbleToNext = (Boolean(companyName) && !isNewCompany)
      || (validatedResult && validatedResult.passes());

    const isShowingValidationError = Boolean(validatedResult && validatedResult.fails());
    return (
      <Form error={isShowingError} success={isShowingSuccess}>
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
                error={validatedResult && validatedResult.errors.has('phoneNumber')}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                required
                fluid
                label="Email"
                placeholder="Email"
                value={companyEmail}
                onChange={(event, { value }) => { this.onInputChanged('companyEmail', value); }}
                disabled={isSaving || !isNewCompany}
                error={validatedResult && validatedResult.errors.has('email') && Boolean(companyEmail)}
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
        <Message
          success
          header="Saved"
          content="Successfully"
          visible={isShowingSuccess}
        />
        <Message
          error
          header="Save error"
          content={errorText}
          visible={isShowingError}
        />
        <Message
          error
          header="Field error"
          content={errorText}
          visible={isShowingValidationError}
          list={this.getErrors()}
        />
        <Button
          disabled={!isAbleToNext}
          loading={isSaving}
          onClick={this.nextClicked}
          positive
        >
          Save
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
