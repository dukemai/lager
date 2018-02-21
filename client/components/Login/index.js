import React from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Layout } from '../share';
import { validateEmail, validatePassword } from '../../utilities';
import { setToken, authenticate } from '../../actions';
import { login } from '../../server-interactions';

import './styles.styl';

class Login extends React.Component {
  static propTypes = {
    loginSucceeded: PropTypes.func,
  }
  static defaultProps = {
    loginSucceeded: () => {},
  }
  state = {
    userName: 'mrducmv88@gmail.com',
    password: '12345678',
    isLoading: false,
    isUserNameError: false,
    isPassWordError: false,
    showFormError: false,
  }
  onInputChanged = (field, value) => {
    const { state } = this;
    state[field] = value;
    this.setState({
      ...state,
      isPasswordError: false,
      isUserNameError: false,
    });
  }
  submitClicked = () => {
    this.validate();

    requestAnimationFrame(() => {
      const {
        userName, password,
        isPasswordError, isUserNameError,
      } = this.state;
      if (isPasswordError || isUserNameError) {
        return;
      }
      this.setState({
        isLoading: true,
      });
      login(userName, password)
        .then((data) => {
          this.props.loginSucceeded(data.token);
          this.setState({
            isLoading: false,
            showFormError: false,
          });
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
    const { userName, password } = this.state;
    const isUserNameError = !validateEmail(userName);
    const isPasswordError = !validatePassword(password);
    this.setState({
      isUserNameError,
      isPasswordError,
    });
  }
  render() {
    const {
      userName, password, isLoading,
      isUserNameError, isPassWordError,
      showFormError,
    } = this.state;
    return (
      <Layout>
        <div className="loginForm">
          <Grid
            textAlign="center"
            className="loginForm__grid"
            verticalAlign="middle"
          >
            <Grid.Column>
              <Header className="loginForm__title" as="h2" textAlign="center">
                <Image src="https://react.semantic-ui.com/logo.png" />
                &nbsp;Log-in to your account
              </Header>
              <Form error={showFormError} loading={isLoading} size="large" className="loginForm__content">
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="E-mail address"
                    value={userName}
                    onChange={(e) => { this.onInputChanged('userName', e.target.value); }}
                    error={isUserNameError}
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => { this.onInputChanged('password', e.target.value); }}
                    error={isPassWordError}
                  />

                  <Button
                    className="loginForm__button--login"
                    fluid
                    size="large"
                    onClick={this.submitClicked}
                  >
                    Login
                  </Button>
                  <Message
                    error
                    header="Server Error"
                    content="Invalid username or password."
                  />
                </Segment>
              </Form>
              <Message>
                New to us? <Link to="/register">Sign Up</Link>
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
  loginSucceeded: (token) => {
    dispatch(setToken(token));
    dispatch(authenticate());
    requestAnimationFrame(() => {
      dispatch(push('/'));
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
