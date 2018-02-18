import React from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

import { Layout } from '../share';
import './styles.styl';

const Login = () => (
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

              <Button className="loginForm__button--login" fluid size="large">Login</Button>
            </Segment>
          </Form>
          <Message>
            New to us? <a href="/register">Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  </Layout>
);

export default Login;
