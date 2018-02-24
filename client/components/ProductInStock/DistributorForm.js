import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Accordion, Icon, Button, Divider } from 'semantic-ui-react';

import { AutoComplete } from '../share';
import { setCompanyForProduct } from '../../actions';

class DistributorForm extends Component {
  static propTypes = {
    onNextClicked: PropTypes.func,
    setDistributorInformation: PropTypes.func,
  }
  static defaultProps = {
    onNextClicked: () => {},
    setDistributorInformation: () => {},
  }
  state = {
    activeIndex: -1,
    isSaving: false,
    distributorId: '0',
    distributorName: 'Duc Mai',
    contactName: 'Duc Mai',
    distributorPhoneNumber: '0985354437',
    distributorEmail: 'backan@thienlong.org',
    distributorAddress: 'Bac Kan, VietNam',
    distributorTax: '42342432',
    distributorWebsite: 'backan.company',
    distributors: [{
      key: 'Duc Mai',
      text: 'Duc Mai',
      value: 'Duc Mai',
    }],
  }
  onNewDistributorAdded = (e, { value }) => {
    const distributorName = value;
    this.setState({
      distributorName,
      companies: [...this.state.companies, {
        key: distributorName,
        text: distributorName,
        value: distributorName,
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
        this.props.setDistributorInformation(companyId, companyName);
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
      distributorName, distributorId, distributors, activeIndex,
      distributorPhoneNumber, distributorAddress,
      distributorEmail, distributorTax, distributorWebsite, isSaving,
      contactName, isReadOnly,
    } = this.state;
    const { onNextClicked } = this.props;
    return (
      <Form>
        <Form.Group widths="equal">
          <Form.Field>
            <label>Distributor name</label>
            <AutoComplete
              allowAdditions
              additionLabel="Add "
              placeholder="Company name"
              fluid
              search
              selection
              options={distributors}
              noResultsMessage="No distributor found"
              value={distributorName}
              onAddItem={this.onNewCompanyAdded}
              deburr
              readOnly={isReadOnly}
              onChange={(event, { value }) => { this.onInputChanged('distributorName', value); }}
              disabled={isSaving}
            />
          </Form.Field>
        </Form.Group>
        <Accordion>
          <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
            <Icon name="dropdown" />
            New distributor
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="Contact name"
                placeholder="Contact name"
                value={contactName}
                onChange={(event, { value }) => { this.onInputChanged('contactName', value); }}
              />
              <Form.Input
                fluid
                label="Phone number"
                placeholder="Phone number"
                value={distributorPhoneNumber}
                onChange={(event, { value }) => { this.onInputChanged('distributorPhoneNumber', value); }}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="Email"
                placeholder="Email"
                value={distributorEmail}
                onChange={(event, { value }) => { this.onInputChanged('distributorEmail', value); }}
              />
              <Form.Input
                fluid
                label="Address"
                placeholder="Address"
                value={distributorAddress}
                onChange={(event, { value }) => { this.onInputChanged('distributorAddress', value); }}
              />
            </Form.Group>
            <Form.Group widths="2">
              <Form.Input
                fluid
                label="Tax"
                placeholder="Tax"
                value={distributorTax}
                onChange={(event, { value }) => { this.onInputChanged('distributorTax', value); }}
              />
              <Form.Input
                fluid
                label="Website"
                placeholder="Website"
                value={distributorWebsite}
                onChange={(event, { value }) => { this.onInputChanged('distributorWebsite', value); }}
              />
            </Form.Group>
          </Accordion.Content>
        </Accordion>
        <Divider />
        <Button loading={isSaving} onClick={onNextClicked} positive>
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

export default connect(mapStateToProps, mapDispatchToProps)(DistributorForm);
