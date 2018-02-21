import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { Layout } from '../share';

import { validateEmail, validatePassword, validatePhoneNumber } from '../../utilities';
import { registerAccount } from '../../server-interactions';

import './styles.styl';

class Register extends React.Component {
  static propTypes = {
    registerSucceeded: PropTypes.func,
  }
  static defaultProps = {
    registerSucceeded: () => { },
  }
  state = {
    isLoading: false,
    userName: 'mrducmv88@gmail.com',
    password: '12345678',
    phoneNumber: '123',
    firstName: 'Duc',
    lastName: 'Mai',
    isUserNameError: false,
    isPasswordError: false,
    isPhoneNumberError: false,
    showFormError: false,
  }
  onInputChanged = (field, value) => {
    const { state } = this;
    state[field] = value;
    this.setState({
      ...state,
      isPasswordError: false,
      isPhoneNumberError: false,
      isUserNameError: false,
    });
  }
  submitClicked = () => {
    this.validate();

    requestAnimationFrame(() => {
      const {
        userName, password, phoneNumber, firstName, lastName,
        isPasswordError, isPhoneNumberError, isUserNameError,
      } = this.state;
      if (isPasswordError || isPhoneNumberError || isUserNameError) {
        return;
      }
      this.setState({
        isLoading: true,
      });
      registerAccount(userName, password, phoneNumber, firstName, lastName)
        .then((account) => {
          this.setState({
            isLoading: false,
            showFormError: false,
          });
          this.props.registerSucceeded();
        })
        .catch((error) => {
          this.setState({
            isLoading: false,
            showFormError: true,
          });
        });
    });
  }
  validate = () => {
    const { userName, password, phoneNumber } = this.state;
    const isUserNameError = !validateEmail(userName);
    const isPasswordError = !validatePassword(password);
    const isPhoneNumberError = !validatePhoneNumber(phoneNumber);
    this.setState({
      isUserNameError,
      isPasswordError,
      isPhoneNumberError,
    });
  }
  render() {
    const {
      userName, password, phoneNumber, isLoading,
      isPasswordError, isPhoneNumberError, isUserNameError, showFormError,
      firstName, lastName,
    } = this.state;
    return (
      <Layout>
        <div className="registerForm">
          <Grid
            textAlign="center"
            className="registerForm__grid"
            verticalAlign="middle"
          >
            <Grid.Column>
              <Header className="registerForm__title" as="h2" textAlign="center">
                <Image src="https://react.semantic-ui.com/logo.png" />
                &nbsp;Register new account
              </Header>
              <Form error={showFormError} loading={isLoading} size="large" className="registerForm__content">
                <Segment stacked>
                  <Form.Group widths="equal">
                    <Form.Input
                      fluid
                      placeholder="First name"
                      value={firstName}
                      onChange={(e) => { this.onInputChanged('firstName', e.target.value); }}
                    />
                    <Form.Input
                      fluid
                      placeholder="Last name"
                      value={lastName}
                      onChange={(e) => { this.onInputChanged('lastName', e.target.value); }}
                    />
                  </Form.Group>
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="E-mail address"
                    value={userName}
                    error={isUserNameError}
                    onChange={(e) => { this.onInputChanged('userName', e.target.value); }}
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    value={password}
                    error={isPasswordError}
                    onChange={(e) => { this.onInputChanged('password', e.target.value); }}
                  />
                  <Form.Input
                    fluid
                    icon="phone"
                    iconPosition="left"
                    placeholder="Phone number"
                    type="text"
                    value={phoneNumber}
                    error={isPhoneNumberError}
                    onChange={(e) => { this.onInputChanged('phoneNumber', e.target.value); }}
                  />
                  <Button
                    className="registerForm__button--register"
                    onClick={this.submitClicked}
                    fluid
                    size="large"
                  >
                    SignUp
                  </Button>
                  <Message
                    error
                    header="Server Error"
                    content="Register is not succeeded."
                  />
                </Segment>
              </Form>
              <Message>
                Already have account? <a href="/login">Login</a>
              </Message>
            </Grid.Column>
          </Grid>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  registerSucceeded: () => {
    dispatch(push('/login'));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
