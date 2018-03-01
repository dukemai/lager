import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Accordion, Icon, Button, Divider, Message } from 'semantic-ui-react';
import { find } from 'lodash';

import { AutoComplete } from '../share';
import { setDistributorForProduct } from '../../actions';
import { addDistributor, getDistributors } from '../../server-interactions';
import { validateDistributor } from '../../../common';

class DistributorForm extends Component {
  static propTypes = {
    onNextClicked: PropTypes.func,
    setDistributorInformation: PropTypes.func,
    distributorName: PropTypes.string,
    token: PropTypes.string,
    distributorId: PropTypes.string,
    companyId: PropTypes.string,
  }
  static defaultProps = {
    onNextClicked: () => { },
    setDistributorInformation: () => { },
    distributorName: '',
    token: '',
    distributorId: '',
    companyId: '',
  }
  initialIndustriState = {
    distributorId: '',
    distributorName: '',
    contactName: '',
    distributorPhoneNumber: '',
    distributorEmail: '',
    distributorAddress: '',
    distributorTax: '',
    distributorWebsite: '',
  }
  state = {
    activeIndex: -1,
    isSaving: false,
    isFetchingDistributors: false,
    isNewDistributor: false,
    ...this.initialIndustriState,
    distributors: [],
    distributorSources: [],
    isShowingSuccess: false,
    isShowingError: false,
    errorText: '',
    validatedResult: null,
  }
  componentWillMount() {
    const { token } = this.props;
    this.state.distributorName = this.props.distributorName;
    this.state.distributorId = this.props.distributorId;

    this.loadDistributors(token);
  }
  componentWillReceiveProps(nextProps) {
    const { token } = nextProps;
    this.state.distributorName = nextProps.distributorName;
    this.state.distributorId = nextProps.distributorId;

    this.loadDistributors(token);
  }
  onNewDistributorAdded = (e, { value }) => {
    const distributorName = value;
    this.setState({
      ...this.initialIndustriState,
      distributorName,
      distributors: [...this.state.distributors, {
        key: distributorName,
        text: distributorName,
        value: distributorName,
      }],
      activeIndex: 0,
      isReadOnly: true,
      isNewDistributor: true,
    });
  }
  onInputChanged = (field, value) => {
    const { state } = this;
    state[field] = value;
    this.setState({
      ...state,
    });

    const { distributorEmail, distributorPhoneNumber, distributorName } = state;
    const validatedResult = validateDistributor({
      email: distributorEmail,
      phoneNumber: distributorPhoneNumber,
      name: distributorName,
    });
    this.setState({
      ...state,
      isShowSuccess: false,
      isShowingError: false,
      validatedResult,
    });
  }
  onDistributorSelectionChange = (e, data) => {
    const { value } = data;
    const { distributorSources, distributors } = this.state;
    const distributor = find(distributors, { value });
    if (distributor) {
      this.populateDistributorInfo(value, distributorSources, distributor.text);
    } else {
      this.setState({
        distributorId: value,
        distributorName: value,
      });
    }
  }
  resetIndustriSelection = () => {
    this.setState({
      ...this.initialIndustriState,
    });
  }
  populateDistributorInfo = (distributorId, distributorSources, distributorName) => {
    if (distributorSources && distributorId) {
      const source = find(distributorSources, { _id: distributorId });

      if (source) {
        this.setState({
          distributorId,
          distributorName,
          contactName: source.contactName,
          distributorPhoneNumber: source.phoneNumber,
          distributorEmail: source.email,
          distributorAddress: source.address,
          distributorTax: source.tax,
          distributorWebsite: source.website,
          isNewDistributor: false,
        });
      } else {
        this.setState({
          distributorId,
          distributorName,
        });
      }
    }
  }
  loadDistributors = (token) => {
    if (token) {
      this.setState({
        isFetchingDistributors: true,
      });
      getDistributors(token)
        .then((response) => {
          const distributors = response.distributors.map(doc => ({
            key: doc._id,
            text: doc.name,
            value: doc._id,
          }));
          this.setState({
            isFetchingDistributors: false,
            distributors,
            distributorSources: response.distributors,
          });
          const { distributorId, distributorName } = this.state;
          this.populateDistributorInfo(distributorId, response.distributors, distributorName);
        })
        .catch((error) => {
          this.setState({
            isFetchingDistributors: false,
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
      distributorName, distributorId,
      distributorPhoneNumber, distributorAddress,
      distributorEmail, distributorTax, distributorWebsite,
      contactName, isNewDistributor,
    } = this.state;
    if (!isNewDistributor) {
      this.props.onNextClicked();
      this.props.setDistributorInformation(distributorId, distributorName);
    } else {
      this.setState({
        isSaving: true,
      });

      addDistributor(
        this.props.token, distributorName, contactName, distributorPhoneNumber,
        distributorEmail, distributorAddress, distributorTax, distributorWebsite,
        this.props.companyId,
      )
        .then((response) => {
          this.setState({
            isSaving: false,
          });
          this.props.onNextClicked();
          this.props.setDistributorInformation(response.distributor._id, distributorName);
        })
        .catch((error) => {
          this.setState({
            isSaving: false,
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
      distributorName, distributorId, distributors, activeIndex,
      distributorPhoneNumber, distributorAddress,
      distributorEmail, distributorTax, distributorWebsite, isSaving,
      contactName, isReadOnly, isFetchingDistributors, isNewDistributor,
      errorText, isShowingError, isShowingSuccess, validatedResult,
    } = this.state;
    const { companyId } = this.props;
    const isShowingValidationError = Boolean(validatedResult && validatedResult.fails());
    const isAbleToNext = (Boolean(distributorName) && !isNewDistributor && Boolean(companyId))
      || (Boolean(validatedResult) && validatedResult.passes());
    return (
      <Form success={isShowingSuccess} error={isShowingError} >
        <Form.Group widths="2">
          <Form.Field>
            <label>Distributor name</label>
            <AutoComplete
              allowAdditions
              additionLabel="Add "
              placeholder="Distributor name"
              fluid
              search
              selection
              options={distributors}
              noResultsMessage="No distributor found"
              value={distributorId}
              text={distributorName}
              onAddItem={this.onNewDistributorAdded}
              deburr
              readOnly={isReadOnly}
              onChange={this.onDistributorSelectionChange}
              disabled={isSaving}
              loading={isFetchingDistributors}
              onClear={this.resetIndustriSelection}
            />
          </Form.Field>
        </Form.Group>
        <Accordion>
          <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
            <Icon name="dropdown" />
            Distributor detail
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="Contact name"
                placeholder="Contact name"
                value={contactName}
                onChange={(event, { value }) => { this.onInputChanged('contactName', value); }}
                disabled={isSaving || !isNewDistributor}
              />
              <Form.Input
                fluid
                label="Phone number"
                placeholder="Phone number"
                value={distributorPhoneNumber}
                onChange={(event, { value }) => { this.onInputChanged('distributorPhoneNumber', value); }}
                disabled={isSaving || !isNewDistributor}
                error={validatedResult && validatedResult.errors.has('phoneNumber')}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="Email"
                placeholder="Email"
                value={distributorEmail}
                onChange={(event, { value }) => { this.onInputChanged('distributorEmail', value); }}
                disabled={isSaving || !isNewDistributor}
                error={validatedResult && validatedResult.errors.has('email') && Boolean(distributorEmail)}
              />
              <Form.Input
                fluid
                label="Address"
                placeholder="Address"
                value={distributorAddress}
                onChange={(event, { value }) => { this.onInputChanged('distributorAddress', value); }}
                disabled={isSaving || !isNewDistributor}
              />
            </Form.Group>
            <Form.Group widths="2">
              <Form.Input
                fluid
                label="Tax"
                placeholder="Tax"
                value={distributorTax}
                onChange={(event, { value }) => { this.onInputChanged('distributorTax', value); }}
                disabled={isSaving || !isNewDistributor}
              />
              <Form.Input
                fluid
                label="Website"
                placeholder="Website"
                value={distributorWebsite}
                onChange={(event, { value }) => { this.onInputChanged('distributorWebsite', value); }}
                disabled={isSaving || !isNewDistributor}
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
        <Button disabled={!isAbleToNext} loading={isSaving} onClick={this.nextClicked} positive>
          Save
          <Icon name="right arrow" />
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  token: state.app.token,
  distributorName: state.addProductToStock.distributorName,
  distributorId: state.addProductToStock.distributorId,
  companyId: state.addProductToStock.companyId,
});

const mapDispatchToProps = dispatch => ({
  setDistributorInformation: (distributorId, distributorName) => {
    dispatch(setDistributorForProduct(distributorId, distributorName));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DistributorForm);
