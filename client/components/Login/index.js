import React from 'react';

import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

import './styles.styl';

const Login = () => (
  <div className="loginForm">
    <Grid
      textAlign="center"
      className="loginForm__grid"
      verticalAlign="middle"
    >
      <Grid.Column>
        <Header as="h2" color="teal" textAlign="center">
          <Image src="https://react.semantic-ui.com/logo.png" />
          {" "}Log-in to your account
        </Header>
        <Form size="large" className="loginForm__content">
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
            />

            <Button color="teal" fluid size="large">Login</Button>
          </Segment>
        </Form>
        <Message>
          New to us? <a href="#">Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  </div>
);

export default Login;
