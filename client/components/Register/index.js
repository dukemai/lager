import React from 'react';

import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { Layout } from '../share';

import './styles.styl';

export default class Register extends React.Component {
  state = {
    isLoading: false,
    userName: '',
    password: '',
    phoneNumber: '',
  }
  submitClicked = () => {
    this.setState({
      isLoading: true,
    });
  }
  render() {
    const {
      userName, password, phoneNumber, isLoading,
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
              <Form loading={isLoading} size="large" className="registerForm__content">
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="E-mail address"
                    content={userName}
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    content={password}
                  />
                  <Form.Input
                    fluid
                    icon="phone"
                    iconPosition="left"
                    placeholder="Phone number"
                    type="text"
                    content={phoneNumber}
                  />

                  <Button className="registerForm__button--register" onClick={this.submitClicked} fluid size="large">SignUp</Button>
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
